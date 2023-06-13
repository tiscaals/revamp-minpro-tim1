CREATE table users.business_entity (
entity_id SERIAL PRIMARY KEY
);

CREATE table users.users(
user_entity_id SERIAL PRIMARY KEY
);

CREATE table master.status(
	status varchar(15) PRIMARY KEY
);

CREATE table curriculum.program_entity (
prog_entity_id INT PRIMARY KEY REFERENCES users.business_entity(entity_id)
);

CREATE TABLE bootcamp.program_apply (
    prap_user_entity_id INT REFERENCES users.users (user_entity_id),
    prap_prog_entity_id INT REFERENCES curriculum.program_entity (prog_entity_id),
    prap_test_score INT,
    prap_gpa NUMERIC,
    prap_iq_test NUMERIC,
    prap_review VARCHAR(256),
    prap_modified_date TIMESTAMPTZ,
    prap_status VARCHAR(15) CHECK (prap_status in ('recommendation', 'passed', 'failed')) REFERENCES master.status(status),
    PRIMARY KEY (prap_user_entity_id, prap_prog_entity_id)
);

CREATE TABLE bootcamp.program_apply_progress (
    parog_id SERIAL PRIMARY KEY,
    parog_user_entity_id INT,
    parog_prog_entity_id INT,
    parog_action_date TIMESTAMPTZ,
    parog_modified_date TIMESTAMPTZ,
    parog_comment VARCHAR(512),
    parog_progress_name VARCHAR(15) CHECK (parog_progress_name in ('apply', 'filtering test', 'failed', 'contract', 'disqualified', 'not responding'))REFERENCES master.route_actions(roac_name) ,
    parog_emp_entity_id INT, --Ini Tabel apaan sih????
    parog_status VARCHAR(15) CHECK (parog_status in ('open', 'wait', 'cancelled', 'closed')) REFERENCES master.status(status) ,
    FOREIGN KEY (parog_user_entity_id, parog_prog_entity_id) REFERENCES bootcamp.program_apply(prap_user_entity_id, prap_prog_entity_id)
);

create table hr.employee(
	emp_entity_id serial primary key
);

create table bootcamp.batch(
	batch_id serial,
	batch_entity_id integer references curriculum.program_entity(prog_entity_id),
	batch_name varchar(15) unique,
	batch_description varchar(125),
	batch_start_date date,
	batch_end_date date,
	batch_reason varchar(256),
	batch_type varchar(15),
	batch_modified_date timestamptz,
	batch_status varchar(15) CHECK (batch_status in ('open', 'running', 'closed', 'pending', 'cancelled', 'extend')) REFERENCES master.status(status) ,
	batch_pic_id integer references hr.employee(emp_entity_id),
	primary key(batch_id,batch_entity_id)
);

-- ini buat bawah
ALTER TABLE bootcamp.batch ADD CONSTRAINT batch_unique_id UNIQUE (batch_id);

CREATE TABLE bootcamp.batch_trainee (
    batr_id serial,
    batr_status varchar(15) CHECK (batr_status in ('passed', 'failed', 'resign', 'running')) REFERENCES master.status(status) ,
    batr_certificated char(1) CHECK (batr_certificated in ('0', '1')), --Tipe baru yaitu 0 atau 1
    batr_certificate_link varchar(255),
    batr_access_token varchar(255),
    batr_access_grant char(1) CHECK (batr_access_grant in ('0', '1')), --Tipe baru yaitu 0 atau 1
    batr_review varchar(1024),
    batr_total_score numeric,
    batr_modified_date timestamptz,
    batr_trainee_entity_id integer,
    batr_batch_id integer,
    PRIMARY KEY (batr_id, batr_batch_id),
    FOREIGN KEY (batr_trainee_entity_id) REFERENCES users.users (user_entity_id),
    FOREIGN KEY (batr_batch_id) REFERENCES bootcamp.batch (batch_id)
);

create table bootcamp.batch_trainee_evaluation(
	btev_id serial primary key,
	btev_type varchar(15) CHECK (btev_type in ('hardskill', 'softskill')), --Tipe baru yaitu hardskill atau softskill
	btev_header varchar(256),
	btev_section varchar(256),
	btev_skill varchar(256),
	btev_week integer,
	btev_skor integer,
	btev_note varchar(256),
	btev_modified_date timestamptz,
	btev_batch_id integer references bootcamp.batch(batch_id),
	btev_trainee_entity_id integer references users.users(user_entity_id)
);

create table bootcamp.trainer_programs( --diubah dari instructor_programs
	batch_id integer references bootcamp.batch(batch_id),
	tpro_entity_id integer,
	tpro_emp_entity_id integer references hr.employee(emp_entity_id),
	tpro_modified_date timestamptz,
	primary key(batch_id,tpro_emp_entity_id)
);

CREATE TABLE master.route_actions(
	roac_name VARCHAR(15) UNIQUE
);

CREATE TABLE bootcamp.talents (
    talent_fullname varchar(100),
    talent_user_entity_id integer,
    talent_technology varchar(256),
    talent_batch_id integer references bootcamp.batch(batch_id),
    talent_start_date date,
    talent_end_date date,
    talent_trainer varchar(30),
    talent_skill text,
    talent_status varchar(20) check (talent_status IN ('idle', 'placement', 'trial'))
);

----- untuk rahmi dan mike (placement) ----- 

create view selecttalent as
select
	batch.batch_id , 
	batch.batch_name, 
	batch.batch_entity_id,
	batch.batch_start_date,
	batch.batch_end_date,
	batch_trainee.batr_review,
	users.user_entity_id,
	program_entity.prog_title as technology,
	concat(users.user_first_name,' ',users.user_last_name) as fullname,
	(SELECT string_agg(btev_skill, ', ') AS skills from bootcamp.batch_trainee_evaluation ),
	(select concat(users.user_first_name,' ', users.user_last_name)from bootcamp.trainer_programs join hr.employee on tpro_emp_entity_id = employee.emp_entity_id join users.users on users.user_entity_id = employee.emp_entity_id
where trainer_programs.batch_id=batch.batch_id and program_entity.prog_entity_id = batch.batch_entity_id
order by users.user_entity_id
limit 1) as trainer
from bootcamp.batch 
join bootcamp.batch_trainee on bootcamp.batch.batch_id = bootcamp.batch_trainee.batr_batch_id
join users.users on users.user_entity_id = batch_trainee.batr_trainee_entity_id
join curriculum.program_entity on program_entity.prog_entity_id = bootcamp.batch.batch_entity_id

create or replace view bootcamp.batchonly as
select
	batch_id,
	batch_name,
	prog_title,
	batch_status,
	batch_start_date,
	batch_end_date
from bootcamp.batch
join curriculum.program_entity on program_entity.prog_entity_id = batch.batch_entity_id

create or replace view bootcamp.batchtrainer as
select
	batch_id,
	concat(user_first_name,' ',user_last_name),
	user_photo
from bootcamp.trainer_programs
join users.users on users.user_entity_id = tpro_emp_entity_id

create or replace view bootcamp.batchtrainee as
select
	batr_batch_id,
	batch_name,
	user_photo
from 
	users.users
join bootcamp.batch_trainee on batr_trainee_entity_id = user_entity_id 
join bootcamp.batch on batch_id = batr_batch_id
order by batr_batch_id
