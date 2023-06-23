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
    prap_modified_date TIMESTAMPTZ default now(),
    prap_status VARCHAR(15) CHECK (prap_status in ('recommendation', 'passed', 'failed')) REFERENCES master.status(status),
    PRIMARY KEY (prap_user_entity_id, prap_prog_entity_id)
);

CREATE TABLE bootcamp.program_apply_progress (
    parog_id SERIAL PRIMARY KEY,
    parog_user_entity_id INT,
    parog_prog_entity_id INT,
    parog_action_date TIMESTAMPTZ default now(),
    parog_modified_date TIMESTAMPTZ default now(),
    parog_comment VARCHAR(512),
    parog_progress_name VARCHAR(15) REFERENCES master.route_actions(roac_name) ,
    parog_emp_entity_id INT, --Ini Tabel apaan sih????
    parog_status VARCHAR(15) CHECK (parog_status in ('open', 'wait', 'cancelled', 'closed')) REFERENCES master.status(status) ,
    FOREIGN KEY (parog_user_entity_id, parog_prog_entity_id) REFERENCES bootcamp.program_apply(prap_user_entity_id, prap_prog_entity_id)
);


alter table bootcamp.program_apply_progress 
alter column parog_modified_date set default now()


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
    FOREIGN KEY (batr_batch_id) REFERENCES bootcamp.batch (batch_id) on delete cascade
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
	btev_batch_id integer references bootcamp.batch(batch_id) on delete cascade,
	btev_trainee_entity_id integer references users.users(user_entity_id)
);

create table bootcamp.trainer_programs( --diubah dari instructor_programs
	batch_id integer references bootcamp.batch(batch_id) on delete cascade,
	tpro_entity_id integer,
	tpro_emp_entity_id integer references hr.employee(emp_entity_id),
	tpro_modified_date timestamptz,
	primary key(batch_id,tpro_emp_entity_id)
);

CREATE TABLE master.route_actions(
	roac_name VARCHAR(15) UNIQUE
);


CREATE TABLE bootcamp.talents (
	talent_id serial primary key,
    talent_fullname varchar(100),
    talent_user_entity_id integer references users.users(user_entity_id),
    talent_technology varchar(256),
    talent_batch_id integer references bootcamp.batch(batch_id) on delete cascade,
    talent_start_date date,
    talent_end_date date,
    talent_trainer varchar(30),
    talent_skill text,
	talent_image varchar(255),
    talent_status varchar(20) check (talent_status IN ('idle', 'placement', 'trial')) references master.status(status)
);

drop table bootcamp.talents cascade

----- untuk rahmi dan mike (placement) ----- 

Alter table curriculum.program_entity
add column prog_title varchar(256);

Alter table users.users
add column user_first_name varchar(50);

Alter table users.users
add column user_last_name varchar(50);



    talent_status varchar(20) check (talent_status IN ('idle', 'placement', 'trial')) references master.status(status)
);

create table master.modules(
	module_name varchar(15) primary key
);

create table master.route_actions(
	roac_id serial primary key,
	roac_name varchar(15) unique,
	roac_orderby integer,
	roac_display char(1) check (roac_display in ('0','1')),
	roac_module_name varchar(15) references master.modules(module_name)
);

create table users.users_education(
	usdu_id serial,
	usdu_entity_id integer references users.users(user_entity_id),
	usdu_school varchar(255),
	usdu_degree varchar(15) check (usdu_degree in ('bachelor','diploma')),
	usdu_graduate_year varchar(4),
	usdu_field_study varchar(125),
	primary key(usdu_id, usdu_entity_id)
);

select * from users.users_education

create table users.phone_number_type(
	ponty_code varchar(15) primary key
);

create table users.users_phones(
	uspo_entity_id serial references users.users(user_entity_id),
	uspo_number varchar(15),
	uspo_ponty_code varchar(15) references users.phone_number_type(ponty_code),
	primary key(uspo_entity_id,uspo_ponty_code)
);

create table users.users_email (
	pmail_entity_id integer references users.users(user_entity_id),
	pmail_id serial,
	pmail_address varchar(50),
	primary key(pmail_entity_id,pmail_id)
)

select * from users.users_education
select * from users.users

----- untuk rahmi dan mike (placement) ----- 

create view bootcamp.selecttalent as
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

select * from bootcamp.batch


create or replace view bootcamp.batchonly as
select
	batch_id,
	batch_entity_id,
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

alter table users.users_education
add column usdu_grade varchar(5)

