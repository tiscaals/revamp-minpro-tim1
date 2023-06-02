CREATE table users.business_entity (
entity_id SERIAL PRIMARY KEY
);

CREATE table users.users(
user_entity_id SERIAL PRIMARY KEY
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
    prap_status VARCHAR(15),
    PRIMARY KEY (prap_user_entity_id, prap_prog_entity_id)
);

-- ini buat type diatas
CREATE TYPE bootcamp.prap_status_type as enum ('recommendation','passed','failed');
ALTER TABLE bootcamp.program_apply
ALTER COLUMN prap_status type bootcamp.prap_status_type USING prap_status::bootcamp.prap_status_type;

CREATE TABLE bootcamp.program_apply_progress (
    parog_id SERIAL PRIMARY KEY,
    parog_user_entity_id INT,
    parog_prog_entity_id INT,
    parog_action_date TIMESTAMPTZ,
    parog_modified_date TIMESTAMPTZ,
    parog_comment VARCHAR(512),
    parog_progress_name VARCHAR(15),
    parog_emp_entity_id INT,
    parog_status VARCHAR(15), --??????
    FOREIGN KEY (parog_user_entity_id, parog_prog_entity_id) REFERENCES bootcamp.program_apply(prap_user_entity_id, prap_prog_entity_id)
);


-- ini buat type diatas
CREATE TYPE bootcamp.parog_status_type as enum ('open','wait','cancelled','closed');
ALTER TABLE bootcamp.program_apply_progress
ALTER COLUMN parog_status type bootcamp.parog_status_type USING parog_status::bootcamp.parog_status_type;

create table hr.employee(
	emp_entity_id serial primary key
);

create table bootcamp.batch(
	batch_id serial,
	batch_entity_id integer references curriculum.program_entity(prog_entity_id),
	batch_name varchar(15) unique,
	batch_start_date date,
	batch_end_date date,
	batch_status varchar(15),
	batch_reason varchar(256),
	batch_type varchar(15),
	batch_modified_date timestamptz,
	batch_pic_id integer references hr.employee(emp_entity_id),
	primary key(batch_id,batch_entity_id)
);

-- ini buat bawah
ALTER TABLE bootcamp.batch ADD CONSTRAINT batch_unique_id UNIQUE (batch_id);

CREATE TABLE bootcamp.batch_trainee (
    batr_id serial,
    batr_status varchar(15),
    batr_certificated char(1), --Tipe baru yaitu 0 atau 1
    batr_certificate_link varchar(255),
    batr_access_token varchar(255),
    batr_access_grant char(1), --Tipe baru yaitu 0 atau 1
    batr_review varchar(1024),
    batr_total_score numeric,
    batr_modified_date timestamptz,
    batr_trainee_entity_id integer,
    batr_batch_id integer,
    PRIMARY KEY (batr_id, batr_batch_id),
    FOREIGN KEY (batr_trainee_entity_id) REFERENCES users.users (user_entity_id),
    FOREIGN KEY (batr_batch_id) REFERENCES bootcamp.batch (batch_id)
);

-- ini buat type diatas
CREATE TYPE bootcamp.batr_certificated_type as enum ('0','1');
ALTER TABLE bootcamp.batch_trainee
ALTER COLUMN batr_certificated type bootcamp.batr_certificated_type USING batr_certificated::bootcamp.batr_certificated_type;
-- ini juga
CREATE TYPE bootcamp.batr_access_grant_type as enum ('0','1');
ALTER TABLE bootcamp.batch_trainee
ALTER COLUMN batr_access_grant type bootcamp.batr_access_grant_type USING batr_access_grant::bootcamp.batr_access_grant_type;

create table bootcamp.batch_trainee_evaluation(
	btev_id serial primary key,
	btev_type varchar(15), --Tipe baru yaitu hardskill atau softskill
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

-- ini buat diatas
CREATE TYPE bootcamp.btev_type_type as enum ('hardskill','softskill');
ALTER TABLE bootcamp.batch_trainee_evaluation
ALTER COLUMN btev_type type bootcamp.btev_type_type USING btev_type::bootcamp.btev_type_type;

-- ini buat bawah
ALTER TABLE bootcamp.batch ADD CONSTRAINT batch_entity_unique_id UNIQUE (batch_entity_id);

create table bootcamp.instructor_programs(
	batch_id integer references bootcamp.batch(batch_id),
	inpro_entity_id integer references bootcamp.batch(batch_entity_id),
	inpro_emp_entity_id integer references hr.employee(emp_entity_id),
	inpro_modified_date timestamptz,
	primary key(batch_id,inpro_entity_id,inpro_emp_entity_id)
);
