create schema hr;
create type hr.emp_marital_status as enum ('M', 'S');
create type hr.emp_gender as enum ('M', 'F');
create type hr.emp_salaried_flag as enum ('0', '1');
create type hr.emp_current_flag as enum ('0', '1');
create type hr.emp_type as enum ('internal', 'outsource');

create table hr.employee(
	emp_entity_id integer primary key,
	emp_emp_number varchar(25) unique,
	emp_national_id varchar(25) unique,
	emp_birth_date date,
	emp_marital_status hr.emp_marital_status,
	emp_gender hr.emp_gender,
	emp_hire_date timestamptz,
	emp_salaried_flag hr.emp_salaried_flag,
	emp_vacation_hours smallint,
	emp_sickleave_hours smallint,
	emp_current_flag hr.emp_current_flag,
	emp_emp_entity_id integer,
	emp_modified_date timestamptz,
	emp_type hr.emp_type,
	constraint fk_emp_entity_id
	foreign key(emp_emp_entity_id)
	references hr.employee(emp_entity_id)
)

-- relasi ke users
alter table hr.employee
add constraint fk_user_entity_id
foreign key(emp_entity_id)
references users.users(user_entity_id);

create type hr.ephi_pay_frequence as enum ('1', '2');

create table hr.employee_pay_history(
	ephi_entity_id integer,
	ephi_rate_change_date timestamptz,
	ephi_rate_salary numeric,
	ephi_modified_date timestamptz,
	primary key (ephi_entity_id, ephi_rate_change_date)
)

create table hr.department(
	dept_id serial primary key,
	dept_name varchar(50) unique,
	dept_modified_date timestamptz
)

create table hr.employee_department_history(
	edhi_id serial,
	edhi_entity_id integer,
	edhi_start_date timestamptz,
	edhi_end_date timestamptz,
	edhi_modified_date timestamptz,
	edhi_dept_id integer,
	constraint fk_edhi_entity_id
	foreign key(edhi_entity_id)
	references hr.employee(emp_entity_id),
	constraint fk_edhi_dept_id
	foreign key (edhi_dept_id)
	references hr.department(dept_id),
	primary key(edhi_id, edhi_entity_id)
)

create type hr.ecco_status as enum ('onsite', 'online', 'hybrid');

create table hr.employee_client_contract(
	ecco_id serial,
	ecco_entity_id integer,
	ecco_contract_no varchar(55),
	ecco_start_date timestamptz,
	ecco_end_date timestamptz,
	ecco_notes varchar(512),
	ecco_modified_date timestamptz,
	ecco_media_link varchar(255),
	ecco_status hr.ecco_status,
	ecco_joty_id integer,
	ecco_account_manager integer,
	ecco_clit_id integer,
	constraint fk_ecco_entity_id
	foreign key (ecco_entity_id)
	references hr.employee(emp_entity_id),
	primary key(ecco_id, ecco_entity_id)
);

-- relasi ke master
alter table hr.employee_client_contract
add constraint fk_ecco_joty_id
foreign key (ecco_joty_id)
references master.job_type(joty_id);

-- relasi ke 
alter table hr.employee_client_contract
add constraint fk_ecco_account_manager
foreign key (ecco_account_manager)
references x(account_manager)

-- relasi job client
alter table hr.employee_client_contract
add constraint fk_ecco_clit_id
foreign key (ecco_clit_id)
references job.client(clit_id)