drop view bootcamp.batchtrainee
create or replace view bootcamp.batchtrainee as
select
	batr_id,
	batr_batch_id,
	batch_name,
	TO_CHAR(batch_start_date,'Month DD YYYY') as batch_start_date,
	TO_CHAR(batch_end_date,'Month DD YYYY') as batch_end_date,
	usdu_school,
	usdu_field_study,
	usdu_grade,
	user_photo,
	concat(user_first_name,' ',user_last_name) as full_name,
	batr_status,
	batr_trainee_entity_id,
	batr_certificated,
	batr_certificate_link,
	batr_review,
	batr_total_score,
	prog_title
from
	users.users
join bootcamp.batch_trainee on batr_trainee_entity_id = user_entity_id 
join bootcamp.batch on batch_id = batr_batch_id
join curriculum.program_entity on prog_entity_id = batch_entity_id
left join users.users_education on usdu_entity_id = user_entity_id
order by batr_batch_id


-- Tambahan Query untuk Menyesuaikan Database Talents dengan MockUp FrontEnd Menu Talents

alter table bootcamp.talents
add column talent_image varchar(255);

insert into bootcamp.talents(
	talent_fullname,
	talent_user_entity_id,
	talent_technology,
	talent_batch_id,
	talent_start_date,
	talent_end_date,
	talent_trainer,
	talent_skill,
	talent_status,
	talent_image
) values(
	'Ramzi Jumair',
	1,
	'Java',
	10,
	'2023-06-06',
	'2023-06-06',
	'Abu Zubair',
	'Bisa Hack Data Militer Om Putin',
	'idle',
	'Gambar Ramzi Jumair'
);

update bootcamp.talents
set talent_image = 'Gambar Raihan Novirma'
where

CREATE OR REPLACE VIEW bootcamp.talentspassed
 AS
 SELECT talents.talent_fullname,
    talents.talent_user_entity_id,
    talents.talent_technology,
    talents.talent_batch_id,
    talents.talent_start_date,
    talents.talent_end_date,
    talents.talent_trainer,
    talents.talent_skill,
    talents.talent_status,
	talents.talent_image,
    batch.batch_id,
    batch.batch_entity_id,
    batch.batch_name,
    batch.batch_description,
    batch.batch_start_date,
    batch.batch_end_date,
    batch.batch_reason,
    batch.batch_type,
    batch.batch_modified_date,
    batch.batch_status,
    batch.batch_pic_id,
    program_entity.prog_entity_id,
    program_entity.prog_title
   FROM bootcamp.talents
     JOIN bootcamp.batch ON batch.batch_id = talents.talent_batch_id
     JOIN curriculum.program_entity ON program_entity.prog_entity_id = batch.batch_entity_id;

insert into master.status values('resign')

select * from bootcamp.batch_trainee_evaluation

create view bootcamp.selectcandidates as
select 
	user_entity_id,
	parog_id,
	prog_entity_id,
	user_photo,
	concat(user_first_name,' ',user_last_name) as full_name,
	usdu_school,
	usdu_field_study,
	usdu_graduate_year,
	prog_title,
	prap_status,
	prap_review,
	prap_test_score,
	TO_CHAR(parog_action_date, 'Month DD YYYY') as join_date,
	parog_progress_name
from bootcamp.program_apply_progress
join bootcamp.program_apply on prap_prog_entity_id = parog_prog_entity_id 
	and prap_user_entity_id = parog_user_entity_id
join curriculum.program_entity on prog_entity_id = prap_prog_entity_id
join users.users on users.user_entity_id = prap_user_entity_id
left join users.users_education on users.user_entity_id = usdu_entity_id


select * from master.route_actions

select * from bootcamp.program_apply_progress
join bootcamp.program_apply on prap_prog_entity_id = parog_prog_entity_id 
	and prap_user_entity_id = parog_user_entity_id
join curriculum.program_entity on prog_entity_id = prap_prog_entity_id


--get rec students
--prap_user_entity_id
SELECT 
	prap_user_entity_id as user_id,
	prap_prog_entity_id,
	user_first_name,
	user_last_name,
	user_photo,
	TO_CHAR(parog_action_date, 'FMMonth DD, YYYY')
FROM bootcamp.program_apply
JOIN bootcamp.program_apply_progress on prap_user_entity_id=parog_user_entity_id 
	and prap_prog_entity_id = parog_prog_entity_id 
left JOIN users.users ON user_entity_id= prap_user_entity_id 
WHERE (prap_status = 'recommendation' OR prap_status = 'passed') 
	AND prap_prog_entity_id = 2

select * from bootcamp.talents
	
--get trainee in all batches
--batr_trainee_etity_id
select batr_trainee_entity_id,batch_id from bootcamp.batch_trainee 
join bootcamp.batch on batch.batch_id = batch_trainee.batr_batch_id
