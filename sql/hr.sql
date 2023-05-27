CREATE SCHEMA hr

CREATE TABLE hr.employee(
	emp_entity_id serial PRIMARY KEY,
	emp_emp_number varchar(25) UNIQUE,
	emp_national_id varchar(25) UNIQUE,
	emp_birth_date date NOT NULL,
	emp_marital_status char(1) NOT NULL,
	emp_gender char(1) NOT NULL,
	emp_hire_date TIMESTAMPTZ NOT NULL,
	emp_salaried_flag char(1) NOT NULL,
	emp_vacation_hours SMALLINT,
	emp_sickleave_hours SMALLINT,
	emp_current_flag char(1),
	emp_emp_entity_id INT,
	emp_modified_date TIMESTAMPTZ,
	emp_type varchar(15),
	emp_joro_id INT,
	CONSTRAINT fk_emp_entity_id
      FOREIGN KEY(emp_emp_entity_id) 
      REFERENCES hr.employee(emp_entity_id)
)

CREATE TABLE hr.employee_client_contract(
	ecco_id serial PRIMARY KEY,
	ecco_entity_id INT,
	ecco_contract_no VARCHAR(55),
	ecco_contract_date TIMESTAMPTZ,
	ecco_start_date TIMESTAMPTZ,
	ecco_end_date TIMESTAMPTZ,
	ecco_notes VARCHAR(512),
	ecco_modified_date TIMESTAMPTZ,
	ecco_media_link VARCHAR(255),
	ecco_status VARCHAR(15),
	ecco_joty_id INT,
	ecco_account_manager INT,
	ecco_clit_id INT,
	CONSTRAINT fk_ecco_entity_id
      FOREIGN KEY(ecco_entity_id)
      REFERENCES hr.employee(emp_entity_id)
)

CREATE TABLE hr.department(
	dept_id serial PRIMARY KEY,
	dept_name varchar(50) UNIQUE,
	dept_modified_date TIMESTAMPTZ
)

CREATE TABLE hr.employee_department_history(
	edhi_id serial PRIMARY KEY,
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
      REFERENCES hr.department(dept_id)
)

CREATE TABLE hr.employee_pay_history(
	ephi_entity_id INT,
	ephi_rate_change_date TIMESTAMPTZ PRIMARY KEY,
	ephi_rate_salary numeric,
	ephi_pay_frequence smallint,
	ephi_modified_date TIMESTAMPTZ,
	CONSTRAINT fk_ephi_entity_id
      FOREIGN KEY(ephi_entity_id)
      REFERENCES hr.employee(emp_entity_id)
)