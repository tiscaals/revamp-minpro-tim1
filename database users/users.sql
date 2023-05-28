CREATE TABLE master.skill_type(
	skty_name VARCHAR(15) PRIMARY KEY
)

CREATE TABLE master.address(
	addr_id SERIAL PRIMARY KEY
)

CREATE TABLE master.address_type(
	adty_id SERIAL PRIMARY KEY
)

CREATE TABLE users.phone_number_type(
	ponty_code VARCHAR(15) PRIMARY KEY,
	ponty_modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE users.business_entity(
	entity_id SERIAL PRIMARY KEY
)

CREATE TABLE users.roles(
	role_id SERIAL PRIMARY KEY,
	role_name VARCHAR(35) UNIQUE,
	role_type VARCHAR(15),
	role_modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE users.users_roles(
	usro_entity_id INTEGER REFERENCES users.users(user_entity_id),
	usro_role_id INTEGER REFERENCES users.roles(role_id) UNIQUE,
	usro_modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(usro_entity_id, usro_role_id)
)

CREATE TABLE users.users(
	user_entity_id INTEGER REFERENCES users.business_entity(entity_id),
	user_name VARCHAR(15) UNIQUE,
	user_password VARCHAR(256),
	user_first_name VARCHAR(50),
	user_last_name VARCHAR(50),
	user_birth_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	user_email_promotion INTEGER DEFAULT 0,
	user_demographic JSON,
	user_modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	user_photo VARCHAR(255),
	user_current_role INTEGER,
	PRIMARY KEY(user_entity_id)
)

ALTER TABLE users.users
ADD CONSTRAINT fk_user_current_role
FOREIGN KEY (user_current_role)
REFERENCES users.users_roles (usro_role_id);


CREATE TABLE users.users_address(
	etad_addr_id INTEGER REFERENCES master.address(addr_id),
	etad_modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	etad_entity_id INTEGER REFERENCES users.users(user_entity_id),
	etad_adty_id INTEGER REFERENCES master.address_type(adty_id),
	PRIMARY KEY(etad_addr_id)
)

CREATE TABLE users.users_phones(
	uspo_entity_id INTEGER REFERENCES users.users(user_entity_id),
	uspo_number VARCHAR(15),
	uspo_modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	uspo_ponty_code VARCHAR REFERENCES users.phone_number_type(ponty_code),
	PRIMARY KEY(uspo_entity_id, uspo_number)
)

CREATE TYPE users.degree AS ENUM ('Bachelor', 'Diploma')

CREATE TABLE users.users_education(
	usdu_id SERIAL,
	usdu_entity_id INTEGER REFERENCES users.users(user_entity_id),
	usdu_school VARCHAR(255),
	usdu_degree users.degree,
	usdu_field_study VARCHAR(125),
	usdu_graduate_year VARCHAR(4),
	usdu_start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	usdu_end_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	usdu_grade VARCHAR(5),
	usdu_activities VARCHAR(512),
	usdu_description VARCHAR(512),
	usdu_modified_data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(usdu_id, usdu_entity_id)
)

CREATE TYPE users.file_type AS ENUM ('jpg', 'pdf', 'word')

CREATE TABLE users.users_media(
	usme_id SERIAL,
	usme_entity_id INTEGER REFERENCES users.users(user_entity_id),
	usme_filelink VARCHAR(255),
	usme_filename VARCHAR(255),
	usme_filetype users.file_type,
	usme_note VARCHAR(55),
	usme_modified_data TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(usme_id, usme_entity_id)
)

CREATE TABLE users.users_email(
	pmail_entity_id INTEGER REFERENCES users.users(user_entity_id),
	pmail_id SERIAL,
	pmail_address VARCHAR(50),
	pmail_modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(pmail_entity_id, pmail_id)
)

CREATE TYPE users.status AS ENUM ('Active', 'NonActive')

CREATE TABLE users.users_license(
	usli_id SERIAL,
	usli_license_code VARCHAR(512) UNIQUE,
	usli_modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	usli_status users.status,
	usli_entity_id INTEGER REFERENCES users.users(user_entity_id),
	PRIMARY KEY(usli_id, usli_entity_id)
)

CREATE TABLE users.users_skill(
	uski_id SERIAL UNIQUE,
	uski_entity_id INTEGER REFERENCES users.users(user_entity_id),
	uski_modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	uski_skty_name VARCHAR REFERENCES master.skill_type(skty_name),
	PRIMARY KEY(uski_id, uski_entity_id)
)


CREATE TYPE users.employment_type AS ENUM ('fulltime', 'freelance');
CREATE TYPE users.current AS ENUM ('0', '1');
CREATE TYPE users.experience_type AS ENUM ('company', 'certified', 'voluntering', 'organization', 'reward');

CREATE TABLE users.users_experiences(
	usex_id SERIAL UNIQUE,
	usex_entity_id INTEGER REFERENCES users.users(user_entity_id),
	usex_title VARCHAR(255),
	usex_profile_headline VARCHAR(512),
	usex_employment_type users.employment_type,
	usex_company_name VARCHAR(255),
	usex_city_id INTEGER,
	usex_is_current users.current,
	usex_start_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	usex_end_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	usex_industry VARCHAR(15),
	usex_description VARCHAR(512),
	usex_experience_type users.experience_type,
	PRIMARY KEY(usex_id, usex_entity_id)
)

CREATE TABLE users.users_experiences_skill(
	uesk_usex_id INTEGER REFERENCES users.users_experiences(usex_id) UNIQUE,
	uesk_uski_id INTEGER REFERENCES users.users_skill(uski_id),
	PRIMARY KEY(uesk_usex_id, uesk_uski_id)
)
