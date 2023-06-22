--signup internal (users)

CREATE OR REPLACE PROCEDURE users.signupinternal(
  username VARCHAR(15),
  password VARCHAR(256),
  user_first_name VARCHAR(256),
	user_last_name VARCHAR(256),
	user_birth_date date,
	user_email_promotion int,
	user_demographic json,
	user_photo VARCHAR(256),
  role INT,
  phone varchar(15),
  email varchar(50),
  phoneCode varchar(15)
)
LANGUAGE plpgsql
AS $$
DECLARE 
  entityId INT;
  userRole INT;
BEGIN
  INSERT INTO users.business_entity DEFAULT VALUES
  RETURNING entity_id INTO entityId;

  INSERT INTO users.users (user_entity_id, user_name, user_password,user_first_name,user_last_name,user_birth_date,user_email_promotion,user_demographic,user_photo)
  VALUES (entityId, username, password,user_first_name,user_last_name,user_birth_date,user_email_promotion,user_demographic,user_photo);

  INSERT INTO users.users_roles (usro_entity_id, usro_role_id)
  VALUES (entityId, role)
  RETURNING usro_role_id INTO userRole;

  UPDATE users.users
  SET user_current_role = userRole
  WHERE user_entity_id = entityId;

  INSERT INTO users.users_phones (uspo_entity_id, uspo_number, uspo_ponty_code)
  VALUES (entityId, phone, phoneCode);

  INSERT INTO users.users_email (pmail_entity_id, pmail_address)
  VALUES (entityId, email);

END;
$$;


--call signup(users)
CALL users.signupinternal('buat job tlnt2',
'password',
'saral',
'icus',
'1997-09-17',
1,
'{"City": "Medan","Province": "Sumatera Utara"}',
'https://i.ibb.co/y6pbmbZ/nael.jpg',
4,
'3232322',
'ananta@example.com','ID')


--call curriculum.program_entity
CALL curriculum.curriculumdata('[{
	"prog_title": "Programming Basics",
	"prog_headline": "Learn the fundamentals of programming",
	"prog_type": "bootcamp",
	"prog_learning_type": "offline",
	"prog_rating": 4.5,
	"prog_total_trainee": 15,
	"prog_image": "programming_basics.jpg",
	"prog_price": 99.99,
	"prog_language": "english",
	"prog_duration": 30,
	"prog_duration_type": "days",
	"prog_tag_skill": "programming, basics",
	"prog_city_id": 1,
	"prog_cate_id": 2,
	"prog_created_by": 1,
	"prog_status": "publish",
	"payment_type": "regular",
	"total_batch": 5,
	"pred_item_learning": ["Variables", "Loops", "Functions"],
	"pred_item_include": ["Video lessons", "Practice exercises", "Quizzes"],
	"pred_requirement": ["No prior programming experience required"],
	"pred_description": "This course teaches the basics of programming using a step-by-step approach.",
	"pred_target_level": "Beginner"
}]');

--call create batch
call bootcamp.createBatch('[{
							"batch_entity_id": 3,
							"batch_name": "batch#7",
							"batch_description": "batch#1description",
							"batch_start_date": "2023-06-06",
							"batch_end_date": "2024-06-06",
							"batch_status": "open",
							"batch_type": "offline",
							"batch_pic_id": 1
						  }]','[{
							"batr_trainee_entity_id": 5
						  },{
							"batr_trainee_entity_id": 4
						  },{
						  	"batr_status": "running",
							"batr_trainee_entity_id": 3
						  }]','[{
							"tpro_emp_entity_id": 1
						  },{
							"tpro_emp_entity_id": 2
						  }]')
 
 
--call close batch
call bootcamp.closeBatch('[{
						 	"batch_id": 40,
						 	"batch_status": "closed",
						 	"talent_status": "idle"
						 }]','[{
						 	"fullname": "Nama 3",
						 	"user_entity_id": 3,
						 	"technology": "PHP ini boss",
						 	"batch_id": 36,
						 	"batch_start_date": "2023-06-06",
						 	"batch_end_date": "2023-07-06",
						 	"trainer": 1,
						 	"skills": "Javascript, Nestjs, Nextjs"
						 },{
						 	"fullname": "Nama 4",
						 	"user_entity_id": 4,
						 	"technology": "PHP ini boss",
						 	"batch_id": 36,
						 	"batch_start_date": "2023-06-06",
						 	"batch_end_date": "2023-07-06",
						 	"trainer": 1,
						 	"skills": "Javascript, Nestjs, Nextjs"
						 }]')



------------------------------------------------------------------------------------------------------
-- SP create employee (dari internal)
DECLARE
    emp_entity_id int;
    emp_emp_number VARCHAR(25);
    emp_national_id VARCHAR(25);
    emp_birth_date date;
    emp_marital_status char;
    emp_gender char;
    emp_hire_date date;
	emp_end_contract date;
    emp_salaried_flag char;
    emp_vacation_hours smallint;
    emp_sickleave_hours smallint;
    emp_current_flag smallint;
    emp_type VARCHAR(15);
    emp_joro_id int;
    emp_emp_entity_id int;
    user_role int;
    edhi_dept_id int;
