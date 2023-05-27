CREATE SCHEMA hr

CREATE TYPE hr.emp_marital_status AS ENUM ('M', 'S');

CREATE TYPE hr.emp_gender AS ENUM ('M', 'F');

CREATE TYPE hr.emp_salaried_flag AS ENUM ('0','1');

CREATE TYPE hr.emp_current_flag AS ENUM ('0','1');

CREATE TYPE hr.emp_type AS ENUM ('internal', 'outsource');

CREATE TABLE hr.employee(
	emp_entity_id serial PRIMARY KEY,
	emp_emp_number varchar(25) UNIQUE,
	emp_national_id varchar(25) UNIQUE,
	emp_birth_date date NOT NULL,
	emp_marital_status hr.emp_marital_status,
	emp_gender hr.emp_gender,
	emp_hire_date TIMESTAMPTZ,
	emp_salaried_flag hr.emp_salaried_flag,
	emp_vacation_hours SMALLINT,
	emp_sickleave_hours SMALLINT,
	emp_current_flag hr.emp_current_flag,
	emp_emp_entity_id INT,
	emp_modified_date TIMESTAMPTZ,
	emp_type hr.emp_type,
	emp_joro_id INT,
	CONSTRAINT fk_emp_entity_id
      FOREIGN KEY(emp_emp_entity_id) 
      REFERENCES hr.employee(emp_entity_id)
)

CREATE TYPE hr.ecco_status AS ENUM ('onsite', 'online', 'hybrid')

CREATE TABLE hr.employee_client_contract(
	ecco_id serial,
	ecco_entity_id INT,
	ecco_contract_no VARCHAR(55),
	ecco_contract_date TIMESTAMPTZ,
	ecco_start_date TIMESTAMPTZ,
	ecco_end_date TIMESTAMPTZ,
	ecco_notes VARCHAR(512),
	ecco_modified_date TIMESTAMPTZ,
	ecco_media_link VARCHAR(255),
	ecco_status hr.ecco_status,
	ecco_joty_id INT,
	ecco_account_manager INT,
	ecco_clit_id INT,
	CONSTRAINT fk_ecco_entity_id
      FOREIGN KEY(ecco_entity_id)
      REFERENCES hr.employee(emp_entity_id),
	PRIMARY KEY (ecco_id, ecco_entity_id)
)

CREATE TABLE hr.department(
	dept_id serial PRIMARY KEY,
	dept_name varchar(50) UNIQUE,
	dept_modified_date TIMESTAMPTZ
)

CREATE TABLE hr.employee_department_history(
	edhi_id serial,
	edhi_entity_id int,
	edhi_start_date TIMESTAMPTZ,
	edhi_end_date TIMESTAMPTZ,
	edhi_modified_date TIMESTAMPTZ,
	edhi_dept_id INT,
	CONSTRAINT fk_edhi_entity_id
      FOREIGN KEY(edhi_entity_id)
      REFERENCES hr.employee(emp_entity_id),
	CONSTRAINT fk_edhi_dept_id
      FOREIGN KEY(edhi_dept_id)
      REFERENCES hr.department(dept_id),
	PRIMARY KEY (edhi_id, edhi_entity_id)
)

CREATE TABLE hr.employee_pay_history(
	ephi_entity_id INT,
	ephi_rate_change_date TIMESTAMPTZ,
	ephi_rate_salary numeric,
	ephi_pay_frequence smallint,
	ephi_modified_date TIMESTAMPTZ,
	CONSTRAINT fk_ephi_entity_id
      FOREIGN KEY(ephi_entity_id)
      REFERENCES hr.employee(emp_entity_id),
	PRIMARY KEY (ephi_entity_id, ephi_rate_change_date)
)