create schema hr;

create table hr.employee(
	emp_entity_id integer primary key not null,
	emp_emp_number varchar(25) unique,
	emp_national_id varchar(25) unique,
	emp_birth_date date not null,
	emp_marital_status varchar(15) check (emp_marital_status in('M', 'S')),
	emp_gender varchar(15) check (emp_gender in ('M', 'F')),
	emp_hire_date timestamp with time zone,
	emp_salaried_flag varchar(15) check (emp_salaried_flag in ('0', '1')),
	emp_vacation_hours smallint,
	emp_sickleave_hours smallint,
	emp_current_flag varchar(15) check(emp_current_flag in ('0', '1')),
	emp_emp_entity_id integer,
	emp_modified_date timestamp with time zone,
	emp_type varchar(15) check(emp_type in ('internal', 'outsource')),
	constraint fk_emp_entity_id
	foreign key(emp_emp_entity_id)
	references hr.employee(emp_entity_id)
)

-- relasi ke users
alter table hr.employee
add constraint fk_user_entity_id
foreign key(emp_entity_id)
references users.users(user_entity_id);

create table hr.employee_pay_history(
	ephi_entity_id integer not null,
	ephi_rate_change_date timestamp with time zone not null,
	ephi_rate_salary numeric,
	ephi_pay_frequence varchar(15) check (ephi_pay_frequence in ('1', '2')),
	ephi_modified_date timestamp with time zone,
	primary key (ephi_entity_id, ephi_rate_change_date)
)

create table hr.department(
	dept_id serial primary key,
	dept_name varchar(50) unique,
	dept_modified_date timestamp with time zone
)

create table hr.employee_department_history(
	edhi_id serial not null,
	edhi_entity_id integer not null,
	edhi_start_date timestamp with time zone,
	edhi_end_date timestamp with time zone,
	edhi_modified_date timestamp with time zone,
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
	ecco_id serial not null,
	ecco_entity_id integer not null,
	ecco_contract_no varchar(55),
	ecco_contract_date timestamp with time zone,
	ecco_start_date timestamp with time zone,
	ecco_end_date timestamp with time zone,
	ecco_notes varchar(512),
	ecco_modified_date timestamp with time zone,
	ecco_media_link varchar(255),
	ecco_status varchar(15) check (ecco_status in ('onsite', 'online', 'hybrid')) ,
	ecco_joty_id integer,
	ecco_account_manager integer,
	ecco_clit_id integer,
	constraint fk_ecco_entity_id
	foreign key (ecco_entity_id)
	references hr.employee(emp_entity_id),
	constraint fk_ecco_account_manager
	foreign key (ecco_account_manager)
	references hr.employee(emp_joro_id),
	primary key(ecco_id, ecco_entity_id)
);

-- relasi ke master
alter table hr.employee_client_contract
add constraint fk_ecco_joty_id
foreign key (ecco_joty_id)
references master.job_type(joty_id);

-- relasi job client
alter table hr.employee_client_contract
add constraint fk_ecco_clit_id
foreign key (ecco_clit_id)
references job.client(clit_id)