BEGIN
-- ambil dari JSON
SELECT
	(data->>'emp_entity_id')::int,
     data->>'emp_emp_number',
     data->>'emp_national_id',
    (data->>'emp_birth_date')::date,
     data->>'emp_marital_status',
     data->>'emp_gender',
    (data->>'emp_hire_date')::date,
	(data->>'emp_end_contract')::date,
     data->>'emp_salaried_flag',
    (data->>'emp_vacation_hours')::smallint,
    (data->>'emp_sickleave_hours')::smallint,
    (data->>'emp_current_flag')::smallint,
     data->>'emp_type',
    (data->>'emp_joro_id')::int,
    (data->>'emp_emp_entity_id')::int,
    (data->>'user_role')::int,
    (data->>'edhi_dept_id')::int
INTO
	emp_entity_id,
    emp_emp_number,
    emp_national_id,
    emp_birth_date,
    emp_marital_status,
    emp_gender,
    emp_hire_date,
	emp_end_contract,
    emp_salaried_flag,
    emp_vacation_hours,
    emp_sickleave_hours,
    emp_current_flag,
    emp_type,
    emp_joro_id,
    emp_emp_entity_id,
    user_role,
    edhi_dept_id;
	
-- insert ke employee
  INSERT INTO hr.employee (
	emp_entity_id,
	emp_emp_number,
	emp_national_id,
	emp_birth_date,
	emp_marital_status,
	emp_gender,
	emp_hire_date,
	emp_salaried_flag,
	emp_vacation_hours,
	emp_sickleave_hours,
	emp_current_flag,
	emp_type,
	emp_joro_id,
	emp_emp_entity_id) 
	VALUES (
	emp_entity_id,
	emp_emp_number,
	emp_national_id,
	emp_birth_date,
	emp_marital_status,
	emp_gender,
	emp_hire_date,
	emp_salaried_flag,
	emp_vacation_hours,
	emp_sickleave_hours,
	emp_current_flag,
	emp_type,
	emp_joro_id,
	emp_emp_entity_id
	);
	
-- update users roles di users
  UPDATE users.users_roles
  SET usro_role_id = user_role
  WHERE usro_entity_id= emp_entity_id;
  
--insert ke department history
INSERT INTO hr.employee_department_history(edhi_entity_id,edhi_start_date, edhi_end_date, edhi_dept_id)
values (emp_entity_id,emp_hire_date, emp_end_contract,edhi_dept_id);

END;

--call SP create Employee
CALL hr.createdataemployee('{
  "emp_entity_id": 1,
  "emp_emp_number": "codex2020213",
  "emp_national_id": "336229187651",
  "emp_birth_date": "1990-01-01",
  "emp_marital_status": "S",
  "emp_gender": "M",
  "emp_hire_date": "2023-01-01",
  "edhi_end_contract": "2023-12-31",
 "emp_salaried_flag": "Y",
  "emp_vacation_hours": 10,
  "emp_sickleave_hours": 5,
  "emp_current_flag": 1,
  "emp_type": "Employee",
  "emp_joro_id": 123,
  "emp_emp_entity_id": 456,
  "user_role": 789,
  "edhi_dept_id": 123
}');


--SP create employee dari bootcamp(talents)

CREATE OR REPLACE PROCEDURE hr.CCFromBootcamp (IN data JSON)
LANGUAGE plpgsql
AS $$
DECLARE
    emp_row hr.employee%ROWTYPE;
    ecco_row hr.employee_client_contract%ROWTYPE;
