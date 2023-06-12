CREATE SCHEMA job_hire

CREATE TABLE job_hire.job_category(
	joca_id SERIAL PRIMARY KEY,
	joca_name VARCHAR(255) NOT NULL,
	joca_modified_date TIMESTAMPTZ
)

CREATE TABLE job_hire.employee_range(
	emra_id SERIAL PRIMARY KEY,
	emra_range_min INT UNIQUE,
	emra_range_max INT UNIQUE,
	emra_modified_date TIMESTAMPTZ
)

CREATE TABLE job_hire.client(
	clit_id SERIAL PRIMARY KEY,
	clit_name VARCHAR(256) UNIQUE,
	clit_about VARCHAR(512),
	clit_modified_date TIMESTAMPTZ,
	clit_addr_id INT,
	clit_emra_id INT,
	CONSTRAINT fk_clit_emra_id
      FOREIGN KEY(clit_emra_id) 
      REFERENCES job_hire.employee_range(emra_id)
)

CREATE TYPE job_hire.jopo_education AS ENUM ('SMK/SMA/D1', 'D3', 'S1', 'S2', 'S3')

CREATE TABLE job_hire.job_post(
	jopo_entity_id serial PRIMARY KEY,
	jopo_number varchar(25) unique,
	jopo_title varchar(256),
	jopo_start_date timestamptz,
	jopo_end_date timestamptz,
	jopo_min_salary numeric,
	jopo_max_salary numeric,
	jopo_min_experience int,
	jopo_max_experience int,
	jopo_primary_skill varchar(256),
	jopo_working_type varchar(15),
	jopo_education job_hire.jopo_education,
	jopo_publish_date timestamptz,
	jopo_modified_date timestamptz,
	jopo_emp_entity_id int,
	jopo_clit_id int,
	jopo_joro_id int,
	jopo_joty_id int,
	jopo_loca_id int,
	jopo_addr_id int,
	jopo_status varchar(15)
)

CREATE TYPE job_hire.taap_status AS ENUM ('Interview', 'Failed', 'Succeed')

CREATE TABLE job_hire.talent_apply(
	taap_user_entity_id INT,
	taap_entity_id INT,
	taap_intro VARCHAR(512),
	taap_scoring INT,
	taap_modified_date TIMESTAMPTZ,
	taap_status job_hire.taap_status,
	CONSTRAINT fk_taap_entity_id
      FOREIGN KEY(taap_entity_id) 
      REFERENCES job_hire.job_post(jopo_entity_id),
	PRIMARY KEY (taap_user_entity_id, taap_entity_id)
)

CREATE TYPE job_hire.tapr_status AS ENUM ('Open', 'Waiting', 'Done', 'Cancelled', 'Closed')

CREATE TABLE job_hire.talent_apply_progress(
	tapr_id SERIAL,
	tapr_taap_user_entity_id INT,
	tapr_taap_entity_id INT,
	tapr_modified_date TIMESTAMPTZ,
	tapr_status job_hire.tapr_status,
	tapr_comment VARCHAR(256),
	tapr_progress_name VARCHAR(55),
-- 	CONSTRAINT fk_tapr_taap_entity_id
--       FOREIGN KEY(tapr_taap_entity_id) 
--       REFERENCES job_hire.talent_apply(taap_entity_id),
-- 	CONSTRAINT fk_tapr_taap_user_entity_id
--       FOREIGN KEY(tapr_taap_user_entity_id) 
--       REFERENCES job_hire.talent_apply(taap_user_entity_id),
	PRIMARY KEY (tapr_id, tapr_taap_user_entity_id, tapr_taap_entity_id)
)

CREATE TYPE job_hire.jopho_filetype AS ENUM ('png', 'jpeg')

CREATE TABLE job_hire.job_photo(
	jopho_id SERIAL PRIMARY KEY,
	jopho_filename VARCHAR(55),
	jopho_filesize INT,
	jopho_filetype job_hire.jopho_filetype,
	jopho_modified_date TIMESTAMPTZ,
	jopho_entity_id INT,
	CONSTRAINT fk_jopho_entity_id
		FOREIGN KEY (jopho_entity_id)
		REFERENCES job_hire.job_post(jopo_entity_id)
)

CREATE TABLE job_hire.job_post_desc(
	jopo_entity_id INT PRIMARY KEY,
	jopo_description JSON,
	jopo_responsibility JSON,
	jopo_target JSON,
	jopo_benefit JSON,
	CONSTRAINT fk_jopo_entity_id
		FOREIGN KEY (jopo_entity_id)
		REFERENCES job_hire.job_post(jopo_entity_id)
)