BEGIN
	INSERT INTO hr.employee (
		emp_entity_id,
		emp_emp_number,
		emp_birth_date,
		emp_type,
		emp_joro_id,
		emp_emp_entity_id
	) 
	SELECT 
		x.emp_entity_id,
		x.emp_emp_number,
		x.emp_birth_date,
		x.emp_type,
		x.emp_joro_id,
		x.emp_emp_entity_id
	FROM json_to_recordset(data) AS x (
		emp_entity_id INT,
		emp_emp_number varchar(25),
		emp_birth_date date,
		emp_type varchar(15),
		emp_joro_id int,
		emp_emp_entity_id int
	)
	RETURNING * INTO emp_row;
        
	-- update user roles in users table
	UPDATE users.users_roles
	SET usro_role_id = 5
	WHERE usro_entity_id = emp_row.emp_entity_id;
	
	-- insert contract into employee_client_contract
	INSERT INTO hr.employee_client_contract (
		ecco_entity_id,
		ecco_contract_no,
		ecco_contract_date,
		ecco_start_date,
		ecco_end_date,
		ecco_notes,
		ecco_media_link,
		ecco_joty_id,
		ecco_account_manager,
		ecco_clit_id,
		ecco_status
	) 
	SELECT 
		emp_row.emp_entity_id,
		x.ecco_contract_no,
		x.ecco_contract_date,
		x.ecco_start_date,
		x.ecco_end_date,
		x.ecco_notes,
		x.ecco_media_link,
		x.ecco_joty_id,
		x.ecco_account_manager,
		x.ecco_clit_id,
		x.ecco_status
	FROM json_to_recordset(data) AS x (
		ecco_entity_id int,
		ecco_contract_no varchar(55),
		ecco_contract_date date,
		ecco_start_date date,
		ecco_end_date date,
		ecco_notes varchar(512),
		ecco_media_link varchar(255),
		ecco_joty_id int,
		ecco_account_manager int,
		ecco_clit_id int,
		ecco_status varchar(15)
	)
	RETURNING * INTO ecco_row;

	-- insert department history
	INSERT INTO hr.employee_department_history (
		edhi_entity_id, 
		edhi_start_date, 
		edhi_end_date, 
		edhi_dept_id
	)
	SELECT
		emp_row.emp_entity_id, 
		ecco_row.ecco_start_date, 
		ecco_row.ecco_end_date, 
		x.edhi_dept_id
	FROM json_to_recordset(data) AS x (
		edhi_entity_id int, 
		edhi_start_date date, 
		edhi_end_date date, 
		edhi_dept_id int
	);

	-- update talent status
	UPDATE bootcamp.talents
	SET talent_status = x.talent_status
	FROM json_to_recordset(data) AS x (
		talent_status varchar(15)
	)
	WHERE talent_user_entity_id = emp_row.emp_entity_id;
END;
$$;


--SP create employee dari jobHire(talents)
CREATE OR REPLACE PROCEDURE hr.CCFromJobHire (IN data JSON)
LANGUAGE plpgsql
AS $$
DECLARE
    emp_row hr.employee%ROWTYPE;
    ecco_row hr.employee_client_contract%ROWTYPE;
BEGIN
	INSERT INTO hr.employee (
		emp_entity_id,
		emp_emp_number,
		emp_birth_date,
		emp_type,
		emp_joro_id,
		emp_emp_entity_id
	) 
	SELECT 
		x.emp_entity_id,
		x.emp_emp_number,
		x.emp_birth_date,
		x.emp_type,
		x.emp_joro_id,
		x.emp_emp_entity_id
	FROM json_to_recordset(data) AS x (
		emp_entity_id INT,
		emp_emp_number varchar(25),
		emp_birth_date date,
		emp_type varchar(15),
		emp_joro_id int,
		emp_emp_entity_id int
	)
	RETURNING * INTO emp_row;
        
	-- update user roles in users table
	UPDATE users.users_roles
	--5 karna dia outsource
	SET usro_role_id = 5
	WHERE usro_entity_id = emp_row.emp_entity_id;
	
	-- insert contract into employee_client_contract
	INSERT INTO hr.employee_client_contract (
		ecco_entity_id,
		ecco_contract_no,
		ecco_contract_date,
		ecco_start_date,
		ecco_end_date,
		ecco_notes,
		ecco_media_link,
		ecco_joty_id,
		ecco_account_manager,
		ecco_clit_id,
		ecco_status
	) 
	SELECT 
		emp_row.emp_entity_id,
		x.ecco_contract_no,
		x.ecco_contract_date,
		x.ecco_start_date,
		x.ecco_end_date,
		x.ecco_notes,
		x.ecco_media_link,
		x.ecco_joty_id,
		x.ecco_account_manager,
		x.ecco_clit_id,
		x.ecco_status
	FROM json_to_recordset(data) AS x (
		ecco_entity_id int,
		ecco_contract_no varchar(55),
		ecco_contract_date date,
		ecco_start_date date,
		ecco_end_date date,
		ecco_notes varchar(512),
		ecco_media_link varchar(255),
		ecco_joty_id int,
		ecco_account_manager int,
		ecco_clit_id int,
		ecco_status varchar(15)
	)
	RETURNING * INTO ecco_row;

	-- insert department history
	INSERT INTO hr.employee_department_history (
		edhi_entity_id, 
		edhi_start_date, 
		edhi_end_date, 
		edhi_dept_id
	)
	SELECT
		emp_row.emp_entity_id, 
		ecco_row.ecco_start_date, 
		ecco_row.ecco_end_date, 
		x.edhi_dept_id
	FROM json_to_recordset(data) AS x (
		edhi_entity_id int, 
		edhi_start_date date, 
		edhi_end_date date, 
		edhi_dept_id int
	);

	-- update talent status
	UPDATE job_hire.talent_apply
	SET taap_status = x.talent_status
	FROM json_to_recordset(data) AS x (
		talent_status varchar(15)
	)
	WHERE taap_user_entity_id = emp_row.emp_entity_id;
END;
$$;

