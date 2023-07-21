--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: bootcamp; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA bootcamp;


ALTER SCHEMA bootcamp OWNER TO postgres;

--
-- Name: curriculum; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA curriculum;


ALTER SCHEMA curriculum OWNER TO postgres;

--
-- Name: hr; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA hr;


ALTER SCHEMA hr OWNER TO postgres;

--
-- Name: job_hire; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA job_hire;


ALTER SCHEMA job_hire OWNER TO postgres;

--
-- Name: master; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA master;


ALTER SCHEMA master OWNER TO postgres;

--
-- Name: payment; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA payment;


ALTER SCHEMA payment OWNER TO postgres;

--
-- Name: sales; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA sales;


ALTER SCHEMA sales OWNER TO postgres;

--
-- Name: users; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA users;


ALTER SCHEMA users OWNER TO postgres;

--
-- Name: roac_display; Type: TYPE; Schema: master; Owner: postgres
--

CREATE TYPE master.roac_display AS ENUM (
    '0',
    '1'
);


ALTER TYPE master.roac_display OWNER TO postgres;

--
-- Name: closebatch(json, json); Type: PROCEDURE; Schema: bootcamp; Owner: postgres
--

CREATE PROCEDURE bootcamp.closebatch(IN data json, IN data2 json)
    LANGUAGE plpgsql
    AS $$
declare
	data_store record;
begin
	select * from json_to_recordset(data) as x(
		batch_id int,
		batch_status varchar(15),
		talent_status varchar(20)
	)
	into data_store;
	
	update bootcamp.batch set
		batch_status= data_store.batch_status
	where batch_id = data_store.batch_id;
	
	insert into bootcamp.talents(
		talent_fullname,
		talent_user_entity_id,
		talent_technology,
		talent_batch_id,
		talent_start_date,
		talent_end_date,
		talent_trainer,
		talent_skill,
		talent_status
	)
	select
		y.fullname,
		y.user_entity_id,
		y.technology,
		data_store.batch_id,
		y.batch_start_date,
		y.batch_end_date,
		y.trainer,
		y.skills,
		data_store.talent_status
		
	from json_to_recordset(data2) as y(
		fullname varchar(100),
		user_entity_id integer,
		technology varchar(256),
		batch_start_date date,
		batch_end_date date,
		trainer varchar(30),
		skills text
	);
end;
$$;


ALTER PROCEDURE bootcamp.closebatch(IN data json, IN data2 json) OWNER TO postgres;

--
-- Name: createbatch(json, json, json); Type: PROCEDURE; Schema: bootcamp; Owner: postgres
--

CREATE PROCEDURE bootcamp.createbatch(IN data json, IN data2 json, IN data3 json)
    LANGUAGE plpgsql
    AS $$
declare
	batchid int;
	instructor record;
	prog_id int;
begin
	with result as(
	insert into bootcamp.batch (
		batch_entity_id,
		batch_name,
		batch_description,
		batch_start_date,
		batch_end_date,
		batch_status,
		batch_type,
		batch_pic_id
	)
	select
		x.batch_entity_id,
		x.batch_name,
		x.batch_description,
		x.batch_start_date,
		x.batch_end_date,
		x.batch_status,
		x.batch_type,
		x.batch_pic_id
		
	from json_to_recordset(data) as x(
		batch_entity_id int,
		batch_name varchar(15),
		batch_description varchar(125),
		batch_start_date date,
		batch_end_date date,
		batch_status varchar(15),
		batch_type varchar(15),
		batch_pic_id int
	)
	returning batch_id,batch_entity_id
	)
	select batch_id,batch_entity_id into batchid,prog_id from result;
	
	insert into bootcamp.batch_trainee (
		batr_trainee_entity_id,
		batr_batch_id
	)
	select 
		y.user_id,
		batchid
		
	from json_to_recordset(data2) as y(
		user_id int
	);
	
	insert into bootcamp.trainer_programs (
		batch_id,
		tpro_entity_id,
		tpro_emp_entity_id
	)
	select 
		batchid,
		prog_id,
		z.tpro_emp_entity_id
	from json_to_recordset(data3) as z(
		tpro_emp_entity_id int
	);

end;
$$;


ALTER PROCEDURE bootcamp.createbatch(IN data json, IN data2 json, IN data3 json) OWNER TO postgres;

--
-- Name: createevaluation(integer, json); Type: PROCEDURE; Schema: bootcamp; Owner: postgres
--

CREATE PROCEDURE bootcamp.createevaluation(IN totalscore integer, IN data2 json)
    LANGUAGE plpgsql
    AS $$
declare
	trainee_entity_id int;
	batch_id int;
begin
	with result as (
	insert into bootcamp.batch_trainee_evaluation(
		btev_type,
		btev_header,
		btev_section,
		btev_skill,
		btev_week,
		btev_skor,
		btev_note,
		btev_modified_date,
		btev_batch_id,
		btev_trainee_entity_id
	)
	select 
		x.btev_type,
		x.btev_header,
		x.btev_section,
		x.btev_skill,
		x.btev_week,
		x.btev_skor,
		x.btev_note,
		x.btev_modified_date,
		x.btev_batch_id,
		x.btev_trainee_entity_id
	from json_to_recordset(data2) as x(
		btev_type varchar(15),
		btev_header varchar(256),
		btev_section varchar(256),
		btev_skill varchar(256),
		btev_week int,
		btev_skor int,
		btev_note varchar(256),
		btev_modified_date timestamptz,
		btev_batch_id int,
		btev_trainee_entity_id int
	) 
	returning btev_batch_id,btev_trainee_entity_id 
	)
	select btev_batch_id,btev_trainee_entity_id 
	into batch_id,trainee_entity_id from result;
	
	update bootcamp.batch_trainee set batr_total_score = totalscore
	where batr_trainee_entity_id = trainee_entity_id
	and batr_batch_id = batch_id;
end;
$$;


ALTER PROCEDURE bootcamp.createevaluation(IN totalscore integer, IN data2 json) OWNER TO postgres;

--
-- Name: createevaluation(integer, character varying, json); Type: PROCEDURE; Schema: bootcamp; Owner: postgres
--

CREATE PROCEDURE bootcamp.createevaluation(IN score integer, IN status character varying, IN data2 json)
    LANGUAGE plpgsql
    AS $$
declare
	trainee_entity_id int;
	batch_id int;
	total_score int;
begin
	with result as (
	insert into bootcamp.batch_trainee_evaluation(
		btev_type,
		btev_header,
		btev_section,
		btev_skill,
		btev_week,
		btev_skor,
		btev_note,
		btev_batch_id,
		btev_trainee_entity_id
	)
	select 
		x.btev_type,
		x.btev_header,
		x.btev_section,
		x.btev_skill,
		x.btev_week,
		x.btev_skor,
		x.btev_note,
		x.btev_batch_id,
		x.btev_trainee_entity_id
	from json_to_recordset(data2) as x(
		btev_type varchar(15),
		btev_header varchar(256),
		btev_section varchar(256),
		btev_skill varchar(256),
		btev_week int,
		btev_skor int,
		btev_note varchar(256),
		btev_batch_id int,
		btev_trainee_entity_id int
	) 
	returning btev_batch_id,btev_trainee_entity_id 
	)
	select btev_batch_id,btev_trainee_entity_id 
	into batch_id,trainee_entity_id from result;
	
	UPDATE bootcamp.batch_trainee
	SET batr_total_score = score,batr_status = status,batr_modified_date = now()
	WHERE batr_trainee_entity_id = trainee_entity_id
  	AND batr_batch_id = batch_id;
end;
$$;


ALTER PROCEDURE bootcamp.createevaluation(IN score integer, IN status character varying, IN data2 json) OWNER TO postgres;

--
-- Name: createprogramapply(json, json); Type: PROCEDURE; Schema: bootcamp; Owner: postgres
--

CREATE PROCEDURE bootcamp.createprogramapply(IN data json, IN data2 json)
    LANGUAGE plpgsql
    AS $$
declare
	userEntityId int;
	progEntityId int;
	
begin
	with result as(
	insert into bootcamp.program_apply(
		prap_user_entity_id,
		prap_prog_entity_id
	)
	select
		x.prap_user_entity_id,
		x.prap_prog_entity_id
	
	from json_to_recordset(data) as x(
		prap_user_entity_id int,
		prap_prog_entity_id int
	)
	returning prap_user_entity_id,prap_prog_entity_id
	)
	select prap_user_entity_id,prap_prog_entity_id into userEntityId,progEntityId from result;
	
	insert into bootcamp.program_apply_progress(
		parog_user_entity_id,
		parog_prog_entity_id,
		parog_progress_name,
		parog_status
	)
	select
		userEntityId,
		progEntityId,
		y.parog_progress_name,
		y.parog_status
		
	from json_to_recordset(data2) as y(
		parog_progress_name VARCHAR(15),
		parog_status VARCHAR(15)
	);
end;
$$;


ALTER PROCEDURE bootcamp.createprogramapply(IN data json, IN data2 json) OWNER TO postgres;

--
-- Name: updatebatch(integer, json, json, json, json); Type: PROCEDURE; Schema: bootcamp; Owner: postgres
--

CREATE PROCEDURE bootcamp.updatebatch(IN batchid integer, IN batch json, IN added json, IN deleted json, IN trainer json)
    LANGUAGE plpgsql
    AS $$
declare 
	batchdata record;
	addeddata record;
	deleteddata record;
begin
	select * from json_to_recordset(batch) as x(
		batch_entity_id int,
		batch_name varchar(15),
		batch_description varchar(125),
		batch_start_date date,
		batch_end_date date,
		batch_type varchar(15)
	)
	into batchdata;
	
	select * from json_to_recordset(deleted) as y(
		batr_trainee_entity_id int
	)
	into deleteddata;
	
	update bootcamp.batch
	set	batch_entity_id = batchdata.batch_entity_id,
		batch_name = batchdata.batch_name,
		batch_description = batchdata.batch_description,
		batch_start_date = batchdata.batch_start_date,
		batch_end_date = batchdata.batch_end_date,
		batch_type = batchdata.batch_type
	where batch_id = batchid;
	
	INSERT INTO bootcamp.batch_trainee (
		batr_batch_id, 
		batr_trainee_entity_id
		)
	select 
		batchid, 
		user_id
	from json_to_recordset(added)x (
		user_id integer
		);
		
	delete from bootcamp.batch_trainee
	where batr_batch_id = batchid and batr_trainee_entity_id IN 
	(SELECT z.user_id FROM json_to_recordset(deleted)as z (user_id integer));
	
	delete from bootcamp.trainer_programs
	where batch_id = batchid;
	
	insert into bootcamp.trainer_programs(
		batch_id,
		tpro_entity_id,
		tpro_emp_entity_id
	)
	select
		batchid,
		batchdata.batch_entity_id,
		z.tpro_emp_entity_id
	from json_to_recordset(trainer) as z(
		tpro_emp_entity_id int
	);
end;
$$;


ALTER PROCEDURE bootcamp.updatebatch(IN batchid integer, IN batch json, IN added json, IN deleted json, IN trainer json) OWNER TO postgres;

--
-- Name: updaterunningbatch(json, json, json); Type: PROCEDURE; Schema: bootcamp; Owner: postgres
--

CREATE PROCEDURE bootcamp.updaterunningbatch(IN data json, IN data2 json, IN data3 json)
    LANGUAGE plpgsql
    AS $$
declare
	data_store record;

begin
	select * from json_to_recordset(data) as x(
		batch_id int,
		batch_entity_id int
	)
	into data_store;
	
	update bootcamp.batch set
		batch_status = 'running',
		batch_start_date = CURRENT_DATE
	where batch_id = data_store.batch_id;
	
	FOR i IN 0..json_array_length(data2)-1 LOOP	
	update bootcamp.batch_trainee set
		batr_status = 'running'
	where batr_batch_id = data_store.batch_id
	AND batr_trainee_entity_id = (data2->i->>'batr_trainee_entity_id')::integer  ;
	END LOOP;
	
	FOR i IN 0..json_array_length(data3)-1 LOOP
	update bootcamp.program_apply_progress set
		parog_status = 'closed',
		parog_progress_name = 'contract legal'
	where parog_prog_entity_id = data_store.batch_entity_id
	AND parog_user_entity_id = (data3->i->>'parog_user_entity_id')::integer;
	END LOOP;

end;
$$;


ALTER PROCEDURE bootcamp.updaterunningbatch(IN data json, IN data2 json, IN data3 json) OWNER TO postgres;

--
-- Name: program_procedure(json); Type: PROCEDURE; Schema: curriculum; Owner: postgres
--

CREATE PROCEDURE curriculum.program_procedure(IN data json)
    LANGUAGE plpgsql
    AS $$

DECLARE 
	curr_id int;
BEGIN
	WITH results AS (
		insert into users.business_entity(entity_id) values (nextval('users.business_entity_entity_id_seq'))
		RETURNING entity_id
	)
	SELECT entity_id INTO curr_id FROM results;
	
	INSERT INTO curriculum.program_entity (
		prog_entity_id,
		prog_title,
		prog_headline,
		prog_type,
		prog_learning_type,
		prog_total_trainee,
		prog_image,
		prog_price,
		prog_language,
		prog_duration,
		prog_duration_type,
		prog_tag_skill,
		prog_city_id,
		prog_cate_id,
		prog_created_by,
		prog_status,
		payment_type,
		total_batch,
		prog_score,
		prog_curr_regis
	)
	SELECT
			curr_id,
			x.prog_title,
			x.prog_headline,
			x.prog_type,
			x.prog_learning_type,
			x.prog_total_trainee,
			x.prog_image,
			x.prog_price,
			x.prog_language,
			x.prog_duration,
			x.prog_duration_type,
			x.prog_tag_skill,
			x.prog_city_id,
			x.prog_cate_id,
			x.prog_created_by,
			x.prog_status,
			x.payment_type,
			x.total_batch,
			x.prog_score,
			x.prog_curr_regis
		FROM json_to_recordset(data) AS x (
			prog_title varchar,
			prog_headline varchar,
			prog_type varchar,
			prog_learning_type varchar,
			prog_rating numeric,
			prog_total_trainee int,
			prog_image varchar,
			prog_price numeric,
			prog_language varchar,
			prog_duration int,
			prog_duration_type varchar,
			prog_tag_skill varchar,
			prog_city_id int,
			prog_cate_id int,
			prog_created_by int,
			prog_status varchar,
			payment_type varchar,
			total_batch int,
			prog_score int,
			prog_curr_regis varchar
		);

	
	INSERT INTO curriculum.program_entity_description (
		pred_prog_entity_id,
		pred_item_learning,
		pred_item_include,
		pred_requirement,
		pred_description,
		pred_target_level
	)
	SELECT
		curr_id,
		x.pred_item_learning,
		x.pred_item_include,
		x.pred_requirement,
		x.pred_description,
		x.pred_target_level
	FROM json_to_recordset(data) AS x (
		pred_item_learning json,
		pred_item_include json,
		pred_requirement json,
		pred_description json,
		pred_target_level json
	);
END;
$$;


ALTER PROCEDURE curriculum.program_procedure(IN data json) OWNER TO postgres;

--
-- Name: section_add(json); Type: PROCEDURE; Schema: curriculum; Owner: postgres
--

CREATE PROCEDURE curriculum.section_add(IN data json)
    LANGUAGE plpgsql
    AS $$
DECLARE
	curr_id INT;
BEGIN
	SELECT entity_id INTO curr_id FROM users.business_entity ORDER BY entity_id DESC LIMIT 1;
        INSERT INTO curriculum.sections (
            sect_prog_entity_id,
            sect_title,
            sect_description
        )
        SELECT
            curr_id,
            x.sect_title,
            x.description
        FROM json_to_recordset(data) AS x (
            sect_title VARCHAR,
            description VARCHAR
		);
		UPDATE curriculum.sections
		SET
			sect_total_section = (
				SELECT COUNT(*)
				FROM curriculum.sections
				where sect_prog_entity_id = curr_id
			)
		WHERE sect_prog_entity_id = curr_id;
END;
$$;


ALTER PROCEDURE curriculum.section_add(IN data json) OWNER TO postgres;

--
-- Name: section_detail_gas(integer, json); Type: PROCEDURE; Schema: curriculum; Owner: postgres
--

CREATE PROCEDURE curriculum.section_detail_gas(IN id integer, IN data json)
    LANGUAGE plpgsql
    AS $$

DECLARE
	curr_id INT;
	secd_sect_id INT;
    sedm_secd_id INT;
BEGIN
	SELECT sect_id INTO curr_id FROM curriculum.sections WHERE sect_id=id;

        WITH secd AS (
        INSERT INTO curriculum.section_detail (
            secd_title,
            secd_preview,
            secd_note,
            secd_minute,
            secd_sect_id
        )
        SELECT
            x.secd_title,
            x.preview,
            x.note,
            x.minutes,
            curr_id
        FROM json_to_recordset(data) AS x (
            secd_title VARCHAR,
            preview CHAR,
            note VARCHAR,
            minutes INT
        )
        RETURNING secd_id
    )
    SELECT secd_id INTO sedm_secd_id FROM secd;
    
    INSERT INTO curriculum.section_detail_material (
        sedm_filename,
        sedm_filesize,
        sedm_filetype,
		sedm_filelink,
        sedm_secd_id
    )
    SELECT
        x.filename,
        x.filesize,
        x.filetype,
		x.filelink,
        sedm_secd_id
    FROM json_to_recordset(data) AS x (
        filename VARCHAR,
        filesize INT,
        filetype VARCHAR,
		filelink VARCHAR
    );
	
	UPDATE curriculum.sections AS pe
	SET sect_total_lecture = (
		SELECT COUNT(*)
		FROM curriculum.section_detail
		WHERE section_detail.secd_sect_id = curr_id
	),
	sect_total_minute = (
		SELECT SUM(secd_minute)
		FROM curriculum.section_detail
		WHERE section_detail.secd_sect_id = curr_id
	)
	WHERE sect_id = curr_id;
END;
$$;


ALTER PROCEDURE curriculum.section_detail_gas(IN id integer, IN data json) OWNER TO postgres;

--
-- Name: update_program(integer, json); Type: PROCEDURE; Schema: curriculum; Owner: postgres
--

CREATE PROCEDURE curriculum.update_program(IN id integer, IN data json)
    LANGUAGE plpgsql
    AS $$
DECLARE 
    curr_id int;
BEGIN
    SELECT prog_entity_id INTO curr_id FROM curriculum.program_entity
	WHERE prog_entity_id=id;
    
    -- Update program_entity table
    UPDATE curriculum.program_entity AS pe
    SET
        prog_title = x.title,
        prog_headline = x.headline,
        prog_type = x.prog_type,
        prog_learning_type = x.learning_type,
        prog_total_trainee = x.total_trainee,
        prog_image = x.image,
		prog_best_seller = x.best_seller,
        prog_price = x.price,
        prog_language = x.languages,
        prog_duration = x.duration,
        prog_duration_type = x.duration_type,
        prog_tag_skill = x.tag_skill,
        prog_city_id = x.city_id,
        prog_cate_id = x.cate_id,
        prog_created_by = x.created_by,
        prog_status = x.status,
        payment_type = x.payment_type,
        total_batch = x.total_batch,
        prog_score = x.score
	FROM json_to_recordset (data) AS x(
		title varchar,
        headline varchar,
        prog_type varchar,
        learning_type varchar,
        total_trainee int,
        image varchar,
		best_seller char,
        price numeric,
        languages varchar,
        duration int,
        duration_type varchar,
        tag_skill varchar,
        city_id int,
        cate_id int,
        created_by int,
        status varchar,
        payment_type varchar,
        total_batch int,
        score int
	)
    WHERE prog_entity_id = curr_id;
    
    -- Update program_entity_description table
    UPDATE curriculum.program_entity_description AS ped
    SET
        pred_item_learning = x.pred_item_learning,
        pred_item_include = x.item_include,
        pred_requirement = x.requirement,
        pred_description = x.description,
        pred_target_level = x.target_level
	FROM json_to_recordset (data) as x(
		pred_item_learning json,
		item_include json,
		requirement json,
		description json,
		target_level json
	)
    WHERE pred_prog_entity_id = curr_id;
END;
$$;


ALTER PROCEDURE curriculum.update_program(IN id integer, IN data json) OWNER TO postgres;

--
-- Name: update_section(integer, json); Type: PROCEDURE; Schema: curriculum; Owner: postgres
--

CREATE PROCEDURE curriculum.update_section(IN id integer, IN data json)
    LANGUAGE plpgsql
    AS $$
DECLARE 
    curr_id int;
BEGIN

	SELECT prog_entity_id INTO curr_id FROM curriculum.program_entity
	WHERE prog_entity_id=id;
	
	-- Update sections table
    UPDATE curriculum.sections AS se
    SET
        sect_title = x.sect_title,
        sect_description = x.description,
        sect_total_section = x.total_section,
        sect_total_lecture = x.total_lecture,
        sect_total_minute = x.total_minute
	FROM json_to_recordset(data)as x(
		sect_title varchar,
		description varchar,
		total_section int,
		total_lecture int,
		total_minute int
	);
END;
$$;


ALTER PROCEDURE curriculum.update_section(IN id integer, IN data json) OWNER TO postgres;

--
-- Name: update_section_detail(integer, json); Type: PROCEDURE; Schema: curriculum; Owner: postgres
--

CREATE PROCEDURE curriculum.update_section_detail(IN id integer, IN data json)
    LANGUAGE plpgsql
    AS $$
DECLARE
	curr_id INT;
BEGIN
SELECT prog_entity_id INTO curr_id FROM curriculum.program_entity
	WHERE prog_entity_id=id;
UPDATE curriculum.section_detail AS sed
    SET
        secd_title = x.secd_title,
        secd_preview = x.preview,
        secd_note = x.note,
        secd_minute = x.minutes
	FROM json_to_recordset (data) x (
		secd_title varchar,
		preview varchar,
		note varchar,
		minutes int
	)
    WHERE secd_sect_id IN (
        SELECT sect_id FROM curriculum.sections WHERE sect_prog_entity_id = curr_id
    );
    
    -- Update section_detail_material table
    UPDATE curriculum.section_detail_material AS secdm
    SET
        sedm_filename = x.filename,
        sedm_filesize = x.filesize,
        sedm_filetype = x.filetype,
        sedm_filelink = x.filelink
	FROM json_to_recordset(data) as x(
		filename varchar,
		filesize int,
		filetype varchar,
		filelink varchar
	)
    WHERE sedm_secd_id IN (
        SELECT secd_id FROM curriculum.section_detail WHERE secd_sect_id IN (
            SELECT sect_id FROM curriculum.sections WHERE sect_prog_entity_id = curr_id
        )
    );
END;
$$;


ALTER PROCEDURE curriculum.update_section_detail(IN id integer, IN data json) OWNER TO postgres;

--
-- Name: ccfrombootcamp(json); Type: PROCEDURE; Schema: hr; Owner: postgres
--

CREATE PROCEDURE hr.ccfrombootcamp(IN data json)
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


ALTER PROCEDURE hr.ccfrombootcamp(IN data json) OWNER TO postgres;

--
-- Name: createdataemployee(json); Type: PROCEDURE; Schema: hr; Owner: postgres
--

CREATE PROCEDURE hr.createdataemployee(IN data json)
    LANGUAGE plpgsql
    AS $$
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

END
$$;


ALTER PROCEDURE hr.createdataemployee(IN data json) OWNER TO postgres;

--
-- Name: updateemp(json); Type: PROCEDURE; Schema: hr; Owner: postgres
--

CREATE PROCEDURE hr.updateemp(IN data json)
    LANGUAGE plpgsql
    AS $$
 DECLARE
        data_emp_entity_id int := (data->>'emp_entity_id')::int;
        data_emp_hire_date date := (data->>'emp_hire_date')::date;
		data_emp_end_contract date := (data->>'edhi_end_date')::date;
        data_emp_type VARCHAR(15) := data->>'emp_type';
        data_emp_joro_id int := (data->>'emp_joro_id')::int;
        data_edhi_dept_id int := (data->>'edhi_dept_id')::int;
    BEGIN
        -- Update hr.employee table
        UPDATE hr.employee
        SET 
            emp_hire_date = data_emp_hire_date,
            emp_type = data_emp_type,
            emp_joro_id = data_emp_joro_id 
        WHERE
            emp_entity_id = data_emp_entity_id;
  
        -- Update hr.employee_department_history table
        UPDATE hr.employee_department_history
		SET 
		edhi_start_date = data_emp_hire_date, 
		edhi_end_date = data_emp_end_contract,
		edhi_dept_id = data_edhi_dept_id
		WHERE
			edhi_entity_id = data_emp_entity_id;
    END;
	
$$;


ALTER PROCEDURE hr.updateemp(IN data json) OWNER TO postgres;

--
-- Name: createclient(json, json); Type: PROCEDURE; Schema: job_hire; Owner: postgres
--

CREATE PROCEDURE job_hire.createclient(IN data json, IN data1 json)
    LANGUAGE plpgsql
    AS $$
declare
 address_id INT;
begin
 WITH result AS (
	INSERT INTO master.address (
		addr_line1,
		addr_line2,
		addr_postal_code,
		addr_spatial_location,
		addr_city_id
	)
	 SELECT
	 	x.addr_line1,
		x.addr_line2,
		x.addr_postal_code,
		x.addr_spatial_location,
		x.addr_city_id
	 FROM json_to_recordset(data) AS x(
	 	addr_line1 varchar(255),
		addr_line2 varchar(255),
		addr_postal_code varchar(10),
		addr_spatial_location json,
		addr_city_id INT
	 )
	RETURNING addr_id
 )
 SELECT addr_id INTO address_id FROM result;
 
 INSERT INTO job_hire.client (
  	 clit_name,
	 clit_about,
	 clit_addr_id,
	 clit_emra_id,
	 clit_indu_code
 )
 SELECT 
 	 x.clit_name,
	 x.clit_about,
	 address_id,
	 x.clit_emra_id,
	 x.clit_indu_code
 FROM json_to_recordset(data1) AS x(
	 clit_name varchar(256),
	 clit_about varchar(512),
	 clit_addr_id int,
	 clit_emra_id int,
	 clit_indu_code varchar(15)
 );
end;
$$;


ALTER PROCEDURE job_hire.createclient(IN data json, IN data1 json) OWNER TO postgres;

--
-- Name: createpostingjob(json, json, json); Type: PROCEDURE; Schema: job_hire; Owner: postgres
--

CREATE PROCEDURE job_hire.createpostingjob(IN data json, IN data1 json, IN data2 json)
    LANGUAGE plpgsql
    AS $$
DECLARE
	bus_entity_id INT;
	
BEGIN
	WITH result AS (
		INSERT INTO users.business_entity (entity_id) VALUES (DEFAULT)
		RETURNING entity_id
	)
	SELECT entity_id INTO bus_entity_id FROM result;

	INSERT INTO job_hire.job_post (
		jopo_entity_id,
		jopo_number,
		jopo_title,
		jopo_start_date,
		jopo_end_date,
		jopo_min_salary,
		jopo_max_salary,
		jopo_min_experience,
		jopo_max_experience,
		jopo_primary_skill,
		jopo_secondary_skill,
		jopo_publish_date,
		jopo_emp_entity_id,
		jopo_clit_id,
		jopo_joro_id,
		jopo_joty_id,
-- 		jopo_joca_id,
		jopo_addr_id,
		jopo_work_code,
		jopo_edu_code,
		jopo_status,
		jopo_open
	)
	SELECT
		bus_entity_id,
		x.jopo_number,
		x.jopo_title,
		x.jopo_start_date,
		x.jopo_end_date,
		x.jopo_min_salary,
		x.jopo_max_salary,
		x.jopo_min_experience,
		x.jopo_max_experience,
		x.jopo_primary_skill,
		x.jopo_secondary_skill,
		CASE WHEN x.jopo_status = 'publish' THEN CURRENT_DATE ELSE NULL END,
		x.jopo_emp_entity_id,
		x.jopo_clit_id,
		x.jopo_joro_id,
		x.jopo_joty_id,
-- 		x.jopo_joca_id,
		(SELECT clit_addr_id from job_hire.client WHERE clit_id  =  x.jopo_clit_id),
		x.jopo_work_code,
		x.jopo_edu_code,
		x.jopo_status,
		x.jopo_open
	FROM json_to_recordset(data) AS x(
		jopo_entity_id INT,
		jopo_number VARCHAR(25),
		jopo_title VARCHAR(256),
		jopo_start_date DATE,
		jopo_end_date DATE,
		jopo_min_salary INT,
		jopo_max_salary INT,
		jopo_min_experience INT,
		jopo_max_experience INT,
		jopo_primary_skill VARCHAR(256),
		jopo_secondary_skill VARCHAR(256),
		jopo_publish_date DATE,
		jopo_emp_entity_id INT,
		jopo_clit_id INT,
		jopo_joro_id INT,
		jopo_joty_id INT,
-- 		jopo_joca_id INT,
		jopo_addr_id INT,
		jopo_work_code VARCHAR(15),
		jopo_edu_code VARCHAR(15),
		jopo_status VARCHAR(15),
		jopo_open CHAR(1)
	);

	INSERT INTO job_hire.job_post_desc (
		jopo_entity_id,
		jopo_description,
-- 		jopo_responsibility,
		jopo_target,
		jopo_benefit
	)
	SELECT
		bus_entity_id,
		x.jopo_description,
-- 		x.jopo_responsibility,
		x.jopo_target,
		x.jopo_benefit
	FROM json_to_recordset(data1) AS x(
		jopo_entity_id INT,
		jopo_description JSON,
-- 		jopo_responsibility JSON,
		jopo_target JSON,
		jopo_benefit JSON
	);

	INSERT INTO job_hire.job_photo (
		jopho_entity_id,
		jopho_filename,
		jopho_filesize,
		jopho_filetype
	)
	SELECT
		bus_entity_id,
		x.jopho_filename,
		x.jopho_filesize,
		x.jopho_filetype
	FROM json_to_recordset(data2) AS x(
		jopho_entity_id INT,
		jopho_filename VARCHAR(55),
		jopho_filesize INT,
		jopho_filetype VARCHAR(15)
	);
END;
$$;


ALTER PROCEDURE job_hire.createpostingjob(IN data json, IN data1 json, IN data2 json) OWNER TO postgres;

--
-- Name: createtalent(json); Type: PROCEDURE; Schema: job_hire; Owner: postgres
--

CREATE PROCEDURE job_hire.createtalent(IN data json)
    LANGUAGE plpgsql
    AS $$
DECLARE
	user_id INT;
	jopo_id INT;
BEGIN
	INSERT INTO job_hire.talent_apply (
		taap_user_entity_id,
		taap_entity_id,
		taap_status
	)
	SELECT
		x.taap_user_entity_id,
		x.taap_entity_id,
		'apply'
	FROM json_to_recordset(data) AS x(
		taap_user_entity_id INT,
		taap_entity_id INT,
		taap_status VARCHAR(15)
	)
	RETURNING taap_user_entity_id, taap_entity_id INTO user_id, jopo_id;
	
	INSERT INTO job_hire.talent_apply_progress (
		tapr_taap_user_entity_id,
		tapr_taap_entity_id,
		tapr_status,
		tapr_progress_name
	)
	VALUES (
		user_id,
		jopo_id,
		'Open',
		'Apply'
	);
END;
$$;


ALTER PROCEDURE job_hire.createtalent(IN data json) OWNER TO postgres;

--
-- Name: update_jopho_modified_date(); Type: FUNCTION; Schema: job_hire; Owner: postgres
--

CREATE FUNCTION job_hire.update_jopho_modified_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.jopho_modified_date := NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION job_hire.update_jopho_modified_date() OWNER TO postgres;

--
-- Name: update_jopo_modified_date(); Type: FUNCTION; Schema: job_hire; Owner: postgres
--

CREATE FUNCTION job_hire.update_jopo_modified_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.jopo_modified_date := NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION job_hire.update_jopo_modified_date() OWNER TO postgres;

--
-- Name: update_jopo_publish_date(); Type: FUNCTION; Schema: job_hire; Owner: postgres
--

CREATE FUNCTION job_hire.update_jopo_publish_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.jopo_status = 'publish' THEN
    NEW.jopo_publish_date = CURRENT_DATE;
  ELSE
  	NEW.jopo_publish_date = OLD.jopo_publish_date;
  END IF;

  RETURN NEW;
END;
$$;


ALTER FUNCTION job_hire.update_jopo_publish_date() OWNER TO postgres;

--
-- Name: updateclient(integer, json, json); Type: PROCEDURE; Schema: job_hire; Owner: postgres
--

CREATE PROCEDURE job_hire.updateclient(IN id integer, IN data json, IN data1 json)
    LANGUAGE plpgsql
    AS $$
DECLARE
  address_id INT;
BEGIN
  SELECT clit_addr_id INTO address_id FROM job_hire.client WHERE clit_id = id;


  UPDATE master.address
  SET
  	addr_line1 = x.addr_line1,
    addr_line2 = x.addr_line2,
    addr_postal_code = x.addr_postal_code,
    addr_spatial_location = x.addr_spatial_location,
    addr_city_id = x.addr_city_id
  FROM json_to_recordset(data) AS x(
	  addr_line1 varchar(255),
      addr_line2 varchar(255),
      addr_postal_code varchar(10),
      addr_spatial_location json,
      addr_city_id INT
  )
  WHERE addr_id = address_id;
  
  UPDATE job_hire.client
  SET
    clit_name = x.clit_name,
    clit_about = x.clit_about,
    clit_addr_id = address_id,
    clit_emra_id = x.clit_emra_id,
    clit_indu_code = x.clit_indu_code
  FROM json_to_recordset(data1) AS x(
    clit_name varchar(256),
    clit_about varchar(512),
    clit_emra_id int,
    clit_indu_code varchar(15)
  )
  WHERE clit_addr_id = address_id;
END;
$$;


ALTER PROCEDURE job_hire.updateclient(IN id integer, IN data json, IN data1 json) OWNER TO postgres;

--
-- Name: updatepostingjob(integer, json, json, json); Type: PROCEDURE; Schema: job_hire; Owner: postgres
--

CREATE PROCEDURE job_hire.updatepostingjob(IN id integer, IN data json, IN data1 json, IN data2 json)
    LANGUAGE plpgsql
    AS $$
DECLARE
	bus_entity_id INT;
BEGIN
    -- Retrieve the entity_id for the business entity
    SELECT jopo_entity_id INTO bus_entity_id
    FROM job_hire.job_post
    WHERE job_hire.job_post.jopo_entity_id=id;

    -- Update the job_post table
    UPDATE job_hire.job_post AS jp
    SET
        jopo_title = x.jopo_title,
        jopo_start_date = x.jopo_start_date,
        jopo_end_date = x.jopo_end_date,
        jopo_min_salary = x.jopo_min_salary,
        jopo_max_salary = x.jopo_max_salary,
        jopo_min_experience = x.jopo_min_experience,
        jopo_max_experience = x.jopo_max_experience,
        jopo_primary_skill = x.jopo_primary_skill,
        jopo_secondary_skill = x.jopo_secondary_skill,
        jopo_emp_entity_id = x.jopo_emp_entity_id,
        jopo_clit_id = x.jopo_clit_id,
        jopo_joro_id = x.jopo_joro_id,
        jopo_joty_id = x.jopo_joty_id,
        jopo_joca_id = x.jopo_joca_id,
        jopo_addr_id = x.jopo_addr_id,
        jopo_work_code = x.jopo_work_code,
        jopo_edu_code = x.jopo_edu_code,
        jopo_status = x.jopo_status,
		jopo_open = x.jopo_open
    FROM json_to_recordset(data) AS x(
        jopo_title VARCHAR(256),
        jopo_start_date DATE,
        jopo_end_date DATE,
        jopo_min_salary INT,
        jopo_max_salary INT,
        jopo_min_experience INT,
        jopo_max_experience INT,
        jopo_primary_skill VARCHAR(256),
        jopo_secondary_skill VARCHAR(256),
        jopo_emp_entity_id INT,
        jopo_clit_id INT,
        jopo_joro_id INT,
        jopo_joty_id INT,
        jopo_joca_id INT,
        jopo_addr_id INT,
        jopo_work_code VARCHAR(15),
        jopo_edu_code VARCHAR(15),
        jopo_status VARCHAR(15),
		jopo_open CHAR(1)
    )
    WHERE jp.jopo_entity_id = bus_entity_id;

    -- Update the job_post_desc table
    UPDATE job_hire.job_post_desc AS jpd
    SET
        jopo_description = x.jopo_description,
        jopo_responsibility = x.jopo_responsibility,
        jopo_target = x.jopo_target,
        jopo_benefit = x.jopo_benefit
    FROM json_to_recordset(data1) AS x(
        jopo_description JSON,
        jopo_responsibility JSON,
        jopo_target JSON,
        jopo_benefit JSON
    )
    WHERE jpd.jopo_entity_id = bus_entity_id;

    -- Update the job_photo table
    UPDATE job_hire.job_photo AS jp
    SET
        jopho_filename = x.jopho_filename,
        jopho_filesize = x.jopho_filesize,
        jopho_filetype = x.jopho_filetype
    FROM json_to_recordset(data2) AS x(
        jopho_filename VARCHAR(55),
        jopho_filesize INT,
        jopho_filetype VARCHAR(15)
    )
    WHERE jp.jopho_entity_id = bus_entity_id;
END;
$$;


ALTER PROCEDURE job_hire.updatepostingjob(IN id integer, IN data json, IN data1 json, IN data2 json) OWNER TO postgres;

--
-- Name: delete_category_with_nulls(integer); Type: PROCEDURE; Schema: master; Owner: postgres
--

CREATE PROCEDURE master.delete_category_with_nulls(IN category_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE master.category
  SET cate_cate_id = NULL
  WHERE cate_cate_id = category_id;

  DELETE FROM master.category
  WHERE cate_id = category_id;
END;
$$;


ALTER PROCEDURE master.delete_category_with_nulls(IN category_id integer) OWNER TO postgres;

--
-- Name: insertcategory(json); Type: PROCEDURE; Schema: master; Owner: postgres
--

CREATE PROCEDURE master.insertcategory(IN input json)
    LANGUAGE plpgsql
    AS $$
DECLARE
  cate_name VARCHAR(255);
  cate_cate_id INT;
BEGIN
  cate_name := input ->> 'cate_name';
  cate_cate_id := (input ->> 'cate_cate_id')::INT;

  INSERT INTO master.category (cate_name, cate_cate_id)
  VALUES (cate_name, cate_cate_id);
END;
$$;


ALTER PROCEDURE master.insertcategory(IN input json) OWNER TO postgres;

--
-- Name: updatecategory(json); Type: PROCEDURE; Schema: master; Owner: postgres
--

CREATE PROCEDURE master.updatecategory(IN input json)
    LANGUAGE plpgsql
    AS $$
DECLARE
  cate_id INT;
  cate_name VARCHAR(255);
  cate_cate_id INT;
BEGIN
  cate_id := (input ->> 'cate_id')::INT;
  cate_name := (input ->> 'cate_name')::VARCHAR(255);
  cate_cate_id := (input ->> 'cate_cate_id')::INT;

  UPDATE master.category
  SET cate_name = cate_name,
      cate_cate_id = cate_cate_id
  WHERE cate_id = cate_id;
END;
$$;


ALTER PROCEDURE master.updatecategory(IN input json) OWNER TO postgres;

--
-- Name: updatecategory(integer, json); Type: FUNCTION; Schema: master; Owner: postgres
--

CREATE FUNCTION master.updatecategory(id integer, input json) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE master.category
  SET cate_name = (input ->> 'cate_name')::VARCHAR(255),
      cate_cate_id = (input ->> 'cate_cate_id')::INT
  WHERE cate_id = id;
END;
$$;


ALTER FUNCTION master.updatecategory(id integer, input json) OWNER TO postgres;

--
-- Name: updatecategory(integer, character varying, integer); Type: PROCEDURE; Schema: master; Owner: postgres
--

CREATE PROCEDURE master.updatecategory(IN p_cate_id integer, IN p_cate_name character varying, IN p_cate_cate_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE master.category
  SET cate_name = p_cate_name,
      cate_cate_id = p_cate_cate_id
  WHERE cate_id = p_cate_id;
END;
$$;


ALTER PROCEDURE master.updatecategory(IN p_cate_id integer, IN p_cate_name character varying, IN p_cate_cate_id integer) OWNER TO postgres;

--
-- Name: createuseraccountwentity(integer, character varying, numeric, character varying, character varying); Type: PROCEDURE; Schema: payment; Owner: postgres
--

CREATE PROCEDURE payment.createuseraccountwentity(IN user_entity_id integer, IN usac_account_number character varying, IN usac_saldo numeric, IN usac_type character varying, IN bank_name_input character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_bank_entity_id INT;
    v_fint_entity_id INT;
BEGIN
    -- Check if user_entity_id already has a bank account
    SELECT usac_bank_entity_id
    INTO v_bank_entity_id
    FROM payment.users_account
    WHERE usac_user_entity_id = user_entity_id
    AND usac_bank_entity_id IS NOT NULL;

    -- Check if user_entity_id already has a fintech account
    SELECT usac_fint_entity_id
    INTO v_fint_entity_id
    FROM payment.users_account
    WHERE usac_user_entity_id = user_entity_id
    AND usac_fint_entity_id IS NOT NULL;

    IF v_bank_entity_id IS NOT NULL AND v_fint_entity_id IS NOT NULL THEN
        -- User already has both a bank and fintech account, raise an exception or handle it as per your requirement
        RAISE EXCEPTION 'User already has both a bank and fintech account';
    END IF;

    IF usac_type = 'debet' OR usac_type = 'credit card' THEN
        IF v_bank_entity_id IS NOT NULL THEN
            -- User already has a bank account, raise an exception or handle it as per your requirement
            RAISE EXCEPTION 'User already has a bank account';
        ELSE
            SELECT bank_entity_id INTO v_bank_entity_id FROM payment.bank WHERE bank_name = bank_name_input;
            IF v_bank_entity_id IS NULL THEN
                -- Handle invalid bank name
                RAISE EXCEPTION 'Invalid bank name';
            END IF;
            INSERT INTO payment.users_account (usac_bank_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type)
            VALUES (v_bank_entity_id, user_entity_id, usac_account_number, usac_saldo, usac_type);
        END IF;
    ELSIF usac_type = 'payment' THEN
        IF v_fint_entity_id IS NOT NULL THEN
            -- User already has a fintech account, raise an exception or handle it as per your requirement
            RAISE EXCEPTION 'User already has a fintech account';
        ELSE
            SELECT fint_entity_id INTO v_fint_entity_id FROM payment.fintech WHERE fint_name = bank_name_input;
            IF v_fint_entity_id IS NULL THEN
                -- Handle invalid fintech name
                RAISE EXCEPTION 'Invalid fintech name';
            END IF;
            INSERT INTO payment.users_account (usac_fint_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type)
            VALUES (v_fint_entity_id, user_entity_id, usac_account_number, usac_saldo, usac_type);
        END IF;
    ELSE
        -- Handle invalid entity type
        RAISE EXCEPTION 'Invalid entity type';
    END IF;

    COMMIT;
END $$;


ALTER PROCEDURE payment.createuseraccountwentity(IN user_entity_id integer, IN usac_account_number character varying, IN usac_saldo numeric, IN usac_type character varying, IN bank_name_input character varying) OWNER TO postgres;

--
-- Name: generate_transaction_code(); Type: FUNCTION; Schema: payment; Owner: postgres
--

CREATE FUNCTION payment.generate_transaction_code() RETURNS character varying
    LANGUAGE plpgsql
    AS $_$
DECLARE
    dateNow VARCHAR(10);
    lastTransactionCode VARCHAR(50);
    lastSerialNumber INT;
    paddedSerialNumber VARCHAR(4);
    transactionCode VARCHAR(50);
BEGIN
    dateNow := to_char(CURRENT_DATE, 'YYYYMMDD');

    SELECT trpa_code_number INTO lastTransactionCode
    FROM payment.transaction_payment
    ORDER BY trpa_code_number DESC
    LIMIT 1;

    lastSerialNumber := 1;
    IF lastTransactionCode IS NOT NULL THEN
        lastSerialNumber := CAST(SUBSTRING(lastTransactionCode FROM '[0-9]+$') AS INTEGER) + 1;
    END IF;

    paddedSerialNumber := LPAD(CAST(lastSerialNumber AS VARCHAR), 4, '0');
    transactionCode := 'TRX#' || dateNow || '-' || paddedSerialNumber;

    RETURN transactionCode;
END;
$_$;


ALTER FUNCTION payment.generate_transaction_code() OWNER TO postgres;

--
-- Name: insertbank(json); Type: PROCEDURE; Schema: payment; Owner: postgres
--

CREATE PROCEDURE payment.insertbank(IN data json)
    LANGUAGE plpgsql
    AS $$
DECLARE 
    new_bank_entity_id INT;
BEGIN
	INSERT INTO users.business_entity VALUES (default)
	RETURNING entity_id into new_bank_entity_id;
	
    INSERT INTO payment.bank (bank_entity_id, bank_code, bank_name)
    SELECT new_bank_entity_id, x.bank_code, x.bank_name
    FROM 
-- 	(
--         SELECT COALESCE(MAX(bank_entity_id), 0) + 1 AS entity_id
--         FROM payment.bank
--     ) AS bank_id,
    json_to_recordset(data) as x (bank_entity_id int, bank_code VARCHAR, bank_name VARCHAR);

--     GET DIAGNOSTICS new_bank_entity_id = ROW_COUNT;

--     RAISE NOTICE 'Inserted % bank entities.', new_bank_entity_id;
END $$;


ALTER PROCEDURE payment.insertbank(IN data json) OWNER TO postgres;

--
-- Name: insertfintech(json); Type: PROCEDURE; Schema: payment; Owner: postgres
--

CREATE PROCEDURE payment.insertfintech(IN data json)
    LANGUAGE plpgsql
    AS $$
DECLARE 
    new_fint_entity_id INT;
BEGIN
	INSERT INTO users.business_entity VALUES (default)
	RETURNING entity_id into new_fint_entity_id;
	
    INSERT INTO payment.fintech (fint_entity_id, fint_code, fint_name)
    SELECT new_fint_entity_id, x.fint_code, x.fint_name
    FROM 
-- 	(
--         SELECT COALESCE(MAX(fint_entity_id), 0) + 1 AS entity_id
--         FROM payment.fintech
--     ) AS fint_id,
    json_to_recordset(data) as x (fint_entity_id VARCHAR, fint_code VARCHAR, fint_name VARCHAR);
		
--     GET DIAGNOSTICS new_fint_entity_id = ROW_COUNT;

--     RAISE NOTICE 'Inserted % fintech entities.', new_fint_entity_id;
END $$;


ALTER PROCEDURE payment.insertfintech(IN data json) OWNER TO postgres;

--
-- Name: spaccountnumber(json, json, character varying); Type: PROCEDURE; Schema: payment; Owner: postgres
--

CREATE PROCEDURE payment.spaccountnumber(IN data1 json, IN data2 json, IN trpa_target_id character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
    new_UserAccountNumber int;
    new_TransactionPaymentId int;
    source_account_number varchar(25);
    target_account_number varchar(25);
BEGIN
    WITH trpa_user_entity AS (
        INSERT INTO payment.transaction_payment(trpa_user_entity_id, trpa_source_id, trpa_target_id)
        SELECT x.trpa_user_entity_id, x.trpa_source_id, trpa_target_id
        FROM json_to_recordset(data1) x (trpa_user_entity_id int, trpa_source_id varchar)
        RETURNING trpa_id
    )
    SELECT trpa_id INTO new_TransactionPaymentId FROM trpa_user_entity;
    
    SELECT x.usac_account_number INTO source_account_number
    FROM json_to_recordset(data2) x (usac_user_entity_id int, usac_account_number varchar)
    WHERE x.usac_user_entity_id = new_TransactionPaymentId;
    
    INSERT INTO payment.users_account(usac_user_entity_id, usac_account_number)
    SELECT new_TransactionPaymentId, source_account_number;
    
    INSERT INTO payment.transaction_payment(trpa_source_id, trpa_target_id, trpa_debet, trpa_type, trpa_modified_date)
    SELECT tp.trpa_source_id, tp.trpa_target_id, tp.trpa_debet, 'transfer', now()
    FROM payment.transaction_payment tp
    WHERE tp.trpa_id = new_TransactionPaymentId;
    
    UPDATE payment.transaction_payment
    SET trpa_credit = trpa_credit - (SELECT trpa_debet FROM payment.transaction_payment WHERE trpa_id = new_TransactionPaymentId)
    WHERE trpa_id = new_TransactionPaymentId;
    
    SELECT ua.usac_account_number INTO target_account_number
    FROM payment.transaction_payment tp
    JOIN payment.users_account ua ON ua.usac_user_entity_id = tp.trpa_target_id
    WHERE tp.trpa_id = new_TransactionPaymentId;
    
    UPDATE payment.transaction_payment
    SET trpa_credit = trpa_credit + (SELECT trpa_debet FROM payment.transaction_payment WHERE trpa_id = new_TransactionPaymentId)
    WHERE trpa_id = trpa_target_id;  
END;
$$;


ALTER PROCEDURE payment.spaccountnumber(IN data1 json, IN data2 json, IN trpa_target_id character varying) OWNER TO postgres;

--
-- Name: topup(character varying, character varying, numeric); Type: PROCEDURE; Schema: payment; Owner: postgres
--

CREATE PROCEDURE payment.topup(IN p_usac_account_number_bank character varying, IN p_usac_account_number_fintech character varying, IN p_credit numeric)
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_bank_entity_id integer;
    v_user_entity_id integer;
    v_fint_entity_id integer;
    v_bank_saldo numeric;
    v_fint_saldo numeric;
    v_trpa_code_number varchar(50);
    v_trpa_type varchar(15) := 'topup'; -- Nilai otomatis untuk tipe transaksi
BEGIN
    -- Mendapatkan informasi bank dari usac_account_number_bank
    SELECT usac_bank_entity_id, usac_user_entity_id, usac_saldo,
           usac_user_entity_id AS v_user_entity_id
    INTO v_bank_entity_id, v_user_entity_id, v_bank_saldo
    FROM payment.users_account
    WHERE usac_account_number = p_usac_account_number_bank;

    -- Mengecek apakah saldo mencukupi
    IF v_bank_saldo < p_credit THEN
        RAISE EXCEPTION 'Saldo tidak mencukupi';
    END IF;

    -- Mendapatkan kode transaksi menggunakan fungsi payment.generate_transaction_code()
    SELECT payment.generate_transaction_code()
    INTO v_trpa_code_number;

    SELECT usac_user_entity_id, usac_fint_entity_id
    INTO v_user_entity_id, v_fint_entity_id
    FROM payment.users_account
    WHERE usac_account_number = p_usac_account_number_fintech;

    -- Mendapatkan saldo bank sebelum transaksi
    SELECT usac_saldo INTO v_bank_saldo
    FROM payment.users_account
    WHERE usac_account_number = p_usac_account_number_bank;

    -- Mengupdate nilai trpa_debet dengan saldo bank sebelum transaksi
    v_bank_saldo := v_bank_saldo - p_credit;

    -- Memasukkan data transaksi ke dalam tabel payment.transaction_payment
    INSERT INTO payment.transaction_payment (trpa_code_number, trpa_debet, trpa_credit, trpa_type, trpa_source_id, trpa_target_id, trpa_user_entity_id)
    VALUES (v_trpa_code_number, v_bank_saldo, p_credit, v_trpa_type, p_usac_account_number_bank, p_usac_account_number_fintech, v_user_entity_id);

    -- Memperbarui saldo bank
    UPDATE payment.users_account
    SET usac_saldo = usac_saldo - p_credit,
        usac_modified_date = now()
    WHERE usac_account_number = p_usac_account_number_bank
    RETURNING usac_saldo INTO v_bank_saldo;

    -- Memperbarui saldo fintech
    UPDATE payment.users_account
    SET usac_saldo = usac_saldo + p_credit,
        usac_modified_date = now()
    WHERE usac_account_number = p_usac_account_number_fintech
    RETURNING usac_saldo INTO v_fint_saldo;

    -- Jika bank entity ID dan fintech entity ID berbeda, maka perlu dilakukan transfer antar bank
    IF v_bank_entity_id != v_fint_entity_id THEN
        -- Perbarui saldo bank fintech
        UPDATE payment.users_account
        SET usac_saldo = usac_saldo - p_credit,
            usac_modified_date = now()
        WHERE usac_account_number = p_usac_account_number_bank
        AND usac_bank_entity_id = v_bank_entity_id
        RETURNING usac_saldo INTO v_bank_saldo;

        -- Perbarui saldo fintech
        UPDATE payment.users_account
        SET usac_saldo = usac_saldo + p_credit,
            usac_modified_date = now()
        WHERE usac_account_number = p_usac_account_number_fintech
        AND usac_bank_entity_id = v_fint_entity_id
        RETURNING usac_saldo INTO v_fint_saldo;
    END IF;

    -- Insert bank account record if it doesn't exist
    INSERT INTO payment.users_account (usac_bank_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type, usac_status)
    SELECT v_bank_entity_id, v_user_entity_id, p_usac_account_number_bank, v_bank_saldo - p_credit, 'debet', 'active'
    WHERE NOT EXISTS (
        SELECT 1
        FROM payment.users_account
        WHERE usac_account_number = p_usac_account_number_bank
    );

    -- Insert fintech account record if it doesn't exist
    INSERT INTO payment.users_account (usac_bank_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type, usac_status)
    SELECT v_fint_entity_id, v_user_entity_id, p_usac_account_number_fintech, v_fint_saldo + p_credit, 'kredit', 'active'
    WHERE NOT EXISTS (
        SELECT 1
        FROM payment.users_account
        WHERE usac_account_number = p_usac_account_number_fintech
    );

    -- Mengembalikan kode transaksi
    PERFORM v_trpa_code_number;
END;
$$;


ALTER PROCEDURE payment.topup(IN p_usac_account_number_bank character varying, IN p_usac_account_number_fintech character varying, IN p_credit numeric) OWNER TO postgres;

--
-- Name: updatebank(json); Type: PROCEDURE; Schema: payment; Owner: postgres
--

CREATE PROCEDURE payment.updatebank(IN data json)
    LANGUAGE plpgsql
    AS $$
declare
	data_store record;
begin
	select * from json_to_recordset(data) as x(entity_id INT,bank_code VARCHAR,bank_name varchar) into data_store;
	update payment.bank 
	set bank_code=data_store.bank_code,bank_name=data_store.bank_name where bank_entity_id=data_store.entity_id;
end;
$$;


ALTER PROCEDURE payment.updatebank(IN data json) OWNER TO postgres;

--
-- Name: updatefintech(json); Type: PROCEDURE; Schema: payment; Owner: postgres
--

CREATE PROCEDURE payment.updatefintech(IN data json)
    LANGUAGE plpgsql
    AS $$
declare
	data_store record;
begin
	select * from json_to_recordset(data) as x(entity_id INT,fint_code VARCHAR,fint_name varchar) into data_store;
	update payment.fintech 
	set fint_code=data_store.fint_code,fint_name=data_store.fint_name where fint_entity_id=data_store.entity_id;
end;
$$;


ALTER PROCEDURE payment.updatefintech(IN data json) OWNER TO postgres;

--
-- Name: updateuseraccountwentity(integer, character varying, numeric, character varying, character varying); Type: PROCEDURE; Schema: payment; Owner: postgres
--

CREATE PROCEDURE payment.updateuseraccountwentity(IN user_entity_id integer, IN usac_account_number_param character varying, IN usac_saldo_param numeric, IN usac_type_param character varying, IN bank_name_param character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_bank_entity_id INT;
    v_fint_entity_id INT;
    v_existing_account_count INT;
BEGIN
    -- Check if user_entity_id has a bank account
    SELECT usac_bank_entity_id
    INTO v_bank_entity_id
    FROM payment.users_account
    WHERE usac_user_entity_id = user_entity_id
    AND usac_bank_entity_id IS NOT NULL;

    -- Check if user_entity_id has a fintech account
    SELECT usac_fint_entity_id
    INTO v_fint_entity_id
    FROM payment.users_account
    WHERE usac_user_entity_id = user_entity_id
    AND usac_fint_entity_id IS NOT NULL;

    IF v_bank_entity_id IS NULL AND v_fint_entity_id IS NULL THEN
        -- User doesn't have both a bank and fintech account, raise an exception or handle it as per your requirement
        RAISE EXCEPTION 'User doesn''t have a bank or fintech account';
    END IF;

    IF usac_type_param = 'debit' OR usac_type_param = 'credit card' THEN
        SELECT bank_entity_id INTO v_bank_entity_id FROM payment.bank WHERE bank_name = bank_name_param;
        IF v_bank_entity_id IS NULL THEN
            -- Handle invalid bank name
            RAISE EXCEPTION 'Invalid bank name';
        END IF;

        -- Check if the account number already exists for another user
        SELECT COUNT(*)
        INTO v_existing_account_count
        FROM payment.users_account
        WHERE usac_account_number = usac_account_number_param
        AND usac_user_entity_id <> user_entity_id;

        IF v_existing_account_count > 0 THEN
            -- Handle duplicate account number
            RAISE EXCEPTION 'Duplicate account number';
        END IF;

        UPDATE payment.users_account
        SET
            usac_bank_entity_id = v_bank_entity_id,
            usac_account_number = usac_account_number_param,
            usac_saldo = usac_saldo_param,
            usac_type = usac_type_param
        WHERE usac_user_entity_id = user_entity_id;
    ELSIF usac_type_param = 'payment' THEN
        SELECT fint_entity_id INTO v_fint_entity_id FROM payment.fintech WHERE fint_name = bank_name_param;
        IF v_fint_entity_id IS NULL THEN
            -- Handle invalid fintech name
            RAISE EXCEPTION 'Invalid fintech name';
        END IF;

        -- Check if the account number already exists for another user
        SELECT COUNT(*)
        INTO v_existing_account_count
        FROM payment.users_account
        WHERE usac_account_number = usac_account_number_param
        AND usac_user_entity_id <> user_entity_id;

        IF v_existing_account_count > 0 THEN
            -- Handle duplicate account number
            RAISE EXCEPTION 'Duplicate account number';
        END IF;

        UPDATE payment.users_account
        SET
            usac_fint_entity_id = v_fint_entity_id,
            usac_account_number = usac_account_number_param,
            usac_saldo = usac_saldo_param,
            usac_type = usac_type_param
        WHERE usac_user_entity_id = user_entity_id;
    ELSE
        -- Handle invalid entity type
        RAISE EXCEPTION 'Invalid entity type';
    END IF;

    COMMIT;
END $$;


ALTER PROCEDURE payment.updateuseraccountwentity(IN user_entity_id integer, IN usac_account_number_param character varying, IN usac_saldo_param numeric, IN usac_type_param character varying, IN bank_name_param character varying) OWNER TO postgres;

--
-- Name: delete_category_with_nulls(integer); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.delete_category_with_nulls(IN category_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
  -- Mengubah nilai foreign key menjadi NULL
  UPDATE category
  SET cate_cate_id = NULL
  WHERE cate_cate_id = category_id;

  -- Menghapus baris dari tabel "category"
  DELETE FROM category
  WHERE cate_id = category_id;
END;
$$;


ALTER PROCEDURE public.delete_category_with_nulls(IN category_id integer) OWNER TO postgres;

--
-- Name: insert_category(character varying, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.insert_category(IN p_cate_name character varying, IN p_parent_name character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Menyimpan nilai pada kolom "cate_name"
    INSERT INTO master.category (cate_name)
    VALUES (p_cate_name);

    -- Menghubungkan dengan "parent_name" dan mengupdate kolom "cate_cate_id"
    UPDATE master.category c1
    SET cate_cate_id = (
        SELECT c2.cate_id
        FROM master.category c2
        WHERE c2.cate_name = p_parent_name
    )
    WHERE c1.cate_name = p_cate_name;
END;
$$;


ALTER PROCEDURE public.insert_category(IN p_cate_name character varying, IN p_parent_name character varying) OWNER TO postgres;

--
-- Name: insert_cart_item(integer, numeric, integer, integer); Type: PROCEDURE; Schema: sales; Owner: postgres
--

CREATE PROCEDURE sales.insert_cart_item(IN p_cait_quantity integer, IN p_cait_unit_price numeric, IN p_cait_user_entity_id integer, IN p_cait_prog_entity_id integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO sales.cart_items (
        cait_quantity,
        cait_unit_price,
        cait_modified_date,
        cait_user_entity_id,
        cait_prog_entity_id
    )
    VALUES (
        p_cait_quantity,
        p_cait_unit_price,
        CURRENT_TIMESTAMP,
        p_cait_user_entity_id,
        p_cait_prog_entity_id
    );
	
    COMMIT;
END;
$$;


ALTER PROCEDURE sales.insert_cart_item(IN p_cait_quantity integer, IN p_cait_unit_price numeric, IN p_cait_user_entity_id integer, IN p_cait_prog_entity_id integer) OWNER TO postgres;

--
-- Name: insert_special_offer_and_programs(integer, character varying, numeric, character varying, date, date, integer, integer, integer, integer, integer, character varying); Type: PROCEDURE; Schema: sales; Owner: postgres
--

CREATE PROCEDURE sales.insert_special_offer_and_programs(IN p_spof_id integer, IN p_spof_description character varying, IN p_spof_discount numeric, IN p_spof_type character varying, IN p_spof_start_date date, IN p_spof_end_date date, IN p_spof_min_qty integer, IN p_spof_max_qty integer, IN p_spof_cate_id integer, IN p_soco_id integer, IN p_soco_prog_entity_id integer, IN p_soco_status character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Insert ke tabel special_offer
    INSERT INTO sales.special_offer (spof_id, spof_description, spof_discount, spof_type, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_cate_id)
    VALUES (p_spof_id, p_spof_description, p_spof_discount, p_spof_type, p_spof_start_date, p_spof_end_date, p_spof_min_qty, p_spof_max_qty, p_spof_cate_id);

    -- Insert ke tabel special_offer_programs
    INSERT INTO sales.special_offer_programs (soco_id, soco_spof_id, soco_prog_entity_id, soco_status)
    VALUES (p_soco_id, p_spof_id, p_soco_prog_entity_id, p_soco_status);

    -- Output pesan sukses
    RAISE NOTICE 'Special offer and programs inserted successfully';
END;
$$;


ALTER PROCEDURE sales.insert_special_offer_and_programs(IN p_spof_id integer, IN p_spof_description character varying, IN p_spof_discount numeric, IN p_spof_type character varying, IN p_spof_start_date date, IN p_spof_end_date date, IN p_spof_min_qty integer, IN p_spof_max_qty integer, IN p_spof_cate_id integer, IN p_soco_id integer, IN p_soco_prog_entity_id integer, IN p_soco_status character varying) OWNER TO postgres;

--
-- Name: sales_place_order_json(json, character varying, character varying, character varying, character varying, integer, character varying, numeric, integer); Type: PROCEDURE; Schema: sales; Owner: postgres
--

CREATE PROCEDURE sales.sales_place_order_json(IN p_cart_items json, IN p_sohe_order_number character varying, IN p_sohe_account_number character varying, IN p_sohe_trpa_code_number character varying, IN p_sohe_license_code character varying, IN p_sohe_user_entity_id integer, IN p_sohe_status character varying, IN p_sode_unit_discount numeric DEFAULT NULL::numeric, IN p_sode_soco_id integer DEFAULT NULL::integer)
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_sode_id integer;
    v_sohe_subtotal numeric;
    v_sohe_tax numeric;
    v_sohe_total_due numeric;
    v_cart_item record;
BEGIN
    -- Calculate subtotal, tax, and total due
    v_sohe_subtotal := 0;
    FOR v_cart_item IN SELECT * FROM json_to_recordset(p_cart_items) AS x(
        cait_id integer,
        cait_quantity integer,
        cait_unit_price numeric,
        cait_user_entity_id integer,
        cait_prog_entity_id integer
    )
    LOOP
        -- Calculate line total for each cart item
        v_sohe_subtotal := v_sohe_subtotal + (v_cart_item.cait_quantity * v_cart_item.cait_unit_price);
    END LOOP;

    v_sohe_tax := v_sohe_subtotal * 0.1; -- Assuming 10% tax rate
    v_sohe_total_due := v_sohe_subtotal + v_sohe_tax;

    -- Insert into sales_order_header table
    INSERT INTO sales.sales_order_header (
        sohe_id,
        sohe_order_date,
        sohe_due_date,
        sohe_ship_date,
        sohe_order_number,
        sohe_account_number,
        sohe_trpa_code_number,
        sohe_license_code,
        sohe_subtotal,
        sohe_tax,
        sohe_total_due,
        sohe_modified_date,
        sohe_user_entity_id,
        sohe_status
    )
    VALUES (
        DEFAULT,
        now(),
        now(),
        now(),
        p_sohe_order_number,
        p_sohe_account_number,
        p_sohe_trpa_code_number,
        p_sohe_license_code,
        v_sohe_subtotal,
        v_sohe_tax,
        v_sohe_total_due,
        CURRENT_TIMESTAMP,
        p_sohe_user_entity_id,
        p_sohe_status
    )
    RETURNING sohe_id INTO v_sode_id;

    -- Insert into sales_order_detail table for each cart item
    FOR v_cart_item IN SELECT * FROM json_to_recordset(p_cart_items) AS x(
        cait_id integer,
        cait_quantity integer,
        cait_unit_price numeric,
        cait_user_entity_id integer,
        cait_prog_entity_id integer
    )
    LOOP
        IF p_sode_unit_discount IS NOT NULL AND p_sode_soco_id IS NOT NULL THEN
            INSERT INTO sales.sales_order_detail (
                sode_id,
                sode_qty,
                sode_unit_price,
                sode_unit_discount,
                sode_line_total,
                sode_modified_date,
                sode_sohe_id,
                sode_soco_id,
                sode_prog_entity_id
            )
            VALUES (
                DEFAULT,
                v_cart_item.cait_quantity,
                v_cart_item.cait_unit_price,
                p_sode_unit_discount,
                v_cart_item.cait_quantity * v_cart_item.cait_unit_price,
                CURRENT_TIMESTAMP,
                v_sode_id,
                p_sode_soco_id,
                v_cart_item.cait_prog_entity_id
            );
        END IF;
    END LOOP;

    -- Commit the transaction
    COMMIT;
END;
$$;


ALTER PROCEDURE sales.sales_place_order_json(IN p_cart_items json, IN p_sohe_order_number character varying, IN p_sohe_account_number character varying, IN p_sohe_trpa_code_number character varying, IN p_sohe_license_code character varying, IN p_sohe_user_entity_id integer, IN p_sohe_status character varying, IN p_sode_unit_discount numeric, IN p_sode_soco_id integer) OWNER TO postgres;

--
-- Name: add_address(character varying, character varying, character varying, integer, integer, integer); Type: PROCEDURE; Schema: users; Owner: postgres
--

CREATE PROCEDURE users.add_address(IN first_address character varying, IN second_address character varying, IN code_pos character varying, IN city_id integer, IN user_id integer, IN address_type_id integer)
    LANGUAGE plpgsql
    AS $$
DECLARE 
    new_address_id INT;
BEGIN
    INSERT INTO master.address(addr_line1, addr_line2, addr_postal_code, addr_city_id)
	VALUES(first_address, second_address, code_pos, city_id)
    RETURNING addr_id INTO new_address_id;
	
	INSERT INTO users.users_address(etad_addr_id, etad_entity_id, etad_adty_id)
	VALUES (new_address_id, user_id, address_type_id);
END;
$$;


ALTER PROCEDURE users.add_address(IN first_address character varying, IN second_address character varying, IN code_pos character varying, IN city_id integer, IN user_id integer, IN address_type_id integer) OWNER TO postgres;

--
-- Name: apply_jobs(integer, character varying, character varying, character varying, date, character varying, character varying, character varying, character varying, character varying, character varying, integer, character varying, integer); Type: PROCEDURE; Schema: users; Owner: postgres
--

CREATE PROCEDURE users.apply_jobs(IN user_id integer, IN firstname character varying, IN lastname character varying, IN userphoto character varying, IN birthdate date, IN user_school character varying, IN user_degree character varying, IN user_field_study character varying, IN user_phone_number character varying, IN user_resume character varying, IN user_filelink character varying, IN user_filesize integer, IN user_filetype character varying, IN role_id integer)
    LANGUAGE plpgsql
    AS $$
DECLARE
    update_role INT;
BEGIN
	INSERT INTO users.users_education(usdu_entity_id, usdu_school,usdu_degree, usdu_field_study)
	VALUES(user_id, user_school, user_degree, user_field_study);
	
	UPDATE users.users_phones 
	SET uspo_number = user_phone_number 
	WHERE uspo_entity_id = user_id;
	
	INSERT INTO users.users_media (usme_entity_id, usme_filename, usme_file_link, usme_filesize, usme_filetype)
    VALUES (user_id, user_resume, user_filelink, user_filesize, user_filetype);
	
	UPDATE users.users_roles
	SET usro_role_id = role_id
	WHERE usro_entity_id = user_id
	RETURNING usro_role_id INTO update_role;
	
	UPDATE users.users
    SET user_first_name = firstname,
        user_last_name = lastname,
		user_photo = userphoto,
		user_birth_date = birthdate,
		user_current_role = update_role
    WHERE user_entity_id = user_id; 
END;
$$;


ALTER PROCEDURE users.apply_jobs(IN user_id integer, IN firstname character varying, IN lastname character varying, IN userphoto character varying, IN birthdate date, IN user_school character varying, IN user_degree character varying, IN user_field_study character varying, IN user_phone_number character varying, IN user_resume character varying, IN user_filelink character varying, IN user_filesize integer, IN user_filetype character varying, IN role_id integer) OWNER TO postgres;

--
-- Name: createprogramapply(json, json); Type: PROCEDURE; Schema: users; Owner: postgres
--

CREATE PROCEDURE users.createprogramapply(IN data json, IN data2 json)
    LANGUAGE plpgsql
    AS $$
declare
	userEntityId int;
	progEntityId int;
	
begin
	with result as(
	insert into bootcamp.program_apply(
		prap_user_entity_id,
		prap_prog_entity_id
	)
	select
		x.prap_user_entity_id,
		x.prap_prog_entity_id
	
	from json_to_recordset(data) as x(
		prap_user_entity_id int,
		prap_prog_entity_id int
	)
	returning prap_user_entity_id,prap_prog_entity_id
	)
	select prap_user_entity_id,prap_prog_entity_id into userEntityId,progEntityId from result;
	
	insert into bootcamp.program_apply_progress(
		parog_user_entity_id,
		parog_prog_entity_id,
		parog_progress_name,
		parog_status
	)
	select
		userEntityId,
		progEntityId,
		y.parog_progress_name,
		y.parog_status
		
	from json_to_recordset(data2) as y(
		parog_progress_name VARCHAR(15),
		parog_status VARCHAR(15)
	);
end;
$$;


ALTER PROCEDURE users.createprogramapply(IN data json, IN data2 json) OWNER TO postgres;

--
-- Name: signuppc(character varying, character varying, character varying, character varying, integer); Type: PROCEDURE; Schema: users; Owner: postgres
--

CREATE PROCEDURE users.signuppc(IN p_username character varying, IN p_password character varying, IN p_phone character varying, IN p_email character varying, IN p_role_id integer)
    LANGUAGE plpgsql
    AS $$
DECLARE 
    new_business_id INT;
    new_user_id INT;
    update_role INT;
BEGIN
    INSERT INTO users.business_entity DEFAULT VALUES
    RETURNING entity_id INTO new_business_id;

    INSERT INTO users.users (user_entity_id, user_name, user_password)
    VALUES (new_business_id, p_username, p_password)
    RETURNING user_entity_id INTO new_user_id;
    
    INSERT INTO users.users_phones (uspo_entity_id, uspo_number)
    VALUES (new_user_id, p_phone);
    
    INSERT INTO users.users_email (pmail_entity_id, pmail_address)
    VALUES (new_user_id, p_email);
    
    INSERT INTO users.users_roles (usro_entity_id, usro_role_id)
    VALUES (new_user_id, p_role_id)
	RETURNING usro_role_id INTO update_role;
	
	UPDATE users.users SET user_current_role = update_role
	WHERE user_entity_id = new_user_id;
    
END
$$;


ALTER PROCEDURE users.signuppc(IN p_username character varying, IN p_password character varying, IN p_phone character varying, IN p_email character varying, IN p_role_id integer) OWNER TO postgres;

--
-- Name: update_address(integer, character varying, character varying, character varying, integer, integer); Type: PROCEDURE; Schema: users; Owner: postgres
--

CREATE PROCEDURE users.update_address(IN address_id integer, IN first_address character varying, IN second_address character varying, IN code_pos character varying, IN city_id integer, IN address_type_id integer)
    LANGUAGE plpgsql
    AS $$
    BEGIN
        UPDATE master.address
        SET addr_line1 = first_address,
            addr_line2 = second_address,
            addr_postal_code = code_pos,
            addr_city_id = city_id
        WHERE addr_id = address_id;
        
        UPDATE users.users_address
        SET etad_adty_id = address_type_id
        WHERE etad_addr_id = address_id;
    END;
    $$;


ALTER PROCEDURE users.update_address(IN address_id integer, IN first_address character varying, IN second_address character varying, IN code_pos character varying, IN city_id integer, IN address_type_id integer) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: batch; Type: TABLE; Schema: bootcamp; Owner: postgres
--

CREATE TABLE bootcamp.batch (
    batch_id integer NOT NULL,
    batch_entity_id integer NOT NULL,
    batch_name character varying(15),
    batch_description character varying(125),
    batch_start_date date,
    batch_end_date date,
    batch_reason character varying(256),
    batch_type character varying(15),
    batch_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    batch_status character varying(15),
    batch_pic_id integer,
    CONSTRAINT batch_batch_status_check CHECK (((batch_status)::text = ANY (ARRAY[('open'::character varying)::text, ('running'::character varying)::text, ('closed'::character varying)::text, ('pending'::character varying)::text, ('cancelled'::character varying)::text, ('extend'::character varying)::text])))
);


ALTER TABLE bootcamp.batch OWNER TO postgres;

--
-- Name: batch_batch_id_seq; Type: SEQUENCE; Schema: bootcamp; Owner: postgres
--

CREATE SEQUENCE bootcamp.batch_batch_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bootcamp.batch_batch_id_seq OWNER TO postgres;

--
-- Name: batch_batch_id_seq; Type: SEQUENCE OWNED BY; Schema: bootcamp; Owner: postgres
--

ALTER SEQUENCE bootcamp.batch_batch_id_seq OWNED BY bootcamp.batch.batch_id;


--
-- Name: batch_trainee; Type: TABLE; Schema: bootcamp; Owner: postgres
--

CREATE TABLE bootcamp.batch_trainee (
    batr_id integer NOT NULL,
    batr_status character varying(15),
    batr_certificated character(1),
    batr_certificate_link character varying(255),
    batr_access_token character varying(255),
    batr_access_grant character(1),
    batr_review character varying(1024),
    batr_total_score numeric,
    batr_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    batr_trainee_entity_id integer,
    batr_batch_id integer NOT NULL,
    CONSTRAINT batch_trainee_batr_access_grant_check CHECK ((batr_access_grant = ANY (ARRAY['0'::bpchar, '1'::bpchar]))),
    CONSTRAINT batch_trainee_batr_certificated_check CHECK ((batr_certificated = ANY (ARRAY['0'::bpchar, '1'::bpchar]))),
    CONSTRAINT batch_trainee_batr_status_check CHECK (((batr_status)::text = ANY (ARRAY[('passed'::character varying)::text, ('failed'::character varying)::text, ('resign'::character varying)::text, ('running'::character varying)::text])))
);


ALTER TABLE bootcamp.batch_trainee OWNER TO postgres;

--
-- Name: batch_trainee_batr_id_seq; Type: SEQUENCE; Schema: bootcamp; Owner: postgres
--

CREATE SEQUENCE bootcamp.batch_trainee_batr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bootcamp.batch_trainee_batr_id_seq OWNER TO postgres;

--
-- Name: batch_trainee_batr_id_seq; Type: SEQUENCE OWNED BY; Schema: bootcamp; Owner: postgres
--

ALTER SEQUENCE bootcamp.batch_trainee_batr_id_seq OWNED BY bootcamp.batch_trainee.batr_id;


--
-- Name: batch_trainee_evaluation; Type: TABLE; Schema: bootcamp; Owner: postgres
--

CREATE TABLE bootcamp.batch_trainee_evaluation (
    btev_id integer NOT NULL,
    btev_type character varying(15),
    btev_header character varying(256),
    btev_section character varying(256),
    btev_skill character varying(256),
    btev_week integer,
    btev_skor integer,
    btev_note character varying(256),
    btev_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    btev_batch_id integer,
    btev_trainee_entity_id integer,
    CONSTRAINT batch_trainee_evaluation_btev_type_check CHECK (((btev_type)::text = ANY (ARRAY[('hardskill'::character varying)::text, ('softskill'::character varying)::text])))
);


ALTER TABLE bootcamp.batch_trainee_evaluation OWNER TO postgres;

--
-- Name: batch_trainee_evaluation_btev_id_seq; Type: SEQUENCE; Schema: bootcamp; Owner: postgres
--

CREATE SEQUENCE bootcamp.batch_trainee_evaluation_btev_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bootcamp.batch_trainee_evaluation_btev_id_seq OWNER TO postgres;

--
-- Name: batch_trainee_evaluation_btev_id_seq; Type: SEQUENCE OWNED BY; Schema: bootcamp; Owner: postgres
--

ALTER SEQUENCE bootcamp.batch_trainee_evaluation_btev_id_seq OWNED BY bootcamp.batch_trainee_evaluation.btev_id;


--
-- Name: program_entity; Type: TABLE; Schema: curriculum; Owner: postgres
--

CREATE TABLE curriculum.program_entity (
    prog_entity_id integer NOT NULL,
    prog_title character varying(256),
    prog_headline character varying(512),
    prog_type character varying(15),
    prog_learning_type character varying(15),
    prog_rating numeric,
    prog_total_trainee integer,
    prog_image character varying(256),
    prog_best_seller character(1) DEFAULT '0'::bpchar,
    prog_price numeric,
    prog_language character varying(35),
    prog_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    prog_duration integer,
    prog_duration_type character varying(15),
    prog_tag_skill character varying(512),
    prog_city_id integer,
    prog_cate_id integer,
    prog_created_by integer,
    prog_status character varying(15),
    payment_type character varying(20),
    prog_score integer,
    total_batch integer,
    prog_curr_regis character varying(100),
    CONSTRAINT program_entity_payment_type_check CHECK (((payment_type)::text = ANY ((ARRAY['regular'::character varying, 'pay'::character varying])::text[]))),
    CONSTRAINT program_entity_prog_best_seller_check CHECK ((prog_best_seller = ANY (ARRAY['0'::bpchar, '1'::bpchar]))),
    CONSTRAINT program_entity_prog_duration_type_check CHECK (((prog_duration_type)::text = ANY (ARRAY[('month'::character varying)::text, ('week'::character varying)::text, ('days'::character varying)::text]))),
    CONSTRAINT program_entity_prog_language_check CHECK (((prog_language)::text = ANY (ARRAY[('english'::character varying)::text, ('bahasa'::character varying)::text]))),
    CONSTRAINT program_entity_prog_learning_type_check CHECK (((prog_learning_type)::text = ANY (ARRAY[('online'::character varying)::text, ('offline'::character varying)::text, ('both'::character varying)::text]))),
    CONSTRAINT program_entity_prog_status_check CHECK (((prog_status)::text = ANY (ARRAY[('draft'::character varying)::text, ('publish'::character varying)::text]))),
    CONSTRAINT program_entity_prog_type_check CHECK (((prog_type)::text = ANY (ARRAY[('bootcamp'::character varying)::text, ('course'::character varying)::text])))
);


ALTER TABLE curriculum.program_entity OWNER TO postgres;

--
-- Name: batchonly; Type: VIEW; Schema: bootcamp; Owner: postgres
--

CREATE VIEW bootcamp.batchonly AS
 SELECT batch.batch_id,
    batch.batch_entity_id,
    batch.batch_name,
    program_entity.prog_title,
    batch.batch_status,
    batch.batch_start_date,
    batch.batch_end_date
   FROM (bootcamp.batch
     JOIN curriculum.program_entity ON ((program_entity.prog_entity_id = batch.batch_entity_id)));


ALTER TABLE bootcamp.batchonly OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users (
    user_entity_id integer NOT NULL,
    user_name character varying(15),
    user_password character varying(256),
    user_first_name character varying(50),
    user_last_name character varying(50),
    user_birth_date date,
    user_email_promotion integer DEFAULT 0,
    user_demographic json,
    user_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_photo character varying(255),
    user_current_role integer
);


ALTER TABLE users.users OWNER TO postgres;

--
-- Name: users_education; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users_education (
    usdu_id integer NOT NULL,
    usdu_entity_id integer NOT NULL,
    usdu_school character varying(255),
    usdu_degree character varying(15),
    usdu_field_study character varying(125),
    usdu_graduate_year character varying(4),
    usdu_start_date date,
    usdu_end_date date,
    usdu_grade character varying(5),
    usdu_activities character varying(512),
    usdu_description character varying(512),
    usdu_modified_data timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT users_education_usdu_degree_check CHECK (((usdu_degree)::text = ANY (ARRAY[('Bachelor'::character varying)::text, ('Diploma'::character varying)::text])))
);


ALTER TABLE users.users_education OWNER TO postgres;

--
-- Name: batchtrainee; Type: VIEW; Schema: bootcamp; Owner: postgres
--

CREATE VIEW bootcamp.batchtrainee AS
 SELECT batch_trainee.batr_id,
    batch_trainee.batr_batch_id,
    batch.batch_name,
    to_char((batch.batch_start_date)::timestamp with time zone, 'Month DD YYYY'::text) AS batch_start_date,
    to_char((batch.batch_end_date)::timestamp with time zone, 'Month DD YYYY'::text) AS batch_end_date,
    users_education.usdu_school,
    users_education.usdu_field_study,
    users_education.usdu_grade,
    users.user_photo,
    concat(users.user_first_name, ' ', users.user_last_name) AS full_name,
    batch_trainee.batr_status,
    batch_trainee.batr_trainee_entity_id,
    batch_trainee.batr_certificated,
    batch_trainee.batr_certificate_link,
    batch_trainee.batr_review,
    batch_trainee.batr_total_score,
    program_entity.prog_title
   FROM ((((users.users
     JOIN bootcamp.batch_trainee ON ((batch_trainee.batr_trainee_entity_id = users.user_entity_id)))
     JOIN bootcamp.batch ON ((batch.batch_id = batch_trainee.batr_batch_id)))
     JOIN curriculum.program_entity ON ((program_entity.prog_entity_id = batch.batch_entity_id)))
     LEFT JOIN users.users_education ON ((users_education.usdu_entity_id = users.user_entity_id)))
  ORDER BY batch_trainee.batr_batch_id;


ALTER TABLE bootcamp.batchtrainee OWNER TO postgres;

--
-- Name: trainer_programs; Type: TABLE; Schema: bootcamp; Owner: postgres
--

CREATE TABLE bootcamp.trainer_programs (
    batch_id integer NOT NULL,
    tpro_entity_id integer,
    tpro_emp_entity_id integer NOT NULL,
    tpro_modified_date timestamp with time zone
);


ALTER TABLE bootcamp.trainer_programs OWNER TO postgres;

--
-- Name: batchtrainer; Type: VIEW; Schema: bootcamp; Owner: postgres
--

CREATE VIEW bootcamp.batchtrainer AS
 SELECT trainer_programs.batch_id,
    concat(users.user_first_name, ' ', users.user_last_name) AS concat,
    users.user_photo
   FROM (bootcamp.trainer_programs
     JOIN users.users ON ((users.user_entity_id = trainer_programs.tpro_emp_entity_id)));


ALTER TABLE bootcamp.batchtrainer OWNER TO postgres;

--
-- Name: program_apply; Type: TABLE; Schema: bootcamp; Owner: postgres
--

CREATE TABLE bootcamp.program_apply (
    prap_user_entity_id integer NOT NULL,
    prap_prog_entity_id integer NOT NULL,
    prap_test_score integer,
    prap_gpa numeric,
    prap_iq_test numeric,
    prap_review character varying(256),
    prap_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    prap_status character varying(15),
    CONSTRAINT program_apply_prap_status_check CHECK (((prap_status)::text = ANY (ARRAY[('recommendation'::character varying)::text, ('passed'::character varying)::text, ('failed'::character varying)::text])))
);


ALTER TABLE bootcamp.program_apply OWNER TO postgres;

--
-- Name: program_apply_progress; Type: TABLE; Schema: bootcamp; Owner: postgres
--

CREATE TABLE bootcamp.program_apply_progress (
    parog_id integer NOT NULL,
    parog_user_entity_id integer,
    parog_prog_entity_id integer,
    parog_action_date timestamp with time zone DEFAULT now(),
    parog_modified_date timestamp with time zone DEFAULT now(),
    parog_comment character varying(512),
    parog_progress_name character varying(15),
    parog_emp_entity_id integer,
    parog_status character varying(15),
    CONSTRAINT program_apply_progress_parog_status_check CHECK (((parog_status)::text = ANY ((ARRAY['open'::character varying, 'wait'::character varying, 'cancelled'::character varying, 'closed'::character varying])::text[])))
);


ALTER TABLE bootcamp.program_apply_progress OWNER TO postgres;

--
-- Name: program_apply_progress_parog_id_seq; Type: SEQUENCE; Schema: bootcamp; Owner: postgres
--

CREATE SEQUENCE bootcamp.program_apply_progress_parog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bootcamp.program_apply_progress_parog_id_seq OWNER TO postgres;

--
-- Name: program_apply_progress_parog_id_seq; Type: SEQUENCE OWNED BY; Schema: bootcamp; Owner: postgres
--

ALTER SEQUENCE bootcamp.program_apply_progress_parog_id_seq OWNED BY bootcamp.program_apply_progress.parog_id;


--
-- Name: selectcandidates; Type: VIEW; Schema: bootcamp; Owner: postgres
--

CREATE VIEW bootcamp.selectcandidates AS
 SELECT users.user_entity_id,
    program_apply_progress.parog_id,
    program_entity.prog_entity_id,
    users.user_photo,
    concat(users.user_first_name, ' ', users.user_last_name) AS full_name,
    users_education.usdu_school,
    users_education.usdu_field_study,
    users_education.usdu_graduate_year,
    program_entity.prog_title,
    program_apply.prap_status,
    program_apply.prap_review,
    program_apply.prap_test_score,
    to_char(program_apply_progress.parog_action_date, 'Month DD YYYY'::text) AS join_date,
    program_apply_progress.parog_progress_name
   FROM ((((bootcamp.program_apply_progress
     JOIN bootcamp.program_apply ON (((program_apply.prap_prog_entity_id = program_apply_progress.parog_prog_entity_id) AND (program_apply.prap_user_entity_id = program_apply_progress.parog_user_entity_id))))
     JOIN curriculum.program_entity ON ((program_entity.prog_entity_id = program_apply.prap_prog_entity_id)))
     JOIN users.users ON ((users.user_entity_id = program_apply.prap_user_entity_id)))
     LEFT JOIN users.users_education ON ((users.user_entity_id = users_education.usdu_entity_id)));


ALTER TABLE bootcamp.selectcandidates OWNER TO postgres;

--
-- Name: employee; Type: TABLE; Schema: hr; Owner: postgres
--

CREATE TABLE hr.employee (
    emp_entity_id integer NOT NULL,
    emp_emp_number character varying(25),
    emp_national_id character varying(25),
    emp_birth_date date NOT NULL,
    emp_marital_status character(1),
    emp_gender character(1),
    emp_hire_date date,
    emp_salaried_flag character(1),
    emp_vacation_hours smallint,
    emp_sickleave_hours smallint,
    emp_current_flag smallint,
    emp_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    emp_type character varying(15),
    emp_joro_id integer,
    emp_emp_entity_id integer,
    CONSTRAINT employee_emp_current_flag_check CHECK ((emp_current_flag = ANY (ARRAY[0, 1]))),
    CONSTRAINT employee_emp_gender_check CHECK ((emp_gender = ANY (ARRAY['M'::bpchar, 'F'::bpchar]))),
    CONSTRAINT employee_emp_marital_status_check CHECK ((emp_marital_status = ANY (ARRAY['M'::bpchar, 'S'::bpchar]))),
    CONSTRAINT employee_emp_salaried_flag_check CHECK ((emp_salaried_flag = ANY (ARRAY['0'::bpchar, '1'::bpchar]))),
    CONSTRAINT employee_emp_type_check CHECK (((emp_type)::text = ANY (ARRAY[('internal'::character varying)::text, ('outsource'::character varying)::text])))
);


ALTER TABLE hr.employee OWNER TO postgres;

--
-- Name: selecttalent; Type: VIEW; Schema: bootcamp; Owner: postgres
--

CREATE VIEW bootcamp.selecttalent AS
 SELECT batch.batch_id,
    batch.batch_name,
    batch.batch_entity_id,
    batch.batch_start_date,
    batch.batch_end_date,
    batch_trainee.batr_review,
    users.user_entity_id,
    program_entity.prog_title AS technology,
    concat(users.user_first_name, ' ', users.user_last_name) AS fullname,
    ( SELECT string_agg((batch_trainee_evaluation.btev_skill)::text, ', '::text) AS skills
           FROM bootcamp.batch_trainee_evaluation) AS skills,
    ( SELECT concat(users_1.user_first_name, ' ', users_1.user_last_name) AS concat
           FROM ((bootcamp.trainer_programs
             JOIN hr.employee ON ((trainer_programs.tpro_emp_entity_id = employee.emp_entity_id)))
             JOIN users.users users_1 ON ((users_1.user_entity_id = employee.emp_entity_id)))
          WHERE ((trainer_programs.batch_id = batch.batch_id) AND (program_entity.prog_entity_id = batch.batch_entity_id))
          ORDER BY users_1.user_entity_id
         LIMIT 1) AS trainer
   FROM (((bootcamp.batch
     JOIN bootcamp.batch_trainee ON ((batch.batch_id = batch_trainee.batr_batch_id)))
     JOIN users.users ON ((users.user_entity_id = batch_trainee.batr_trainee_entity_id)))
     JOIN curriculum.program_entity ON ((program_entity.prog_entity_id = batch.batch_entity_id)));


ALTER TABLE bootcamp.selecttalent OWNER TO postgres;

--
-- Name: talents; Type: TABLE; Schema: bootcamp; Owner: postgres
--

CREATE TABLE bootcamp.talents (
    talent_id integer NOT NULL,
    talent_fullname character varying(100),
    talent_user_entity_id integer,
    talent_technology integer,
    talent_batch_id integer,
    talent_start_date date,
    talent_end_date date,
    talent_trainer character varying(30),
    talent_skill text,
    talent_status character varying(20),
    CONSTRAINT talents_talent_status_check CHECK (((talent_status)::text = ANY (ARRAY[('idle'::character varying)::text, ('placement'::character varying)::text, ('trial'::character varying)::text])))
);


ALTER TABLE bootcamp.talents OWNER TO postgres;

--
-- Name: talents_talent_id_seq; Type: SEQUENCE; Schema: bootcamp; Owner: postgres
--

CREATE SEQUENCE bootcamp.talents_talent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bootcamp.talents_talent_id_seq OWNER TO postgres;

--
-- Name: talents_talent_id_seq; Type: SEQUENCE OWNED BY; Schema: bootcamp; Owner: postgres
--

ALTER SEQUENCE bootcamp.talents_talent_id_seq OWNED BY bootcamp.talents.talent_id;


--
-- Name: program_entity_description; Type: TABLE; Schema: curriculum; Owner: postgres
--

CREATE TABLE curriculum.program_entity_description (
    pred_prog_entity_id integer NOT NULL,
    pred_item_learning json,
    pred_item_include json,
    pred_requirement json,
    pred_description json,
    pred_target_level json
);


ALTER TABLE curriculum.program_entity_description OWNER TO postgres;

--
-- Name: program_entity_prog_entity_id_seq; Type: SEQUENCE; Schema: curriculum; Owner: postgres
--

CREATE SEQUENCE curriculum.program_entity_prog_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE curriculum.program_entity_prog_entity_id_seq OWNER TO postgres;

--
-- Name: program_entity_prog_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: curriculum; Owner: postgres
--

ALTER SEQUENCE curriculum.program_entity_prog_entity_id_seq OWNED BY curriculum.program_entity.prog_entity_id;


--
-- Name: program_reviews; Type: TABLE; Schema: curriculum; Owner: postgres
--

CREATE TABLE curriculum.program_reviews (
    prow_user_entity_id integer NOT NULL,
    prow_prog_entity_id integer NOT NULL,
    prow_review character varying(512),
    prow_rating integer,
    prow_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE curriculum.program_reviews OWNER TO postgres;

--
-- Name: section_detail; Type: TABLE; Schema: curriculum; Owner: postgres
--

CREATE TABLE curriculum.section_detail (
    secd_id integer NOT NULL,
    secd_title character varying(256),
    secd_preview character(1),
    secd_score integer,
    secd_note character varying(256),
    secd_minute integer,
    secd_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    secd_sect_id integer,
    CONSTRAINT section_detail_secd_preview_check CHECK ((secd_preview = ANY (ARRAY['0'::bpchar, '1'::bpchar])))
);


ALTER TABLE curriculum.section_detail OWNER TO postgres;

--
-- Name: section_detail_material; Type: TABLE; Schema: curriculum; Owner: postgres
--

CREATE TABLE curriculum.section_detail_material (
    sedm_id integer NOT NULL,
    sedm_filename character varying(55),
    sedm_filesize integer,
    sedm_filetype character varying(15),
    sedm_filelink character varying(255),
    sedm_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    sedm_secd_id integer NOT NULL,
    CONSTRAINT section_detail_material_sedm_filetype_check CHECK (((sedm_filetype)::text = ANY (ARRAY[('video'::character varying)::text, ('image'::character varying)::text, ('text'::character varying)::text, ('link'::character varying)::text])))
);


ALTER TABLE curriculum.section_detail_material OWNER TO postgres;

--
-- Name: section_detail_material_sedm_id_seq; Type: SEQUENCE; Schema: curriculum; Owner: postgres
--

CREATE SEQUENCE curriculum.section_detail_material_sedm_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE curriculum.section_detail_material_sedm_id_seq OWNER TO postgres;

--
-- Name: section_detail_material_sedm_id_seq; Type: SEQUENCE OWNED BY; Schema: curriculum; Owner: postgres
--

ALTER SEQUENCE curriculum.section_detail_material_sedm_id_seq OWNED BY curriculum.section_detail_material.sedm_id;


--
-- Name: section_detail_material_sedm_secd_id_seq; Type: SEQUENCE; Schema: curriculum; Owner: postgres
--

CREATE SEQUENCE curriculum.section_detail_material_sedm_secd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE curriculum.section_detail_material_sedm_secd_id_seq OWNER TO postgres;

--
-- Name: section_detail_material_sedm_secd_id_seq; Type: SEQUENCE OWNED BY; Schema: curriculum; Owner: postgres
--

ALTER SEQUENCE curriculum.section_detail_material_sedm_secd_id_seq OWNED BY curriculum.section_detail_material.sedm_secd_id;


--
-- Name: section_detail_secd_id_seq; Type: SEQUENCE; Schema: curriculum; Owner: postgres
--

CREATE SEQUENCE curriculum.section_detail_secd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE curriculum.section_detail_secd_id_seq OWNER TO postgres;

--
-- Name: section_detail_secd_id_seq; Type: SEQUENCE OWNED BY; Schema: curriculum; Owner: postgres
--

ALTER SEQUENCE curriculum.section_detail_secd_id_seq OWNED BY curriculum.section_detail.secd_id;


--
-- Name: sections; Type: TABLE; Schema: curriculum; Owner: postgres
--

CREATE TABLE curriculum.sections (
    sect_id integer NOT NULL,
    sect_prog_entity_id integer NOT NULL,
    sect_title character varying(100),
    sect_description character varying(256),
    sect_total_section integer DEFAULT 0,
    sect_total_lecture integer DEFAULT 0,
    sect_total_minute integer DEFAULT 0,
    sect_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE curriculum.sections OWNER TO postgres;

--
-- Name: sections_sect_id_seq; Type: SEQUENCE; Schema: curriculum; Owner: postgres
--

CREATE SEQUENCE curriculum.sections_sect_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE curriculum.sections_sect_id_seq OWNER TO postgres;

--
-- Name: sections_sect_id_seq; Type: SEQUENCE OWNED BY; Schema: curriculum; Owner: postgres
--

ALTER SEQUENCE curriculum.sections_sect_id_seq OWNED BY curriculum.sections.sect_id;


--
-- Name: department; Type: TABLE; Schema: hr; Owner: postgres
--

CREATE TABLE hr.department (
    dept_id integer NOT NULL,
    dept_name character varying(50),
    dept_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE hr.department OWNER TO postgres;

--
-- Name: department_dept_id_seq; Type: SEQUENCE; Schema: hr; Owner: postgres
--

CREATE SEQUENCE hr.department_dept_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hr.department_dept_id_seq OWNER TO postgres;

--
-- Name: department_dept_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: postgres
--

ALTER SEQUENCE hr.department_dept_id_seq OWNED BY hr.department.dept_id;


--
-- Name: employee_client_contract; Type: TABLE; Schema: hr; Owner: postgres
--

CREATE TABLE hr.employee_client_contract (
    ecco_id integer NOT NULL,
    ecco_entity_id integer NOT NULL,
    ecco_contract_no character varying(55),
    ecco_contract_date timestamp with time zone DEFAULT '2023-06-26 08:45:36.955864+07'::timestamp with time zone,
    ecco_start_date timestamp with time zone,
    ecco_end_date timestamp with time zone,
    ecco_notes character varying(512),
    ecco_modified_date timestamp with time zone DEFAULT '2023-06-26 08:45:36.955864+07'::timestamp with time zone,
    ecco_media_link character varying(255),
    ecco_status character varying(15),
    ecco_joty_id integer,
    ecco_account_manager integer,
    ecco_clit_id integer,
    CONSTRAINT employee_client_contract_ecco_status_check CHECK (((ecco_status)::text = ANY (ARRAY[('onsite'::character varying)::text, ('online'::character varying)::text, ('hybrid'::character varying)::text])))
);


ALTER TABLE hr.employee_client_contract OWNER TO postgres;

--
-- Name: employee_client_contract_ecco_id_seq; Type: SEQUENCE; Schema: hr; Owner: postgres
--

CREATE SEQUENCE hr.employee_client_contract_ecco_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hr.employee_client_contract_ecco_id_seq OWNER TO postgres;

--
-- Name: employee_client_contract_ecco_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: postgres
--

ALTER SEQUENCE hr.employee_client_contract_ecco_id_seq OWNED BY hr.employee_client_contract.ecco_id;


--
-- Name: employee_department_history; Type: TABLE; Schema: hr; Owner: postgres
--

CREATE TABLE hr.employee_department_history (
    edhi_id integer NOT NULL,
    edhi_entity_id integer NOT NULL,
    edhi_start_date date,
    edhi_end_date date,
    edhi_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    edhi_dept_id integer
);


ALTER TABLE hr.employee_department_history OWNER TO postgres;

--
-- Name: employee_department_history_edhi_id_seq; Type: SEQUENCE; Schema: hr; Owner: postgres
--

CREATE SEQUENCE hr.employee_department_history_edhi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE hr.employee_department_history_edhi_id_seq OWNER TO postgres;

--
-- Name: employee_department_history_edhi_id_seq; Type: SEQUENCE OWNED BY; Schema: hr; Owner: postgres
--

ALTER SEQUENCE hr.employee_department_history_edhi_id_seq OWNED BY hr.employee_department_history.edhi_id;


--
-- Name: employee_pay_history; Type: TABLE; Schema: hr; Owner: postgres
--

CREATE TABLE hr.employee_pay_history (
    ephi_entity_id integer NOT NULL,
    ephi_rate_change_date date NOT NULL,
    ephi_rate_salary numeric,
    ephi_pay_frequence smallint,
    ephi_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT employee_pay_history_ephi_pay_frequence_check CHECK ((ephi_pay_frequence = ANY (ARRAY[1, 2])))
);


ALTER TABLE hr.employee_pay_history OWNER TO postgres;

--
-- Name: employeedepartmenthistory; Type: VIEW; Schema: hr; Owner: postgres
--

CREATE VIEW hr.employeedepartmenthistory AS
 SELECT employee_department_history.edhi_entity_id,
    employee_department_history.edhi_start_date,
    employee_department_history.edhi_end_date,
    department.dept_name
   FROM (hr.employee_department_history
     JOIN hr.department ON ((employee_department_history.edhi_dept_id = department.dept_id)));


ALTER TABLE hr.employeedepartmenthistory OWNER TO postgres;

--
-- Name: users_email; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users_email (
    pmail_entity_id integer NOT NULL,
    pmail_id integer NOT NULL,
    pmail_address character varying(50),
    pmail_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE users.users_email OWNER TO postgres;

--
-- Name: users_phones; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users_phones (
    uspo_entity_id integer NOT NULL,
    uspo_number character varying(15) NOT NULL,
    uspo_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    uspo_ponty_code character varying(15)
);


ALTER TABLE users.users_phones OWNER TO postgres;

--
-- Name: generate; Type: VIEW; Schema: hr; Owner: postgres
--

CREATE VIEW hr.generate AS
 SELECT u.user_entity_id,
    u.user_name,
    u.user_password,
    u.user_first_name,
    u.user_last_name,
    u.user_birth_date,
    u.user_email_promotion,
    u.user_demographic,
    u.user_photo,
    u.user_current_role,
    p.uspo_number,
    e.pmail_address
   FROM ((users.users u
     JOIN users.users_email e ON ((u.user_entity_id = e.pmail_entity_id)))
     JOIN users.users_phones p ON ((u.user_entity_id = p.uspo_entity_id)))
  WHERE (u.user_current_role = 1);


ALTER TABLE hr.generate OWNER TO postgres;

--
-- Name: job_post_jopo_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.job_post_jopo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.job_post_jopo_id_seq OWNER TO postgres;

--
-- Name: job_post; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.job_post (
    jopo_entity_id integer NOT NULL,
    jopo_number character varying(25),
    jopo_title character varying(256),
    jopo_start_date date,
    jopo_end_date date,
    jopo_min_salary numeric,
    jopo_max_salary numeric,
    jopo_min_experience integer,
    jopo_max_experience integer,
    jopo_primary_skill character varying(256),
    jopo_secondary_skill character varying(256),
    jopo_publish_date date,
    jopo_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    jopo_emp_entity_id integer,
    jopo_clit_id integer,
    jopo_joro_id integer,
    jopo_joty_id integer,
    jopo_joca_id integer,
    jopo_addr_id integer,
    jopo_work_code character varying(15),
    jopo_edu_code character varying(15),
    jopo_status character varying(15) NOT NULL,
    jopo_id integer DEFAULT nextval('job_hire.job_post_jopo_id_seq'::regclass) NOT NULL,
    jopo_open character(1) DEFAULT 1 NOT NULL,
    CONSTRAINT job_post_jopo_open_check CHECK ((jopo_open = ANY (ARRAY['0'::bpchar, '1'::bpchar]))),
    CONSTRAINT job_post_jopo_status_check CHECK (((jopo_status)::text = ANY (ARRAY[('publish'::character varying)::text, ('draft'::character varying)::text, ('cancelled'::character varying)::text, ('remove'::character varying)::text])))
);


ALTER TABLE job_hire.job_post OWNER TO postgres;

--
-- Name: talent_apply; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.talent_apply (
    taap_user_entity_id integer NOT NULL,
    taap_entity_id integer NOT NULL,
    taap_intro character varying(512),
    taap_scoring integer,
    taap_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    taap_status character varying(15),
    CONSTRAINT taap_status_check CHECK (((taap_status)::text = ANY (ARRAY[('apply'::character varying)::text, ('filtering test'::character varying)::text, ('interview'::character varying)::text, ('succeed'::character varying)::text, ('failed'::character varying)::text])))
);


ALTER TABLE job_hire.talent_apply OWNER TO postgres;

--
-- Name: talent_apply_progress; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.talent_apply_progress (
    tapr_id integer NOT NULL,
    tapr_taap_user_entity_id integer NOT NULL,
    tapr_taap_entity_id integer NOT NULL,
    tapr_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    tapr_status character varying(15),
    tapr_comment character varying(256),
    tapr_progress_name character varying(55),
    CONSTRAINT talent_apply_progress_tapr_status_check CHECK (((tapr_status)::text = ANY (ARRAY[('Open'::character varying)::text, ('Waiting'::character varying)::text, ('Done'::character varying)::text, ('Cancelled'::character varying)::text, ('Closed'::character varying)::text])))
);


ALTER TABLE job_hire.talent_apply_progress OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.roles (
    role_id integer NOT NULL,
    role_name character varying(35),
    role_type character varying(15),
    role_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE users.roles OWNER TO postgres;

--
-- Name: users_roles; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users_roles (
    usro_entity_id integer NOT NULL,
    usro_role_id integer NOT NULL,
    usro_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE users.users_roles OWNER TO postgres;

--
-- Name: pro_candidate_view; Type: VIEW; Schema: hr; Owner: postgres
--

CREATE VIEW hr.pro_candidate_view AS
 SELECT talent_apply.taap_user_entity_id,
    talent_apply.taap_entity_id,
    talent_apply.taap_scoring,
    talent_apply.taap_modified_date,
    talent_apply.taap_status,
    talent_apply_progress.tapr_id,
    talent_apply_progress.tapr_status,
    talent_apply_progress.tapr_comment,
    talent_apply_progress.tapr_progress_name,
    job_post.jopo_title,
    job_post.jopo_clit_id,
    users.user_entity_id,
    users.user_name,
    users.user_first_name,
    users.user_last_name,
    users.user_photo,
    users.user_birth_date,
    users_roles.usro_role_id,
    roles.role_name,
    users_email.pmail_address,
    users_phones.uspo_number,
    users_phones.uspo_ponty_code
   FROM (((((((job_hire.talent_apply
     JOIN job_hire.talent_apply_progress ON ((talent_apply.taap_user_entity_id = talent_apply_progress.tapr_taap_user_entity_id)))
     JOIN job_hire.job_post ON ((talent_apply.taap_entity_id = job_post.jopo_entity_id)))
     JOIN users.users ON ((talent_apply.taap_user_entity_id = users.user_entity_id)))
     JOIN users.users_email ON ((users.user_entity_id = users_email.pmail_entity_id)))
     JOIN users.users_phones ON ((users.user_entity_id = users_phones.uspo_entity_id)))
     JOIN users.users_roles ON ((users.user_entity_id = users_roles.usro_entity_id)))
     JOIN users.roles ON ((users_roles.usro_role_id = roles.role_id)));


ALTER TABLE hr.pro_candidate_view OWNER TO postgres;

--
-- Name: talentsview; Type: VIEW; Schema: hr; Owner: postgres
--

CREATE VIEW hr.talentsview AS
 SELECT u.user_entity_id,
    u.user_name,
    u.user_password,
    u.user_first_name,
    u.user_last_name,
    u.user_birth_date,
    u.user_email_promotion,
    u.user_demographic,
    u.user_modified_date,
    u.user_photo,
    u.user_current_role,
    ta.talent_id,
    ta.talent_fullname,
    ta.talent_technology,
    ta.talent_batch_id,
    ba.batch_name,
    ta.talent_start_date,
    ta.talent_end_date,
    ta.talent_trainer,
    ta.talent_skill,
    ta.talent_status,
    cu.prog_headline
   FROM (((users.users u
     JOIN bootcamp.talents ta ON ((u.user_entity_id = ta.talent_user_entity_id)))
     JOIN curriculum.program_entity cu ON ((ta.talent_technology = cu.prog_entity_id)))
     JOIN bootcamp.batch ba ON ((ba.batch_id = ta.talent_batch_id)))
  WHERE ((ta.talent_status)::text = 'idle'::text);


ALTER TABLE hr.talentsview OWNER TO postgres;

--
-- Name: job_role; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.job_role (
    joro_id integer NOT NULL,
    joro_name character varying(55),
    joro_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE master.job_role OWNER TO postgres;

--
-- Name: viewalldataemployee; Type: VIEW; Schema: hr; Owner: postgres
--

CREATE VIEW hr.viewalldataemployee AS
 SELECT users.user_entity_id,
    users.user_name,
    users.user_password,
    users.user_first_name,
    users.user_last_name,
    users.user_birth_date,
    users.user_email_promotion,
    users.user_demographic,
    users.user_modified_date,
    users.user_photo,
    users.user_current_role,
    users_phones.uspo_number,
    users_email.pmail_address,
    employee.emp_entity_id,
    employee.emp_emp_number,
    employee.emp_national_id,
    employee.emp_birth_date,
    employee.emp_marital_status,
    employee.emp_gender,
    employee.emp_hire_date,
    employee_department_history.edhi_end_date,
    employee.emp_salaried_flag,
    employee.emp_vacation_hours,
    employee.emp_sickleave_hours,
    employee.emp_current_flag,
    employee.emp_modified_date,
    employee.emp_type,
    employee.emp_joro_id,
    employee.emp_emp_entity_id,
    employee_department_history.edhi_modified_date,
    department.dept_name,
    job_role.joro_id,
    job_role.joro_name,
    job_role.joro_modified_date
   FROM ((((((users.users
     JOIN hr.employee ON ((users.user_entity_id = employee.emp_entity_id)))
     JOIN hr.employee_department_history ON ((employee.emp_entity_id = employee_department_history.edhi_entity_id)))
     JOIN hr.department ON ((employee_department_history.edhi_dept_id = department.dept_id)))
     JOIN users.users_phones ON ((employee.emp_entity_id = users_phones.uspo_entity_id)))
     JOIN users.users_email ON ((users_phones.uspo_entity_id = users_email.pmail_entity_id)))
     JOIN master.job_role ON ((employee.emp_joro_id = job_role.joro_id)));


ALTER TABLE hr.viewalldataemployee OWNER TO postgres;

--
-- Name: viewallemployee; Type: VIEW; Schema: hr; Owner: postgres
--

CREATE VIEW hr.viewallemployee AS
 SELECT users.user_entity_id,
    users.user_name,
    users.user_password,
    users.user_first_name,
    users.user_last_name,
    users.user_birth_date,
    users.user_email_promotion,
    users.user_demographic,
    users.user_modified_date,
    users.user_photo,
    users.user_current_role,
    users_phones.uspo_number,
    users_email.pmail_address,
    employee.emp_entity_id,
    employee.emp_emp_number,
    employee.emp_national_id,
    employee.emp_birth_date,
    employee.emp_marital_status,
    employee.emp_gender,
    employee.emp_hire_date,
    employee.emp_salaried_flag,
    employee.emp_vacation_hours,
    employee.emp_sickleave_hours,
    employee.emp_current_flag,
    employee.emp_modified_date,
    employee.emp_type,
    employee.emp_joro_id,
    employee.emp_emp_entity_id,
    job_role.joro_id,
    job_role.joro_name,
    job_role.joro_modified_date
   FROM ((((users.users
     JOIN hr.employee ON ((users.user_entity_id = employee.emp_entity_id)))
     JOIN users.users_phones ON ((employee.emp_entity_id = users_phones.uspo_entity_id)))
     JOIN users.users_email ON ((users_phones.uspo_entity_id = users_email.pmail_entity_id)))
     JOIN master.job_role ON ((employee.emp_joro_id = job_role.joro_id)));


ALTER TABLE hr.viewallemployee OWNER TO postgres;

--
-- Name: client; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.client (
    clit_id integer NOT NULL,
    clit_name character varying(256),
    clit_about character varying(512),
    clit_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    clit_addr_id integer,
    clit_emra_id integer,
    clit_indu_code character varying(15)
);


ALTER TABLE job_hire.client OWNER TO postgres;

--
-- Name: client_clit_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.client_clit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.client_clit_id_seq OWNER TO postgres;

--
-- Name: client_clit_id_seq; Type: SEQUENCE OWNED BY; Schema: job_hire; Owner: postgres
--

ALTER SEQUENCE job_hire.client_clit_id_seq OWNED BY job_hire.client.clit_id;


--
-- Name: employee_range; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.employee_range (
    emra_id integer NOT NULL,
    emra_range_min integer,
    emra_range_max integer,
    emra_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE job_hire.employee_range OWNER TO postgres;

--
-- Name: address; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.address (
    addr_id integer NOT NULL,
    addr_line1 character varying(255),
    addr_line2 character varying(255),
    addr_postal_code character varying(10),
    addr_spatial_location json,
    addr_modifed_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    addr_city_id integer
);


ALTER TABLE master.address OWNER TO postgres;

--
-- Name: city; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.city (
    city_id integer NOT NULL,
    city_name character varying(155),
    city_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    city_prov_id integer
);


ALTER TABLE master.city OWNER TO postgres;

--
-- Name: country; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.country (
    country_code character varying(3) NOT NULL,
    country_name character varying(85),
    country_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE master.country OWNER TO postgres;

--
-- Name: industry; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.industry (
    indu_code character varying(5) NOT NULL,
    indu_name character varying(85)
);


ALTER TABLE master.industry OWNER TO postgres;

--
-- Name: province; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.province (
    prov_id integer NOT NULL,
    prov_code character varying(5),
    prov_name character varying(85),
    prov_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    prov_country_code character varying(3)
);


ALTER TABLE master.province OWNER TO postgres;

--
-- Name: client_view; Type: VIEW; Schema: job_hire; Owner: postgres
--

CREATE VIEW job_hire.client_view AS
 SELECT client.clit_id,
    client.clit_name,
    client.clit_about,
    client.clit_modified_date,
    client.clit_addr_id,
    client.clit_emra_id,
    client.clit_indu_code,
    employee_range.emra_id,
    employee_range.emra_range_min,
    employee_range.emra_range_max,
    employee_range.emra_modified_date,
    industry.indu_code,
    industry.indu_name,
    address.addr_id,
    address.addr_line1,
    address.addr_line2,
    address.addr_postal_code,
    address.addr_spatial_location,
    address.addr_modifed_date,
    address.addr_city_id,
    city.city_id,
    city.city_name,
    city.city_modified_date,
    city.city_prov_id,
    province.prov_id,
    province.prov_code,
    province.prov_name,
    province.prov_modified_date,
    province.prov_country_code,
    country.country_code,
    country.country_name,
    country.country_modified_date
   FROM ((((((job_hire.client
     JOIN job_hire.employee_range ON ((client.clit_emra_id = employee_range.emra_id)))
     JOIN master.industry ON (((client.clit_indu_code)::text = (industry.indu_code)::text)))
     JOIN master.address ON ((client.clit_addr_id = address.addr_id)))
     JOIN master.city ON ((address.addr_city_id = city.city_id)))
     JOIN master.province ON ((city.city_prov_id = province.prov_id)))
     JOIN master.country ON (((country.country_code)::text = (province.prov_country_code)::text)));


ALTER TABLE job_hire.client_view OWNER TO postgres;

--
-- Name: employee_range_emra_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.employee_range_emra_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.employee_range_emra_id_seq OWNER TO postgres;

--
-- Name: employee_range_emra_id_seq; Type: SEQUENCE OWNED BY; Schema: job_hire; Owner: postgres
--

ALTER SEQUENCE job_hire.employee_range_emra_id_seq OWNED BY job_hire.employee_range.emra_id;


--
-- Name: job_category; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.job_category (
    joca_id integer NOT NULL,
    joca_name character varying(255),
    joca_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE job_hire.job_category OWNER TO postgres;

--
-- Name: job_category_joca_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.job_category_joca_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.job_category_joca_id_seq OWNER TO postgres;

--
-- Name: job_category_joca_id_seq; Type: SEQUENCE OWNED BY; Schema: job_hire; Owner: postgres
--

ALTER SEQUENCE job_hire.job_category_joca_id_seq OWNED BY job_hire.job_category.joca_id;


--
-- Name: job_photo; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.job_photo (
    jopho_id integer NOT NULL,
    jopho_filename character varying(55),
    jopho_filesize integer,
    jopho_filetype character varying(15),
    jopho_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    jopho_entity_id integer,
    CONSTRAINT job_photo_jopho_filetype_check CHECK (((jopho_filetype)::text = ANY (ARRAY[('png'::character varying)::text, ('jpg'::character varying)::text, ('jpeg'::character varying)::text])))
);


ALTER TABLE job_hire.job_photo OWNER TO postgres;

--
-- Name: job_post_desc; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.job_post_desc (
    jopo_entity_id integer NOT NULL,
    jopo_description json,
    jopo_responsibility json,
    jopo_target json,
    jopo_benefit json
);


ALTER TABLE job_hire.job_post_desc OWNER TO postgres;

--
-- Name: job_list_view; Type: VIEW; Schema: job_hire; Owner: postgres
--

CREATE VIEW job_hire.job_list_view AS
 SELECT jopo.jopo_entity_id,
    jopo.jopo_number,
    jopo.jopo_title,
    jopo.jopo_start_date,
    jopo.jopo_end_date,
    jopo.jopo_min_salary,
    jopo.jopo_max_salary,
    jopo.jopo_min_experience,
    jopo.jopo_max_experience,
    jopo.jopo_primary_skill,
    jopo.jopo_secondary_skill,
    jopo.jopo_publish_date,
    jopo.jopo_clit_id,
    jopo.jopo_joro_id,
    joro.joro_name,
    jopo.jopo_joty_id,
    jopo.jopo_joca_id,
    jopo.jopo_addr_id,
    jopo.jopo_work_code,
    jopo.jopo_edu_code,
    jopo.jopo_status,
    jopo.jopo_id,
    jopo.jopo_open,
    jopo.jopo_emp_entity_id,
    jopo.jopo_modified_date,
    jode.jopo_description,
    jode.jopo_target,
    jode.jopo_benefit,
    jopho.jopho_id,
    jopho.jopho_filename,
    jopho.jopho_filesize,
    jopho.jopho_filetype,
    clit.clit_id,
    clit.clit_name,
    clit.clit_about,
    clit.clit_addr_id,
    clit.clit_emra_id,
    clit.clit_indu_code,
    addr.addr_id,
    addr.addr_line1,
    addr.addr_line2,
    addr.addr_postal_code,
    addr.addr_spatial_location,
    addr.addr_city_id,
    city.city_id,
    city.city_name,
    city.city_prov_id
   FROM ((((((job_hire.job_post jopo
     JOIN job_hire.job_post_desc jode ON ((jopo.jopo_entity_id = jode.jopo_entity_id)))
     JOIN job_hire.job_photo jopho ON ((jopo.jopo_entity_id = jopho.jopho_entity_id)))
     JOIN job_hire.client clit ON ((jopo.jopo_clit_id = clit.clit_id)))
     JOIN master.address addr ON ((clit.clit_addr_id = addr.addr_id)))
     JOIN master.city city ON ((addr.addr_city_id = city.city_id)))
     JOIN master.job_role joro ON ((jopo.jopo_joro_id = joro.joro_id)));


ALTER TABLE job_hire.job_list_view OWNER TO postgres;

--
-- Name: job_photo_jopho_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.job_photo_jopho_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.job_photo_jopho_id_seq OWNER TO postgres;

--
-- Name: job_photo_jopho_id_seq; Type: SEQUENCE OWNED BY; Schema: job_hire; Owner: postgres
--

ALTER SEQUENCE job_hire.job_photo_jopho_id_seq OWNED BY job_hire.job_photo.jopho_id;


--
-- Name: job_post_jopo_entity_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.job_post_jopo_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.job_post_jopo_entity_id_seq OWNER TO postgres;

--
-- Name: job_post_jopo_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: job_hire; Owner: postgres
--

ALTER SEQUENCE job_hire.job_post_jopo_entity_id_seq OWNED BY job_hire.job_post.jopo_entity_id;


--
-- Name: pro_candidate_view; Type: VIEW; Schema: job_hire; Owner: postgres
--

CREATE VIEW job_hire.pro_candidate_view AS
 SELECT talent_apply.taap_user_entity_id,
    talent_apply.taap_entity_id,
    talent_apply.taap_scoring,
    talent_apply.taap_modified_date,
    talent_apply.taap_status,
    talent_apply_progress.tapr_id,
    talent_apply_progress.tapr_status,
    talent_apply_progress.tapr_comment,
    talent_apply_progress.tapr_progress_name,
    job_post.jopo_title,
    job_post.jopo_clit_id,
    users.user_entity_id,
    users.user_name,
    users.user_first_name,
    users.user_last_name,
    users.user_photo,
    users_email.pmail_address,
    users_phones.uspo_number,
    users_phones.uspo_ponty_code
   FROM (((((job_hire.talent_apply
     JOIN job_hire.talent_apply_progress ON ((talent_apply.taap_user_entity_id = talent_apply_progress.tapr_taap_user_entity_id)))
     JOIN job_hire.job_post ON ((talent_apply.taap_entity_id = job_post.jopo_entity_id)))
     JOIN users.users ON ((talent_apply.taap_user_entity_id = users.user_entity_id)))
     JOIN users.users_email ON ((users.user_entity_id = users_email.pmail_entity_id)))
     JOIN users.users_phones ON ((users.user_entity_id = users_phones.uspo_entity_id)));


ALTER TABLE job_hire.pro_candidate_view OWNER TO postgres;

--
-- Name: talent_apply_progress_tapr_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.talent_apply_progress_tapr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.talent_apply_progress_tapr_id_seq OWNER TO postgres;

--
-- Name: talent_apply_progress_tapr_id_seq; Type: SEQUENCE OWNED BY; Schema: job_hire; Owner: postgres
--

ALTER SEQUENCE job_hire.talent_apply_progress_tapr_id_seq OWNED BY job_hire.talent_apply_progress.tapr_id;


--
-- Name: address_addr_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.address_addr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.address_addr_id_seq OWNER TO postgres;

--
-- Name: address_addr_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.address_addr_id_seq OWNED BY master.address.addr_id;


--
-- Name: address_type; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.address_type (
    adty_id integer NOT NULL,
    adty_name character varying(15),
    adty_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE master.address_type OWNER TO postgres;

--
-- Name: address_type_adty_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.address_type_adty_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.address_type_adty_id_seq OWNER TO postgres;

--
-- Name: address_type_adty_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.address_type_adty_id_seq OWNED BY master.address_type.adty_id;


--
-- Name: category; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.category (
    cate_id integer NOT NULL,
    cate_name character varying(255),
    cate_cate_id integer,
    cate_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE master.category OWNER TO postgres;

--
-- Name: category_cate_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.category_cate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.category_cate_id_seq OWNER TO postgres;

--
-- Name: category_cate_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.category_cate_id_seq OWNED BY master.category.cate_id;


--
-- Name: city_city_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.city_city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.city_city_id_seq OWNER TO postgres;

--
-- Name: city_city_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.city_city_id_seq OWNED BY master.city.city_id;


--
-- Name: cityprov; Type: VIEW; Schema: master; Owner: postgres
--

CREATE VIEW master.cityprov AS
 SELECT city.city_id,
    city.city_name,
    province.prov_name
   FROM (master.city
     JOIN master.province ON ((city.city_prov_id = province.prov_id)));


ALTER TABLE master.cityprov OWNER TO postgres;

--
-- Name: education; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.education (
    edu_code character varying(5) NOT NULL,
    edu_name character varying(55)
);


ALTER TABLE master.education OWNER TO postgres;

--
-- Name: getprovinces; Type: VIEW; Schema: master; Owner: postgres
--

CREATE VIEW master.getprovinces AS
 SELECT country.country_name,
    province.prov_id,
    province.prov_name,
    province.prov_code,
    country.country_code
   FROM (master.country
     JOIN master.province ON (((country.country_code)::text = (province.prov_country_code)::text)));


ALTER TABLE master.getprovinces OWNER TO postgres;

--
-- Name: job_role_joro_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.job_role_joro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.job_role_joro_id_seq OWNER TO postgres;

--
-- Name: job_role_joro_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.job_role_joro_id_seq OWNED BY master.job_role.joro_id;


--
-- Name: job_type; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.job_type (
    joty_id integer NOT NULL,
    joty_name character varying(55)
);


ALTER TABLE master.job_type OWNER TO postgres;

--
-- Name: job_type_joty_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.job_type_joty_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.job_type_joty_id_seq OWNER TO postgres;

--
-- Name: job_type_joty_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.job_type_joty_id_seq OWNED BY master.job_type.joty_id;


--
-- Name: modules; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.modules (
    module_name character varying(125) NOT NULL
);


ALTER TABLE master.modules OWNER TO postgres;

--
-- Name: province_prov_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.province_prov_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.province_prov_id_seq OWNER TO postgres;

--
-- Name: province_prov_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.province_prov_id_seq OWNED BY master.province.prov_id;


--
-- Name: route_actions; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.route_actions (
    roac_id integer NOT NULL,
    roac_name character varying(15),
    roac_orderby integer,
    roac_display character(1),
    roac_module_name character varying(125),
    CONSTRAINT route_actions_roac_display_check CHECK ((roac_display = ANY (ARRAY['0'::bpchar, '1'::bpchar])))
);


ALTER TABLE master.route_actions OWNER TO postgres;

--
-- Name: route_actions_roac_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.route_actions_roac_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.route_actions_roac_id_seq OWNER TO postgres;

--
-- Name: route_actions_roac_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.route_actions_roac_id_seq OWNED BY master.route_actions.roac_id;


--
-- Name: skill_template; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.skill_template (
    skte_id integer NOT NULL,
    skte_skill character varying(256),
    skte_description character varying(256),
    skte_week integer,
    skte_orderby integer,
    skte_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    skty_name character varying(55),
    skte_skte_id integer
);


ALTER TABLE master.skill_template OWNER TO postgres;

--
-- Name: skill_template_skte_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.skill_template_skte_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.skill_template_skte_id_seq OWNER TO postgres;

--
-- Name: skill_template_skte_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.skill_template_skte_id_seq OWNED BY master.skill_template.skte_id;


--
-- Name: skill_type; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.skill_type (
    skty_name character varying(55) NOT NULL
);


ALTER TABLE master.skill_type OWNER TO postgres;

--
-- Name: status; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.status (
    status character varying(15) NOT NULL,
    status_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE master.status OWNER TO postgres;

--
-- Name: view; Type: VIEW; Schema: master; Owner: postgres
--

CREATE VIEW master.view AS
 SELECT c1.cate_id,
    c1.cate_name,
    c1.cate_cate_id,
    c2.cate_name AS parent_name
   FROM (master.category c1
     LEFT JOIN master.category c2 ON ((c1.cate_cate_id = c2.cate_id)))
  ORDER BY c1.cate_id;


ALTER TABLE master.view OWNER TO postgres;

--
-- Name: working_type; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.working_type (
    woty_code character varying(15) NOT NULL,
    woty_name character varying(55)
);


ALTER TABLE master.working_type OWNER TO postgres;

--
-- Name: bank; Type: TABLE; Schema: payment; Owner: postgres
--

CREATE TABLE payment.bank (
    bank_entity_id integer NOT NULL,
    bank_code character varying(10),
    bank_name character varying(55),
    bank_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE payment.bank OWNER TO postgres;

--
-- Name: fintech; Type: TABLE; Schema: payment; Owner: postgres
--

CREATE TABLE payment.fintech (
    fint_entity_id integer NOT NULL,
    fint_code character varying(10),
    fint_name character varying(55),
    fint_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE payment.fintech OWNER TO postgres;

--
-- Name: transaction_payment; Type: TABLE; Schema: payment; Owner: postgres
--

CREATE TABLE payment.transaction_payment (
    trpa_id integer NOT NULL,
    trpa_code_number character varying(55),
    trpa_order_number character varying(25),
    trpa_debet numeric,
    trpa_credit numeric,
    trpa_type character varying(15),
    trpa_note character varying(255),
    trpa_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    trpa_source_id character varying(25) NOT NULL,
    trpa_target_id character varying(25) NOT NULL,
    trpa_user_entity_id integer,
    CONSTRAINT transaction_payment_trpa_type_check CHECK (((trpa_type)::text = ANY (ARRAY[('topup'::character varying)::text, ('transfer'::character varying)::text, ('order'::character varying)::text, ('refund'::character varying)::text])))
);


ALTER TABLE payment.transaction_payment OWNER TO postgres;

--
-- Name: transaction_history; Type: VIEW; Schema: payment; Owner: postgres
--

CREATE VIEW payment.transaction_history AS
 SELECT tp.trpa_code_number,
    tp.trpa_modified_date,
    tp.trpa_debet,
    tp.trpa_credit,
    tp.trpa_note,
    tp.trpa_source_id,
    tp.trpa_target_id,
    tp.trpa_type,
    concat(u.user_first_name, ' ', u.user_last_name) AS "user"
   FROM (payment.transaction_payment tp
     JOIN users.users u ON ((tp.trpa_user_entity_id = u.user_entity_id)));


ALTER TABLE payment.transaction_history OWNER TO postgres;

--
-- Name: transaction_payment_trpa_id_seq; Type: SEQUENCE; Schema: payment; Owner: postgres
--

CREATE SEQUENCE payment.transaction_payment_trpa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE payment.transaction_payment_trpa_id_seq OWNER TO postgres;

--
-- Name: transaction_payment_trpa_id_seq; Type: SEQUENCE OWNED BY; Schema: payment; Owner: postgres
--

ALTER SEQUENCE payment.transaction_payment_trpa_id_seq OWNED BY payment.transaction_payment.trpa_id;


--
-- Name: users_account; Type: TABLE; Schema: payment; Owner: postgres
--

CREATE TABLE payment.users_account (
    usac_bank_entity_id integer NOT NULL,
    usac_fint_entity_id integer,
    usac_user_entity_id integer NOT NULL,
    usac_account_number character varying(25),
    usac_saldo numeric,
    usac_type character varying(15),
    usac_start_date timestamp with time zone,
    usac_end_date timestamp with time zone,
    usac_modified_date timestamp with time zone DEFAULT now(),
    usac_status character varying(15),
    CONSTRAINT users_account_usac_status_check CHECK (((usac_status)::text = ANY (ARRAY[('active'::character varying)::text, ('inactive'::character varying)::text, ('blokir'::character varying)::text]))),
    CONSTRAINT users_account_usac_type_check CHECK (((usac_type)::text = ANY (ARRAY[('debet'::character varying)::text, ('credit card'::character varying)::text, ('payment'::character varying)::text])))
);


ALTER TABLE payment.users_account OWNER TO postgres;

--
-- Name: ussersaccount; Type: VIEW; Schema: payment; Owner: postgres
--

CREATE VIEW payment.ussersaccount AS
 SELECT ua.usac_user_entity_id,
    ua.usac_account_number,
    f.fint_name AS account_name,
    ua.usac_saldo AS balance,
    ua.usac_type
   FROM (payment.users_account ua
     JOIN payment.fintech f ON ((ua.usac_fint_entity_id = f.fint_entity_id)))
UNION ALL
 SELECT ua.usac_user_entity_id,
    ua.usac_account_number,
    b.bank_name AS account_name,
    ua.usac_saldo AS balance,
    ua.usac_type
   FROM (payment.users_account ua
     JOIN payment.bank b ON ((ua.usac_bank_entity_id = b.bank_entity_id)));


ALTER TABLE payment.ussersaccount OWNER TO postgres;

--
-- Name: cart_items; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.cart_items (
    cait_id integer NOT NULL,
    cait_quantity integer,
    cait_unit_price numeric,
    cait_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    cait_user_entity_id integer,
    cait_prog_entity_id integer
);


ALTER TABLE sales.cart_items OWNER TO postgres;

--
-- Name: cart_items_cait_id_seq; Type: SEQUENCE; Schema: sales; Owner: postgres
--

CREATE SEQUENCE sales.cart_items_cait_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sales.cart_items_cait_id_seq OWNER TO postgres;

--
-- Name: cart_items_cait_id_seq; Type: SEQUENCE OWNED BY; Schema: sales; Owner: postgres
--

ALTER SEQUENCE sales.cart_items_cait_id_seq OWNED BY sales.cart_items.cait_id;


--
-- Name: special_offer; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.special_offer (
    spof_id integer NOT NULL,
    spof_description character varying(256),
    spof_discount numeric,
    spof_type character varying(15),
    spof_start_date date,
    spof_end_date date,
    spof_min_qty integer,
    spof_max_qty integer,
    spof_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    spof_cate_id integer
);


ALTER TABLE sales.special_offer OWNER TO postgres;

--
-- Name: special_offer_programs; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.special_offer_programs (
    soco_id integer NOT NULL,
    soco_spof_id integer NOT NULL,
    soco_prog_entity_id integer NOT NULL,
    soco_status character varying(15),
    soco_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT special_offer_programs_soco_status_check CHECK (((soco_status)::text = ANY (ARRAY[('open'::character varying)::text, ('cancelled'::character varying)::text, ('closed'::character varying)::text])))
);


ALTER TABLE sales.special_offer_programs OWNER TO postgres;

--
-- Name: diskon_view; Type: VIEW; Schema: sales; Owner: postgres
--

CREATE VIEW sales.diskon_view AS
 SELECT so.spof_id,
    so.spof_description,
    so.spof_discount,
    so.spof_type,
    so.spof_start_date,
    so.spof_end_date,
    so.spof_min_qty,
    so.spof_max_qty,
    so.spof_modified_date,
    sop.soco_prog_entity_id,
    pe.prog_entity_id
   FROM ((sales.special_offer so
     JOIN sales.special_offer_programs sop ON ((so.spof_id = sop.soco_spof_id)))
     JOIN curriculum.program_entity pe ON ((sop.soco_prog_entity_id = pe.prog_entity_id)));


ALTER TABLE sales.diskon_view OWNER TO postgres;

--
-- Name: payment_users_view; Type: VIEW; Schema: sales; Owner: postgres
--

CREATE VIEW sales.payment_users_view AS
 SELECT ua.usac_bank_entity_id,
    ua.usac_fint_entity_id,
    ua.usac_user_entity_id,
    ua.usac_account_number,
    f.fint_code,
    f.fint_name,
    b.bank_code,
    b.bank_name,
    u.user_name
   FROM (((payment.users_account ua
     LEFT JOIN payment.fintech f ON ((ua.usac_fint_entity_id = f.fint_entity_id)))
     LEFT JOIN payment.bank b ON ((ua.usac_bank_entity_id = b.bank_entity_id)))
     LEFT JOIN users.users u ON ((ua.usac_user_entity_id = u.user_entity_id)));


ALTER TABLE sales.payment_users_view OWNER TO postgres;

--
-- Name: sales_order_detail; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.sales_order_detail (
    sode_id integer NOT NULL,
    sode_qty integer,
    sode_unit_price numeric,
    sode_unit_discount numeric,
    sode_line_total numeric,
    sode_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    sode_sohe_id integer,
    sode_soco_id integer,
    sode_prog_entity_id integer
);


ALTER TABLE sales.sales_order_detail OWNER TO postgres;

--
-- Name: sales_order_detail_sode_id_seq; Type: SEQUENCE; Schema: sales; Owner: postgres
--

CREATE SEQUENCE sales.sales_order_detail_sode_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sales.sales_order_detail_sode_id_seq OWNER TO postgres;

--
-- Name: sales_order_detail_sode_id_seq; Type: SEQUENCE OWNED BY; Schema: sales; Owner: postgres
--

ALTER SEQUENCE sales.sales_order_detail_sode_id_seq OWNED BY sales.sales_order_detail.sode_id;


--
-- Name: sales_order_header; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.sales_order_header (
    sohe_id integer NOT NULL,
    sohe_order_date date,
    sohe_due_date date,
    sohe_ship_date date,
    sohe_order_number character varying(25),
    sohe_account_number character varying(25),
    sohe_trpa_code_number character varying(55),
    sohe_subtotal numeric,
    sohe_tax numeric,
    sohe_total_due numeric,
    sohe_license_code character varying(512),
    sohe_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    sohe_user_entity_id integer,
    sohe_status character varying(15),
    CONSTRAINT sales_order_header_sohe_status_check CHECK (((sohe_status)::text = ANY (ARRAY[('open'::character varying)::text, ('shipping'::character varying)::text, ('cancelled'::character varying)::text, ('refund'::character varying)::text])))
);


ALTER TABLE sales.sales_order_header OWNER TO postgres;

--
-- Name: sales_order_header_sohe_id_seq; Type: SEQUENCE; Schema: sales; Owner: postgres
--

CREATE SEQUENCE sales.sales_order_header_sohe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sales.sales_order_header_sohe_id_seq OWNER TO postgres;

--
-- Name: sales_order_header_sohe_id_seq; Type: SEQUENCE OWNED BY; Schema: sales; Owner: postgres
--

ALTER SEQUENCE sales.sales_order_header_sohe_id_seq OWNED BY sales.sales_order_header.sohe_id;


--
-- Name: special_offer_programs_soco_id_seq; Type: SEQUENCE; Schema: sales; Owner: postgres
--

CREATE SEQUENCE sales.special_offer_programs_soco_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sales.special_offer_programs_soco_id_seq OWNER TO postgres;

--
-- Name: special_offer_programs_soco_id_seq; Type: SEQUENCE OWNED BY; Schema: sales; Owner: postgres
--

ALTER SEQUENCE sales.special_offer_programs_soco_id_seq OWNED BY sales.special_offer_programs.soco_id;


--
-- Name: special_offer_spof_id_seq; Type: SEQUENCE; Schema: sales; Owner: postgres
--

CREATE SEQUENCE sales.special_offer_spof_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sales.special_offer_spof_id_seq OWNER TO postgres;

--
-- Name: special_offer_spof_id_seq; Type: SEQUENCE OWNED BY; Schema: sales; Owner: postgres
--

ALTER SEQUENCE sales.special_offer_spof_id_seq OWNED BY sales.special_offer.spof_id;


--
-- Name: viev_cart_items; Type: VIEW; Schema: sales; Owner: postgres
--

CREATE VIEW sales.viev_cart_items AS
 SELECT c.prog_headline,
    c.prog_title,
    c.prog_price,
    s.cait_id,
    s.cait_quantity,
    s.cait_unit_price,
    s.cait_modified_date,
    s.cait_user_entity_id,
    s.cait_prog_entity_id
   FROM (curriculum.program_entity c
     JOIN sales.cart_items s ON ((c.prog_entity_id = s.cait_prog_entity_id)));


ALTER TABLE sales.viev_cart_items OWNER TO postgres;

--
-- Name: business_entity_entity_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.business_entity_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.business_entity_entity_id_seq OWNER TO postgres;

--
-- Name: business_entity; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.business_entity (
    entity_id integer DEFAULT nextval('users.business_entity_entity_id_seq'::regclass) NOT NULL
);


ALTER TABLE users.business_entity OWNER TO postgres;

--
-- Name: generate; Type: VIEW; Schema: users; Owner: postgres
--

CREATE VIEW users.generate AS
 SELECT u.user_entity_id,
    u.user_name,
    u.user_password,
    u.user_first_name,
    u.user_last_name,
    u.user_birth_date,
    u.user_email_promotion,
    u.user_demographic,
    u.user_photo,
    u.user_current_role,
    p.uspo_number,
    e.pmail_address
   FROM ((users.users u
     JOIN users.users_email e ON ((u.user_entity_id = e.pmail_entity_id)))
     JOIN users.users_phones p ON ((u.user_entity_id = p.uspo_entity_id)))
  WHERE (u.user_current_role = 1);


ALTER TABLE users.generate OWNER TO postgres;

--
-- Name: phone_number_type; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.phone_number_type (
    ponty_code character varying(15) NOT NULL,
    ponty_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE users.phone_number_type OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.roles_role_id_seq OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.roles_role_id_seq OWNED BY users.roles.role_id;


--
-- Name: users_address; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users_address (
    etad_addr_id integer NOT NULL,
    etad_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    etad_entity_id integer,
    etad_adty_id integer
);


ALTER TABLE users.users_address OWNER TO postgres;

--
-- Name: users_education_usdu_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.users_education_usdu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.users_education_usdu_id_seq OWNER TO postgres;

--
-- Name: users_education_usdu_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.users_education_usdu_id_seq OWNED BY users.users_education.usdu_id;


--
-- Name: users_email_pmail_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.users_email_pmail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.users_email_pmail_id_seq OWNER TO postgres;

--
-- Name: users_email_pmail_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.users_email_pmail_id_seq OWNED BY users.users_email.pmail_id;


--
-- Name: users_experiences; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users_experiences (
    usex_id integer NOT NULL,
    usex_entity_id integer NOT NULL,
    usex_title character varying(255),
    usex_profile_headline character varying(512),
    usex_employment_type character varying(15),
    usex_company_name character varying(255),
    usex_is_current character(1),
    usex_start_date date,
    usex_end_date date,
    usex_industry character varying(15),
    usex_description character varying(512),
    usex_experience_type character varying(15),
    usex_city_id integer,
    CONSTRAINT users_experiences_usex_employment_type_check CHECK (((usex_employment_type)::text = ANY (ARRAY[('fulltime'::character varying)::text, ('freelance'::character varying)::text]))),
    CONSTRAINT users_experiences_usex_experience_type_check CHECK (((usex_experience_type)::text = ANY (ARRAY[('company'::character varying)::text, ('certified'::character varying)::text, ('voluntering'::character varying)::text, ('organization'::character varying)::text, ('reward'::character varying)::text]))),
    CONSTRAINT users_experiences_usex_is_current_check CHECK ((usex_is_current = ANY (ARRAY['0'::bpchar, '1'::bpchar])))
);


ALTER TABLE users.users_experiences OWNER TO postgres;

--
-- Name: users_experiences_skill; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users_experiences_skill (
    uesk_usex_id integer NOT NULL,
    uesk_uski_id integer NOT NULL
);


ALTER TABLE users.users_experiences_skill OWNER TO postgres;

--
-- Name: users_experiences_usex_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.users_experiences_usex_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.users_experiences_usex_id_seq OWNER TO postgres;

--
-- Name: users_experiences_usex_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.users_experiences_usex_id_seq OWNED BY users.users_experiences.usex_id;


--
-- Name: users_license; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users_license (
    usli_id integer NOT NULL,
    usli_license_code character varying(512),
    usli_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    usli_status character varying(15),
    usli_entity_id integer NOT NULL,
    CONSTRAINT users_license_usli_status_check CHECK (((usli_status)::text = ANY (ARRAY[('Active'::character varying)::text, ('NonActive'::character varying)::text])))
);


ALTER TABLE users.users_license OWNER TO postgres;

--
-- Name: users_license_usli_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.users_license_usli_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.users_license_usli_id_seq OWNER TO postgres;

--
-- Name: users_license_usli_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.users_license_usli_id_seq OWNED BY users.users_license.usli_id;


--
-- Name: users_media; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users_media (
    usme_id integer NOT NULL,
    usme_entity_id integer NOT NULL,
    usme_file_link character varying(255),
    usme_filename character varying(55),
    usme_filetype character varying(15),
    usme_note character varying(55),
    usme_modified_data timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    usme_filesize integer,
    CONSTRAINT users_media_usme_filetype_check CHECK (((usme_filetype)::text = ANY (ARRAY[('jpg'::character varying)::text, ('pdf'::character varying)::text, ('word'::character varying)::text])))
);


ALTER TABLE users.users_media OWNER TO postgres;

--
-- Name: users_media_usme_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.users_media_usme_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.users_media_usme_id_seq OWNER TO postgres;

--
-- Name: users_media_usme_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.users_media_usme_id_seq OWNED BY users.users_media.usme_id;


--
-- Name: users_skill; Type: TABLE; Schema: users; Owner: postgres
--

CREATE TABLE users.users_skill (
    uski_id integer NOT NULL,
    uski_entity_id integer NOT NULL,
    uski_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    uski_skty_name character varying(15)
);


ALTER TABLE users.users_skill OWNER TO postgres;

--
-- Name: users_skill_uski_id_seq; Type: SEQUENCE; Schema: users; Owner: postgres
--

CREATE SEQUENCE users.users_skill_uski_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users.users_skill_uski_id_seq OWNER TO postgres;

--
-- Name: users_skill_uski_id_seq; Type: SEQUENCE OWNED BY; Schema: users; Owner: postgres
--

ALTER SEQUENCE users.users_skill_uski_id_seq OWNED BY users.users_skill.uski_id;


--
-- Name: batch batch_id; Type: DEFAULT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch ALTER COLUMN batch_id SET DEFAULT nextval('bootcamp.batch_batch_id_seq'::regclass);


--
-- Name: batch_trainee batr_id; Type: DEFAULT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch_trainee ALTER COLUMN batr_id SET DEFAULT nextval('bootcamp.batch_trainee_batr_id_seq'::regclass);


--
-- Name: batch_trainee_evaluation btev_id; Type: DEFAULT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch_trainee_evaluation ALTER COLUMN btev_id SET DEFAULT nextval('bootcamp.batch_trainee_evaluation_btev_id_seq'::regclass);


--
-- Name: program_apply_progress parog_id; Type: DEFAULT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.program_apply_progress ALTER COLUMN parog_id SET DEFAULT nextval('bootcamp.program_apply_progress_parog_id_seq'::regclass);


--
-- Name: talents talent_id; Type: DEFAULT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.talents ALTER COLUMN talent_id SET DEFAULT nextval('bootcamp.talents_talent_id_seq'::regclass);


--
-- Name: section_detail secd_id; Type: DEFAULT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.section_detail ALTER COLUMN secd_id SET DEFAULT nextval('curriculum.section_detail_secd_id_seq'::regclass);


--
-- Name: section_detail_material sedm_id; Type: DEFAULT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.section_detail_material ALTER COLUMN sedm_id SET DEFAULT nextval('curriculum.section_detail_material_sedm_id_seq'::regclass);


--
-- Name: section_detail_material sedm_secd_id; Type: DEFAULT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.section_detail_material ALTER COLUMN sedm_secd_id SET DEFAULT nextval('curriculum.section_detail_material_sedm_secd_id_seq'::regclass);


--
-- Name: sections sect_id; Type: DEFAULT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.sections ALTER COLUMN sect_id SET DEFAULT nextval('curriculum.sections_sect_id_seq'::regclass);


--
-- Name: department dept_id; Type: DEFAULT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.department ALTER COLUMN dept_id SET DEFAULT nextval('hr.department_dept_id_seq'::regclass);


--
-- Name: employee_client_contract ecco_id; Type: DEFAULT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_client_contract ALTER COLUMN ecco_id SET DEFAULT nextval('hr.employee_client_contract_ecco_id_seq'::regclass);


--
-- Name: employee_department_history edhi_id; Type: DEFAULT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_department_history ALTER COLUMN edhi_id SET DEFAULT nextval('hr.employee_department_history_edhi_id_seq'::regclass);


--
-- Name: client clit_id; Type: DEFAULT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.client ALTER COLUMN clit_id SET DEFAULT nextval('job_hire.client_clit_id_seq'::regclass);


--
-- Name: employee_range emra_id; Type: DEFAULT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.employee_range ALTER COLUMN emra_id SET DEFAULT nextval('job_hire.employee_range_emra_id_seq'::regclass);


--
-- Name: job_category joca_id; Type: DEFAULT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_category ALTER COLUMN joca_id SET DEFAULT nextval('job_hire.job_category_joca_id_seq'::regclass);


--
-- Name: job_photo jopho_id; Type: DEFAULT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_photo ALTER COLUMN jopho_id SET DEFAULT nextval('job_hire.job_photo_jopho_id_seq'::regclass);


--
-- Name: talent_apply_progress tapr_id; Type: DEFAULT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply_progress ALTER COLUMN tapr_id SET DEFAULT nextval('job_hire.talent_apply_progress_tapr_id_seq'::regclass);


--
-- Name: address addr_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address ALTER COLUMN addr_id SET DEFAULT nextval('master.address_addr_id_seq'::regclass);


--
-- Name: address_type adty_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address_type ALTER COLUMN adty_id SET DEFAULT nextval('master.address_type_adty_id_seq'::regclass);


--
-- Name: category cate_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.category ALTER COLUMN cate_id SET DEFAULT nextval('master.category_cate_id_seq'::regclass);


--
-- Name: city city_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.city ALTER COLUMN city_id SET DEFAULT nextval('master.city_city_id_seq'::regclass);


--
-- Name: job_role joro_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.job_role ALTER COLUMN joro_id SET DEFAULT nextval('master.job_role_joro_id_seq'::regclass);


--
-- Name: job_type joty_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.job_type ALTER COLUMN joty_id SET DEFAULT nextval('master.job_type_joty_id_seq'::regclass);


--
-- Name: province prov_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.province ALTER COLUMN prov_id SET DEFAULT nextval('master.province_prov_id_seq'::regclass);


--
-- Name: route_actions roac_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.route_actions ALTER COLUMN roac_id SET DEFAULT nextval('master.route_actions_roac_id_seq'::regclass);


--
-- Name: skill_template skte_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.skill_template ALTER COLUMN skte_id SET DEFAULT nextval('master.skill_template_skte_id_seq'::regclass);


--
-- Name: transaction_payment trpa_id; Type: DEFAULT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.transaction_payment ALTER COLUMN trpa_id SET DEFAULT nextval('payment.transaction_payment_trpa_id_seq'::regclass);


--
-- Name: cart_items cait_id; Type: DEFAULT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.cart_items ALTER COLUMN cait_id SET DEFAULT nextval('sales.cart_items_cait_id_seq'::regclass);


--
-- Name: sales_order_detail sode_id; Type: DEFAULT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.sales_order_detail ALTER COLUMN sode_id SET DEFAULT nextval('sales.sales_order_detail_sode_id_seq'::regclass);


--
-- Name: sales_order_header sohe_id; Type: DEFAULT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.sales_order_header ALTER COLUMN sohe_id SET DEFAULT nextval('sales.sales_order_header_sohe_id_seq'::regclass);


--
-- Name: special_offer spof_id; Type: DEFAULT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.special_offer ALTER COLUMN spof_id SET DEFAULT nextval('sales.special_offer_spof_id_seq'::regclass);


--
-- Name: special_offer_programs soco_id; Type: DEFAULT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.special_offer_programs ALTER COLUMN soco_id SET DEFAULT nextval('sales.special_offer_programs_soco_id_seq'::regclass);


--
-- Name: roles role_id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.roles ALTER COLUMN role_id SET DEFAULT nextval('users.roles_role_id_seq'::regclass);


--
-- Name: users_education usdu_id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_education ALTER COLUMN usdu_id SET DEFAULT nextval('users.users_education_usdu_id_seq'::regclass);


--
-- Name: users_email pmail_id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_email ALTER COLUMN pmail_id SET DEFAULT nextval('users.users_email_pmail_id_seq'::regclass);


--
-- Name: users_experiences usex_id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_experiences ALTER COLUMN usex_id SET DEFAULT nextval('users.users_experiences_usex_id_seq'::regclass);


--
-- Name: users_license usli_id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_license ALTER COLUMN usli_id SET DEFAULT nextval('users.users_license_usli_id_seq'::regclass);


--
-- Name: users_media usme_id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_media ALTER COLUMN usme_id SET DEFAULT nextval('users.users_media_usme_id_seq'::regclass);


--
-- Name: users_skill uski_id; Type: DEFAULT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_skill ALTER COLUMN uski_id SET DEFAULT nextval('users.users_skill_uski_id_seq'::regclass);


--
-- Data for Name: batch; Type: TABLE DATA; Schema: bootcamp; Owner: postgres
--

COPY bootcamp.batch (batch_id, batch_entity_id, batch_name, batch_description, batch_start_date, batch_end_date, batch_reason, batch_type, batch_modified_date, batch_status, batch_pic_id) FROM stdin;
14	2	batch#33	batch#1description	2023-06-06	2024-06-06		offline	2023-06-24 17:59:39.308141+07	extend	3
6	2	batch#24_update	update	2023-06-24	2024-05-15	\N	online	2023-06-23 16:47:15.807+07	closed	2
17	2	adasdasd	asdasd	2023-06-24	2023-07-20	\N	offline	2023-06-24 18:12:12.446059+07	running	4
26	2	sadasd	asdasd	2023-06-01	2023-06-29	\N	offline	2023-06-27 13:23:15.285951+07	open	2
\.


--
-- Data for Name: batch_trainee; Type: TABLE DATA; Schema: bootcamp; Owner: postgres
--

COPY bootcamp.batch_trainee (batr_id, batr_status, batr_certificated, batr_certificate_link, batr_access_token, batr_access_grant, batr_review, batr_total_score, batr_modified_date, batr_trainee_entity_id, batr_batch_id) FROM stdin;
5	\N	\N	\N	\N	\N	\N	\N	2023-06-24 17:59:39.308141+07	3	14
6	\N	\N	\N	\N	\N	\N	\N	2023-06-24 17:59:39.308141+07	4	14
3	running	\N	\N	\N	\N	\N	\N	2023-06-23 16:47:15.807+07	2	6
4	running	\N	\N	\N	\N	\N	\N	2023-06-23 16:47:15.807+07	3	6
9	passed	\N	\N	\N	\N	\N	100	2023-06-24 18:52:11.436511+07	3	17
16	\N	\N	\N	\N	\N	\N	\N	2023-06-27 13:23:15.285951+07	3	26
\.


--
-- Data for Name: batch_trainee_evaluation; Type: TABLE DATA; Schema: bootcamp; Owner: postgres
--

COPY bootcamp.batch_trainee_evaluation (btev_id, btev_type, btev_header, btev_section, btev_skill, btev_week, btev_skor, btev_note, btev_modified_date, btev_batch_id, btev_trainee_entity_id) FROM stdin;
1	hardskill	adasdasd BootCamp Nodejs Evaluation	Technical	Fundamental	12	4	aasd	2023-06-24 18:52:11.436511+07	17	3
2	hardskill	adasdasd BootCamp Nodejs Evaluation	Technical	Object Oriented Programming	12	4	aasd	2023-06-24 18:52:11.436511+07	17	3
3	hardskill	adasdasd BootCamp Nodejs Evaluation	Technical	Database	12	4	aasd	2023-06-24 18:52:11.436511+07	17	3
4	softskill	adasdasd BootCamp Nodejs Evaluation	Softskill	Communication	12	4	aasd	2023-06-24 18:52:11.436511+07	17	3
5	softskill	adasdasd BootCamp Nodejs Evaluation	Softskill	Team Work	12	4	aasd	2023-06-24 18:52:11.436511+07	17	3
6	softskill	adasdasd BootCamp Nodejs Evaluation	Softskill	Self Learning	12	4	aasd	2023-06-24 18:52:11.436511+07	17	3
7	softskill	adasdasd BootCamp Nodejs Evaluation	Softskill	Problem Solving	12	4	aasd	2023-06-24 18:52:11.436511+07	17	3
8	softskill	adasdasd BootCamp Nodejs Evaluation	Presentation	Public Speaking	12	4	aasd	2023-06-24 18:52:11.436511+07	17	3
9	softskill	adasdasd BootCamp Nodejs Evaluation	Presentation	Self Confident	12	4	aasd	2023-06-24 18:52:11.436511+07	17	3
10	softskill	adasdasd BootCamp Nodejs Evaluation	Presentation	Adaptation	12	4	aasd	2023-06-24 18:52:11.436511+07	17	3
\.


--
-- Data for Name: program_apply; Type: TABLE DATA; Schema: bootcamp; Owner: postgres
--

COPY bootcamp.program_apply (prap_user_entity_id, prap_prog_entity_id, prap_test_score, prap_gpa, prap_iq_test, prap_review, prap_modified_date, prap_status) FROM stdin;
3	2	80	\N	\N	fsdsdf	2023-06-24 17:27:26.469647+07	passed
133	2	60	\N	\N	asd	2023-06-27 13:39:32.900807+07	passed
\.


--
-- Data for Name: program_apply_progress; Type: TABLE DATA; Schema: bootcamp; Owner: postgres
--

COPY bootcamp.program_apply_progress (parog_id, parog_user_entity_id, parog_prog_entity_id, parog_action_date, parog_modified_date, parog_comment, parog_progress_name, parog_emp_entity_id, parog_status) FROM stdin;
1	3	2	2023-06-24 17:27:26.469647+07	2023-06-24 17:27:26.469647+07	\N	contracted	\N	closed
2	133	2	2023-06-27 13:39:32.900807+07	2023-06-27 13:39:32.900807+07	\N	contract legal	\N	open
\.


--
-- Data for Name: talents; Type: TABLE DATA; Schema: bootcamp; Owner: postgres
--

COPY bootcamp.talents (talent_id, talent_fullname, talent_user_entity_id, talent_technology, talent_batch_id, talent_start_date, talent_end_date, talent_trainer, talent_skill, talent_status) FROM stdin;
1	contoh	2	2	14	\N	\N	\N	\N	idle
\.


--
-- Data for Name: trainer_programs; Type: TABLE DATA; Schema: bootcamp; Owner: postgres
--

COPY bootcamp.trainer_programs (batch_id, tpro_entity_id, tpro_emp_entity_id, tpro_modified_date) FROM stdin;
14	2	3	\N
14	2	2	\N
17	2	2	\N
17	2	4	\N
6	2	4	\N
6	2	2	\N
26	2	4	\N
26	2	2	\N
\.


--
-- Data for Name: program_entity; Type: TABLE DATA; Schema: curriculum; Owner: postgres
--

COPY curriculum.program_entity (prog_entity_id, prog_title, prog_headline, prog_type, prog_learning_type, prog_rating, prog_total_trainee, prog_image, prog_best_seller, prog_price, prog_language, prog_modified_date, prog_duration, prog_duration_type, prog_tag_skill, prog_city_id, prog_cate_id, prog_created_by, prog_status, payment_type, prog_score, total_batch, prog_curr_regis) FROM stdin;
2	Nodejs	Belajar Nodejs	\N	\N	\N	\N	\N	\N	4000000	\N	2023-06-23 16:43:57.917473+07	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
94	Program Title 1	Program Headline 1	bootcamp	offline	\N	100	program_image_1.jpg	0	99.99	english	2023-06-26 01:22:06.017549+07	30	days	Skill 1	1	1	2	draft	regular	90	5	CURR#20230630#001
3	Javascript	Belajar Javascript	\N	\N	\N	\N	\N	0	3500000	\N	2023-06-26 15:07:48.276351+07	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
136	javascript	javascript	bootcamp	online	\N	2	KpnA4SCATv5aKGW79UodvQ==_WhatsApp Image 2023-06-24 at 15.02.41.jpeg	0	222	english	2023-06-27 17:04:23.437873+07	2	days	javascript	\N	1	\N	draft	regular	2	1	
137	javascript	javascript	bootcamp	online	\N	2	jhQNjMvP6Df85uJiDoNTtg==_WhatsApp Image 2023-06-24 at 15.02.41.jpeg	0	222	english	2023-06-27 17:06:08.051793+07	2	days	javascript	\N	1	\N	draft	regular	2	1	
\.


--
-- Data for Name: program_entity_description; Type: TABLE DATA; Schema: curriculum; Owner: postgres
--

COPY curriculum.program_entity_description (pred_prog_entity_id, pred_item_learning, pred_item_include, pred_requirement, pred_description, pred_target_level) FROM stdin;
94	"Learning item 1"	"Included item 1"	"Requirement 1"	"Description 1"	"Target Level 1"
136	"javascript"	\N	\N	"javascript"	\N
137	"javascript"	\N	\N	"javascript"	\N
\.


--
-- Data for Name: program_reviews; Type: TABLE DATA; Schema: curriculum; Owner: postgres
--

COPY curriculum.program_reviews (prow_user_entity_id, prow_prog_entity_id, prow_review, prow_rating, prow_modified_date) FROM stdin;
\.


--
-- Data for Name: section_detail; Type: TABLE DATA; Schema: curriculum; Owner: postgres
--

COPY curriculum.section_detail (secd_id, secd_title, secd_preview, secd_score, secd_note, secd_minute, secd_modified_date, secd_sect_id) FROM stdin;
1	Section Detail 1	0	\N	Section Detail 1 note	30	2023-06-26 01:29:31.531159+07	1
\.


--
-- Data for Name: section_detail_material; Type: TABLE DATA; Schema: curriculum; Owner: postgres
--

COPY curriculum.section_detail_material (sedm_id, sedm_filename, sedm_filesize, sedm_filetype, sedm_filelink, sedm_modified_date, sedm_secd_id) FROM stdin;
1	material2.docx	2048	text	https://example.com/material2.docx	2023-06-26 01:29:31.531159+07	1
\.


--
-- Data for Name: sections; Type: TABLE DATA; Schema: curriculum; Owner: postgres
--

COPY curriculum.sections (sect_id, sect_prog_entity_id, sect_title, sect_description, sect_total_section, sect_total_lecture, sect_total_minute, sect_modified_date) FROM stdin;
1	94	Section 1	Section 1 description	1	1	30	2023-06-26 01:26:51.545097+07
\.


--
-- Data for Name: department; Type: TABLE DATA; Schema: hr; Owner: postgres
--

COPY hr.department (dept_id, dept_name, dept_modified_date) FROM stdin;
1	Human Resource Department	2023-06-27 09:35:41.572077+07
2	IT Department	2023-06-27 09:35:56.418419+07
3	Sales Department	2023-06-27 09:36:09.119765+07
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: hr; Owner: postgres
--

COPY hr.employee (emp_entity_id, emp_emp_number, emp_national_id, emp_birth_date, emp_marital_status, emp_gender, emp_hire_date, emp_salaried_flag, emp_vacation_hours, emp_sickleave_hours, emp_current_flag, emp_modified_date, emp_type, emp_joro_id, emp_emp_entity_id) FROM stdin;
3	EMP002	0987654321	1995-05-15	S	F	2023-06-27	0	12	6	1	2023-06-09 02:00:57.412978+07	outsource	4	2
4	EMP003	9876543210	1988-10-30	M	M	2023-06-27	1	14	10	1	2023-06-09 02:00:57.412978+07	internal	1	3
2	EMP001	1234567890	1990-01-01	M	M	2023-06-27	1	10	8	1	2023-06-09 02:00:57.412978+07	internal	2	2
90	Empcode01	12325363671	2000-08-15	S	M	2023-06-27	1	12	5	1	2023-06-27 15:09:47.877881+07	outsource	4	\N
\.


--
-- Data for Name: employee_client_contract; Type: TABLE DATA; Schema: hr; Owner: postgres
--

COPY hr.employee_client_contract (ecco_id, ecco_entity_id, ecco_contract_no, ecco_contract_date, ecco_start_date, ecco_end_date, ecco_notes, ecco_modified_date, ecco_media_link, ecco_status, ecco_joty_id, ecco_account_manager, ecco_clit_id) FROM stdin;
\.


--
-- Data for Name: employee_department_history; Type: TABLE DATA; Schema: hr; Owner: postgres
--

COPY hr.employee_department_history (edhi_id, edhi_entity_id, edhi_start_date, edhi_end_date, edhi_modified_date, edhi_dept_id) FROM stdin;
2	3	2023-06-27	2023-06-30	2023-06-27 09:39:35.999545+07	2
3	4	2023-06-27	2023-07-27	2023-06-27 09:39:35.999545+07	2
1	2	2023-06-27	2023-07-31	2023-06-27 09:39:35.999545+07	3
10	90	2023-06-27	2023-06-29	2023-06-27 15:09:47.877881+07	2
\.


--
-- Data for Name: employee_pay_history; Type: TABLE DATA; Schema: hr; Owner: postgres
--

COPY hr.employee_pay_history (ephi_entity_id, ephi_rate_change_date, ephi_rate_salary, ephi_pay_frequence, ephi_modified_date) FROM stdin;
2	2023-06-06	5000000	1	2023-06-27 09:43:01.59747+07
3	2023-06-06	1000000	2	2023-06-27 09:43:01.59747+07
4	2023-06-06	4500000	1	2023-06-27 09:43:01.59747+07
\.


--
-- Data for Name: client; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.client (clit_id, clit_name, clit_about, clit_modified_date, clit_addr_id, clit_emra_id, clit_indu_code) FROM stdin;
6	Ini Company	Sample About ini company Company	2023-06-12 18:10:14.920273+07	8	2	TECH
7	PT. Tamariska International	Perusahaannya tama hohoho	2023-06-12 18:21:34.463456+07	10	3	FOOD
8	PT. CodeX	Semoga ga bangkrut	2023-06-14 14:06:10.343269+07	11	3	TECH
9	PT. Ipin Upin	Kuala Lumpur	2023-06-15 16:21:08.299223+07	12	1	FASH
10	PT. Cosmos Kipas Angin	Menjual segala macam bentuk kipas angin	2023-06-20 04:06:38.020275+07	13	4	ENT
5	 New Company Updatess	Sample About bukan company Company	2023-06-12 18:06:33.028448+07	1	2	TECH
4	PT. Bulan Bintang	About Client B	2023-06-09 01:40:46.627321+07	5	2	FASH
11	PT. ANSNAINIAD	About this company	2023-06-27 11:55:14.498413+07	15	3	MED
3	PT. Astra International	About Client A	2023-06-09 01:40:46.627321+07	4	3	TECH
12	PT. Tango	Berapa lapis? Ratusan	2023-06-27 20:03:10.547246+07	18	2	FOOD
13	PT. Bahagia	About pt. bahagia	2023-06-27 20:26:35.584156+07	19	2	FASH
\.


--
-- Data for Name: employee_range; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.employee_range (emra_id, emra_range_min, emra_range_max, emra_modified_date) FROM stdin;
1	1	50	2023-06-09 01:39:13.009704+07
2	50	1000	2023-06-09 01:39:13.009704+07
3	1000	5000	2023-06-09 01:39:13.009704+07
4	5000	10000	2023-06-11 02:44:26.66666+07
\.


--
-- Data for Name: job_category; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.job_category (joca_id, joca_name, joca_modified_date) FROM stdin;
1	Job Category 1	2023-06-09 02:03:29.06829+07
2	Job Category 2	2023-06-09 02:03:29.06829+07
3	Job Category 3	2023-06-09 02:03:29.06829+07
\.


--
-- Data for Name: job_photo; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.job_photo (jopho_id, jopho_filename, jopho_filesize, jopho_filetype, jopho_modified_date, jopho_entity_id) FROM stdin;
31	PT. Astra International-logo-astra.jpg	8684	jpeg	2023-06-14 00:36:41.034837+07	47
32	PT. Astra International-logo-astra.jpg	8684	jpeg	2023-06-14 11:10:03.248234+07	49
34	PT. Bulan Bintang-logo-sogu.jpg	17649	jpeg	2023-06-14 11:16:24.90744+07	51
36	PT. Bulan Bintang-sbucks.jpg	11111	jpeg	2023-06-14 11:30:04.192781+07	53
37	PT. Bulan Bintang-samsung.jpg	7096	jpeg	2023-06-14 11:30:19.264269+07	54
38	PT. Bulan Bintang-hp.jpg	5799	jpeg	2023-06-14 11:30:34.186723+07	55
39	PT. Bulan Bintang-pln.jpg	4771	jpeg	2023-06-14 11:31:29.818558+07	58
40	PT. Bulan Bintang-bk.jpg	10322	jpeg	2023-06-14 11:31:46.007006+07	59
41	PT. Bulan Bintang-cocacola.jpg	7065	jpeg	2023-06-14 11:32:04.739375+07	60
42	PT. Bulan Bintang-mu.jpg	13520	jpeg	2023-06-14 11:32:25.87459+07	61
43	PT. Bulan Bintang-bmw.jpg	5888	jpeg	2023-06-14 11:32:44.201761+07	62
44	PT. Bulan Bintang-volkswagen.jpg	10827	jpeg	2023-06-14 11:32:58.55103+07	63
45	PT. Bulan Bintang-volkswagen.jpg	10827	jpeg	2023-06-14 11:33:16.349916+07	64
46	PT. Bulan Bintang-bmw.jpg	5888	jpeg	2023-06-14 11:33:30.533241+07	65
47	PT. Bulan Bintang-mu.jpg	13520	jpeg	2023-06-14 11:33:44.08926+07	66
48	PT. Bulan Bintang-cocacola.jpg	7065	jpeg	2023-06-14 11:34:44.277671+07	68
49	PT. Bulan Bintang-bk.jpg	10322	jpeg	2023-06-14 11:34:57.574321+07	69
50	PT. Bulan Bintang-pln.jpg	4771	jpeg	2023-06-14 11:35:12.79258+07	70
51	PT. Bulan Bintang-hp.jpg	5799	jpeg	2023-06-14 11:35:25.123943+07	71
52	PT. Bulan Bintang-samsung.jpg	7096	jpeg	2023-06-14 11:35:37.70192+07	72
53	PT. Bulan Bintang-sbucks.jpg	11111	jpeg	2023-06-14 11:35:50.344075+07	73
54	PT. Bulan Bintang-fcb.jpg	9643	jpeg	2023-06-14 11:36:04.896774+07	74
55	PT. Bulan Bintang-cocacola.jpg	7065	jpeg	2023-06-14 11:42:32.077182+07	75
56	PT. Bulan Bintang-bk.jpg	10322	jpeg	2023-06-14 11:49:05.974867+07	76
57	PT. Bulan Bintang-0ccd61075-bk.jpg	10322	jpeg	2023-06-15 20:14:01.222329+07	78
33	PT. Astra International-86985c36-nasiGoreng.jpg	99997	jpeg	2023-06-19 15:32:12.61248+07	50
35	Bukan Company-b23d3c3b-logohitam.png	70200	png	2023-06-19 17:21:54.671036+07	52
58	PT. Ipin Upin-10a2210cce-book cover.png	1610950	png	2023-06-19 18:29:07.450994+07	83
59	PT. Cosmos Kipas Angin-c467b3c4-logohitam.png	70200	png	2023-06-21 08:40:48.718468+07	84
60	 New Company Updatess-4429d0cd-panda2.png	84192	png	2023-06-22 21:04:03.355424+07	85
61	PT. Bulan Bintang-11762b55-7309700.jpg	133744	jpeg	2023-06-27 03:54:13.691336+07	118
62	PT. Bulan Bintang-e990de8c-7309700.jpg	133744	jpeg	2023-06-27 03:55:36.799159+07	119
63	PT. CodeX-134e3eae-logo.jpg	95807	jpeg	2023-06-27 20:00:38.28213+07	138
64	PT. Bahagia-feaf1130-logo.jpg	95807	jpeg	2023-06-27 20:30:23.097533+07	139
\.


--
-- Data for Name: job_post; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.job_post (jopo_entity_id, jopo_number, jopo_title, jopo_start_date, jopo_end_date, jopo_min_salary, jopo_max_salary, jopo_min_experience, jopo_max_experience, jopo_primary_skill, jopo_secondary_skill, jopo_publish_date, jopo_modified_date, jopo_emp_entity_id, jopo_clit_id, jopo_joro_id, jopo_joty_id, jopo_joca_id, jopo_addr_id, jopo_work_code, jopo_edu_code, jopo_status, jopo_id, jopo_open) FROM stdin;
71	JOB#20230614-0021	Fullstack developer 17	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:56:47.346393+07	2	4	1	1	1	5	FT	BS	publish	21	0
50	JOB#20230614-0003	Guru Bahasa Inggris	2023-07-01	2023-07-31	1000000	8000000	8	10	Bahasa Inggris, Bahasa Indonesia	Bahasa Jepang	2023-06-19	2023-06-19 15:32:12.61248+07	2	3	1	1	1	4	FT	BS	publish	3	1
52	JOB#20230614-0005	Fullstack developerrsssssssse	2023-06-01	2023-06-30	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-19	2023-06-19 17:21:54.671036+07	2	5	1	2	\N	1	FT	BS	publish	5	1
83	JOB#20230619-0029	Guru Bahasa Jepang	2023-06-01	2023-06-30	900000	1000000	1	3	Nihongo	Jepang	2023-06-19	2023-06-19 18:29:07.450994+07	2	9	2	1	\N	12	PT	MS	publish	29	1
84	JOB#20230621-0030	Project Manager	2023-07-01	2023-08-31	12000	45000	4	6	Hehehe, Nyoba aja	bener gt kok	2023-06-21	2023-06-21 08:40:48.718468+07	2	10	2	1	\N	13	PT	MS	publish	30	1
47	JOB#20230613-0001	Node JS Developer	2023-07-01	2023-07-31	1000000	10000000	0	2	JavaScript	SQL	2023-06-14	2023-06-21 16:18:45.245424+07	2	3	1	1	1	4	FT	BS	remove	1	0
49	JOB#20230614-0002	UI/UX Designer	2023-07-01	2023-07-31	500000	1000000	0	2	FIgma	Adobe	2023-06-14	2023-06-21 16:22:36.29182+07	2	3	2	2	2	4	PT	BS	remove	2	0
53	JOB#20230614-0006	Fullstack developer 2	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:30:04.192781+07	2	4	1	1	1	5	FT	BS	publish	6	1
54	JOB#20230614-0007	Fullstack developer 3	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:30:19.264269+07	2	4	1	1	1	5	FT	BS	publish	7	1
55	JOB#20230614-0008	Fullstack developer 4	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:30:34.186723+07	2	4	1	1	1	5	FT	BS	publish	8	1
58	JOB#20230614-0009	Fullstack developer 5	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:42:45.242956+07	2	4	1	1	1	5	FT	BS	publish	9	1
59	JOB#20230614-0010	Fullstack developer 6	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:42:45.242956+07	2	4	1	1	1	5	FT	BS	publish	10	1
61	JOB#20230614-0012	Fullstack developer 8	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:42:45.242956+07	2	4	1	1	1	5	FT	BS	publish	12	1
63	JOB#20230614-0014	Fullstack developer 10	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:42:45.242956+07	2	4	1	1	1	5	FT	BS	publish	14	1
64	JOB#20230614-0015	Fullstack developer 11	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:42:45.242956+07	2	4	1	1	1	5	FT	BS	publish	15	1
65	JOB#20230614-0016	Fullstack developer 12	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:42:45.242956+07	2	4	1	1	1	5	FT	BS	publish	16	1
66	JOB#20230614-0017	Fullstack developer 13	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:42:45.242956+07	2	4	1	1	1	5	FT	BS	publish	17	1
70	JOB#20230614-0020	Fullstack developer 16	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:42:45.242956+07	2	4	1	1	1	5	FT	BS	publish	20	1
60	JOB#20230614-0011	Fullstack developer 7	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:54:30.690251+07	2	4	1	1	1	5	FT	BS	draft	11	1
62	JOB#20230614-0013	Fullstack developer 9	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:54:30.690251+07	2	4	1	1	1	5	FT	BS	remove	13	1
68	JOB#20230614-0018	Fullstack developer 14	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:54:30.690251+07	2	4	1	1	1	5	FT	BS	remove	18	1
69	JOB#20230614-0019	Fullstack developer 15	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:54:30.690251+07	2	4	1	1	1	5	FT	BS	remove	19	1
73	JOB#20230614-0023	Fullstack developer 19	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:42:45.242956+07	2	4	1	1	1	5	FT	BS	publish	23	1
76	JOB#20230614-0026	Graphic Designer 1	2023-07-01	2023-07-31	30000000	40000000	5	9	Adobe Photoshop, Adobe Illustrator	Analytic	2023-06-14	2023-06-14 11:56:47.346393+07	2	4	1	1	1	5	FT	BS	publish	26	0
78	JOB#20230615-0027	Graphic Designer 1	2023-07-01	2023-07-31	30000000	40000000	5	9	Adobe Photoshop, Adobe Illustrator	Analytic	2023-06-15	2023-06-15 20:14:01.222329+07	2	4	1	1	\N	4	FT	BS	publish	28	1
72	JOB#20230614-0022	Fullstack developer 18	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:54:30.690251+07	2	4	1	1	1	5	FT	BS	draft	22	1
74	JOB#20230614-0024	Fullstack developer 20	2023-07-01	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-14 11:54:30.690251+07	2	4	1	1	1	5	FT	BS	draft	24	1
85	JOB#20230622-0031	Mobile Developer	2023-07-01	2023-09-30	3000000	6000000	0	1	Android Studio, Java, Database	Design	2023-06-22	2023-06-22 21:04:03.355424+07	2	5	2	1	\N	1	FT	MS	publish	31	1
139	JOB#20230627-0035	Mobile Developer 123	2023-07-01	2023-08-31	3000000	6000000	3	5	Flutter	Android studio	2023-06-27	2023-06-27 20:32:14.950852+07	2	13	1	1	\N	19	PT	BS	draft	35	1
75	JOB#20230614-0025	Graphic Designer	2023-07-01	2023-07-31	30000000	40000000	5	9	Adobe Photoshop, Adobe Illustrator	Analytic	2023-06-14	2023-06-25 01:46:21.692114+07	2	4	1	1	1	5	FT	BS	draft	25	1
51	JOB#20230614-0004	Fullstack developer	2023-01-07	2023-07-31	30000000	40000000	7	10	HTML, Javascript, CSS	Design	2023-06-14	2023-06-27 03:43:20.673536+07	2	4	1	1	1	5	FT	BS	publish	4	0
118	JOB#20230626-0032	kasdkjaksd	2023-06-13	2023-06-30	1212	12121	212	1212	asdasd	asdasd	2023-06-26	2023-06-27 03:54:13.691336+07	2	4	2	1	\N	5	PT	MS	publish	32	1
119	JOB#20230626-0033	pppppp	2023-06-28	2023-06-30	11	11	11	11	11	11	2023-06-26	2023-06-27 03:55:36.799159+07	2	4	2	1	\N	5	PT	MS	publish	33	1
138	JOB#20230627-0034	Trainer Bootcamp	2023-07-01	2023-08-31	3000000	6000000	3	5	Javascript, ExpressJs, NodeJs	postgresql	2023-06-27	2023-06-27 20:00:38.28213+07	2	8	1	1	\N	11	FT	BS	publish	34	1
\.


--
-- Data for Name: job_post_desc; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.job_post_desc (jopo_entity_id, jopo_description, jopo_responsibility, jopo_target, jopo_benefit) FROM stdin;
50	"Mengajar Bahasa"	\N	{"jopo_min_experience":"8","jopo_primary_skill":"Bahasa Inggris, Bahasa Indonesia"}	"Dapat makan, Main sama jaki"
47	"Membuat program job_hire"	"Menjadi ketua sok sibuk"	{"jopo_min_experience":"0","jopo_primary_skill":"JavaScript"}	"Dapat makan, Main sama jaki"
49	"Membuat design mockup"	\N	{"jopo_min_experience":"0","jopo_primary_skill":"FIgma"}	"Tunjangan ini itu"
51	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
53	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
54	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
55	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
58	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
59	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
60	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
61	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
62	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
63	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
52	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
64	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
65	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
66	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
68	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
69	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
70	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
71	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
72	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
73	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
74	"Membuat basic html"	\N	{"jopo_min_experience":"7","jopo_primary_skill":"HTML, Javascript, CSS"}	"Tunjangan ini itu dan lain lain"
75	"Design Graphic tingkat dewa"	\N	{"jopo_min_experience":"5","jopo_primary_skill":"Adobe Photoshop, Adobe Illustrator"}	"Tunjangan ini itu dan lain lain"
76	"Design Graphic tingkat dewa"	\N	{"jopo_min_experience":"5","jopo_primary_skill":"Adobe Photoshop, Adobe Illustrator"}	"Tunjangan ini itu dan lain lain"
78	"Design Graphic tingkat dewa"	\N	{"jopo_min_experience":"5","jopo_primary_skill":"Adobe Photoshop, Adobe Illustrator"}	"Tunjangan ini itu dan lain lain"
83	"Menjadi guru bahasa daerah"	\N	{"jopo_min_experience":"1","jopo_primary_skill":"Nihongo"}	"BPJS"
84	"Ini deskripsi terkait pekerjaannya, mau dibuat panjang lebar tinggi namun harus jelas dan syalalalalalala ini nanti gimana aku mau kerja tapi gabisa karena codex ga jelas trilililili semoga ga bangkrut beneran ini codex hzhzhzh"	\N	{"jopo_min_experience":"4","jopo_primary_skill":"Hehehe, Nyoba aja"}	"THR, BPJS, Bonus harian, dan lain-lain"
85	"Mencari pegawai dengan spek dewa. Wajib bisa ini itu dan lain lain all in one. Mampu bekerja di bawah tekanan, bisa melawan gravitasi, pintar merawat kebun."	\N	{"jopo_min_experience":"0","jopo_primary_skill":"Android Studio, Java, Database"}	"THR, BPJS, Bonus harian, dan lain-lain"
118	"<p>asdadsa</p>"	\N	{"jopo_min_experience":"212","jopo_primary_skill":"asdasd"}	"asdasd"
119	"<p>1</p>"	\N	{"jopo_min_experience":"11","jopo_primary_skill":"11"}	"11"
138	"<p>Dibutuhkan pengajar dengan spesifikasi yang sudah disebutkan diatas.</p><p>Bonus dan nego gaji dapat dibicarakan didepan.</p>"	\N	{"jopo_min_experience":"3","jopo_primary_skill":"Javascript, ExpressJs, NodeJs"}	"THR, Tempat tinggal, Uang makan"
139	"<p>Membutuhkan mobile developer <strong>serba bisa</strong></p>"	\N	{"jopo_min_experience":"3","jopo_primary_skill":"Flutter"}	"THR, BPJS"
\.


--
-- Data for Name: talent_apply; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.talent_apply (taap_user_entity_id, taap_entity_id, taap_intro, taap_scoring, taap_modified_date, taap_status) FROM stdin;
3	51	\N	90	2023-06-14 15:45:30.924854+07	succeed
2	50	\N	90	2023-06-14 15:42:36.340767+07	interview
127	51	\N	\N	2023-06-27 05:55:53.67693+07	apply
4	70	\N	34	2023-06-15 19:08:42.754147+07	failed
128	61	\N	100	2023-06-27 10:47:18.061737+07	succeed
134	51	\N	\N	2023-06-27 14:36:22.680608+07	apply
126	53	\N	90	2023-06-27 05:52:55.653564+07	interview
129	51	\N	45	2023-06-27 12:29:38.73608+07	interview
140	51	\N	80	2023-06-27 20:35:16.579832+07	succeed
\.


--
-- Data for Name: talent_apply_progress; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.talent_apply_progress (tapr_id, tapr_taap_user_entity_id, tapr_taap_entity_id, tapr_modified_date, tapr_status, tapr_comment, tapr_progress_name) FROM stdin;
6	3	51	2023-06-14 15:45:30.924854+07	Open	okok	Succeed
5	2	50	2023-06-14 15:42:36.340767+07	Open	kkkkk	Interview
17	127	51	2023-06-27 05:55:53.67693+07	Open	\N	Apply
12	4	70	2023-06-15 19:08:42.754147+07	Open	ffff	Failed
18	128	61	2023-06-27 10:47:18.061737+07	Open	hehe	Succeed
20	134	51	2023-06-27 14:36:22.680608+07	Open	\N	Apply
16	126	53	2023-06-27 05:52:55.653564+07	Open	Bagus	Interview
19	129	51	2023-06-27 12:29:38.73608+07	Open	Kurang	Interview
21	140	51	2023-06-27 20:35:16.579832+07	Open	Bagus	Succeed
\.


--
-- Data for Name: address; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.address (addr_id, addr_line1, addr_line2, addr_postal_code, addr_spatial_location, addr_modifed_date, addr_city_id) FROM stdin;
8	Sample Address 3	Sample Address 4	54322	{"lat": 123.456, "lng": 789.012}	2023-06-12 18:10:14.920273+07	1
7	New Address Line 1	New Address Line 2	12345	{"lat": 40.7128, "lng": -74.0060}	2023-06-12 18:06:33.028448+07	5
10	Perumahan Taman Aloha	Suko, Sukodono	61258	"-6.358948, 106.808810"	2023-06-12 18:21:34.463456+07	1
11	Jl. Bukit Golf Hijau 131	Babakan Madang	61277	"-6.358948, 106.808810"	2023-06-14 14:06:10.343269+07	4
12	Jl. coca cola	Suko, Sukodono	61258	"-6.358948, 106.808810"	2023-06-15 16:21:08.299223+07	1
13	Jl. Tunjungan Plaza		61294	""	2023-06-20 04:06:38.020275+07	6
1	jalan garuda1212	jalan rajawali1212	88880	"antara jalan garuda dan rajawali"	2023-05-27 20:56:26.835595+07	1
5	456 Elm Street		67890	"[object Object]"	2023-06-09 01:28:12.012718+07	4
14	Jalan Rawageni	Jalan Bukit Golf	16450	\N	2023-06-25 22:31:08.454818+07	1
15	Jl. sumatra	no. 256	19203	""	2023-06-27 11:55:14.498413+07	6
16	Bukil Golf Hijau	Sentul Nomer 131	16789	\N	2023-06-27 12:43:25.039814+07	1
4	123 Main Street	Apt 4	12345	""	2023-06-09 01:28:12.012718+07	1
18	Jl. BGH no.131	Sentul, Bogor	61939	""	2023-06-27 20:03:10.547246+07	1
19	Jl.Tunjungan	no.131 gang no.3	61823	""	2023-06-27 20:26:35.584156+07	6
\.


--
-- Data for Name: address_type; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.address_type (adty_id, adty_name, adty_modified_date) FROM stdin;
1	Rumah	2023-06-09 00:22:51.248775+07
2	Kantor	2023-06-09 00:22:51.248775+07
3	Lainnya	2023-06-09 00:22:51.248775+07
4	Pengiriman	2023-06-09 00:22:51.248775+07
5	Toko	2023-06-09 00:22:51.248775+07
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.category (cate_id, cate_name, cate_cate_id, cate_modified_date) FROM stdin;
1	Parent Category	\N	2023-06-09 01:10:57.713431+07
2	Child Category	1	2023-06-09 01:11:09.168578+07
3	Child Category1	1	2023-06-09 01:11:17.1511+07
4	Inner Child Category	2	2023-06-09 01:11:36.232624+07
5	Inner Child Category1	3	2023-06-09 01:11:48.423275+07
\.


--
-- Data for Name: city; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.city (city_id, city_name, city_modified_date, city_prov_id) FROM stdin;
1	Bogor	2023-05-28 13:20:47.679272+07	1
4	Jakarta	2023-06-09 01:26:39.332939+07	2
5	Bandung	2023-06-09 01:26:39.332939+07	3
6	Surabaya	2023-06-09 01:26:39.332939+07	2
7	Yogyakarta	2023-06-09 01:26:39.332939+07	1
\.


--
-- Data for Name: country; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.country (country_code, country_name, country_modified_date) FROM stdin;
USA	United States	2023-06-09 01:19:29.224461+07
GBR	United Kingdom	2023-06-09 01:19:29.224461+07
JPN	Japan	2023-06-09 01:19:29.224461+07
AUS	Australia	2023-06-09 01:19:29.224461+07
IDN	Indonesia	2023-05-28 13:05:16.257821+07
MLY	Malaysia	2023-05-28 15:47:21.74727+07
\.


--
-- Data for Name: education; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.education (edu_code, edu_name) FROM stdin;
BS	Bachelor of Science
MS	Master of Science
PhD	Doctor of Philosophy
\.


--
-- Data for Name: industry; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.industry (indu_code, indu_name) FROM stdin;
TECH	Technology
FASH	Fashion
FOOD	Food and Beverage
MED	Medical
ENT	Entertainment
\.


--
-- Data for Name: job_role; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.job_role (joro_id, joro_name, joro_modified_date) FROM stdin;
1	Software Engineer	2023-06-09 01:09:08.595099+07
2	Marketing Manager	2023-06-09 01:09:08.595099+07
3	Accountant	2023-06-09 01:09:08.595099+07
4	Graphic Designer	2023-06-09 01:09:08.595099+07
5	Human Resources Specialist	2023-06-09 01:09:08.595099+07
\.


--
-- Data for Name: job_type; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.job_type (joty_id, joty_name) FROM stdin;
1	Onsite
2	Remote
\.


--
-- Data for Name: modules; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.modules (module_name) FROM stdin;
Module A
Module B
Module C
Module D
Module E
Job Hire
bootcamp
JAwir tikirie
cobaAde
\.


--
-- Data for Name: province; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.province (prov_id, prov_code, prov_name, prov_modified_date, prov_country_code) FROM stdin;
2	JATIM	Jawa Timur	2023-06-09 01:23:04.202327+07	IDN
3	SUSEL	Sulawesi Selatan	2023-06-09 01:23:04.202327+07	IDN
4	KL	Kuala Lumpur	2023-06-09 01:23:04.202327+07	MLY
1	JABAR	Jawa Barat	2023-05-28 13:12:04.626687+07	IDN
\.


--
-- Data for Name: route_actions; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.route_actions (roac_id, roac_name, roac_orderby, roac_display, roac_module_name) FROM stdin;
6	\N	\N	\N	\N
3	Interview	3	1	Job Hire
4	Succeed	4	1	Job Hire
5	Failed	5	1	Job Hire
8	apply	1	1	bootcamp
40	filtering test	2	1	bootcamp
41	contract legal	3	1	bootcamp
42	contracted	4	1	bootcamp
43	Ready Test	6	1	Module A
2	Filtering Test	2	0	Job Hire
1	Apply	1	0	Job Hire
\.


--
-- Data for Name: skill_template; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.skill_template (skte_id, skte_skill, skte_description, skte_week, skte_orderby, skte_modified_date, skty_name, skte_skte_id) FROM stdin;
\.


--
-- Data for Name: skill_type; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.skill_type (skty_name) FROM stdin;
Programming
Design
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.status (status, status_modified_date) FROM stdin;
passed	2023-06-08 10:38:45.734767+07
publish	2023-06-09 02:08:23.645288+07
draft	2023-06-10 09:56:06.025623+07
remove	2023-06-13 20:33:47.246301+07
apply	2023-06-14 15:32:57.271468+07
interview	2023-06-14 15:33:05.009467+07
failed	2023-06-14 15:33:13.914179+07
succeed	2023-06-14 15:33:22.831828+07
Open	2023-06-14 15:37:26.852124+07
filtering test	2023-06-20 12:56:22.023427+07
open	2023-06-23 16:46:19.647579+07
running	2023-06-24 18:40:19.225724+07
bakso	2023-06-24 18:40:19.225724+07
pending	2023-06-24 18:40:19.225724+07
extend	2023-06-24 18:40:19.225724+07
closed	2023-06-24 18:43:01.888058+07
idle	2023-06-24 18:45:19.789982+07
\.


--
-- Data for Name: working_type; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.working_type (woty_code, woty_name) FROM stdin;
FT	Full-time
PT	Part-time
CONT	Contract
FL	Freelance
INTR	Internship
\.


--
-- Data for Name: bank; Type: TABLE DATA; Schema: payment; Owner: postgres
--

COPY payment.bank (bank_entity_id, bank_code, bank_name, bank_modified_date) FROM stdin;
87	001	MANDIRI	2023-06-25 19:16:54.569592+07
101	045	BCA	2023-06-26 19:44:03.303302+07
2	BRI	BRI	2023-06-28 01:19:57.748413+07
\.


--
-- Data for Name: fintech; Type: TABLE DATA; Schema: payment; Owner: postgres
--

COPY payment.fintech (fint_entity_id, fint_code, fint_name, fint_modified_date) FROM stdin;
88	ovo	OVO	2023-06-25 19:32:57.588892+07
143	paylater	shopee	2023-06-27 20:55:14.752687+07
\.


--
-- Data for Name: transaction_payment; Type: TABLE DATA; Schema: payment; Owner: postgres
--

COPY payment.transaction_payment (trpa_id, trpa_code_number, trpa_order_number, trpa_debet, trpa_credit, trpa_type, trpa_note, trpa_modified_date, trpa_source_id, trpa_target_id, trpa_user_entity_id) FROM stdin;
1	TRX#20230626-0001	\N	4000	1000	topup	\N	2023-06-26 20:00:51.531232+07	99081	99081	4
2	TRX#20230626-0002	\N	5000	1000	topup	\N	2023-06-26 20:37:46.389499+07	878766	99081	4
\.


--
-- Data for Name: users_account; Type: TABLE DATA; Schema: payment; Owner: postgres
--

COPY payment.users_account (usac_bank_entity_id, usac_fint_entity_id, usac_user_entity_id, usac_account_number, usac_saldo, usac_type, usac_start_date, usac_end_date, usac_modified_date, usac_status) FROM stdin;
87	\N	86	86422	60000	credit card	\N	\N	2023-06-27 20:54:01.89025+07	\N
87	\N	130	7886	60000	credit card	\N	\N	2023-06-27 21:20:57.987391+07	\N
87	88	144	12345	\N	\N	\N	\N	2023-06-27 23:15:42.278774+07	\N
101	143	144	54321	\N	\N	\N	\N	2023-06-27 23:21:14.488051+07	\N
2	\N	144	67890	\N	\N	\N	\N	2023-06-28 01:22:43.581237+07	\N
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: sales; Owner: postgres
--

COPY sales.cart_items (cait_id, cait_quantity, cait_unit_price, cait_modified_date, cait_user_entity_id, cait_prog_entity_id) FROM stdin;
2	1	3500000	2023-06-26 16:01:39.991261+07	2	3
1	1	3500000	2023-06-26 16:02:48.295017+07	2	2
3	1	3500000	2023-06-27 11:24:48.93869+07	2	2
\.


--
-- Data for Name: sales_order_detail; Type: TABLE DATA; Schema: sales; Owner: postgres
--

COPY sales.sales_order_detail (sode_id, sode_qty, sode_unit_price, sode_unit_discount, sode_line_total, sode_modified_date, sode_sohe_id, sode_soco_id, sode_prog_entity_id) FROM stdin;
1	1	7462500	0.5	7462500	2023-06-26 16:03:38.660524+07	1	1	3
2	1	7462500	0.5	7462500	2023-06-26 16:03:38.660524+07	1	1	2
3	1	7462500	0.5	7462500	2023-06-26 16:03:44.388335+07	2	1	3
4	1	7462500	0.5	7462500	2023-06-26 16:03:44.388335+07	2	1	2
5	1	11500000	0.5	11500000	2023-06-28 16:42:16.608019+07	6	1	3
6	1	11500000	0.5	11500000	2023-06-28 16:42:16.608019+07	6	1	2
7	1	11500000	0.5	11500000	2023-06-28 16:42:16.608019+07	6	1	2
8	1	11500000	0.5	11500000	2023-06-28 16:42:19.702912+07	7	1	3
9	1	11500000	0.5	11500000	2023-06-28 16:42:19.702912+07	7	1	2
10	1	11500000	0.5	11500000	2023-06-28 16:42:19.702912+07	7	1	2
\.


--
-- Data for Name: sales_order_header; Type: TABLE DATA; Schema: sales; Owner: postgres
--

COPY sales.sales_order_header (sohe_id, sohe_order_date, sohe_due_date, sohe_ship_date, sohe_order_number, sohe_account_number, sohe_trpa_code_number, sohe_subtotal, sohe_tax, sohe_total_due, sohe_license_code, sohe_modified_date, sohe_user_entity_id, sohe_status) FROM stdin;
1	2023-06-26	2023-06-26	2023-06-26	ORDER533129	99081	TRPA023581	14925000	1492500.0	16417500.0	LICENSE90481	2023-06-26 16:03:38.660524+07	2	open
2	2023-06-26	2023-06-26	2023-06-26	ORDER507534	99081	TRPA577574	14925000	1492500.0	16417500.0	LICENSE48539	2023-06-26 16:03:44.388335+07	2	open
3	2023-06-27	2023-06-27	2023-06-27	ORDER583785	99081	TRPA381456	34500000	3450000.0	37950000.0	LICENSE60942	2023-06-27 15:53:02.373485+07	2	open
4	2023-06-27	2023-06-27	2023-06-27	ORDER935452	99081	TRPA421769	34500000	3450000.0	37950000.0	LICENSE15564	2023-06-27 15:53:15.454265+07	2	open
5	2023-06-27	2023-06-27	2023-06-27	ORDER244945	54321	TRPA634570	34500000	3450000.0	37950000.0	LICENSE00214	2023-06-28 00:00:24.880299+07	2	open
6	2023-06-28	2023-06-28	2023-06-28	ORDER734586	54321	TRPA823990	34500000	3450000.0	37950000.0	LICENSE97594	2023-06-28 16:42:16.608019+07	2	open
7	2023-06-28	2023-06-28	2023-06-28	ORDER612944	54321	TRPA029846	34500000	3450000.0	37950000.0	LICENSE15107	2023-06-28 16:42:19.702912+07	2	open
\.


--
-- Data for Name: special_offer; Type: TABLE DATA; Schema: sales; Owner: postgres
--

COPY sales.special_offer (spof_id, spof_description, spof_discount, spof_type, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_modified_date, spof_cate_id) FROM stdin;
1	Special Offer 1	0.5	Discount	2023-06-01	2023-06-30	1	10	2023-06-26 14:57:51.35516+07	1
2	Special Offer 2	0.2	Discount 2	2023-06-01	2023-06-30	1	10	2023-06-26 14:58:34.854813+07	1
\.


--
-- Data for Name: special_offer_programs; Type: TABLE DATA; Schema: sales; Owner: postgres
--

COPY sales.special_offer_programs (soco_id, soco_spof_id, soco_prog_entity_id, soco_status, soco_modified_date) FROM stdin;
1	1	2	open	2023-06-26 14:57:51.35516+07
2	2	2	open	2023-06-26 14:58:34.854813+07
\.


--
-- Data for Name: business_entity; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.business_entity (entity_id) FROM stdin;
2
3
4
9
11
15
17
18
20
24
26
28
29
35
36
39
40
41
42
44
45
46
47
49
50
51
52
53
54
55
58
59
60
61
62
63
64
65
66
68
69
70
71
72
73
74
75
76
78
83
84
85
86
87
88
89
90
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
136
137
138
139
140
141
142
143
144
145
\.


--
-- Data for Name: phone_number_type; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.phone_number_type (ponty_code, ponty_modified_date) FROM stdin;
+62	2023-06-20 22:12:27.239897+07
home	2023-06-25 22:30:40.110999+07
cellular	2023-06-25 22:30:40.110999+07
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.roles (role_id, role_name, role_type, role_modified_date) FROM stdin;
1	Admin	role admin	2023-06-23 19:36:01.81928+07
3	Employee	role employee	2023-06-23 19:36:01.81928+07
4	Direksi	role direksi	2023-06-23 19:36:01.81928+07
5	Business Development	role business	2023-06-23 19:36:01.81928+07
6	HR	role hr	2023-06-23 19:36:01.81928+07
7	Talent	role talent	2023-06-23 19:36:01.81928+07
8	Trainer	role trainer	2023-06-23 19:36:01.81928+07
9	Recruiter	role recruiter	2023-06-23 19:36:01.81928+07
2	Users	role users	2023-06-23 19:36:01.81928+07
10	Candidat	role candidat	2023-06-25 21:26:07.880102+07
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users (user_entity_id, user_name, user_password, user_first_name, user_last_name, user_birth_date, user_email_promotion, user_demographic, user_modified_date, user_photo, user_current_role) FROM stdin;
2	john_doe	password123	John	Doe	1990-01-01	1	{"age": 30, "gender": "male"}	2023-06-09 01:56:18.025707+07	john_doe.jpg	3
3	jane_smith	password456	Jane	Smith	1992-03-15	0	{"age": 28, "gender": "female"}	2023-06-09 01:56:18.025707+07	jane_smith.jpg	3
86	admin	$2b$10$1zw3vP9v4tYgLPRtfYX.I.HJJTD7DPjtSn4DcmtQqMd1PyUM6a4/G	\N	\N	\N	0	\N	2023-06-23 19:37:20.208285+07	\N	1
113	coba	$2b$10$sC3PUAbEFBBSaKwVGc2xdezyC4Z8gjuefj2adaWfbJ1ChTEC.mkum	\N	\N	\N	0	\N	2023-06-26 23:17:56.668477+07	\N	2
127	coba2	$2b$10$FY9CepHDdpNcTX/2wExx7Orh1syUcaGzRLjbKWSSE2BzhQrPpGkl6	isan	jawir	2023-06-22	0	\N	2023-06-27 05:54:33.984509+07	userphoto-t2jdxicnj7j-WhatsApp Image 2023-06-27 at 04.08.16.jpeg	10
120	aji	$2b$10$aOJi/hM7APKg9HpYGXXt8evvbF1EhzCaYw0hyP0cjxaaDumX/95Qa	Aji	Pangestu	2007-08-19	0	\N	2023-06-27 04:08:17.259664+07	userphoto-sqwi8lery9f-WhatsApp Image 2023-06-27 at 04.08.16.jpeg	10
97	employee1	$2b$10$On9ghgBxNrtCL3KjQxpUH.w76G4RsBROsGk1gEwUMEX5/Ln3LSWEW	\N	\N	\N	0	\N	2023-06-26 08:17:43.093561+07	\N	3
96	hr	$2b$10$BRHdmRx7JSQGjfHJaUYShebL37KKJZYtGFGyay5orTz5b4MzGptFW	\N	\N	\N	0	\N	2023-06-26 08:13:33.574+07	\N	6
95	recruiter	$2b$10$4Jym9Y5c6Hf53YGinAQBx./CaiAg3BafFtAGYTCcu5qO/y9O1SLgO	\N	\N	\N	0	\N	2023-06-26 08:36:12.477+07	\N	9
121	ppp	$2b$10$RNjAeysMBciavMk2QmdvSOvx4b4ZPX47Fu71VJuM5CKy/fjBJzLze	pppppppp	ppp	2018-03-21	0	\N	2023-06-27 04:50:46.143463+07	userphoto-1736tab1dc-WhatsApp Image 2023-06-27 at 04.08.16.jpeg	10
98	users	$2b$10$kmxhOpiuImtqjkgJFQKNqeY0hOEvGpkxhkHf0.Aq.CYLrwI/fC88a	Tamariska Laras	Suci	2001-11-23	0	\N	2023-06-26 08:59:55.815823+07	userphoto-mpb0pd8wr1-7309700.jpg	10
99	users2	$2b$10$Gi4ZX3LulSFPh7CH0p9Sm.RiBdErZae6D./FFkvdZuMEzO.i3Y.lC	\N	\N	\N	0	\N	2023-06-26 12:32:35.9026+07	\N	2
132	user11	$2b$10$6l9o4XK8RzJgOx6EshNYa.DGoVIYkD7YgKdI7wKvEldSw0u56JPay	\N	\N	\N	0	\N	2023-06-27 13:38:19.080402+07	\N	2
105	users-log	$2b$10$RSoQrFTh2OKrZfBiCTx0veVNHqFepcvh79twC8n6WboHg4MjkjPVO	\N	\N	\N	0	\N	2023-06-26 21:26:37.371879+07	\N	2
106	employee-log	$2b$10$TRQbpoT/1q8RvrzljWQnhu7HgceJH8ydsgbAropVyI1EsOqLhdMdK	\N	\N	\N	0	\N	2023-06-26 21:27:25.44095+07	\N	3
122	farelkembar	$2b$10$9NaE8z45Hx1Mq30Xd5yKUOiMSYyvKDRt2ypR8xppODHEywpvJTQxW	farel	kembar	1995-11-02	0	\N	2023-06-27 05:01:19.330501+07	userphoto-81dxqyqosnk-7309700.jpg	10
129	ikram-log	$2b$10$hiktFKQTJvNu1il2UX0j0.GM2iq3YzGv2/zFQPNm25X8m1tL9vWBy	Ikram	Nauval	1999-07-09	0	\N	2023-06-27 11:40:00.643148+07	userphoto-j800jhu25im-7309700.jpg	10
123	popo	$2b$10$vcpbC0ML47oNP/Pd2z6llOoVKojHIUZoseEAvpxpJu0FFFxigD94i	popo	popo	2023-06-27	0	\N	2023-06-27 05:21:43.488423+07	userphoto-din4j9k7b2k-WhatsApp Image 2023-06-27 at 04.08.16.jpeg	10
124	qwerty	$2b$10$DoMvLdp.uVY8t5qJQLNBm.80bhxhOV1RFmfV8TY4CL75sFpPv7gai	\N	\N	\N	0	\N	2023-06-27 05:26:55.354984+07	\N	2
112	candidat-log	$2b$10$QilVpwZBl48kGDExbiUkWe.g9/30Ciz/27fGw9WuxrF0WDDiIXYZu	\N	\N	\N	0	\N	2023-06-26 21:11:55.187+07	\N	10
111	recruiter-log	$2b$10$HDvMxxfvLu00N1D7Y9gYZeDRMA.lrbJ60L5Z9nWGC17mbmma73mv.	\N	\N	\N	0	\N	2023-06-26 21:11:55.187+07	\N	9
110	trainer-log	$2b$10$WwCduOhoSEbRtwD5OYFYKuNAfFshvR5cXZ/0OOqXf7htkQcpPegta	\N	\N	\N	0	\N	2023-06-26 21:11:55.187+07	\N	8
109	talent-log	$2b$10$qUg8l1WnjNQ0lZc.xrMiTO/Wu8uuVNgrQXMqPxxyFN0fMcOWDl8eK	\N	\N	\N	0	\N	2023-06-26 21:11:55.187+07	\N	7
108	hr-log	$2b$10$N7BQIab88ArzO7FSMuMRnuw947HW3zLdqYNVhtjGt6TnaIYJFN6Ae	\N	\N	\N	0	\N	2023-06-26 21:11:55.187+07	\N	6
107	busines-log	$2b$10$uF94z0tioRXc4PMi6CvaJO6Tdqp3YsiwhwT.EE9DzamZBV43ny/jm	\N	\N	\N	0	\N	2023-06-26 21:11:55.187+07	\N	5
90	bagasarya	$2b$10$AdbXqONiREy2F3yzMtekr.qXAeXHmXk4zHtbJhEpswLyAL7G1ZS6S	Bagas	Arya Pradipta	2000-08-15	0	\N	2023-06-27 10:33:40.834+07	userphoto-m72whi02mua-7309700.jpg	1
125	coba1	$2b$10$jSMT6pvWdi6rIKR2qGGo3OlIEGxoxHisNpOLLfXKky1IYPU07dGwq	1212	asdasd	2023-06-15	0	\N	2023-06-27 05:29:42.437933+07	userphoto-jyzmvtfnbs-WhatsApp Image 2023-06-27 at 04.08.16.jpeg	10
133	user12	$2b$10$qV.Ud8HyVY6PxpfPP93YBumx5lgf2tws2bsurGV/3mb47wnQTe9JG	assad	asdsad	2023-06-29	0	\N	2023-06-27 13:38:26.346793+07	userphoto-rnnygo070q-WhatsApp Image 2023-06-27 at 04.08.16.jpeg	10
4	mike_jones	password789	Mike	Jones	1985-07-22	1	{"age": 35, "gender": "male"}	2023-06-09 01:56:18.025707+07	https://plus.unsplash.com/premium_photo-1667480556783-119d25e19d6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80	3
89	super-admin	$2b$10$5advzcmEa3efs1ckaIq5t.EHhY8z42eZeI2yj8z3m9dS4XVqx6sji	Bagas	Admin	2000-08-15	0	\N	2023-06-27 12:40:35.106+07	user_photo-bps13crt09b-7309700.jpg	1
128	danysumargo	$2b$10$CBpalHNSmne8YntiAU0JTObIRlz7mipfvSXbcw/bky7RG8V3E0fGW	dany	sumargo	2007-12-29	0	\N	2023-06-27 10:45:28.035523+07	userphoto-bz8me8absa-WhatsApp Image 2023-06-27 at 04.08.16.jpeg	10
126	ssss	$2b$10$UtnlFE.l3T.0jogWt1exwOhu7qbljVugijMaiwXzpECyYkS6DGqsC	aji	gans	2023-06-08	0	\N	2023-06-27 05:43:23.698572+07	userphoto-yli3ul3gwq-WhatsApp Image 2023-06-27 at 04.08.16.jpeg	10
140	Tamariska	$2b$10$TKX8o5Vn3vV7j5Nyeluoq.Nbjrytvmix7VJFN9WVl08tKO0p0.Ie2	Tamariska Laras	Suci	2001-11-23	0	\N	2023-06-27 20:33:24.111032+07	userphoto-9gnf807fnh9-gambarorang.jpg	10
130	popopo	$2b$10$bjL7zEAorVJvX/yxTe6oEeRDZcW62nQNECILymnQ08Orc429z1x0m	asdasd	asdasd	2023-06-20	0	\N	2023-06-27 13:01:37.410243+07	userphoto-98rrlav5d7c-WhatsApp Image 2023-06-27 at 04.08.16.jpeg	10
131	popopopo	$2b$10$aAQgMapK6jMxhLBesbenAe..2Ej8mGpJJL.zTdyG.TpjGFpOySwBG	ad	asdasd	2023-06-12	0	\N	2023-06-27 13:32:59.804333+07	userphoto-40fn8fr85ah-WhatsApp Image 2023-06-27 at 04.08.16.jpeg	10
104	admin-super	$2b$10$a4Bz0.G3bNfxN4iV/bkU4eOTkgu6EqmCe89BPDNimAGqD7xtc8yF6	Super	Admin	\N	0	\N	2023-06-27 13:10:54.977+07	user_photo-vwkhqo0p6da-7309700.jpg	1
144	vendyblessing	$2b$10$IEPQzX.4zKkFXAIOe6utmeZmm6YfgJkcPIYVQ6bBzb4Ed/T946Ezu	\N	\N	\N	0	\N	2023-06-27 21:08:59.853868+07	\N	2
134	bagasuser	$2b$10$PEZ7w7KkfURawY5m.yEI6uRYiNXR0oTi/ipb6I0x042GQ9UWgpEVC	Bagas	Arya Pradipta	2000-08-15	0	\N	2023-06-28 02:46:54.028+07	userphoto-gy50ogifgto-7309700.jpg	10
\.


--
-- Data for Name: users_address; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users_address (etad_addr_id, etad_modified_date, etad_entity_id, etad_adty_id) FROM stdin;
14	2023-06-25 22:31:08.454818+07	90	3
16	2023-06-27 12:43:25.039814+07	89	3
\.


--
-- Data for Name: users_education; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users_education (usdu_id, usdu_entity_id, usdu_school, usdu_degree, usdu_field_study, usdu_graduate_year, usdu_start_date, usdu_end_date, usdu_grade, usdu_activities, usdu_description, usdu_modified_data) FROM stdin;
1	90	Universitas Indraprasta	Bachelor	Teknik Informatika	\N	2018-08-25	2022-08-25	3.42	Play Mobile Legend	Hello	2023-06-25 21:20:55.289+07
2	98	upn	Bachelor	tata boga	\N	\N	\N	\N	\N	\N	2023-06-26 10:40:53.604275+07
3	120	UI	Bachelor	Tataboga	\N	\N	\N	\N	\N	\N	2023-06-27 04:12:00.628447+07
4	121	onkj	Bachelor	ssad	\N	\N	\N	\N	\N	\N	2023-06-27 04:58:05.561395+07
5	122	codex	Diploma	fullstack	\N	\N	\N	\N	\N	\N	2023-06-27 05:03:38.437654+07
6	123	popo	Bachelor	popo	\N	\N	\N	\N	\N	\N	2023-06-27 05:24:25.130003+07
7	125	asdasd	Bachelor	asdasd	\N	\N	\N	\N	\N	\N	2023-06-27 05:39:07.813463+07
8	126	aaaa	Bachelor	aaaa	\N	\N	\N	\N	\N	\N	2023-06-27 05:46:35.040626+07
9	127	assa	Bachelor	adsad	\N	\N	\N	\N	\N	\N	2023-06-27 05:55:53.678419+07
10	128	gundar	Bachelor	tataboga	\N	\N	\N	\N	\N	\N	2023-06-27 10:47:18.109312+07
11	129	Universitas Gunadarma	Bachelor	Sistem Informasi	\N	\N	\N	\N	\N	\N	2023-06-27 12:29:38.90378+07
13	130	asdsad	Bachelor	asdasd	\N	\N	\N	\N	\N	\N	2023-06-27 13:03:57.118967+07
14	131	asdasd	Bachelor	asdasd	\N	\N	\N	\N	\N	\N	2023-06-27 13:35:54.25884+07
15	133	asdasd	Bachelor	asdasdasd	\N	\N	\N	\N	\N	\N	2023-06-27 13:39:32.840806+07
17	104	Unindra	Bachelor	Informatika	\N	2018-06-27	2022-08-15	3.45	Test22	Test22	2023-06-27 13:10:55.344+07
18	140	UPN JATIM	Bachelor	Information System	\N	\N	\N	\N	\N	\N	2023-06-27 20:35:16.625856+07
16	134	Unindra	Bachelor	Teknik Informatika	\N	2018-06-22	2022-08-15	3.42			2023-06-28 02:46:53.983+07
\.


--
-- Data for Name: users_email; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users_email (pmail_entity_id, pmail_id, pmail_address, pmail_modified_date) FROM stdin;
2	1	john_doe@mail.com	2023-06-20 22:06:45.589159+07
3	2	jane_smith@mail.com	2023-06-20 22:06:45.589159+07
4	3	mike_jones@mail.com	2023-06-20 22:06:45.589159+07
86	4	admin@example.com	2023-06-23 19:37:20.208285+07
90	6	bagasarya150800@gmail.com	2023-06-25 21:20:55.306+07
95	7	recruiter@mail.com	2023-06-26 08:15:40.741835+07
96	8	hr@mail.com	2023-06-26 08:16:31.820575+07
97	9	employee@mail.com	2023-06-26 08:17:43.093561+07
98	10	users@gmail.com	2023-06-26 08:59:55.815823+07
99	11	users2@gmail.com	2023-06-26 12:32:35.9026+07
104	12	admin@gmail.com	2023-06-26 21:24:49.612696+07
105	13	userslog@gmail.com	2023-06-26 21:26:37.371879+07
106	14	employeelog@gmail.com	2023-06-26 21:27:25.44095+07
107	15	busines-log@gmail.com	2023-06-26 21:30:15.737171+07
108	16	hrlog@gmail.com	2023-06-26 21:30:37.372786+07
109	17	talentlog@gmail.com	2023-06-26 21:35:05.734098+07
110	18	trainerlog@gmail.com	2023-06-26 21:35:23.849784+07
111	19	recruiterlog@gmail.com	2023-06-26 21:36:04.207519+07
112	20	candidat@gmail.com	2023-06-26 21:37:35.321655+07
113	21	coba@gmail.com	2023-06-26 23:17:56.668477+07
120	22	aji@mail.com	2023-06-27 04:08:17.259664+07
121	23	ppp@mail.com	2023-06-27 04:50:46.143463+07
122	24	farel@mail.com	2023-06-27 05:01:19.330501+07
123	25	popo@gmail.com	2023-06-27 05:21:43.488423+07
124	26	qwerty@qwerty.com	2023-06-27 05:26:55.354984+07
125	27	coba1@gmail.com	2023-06-27 05:29:42.437933+07
126	28	ssss@gmail.com	2023-06-27 05:43:23.698572+07
127	29	coba2@gmail.com	2023-06-27 05:54:33.984509+07
128	30	dany@mail.com	2023-06-27 10:45:28.035523+07
129	31	ikram@gmail.com	2023-06-27 11:40:00.643148+07
89	5	adminsuper@gmail.com	2023-06-27 12:40:35.692+07
130	33	popopo@gmail.com	2023-06-27 13:01:37.410243+07
131	34	user10@gmail.com	2023-06-27 13:32:59.804333+07
132	35	user11@gmail.com	2023-06-27 13:38:19.080402+07
133	36	user12@gmail.com	2023-06-27 13:38:26.346793+07
134	37	bagasuser@gmail.com	2023-06-27 14:33:46.5886+07
140	39	tamariska@mail.com	2023-06-27 20:33:24.111032+07
144	40	vendygulo@gmail.com	2023-06-27 21:08:59.853868+07
\.


--
-- Data for Name: users_experiences; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users_experiences (usex_id, usex_entity_id, usex_title, usex_profile_headline, usex_employment_type, usex_company_name, usex_is_current, usex_start_date, usex_end_date, usex_industry, usex_description, usex_experience_type, usex_city_id) FROM stdin;
1	90	Sarjana Komputer	Fullstack Node Js	fulltime	Codex	1	2023-03-20	\N	Tbk	Learn Full JS, PostgreSQL	company	1
3	104	Sarjana Komputer	Fullstack Js	fulltime	Codex	0	2023-03-20	2023-06-30	Tbl	Learn node js	company	1
4	104	Sarjana Komputer	Ui / Ux Designer	freelance	PT HahaHihi	1	2022-08-12	\N	tbk	Design use figma	company	4
\.


--
-- Data for Name: users_experiences_skill; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users_experiences_skill (uesk_usex_id, uesk_uski_id) FROM stdin;
\.


--
-- Data for Name: users_license; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users_license (usli_id, usli_license_code, usli_modified_date, usli_status, usli_entity_id) FROM stdin;
\.


--
-- Data for Name: users_media; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users_media (usme_id, usme_entity_id, usme_file_link, usme_filename, usme_filetype, usme_note, usme_modified_data, usme_filesize) FROM stdin;
1	90	http://localhost:7300/files/user-media/user_resume-6c3y6oxyf3w-coba.pdf	user_resume-6c3y6oxyf3w-coba.pdf	pdf	\N	2023-06-25 22:25:41.653032+07	928513
2	98	http://localhost:3003/files/user-media/user_resume-9mn06xlgpln-coba.pdf	user_resume-9mn06xlgpln-coba.pdf	pdf	\N	2023-06-26 10:40:53.604275+07	928513
3	120	http://localhost:3003/files/user-media/user_resume-h55y0l8932u-coba.pdf	user_resume-h55y0l8932u-coba.pdf	pdf	\N	2023-06-27 04:12:00.628447+07	928513
4	121	http://localhost:3003/files/user-media/user_resume-edcawb5q3s-coba.pdf	user_resume-edcawb5q3s-coba.pdf	pdf	\N	2023-06-27 04:58:05.561395+07	928513
5	122	http://localhost:3003/files/user-media/user_resume-mwbdje1txcd-coba.pdf	user_resume-mwbdje1txcd-coba.pdf	pdf	\N	2023-06-27 05:03:38.437654+07	928513
6	123	http://localhost:3003/files/user-media/user_resume-h85lui6t0no-coba.pdf	user_resume-h85lui6t0no-coba.pdf	pdf	\N	2023-06-27 05:24:25.130003+07	928513
7	125	http://localhost:3003/files/user-media/user_resume-5mv33q6qy2v-coba.pdf	user_resume-5mv33q6qy2v-coba.pdf	pdf	\N	2023-06-27 05:39:07.813463+07	928513
8	126	http://localhost:3003/files/user-media/user_resume-s7r062f1vx-coba.pdf	user_resume-s7r062f1vx-coba.pdf	pdf	\N	2023-06-27 05:46:35.040626+07	928513
9	127	http://localhost:3003/files/user-media/user_resume-pbn9drd2f39-coba.pdf	user_resume-pbn9drd2f39-coba.pdf	pdf	\N	2023-06-27 05:55:53.678419+07	928513
10	128	http://localhost:3003/files/user-media/user_resume-zv2k2qmtdnc-coba.pdf	user_resume-zv2k2qmtdnc-coba.pdf	pdf	\N	2023-06-27 10:47:18.109312+07	928513
11	129	http://localhost:3003/files/user-media/user_resume-1x48gp00mox-coba.pdf	user_resume-1x48gp00mox-coba.pdf	pdf	\N	2023-06-27 12:29:38.90378+07	928513
12	130	http://localhost:3003/files/user-media/user_resume-a8720i8cd8v-coba.pdf	user_resume-a8720i8cd8v-coba.pdf	pdf	\N	2023-06-27 13:03:57.118967+07	928513
13	131	http://localhost:3003/files/user-media/user_resume-h4jit82r0jc-coba.pdf	user_resume-h4jit82r0jc-coba.pdf	pdf	\N	2023-06-27 13:35:54.25884+07	928513
14	133	http://localhost:3003/files/user-media/user_resume-njltwrrbk3-coba.pdf	user_resume-njltwrrbk3-coba.pdf	pdf	\N	2023-06-27 13:39:32.840806+07	928513
15	134	http://localhost:3003/files/user-media/user_resume-muw0je1yb-coba.pdf	user_resume-muw0je1yb-coba.pdf	pdf	\N	2023-06-27 14:36:22.702714+07	928513
16	140	http://localhost:3003/files/user-media/user_resume-1demvj1eysk-coba.pdf	user_resume-1demvj1eysk-coba.pdf	pdf	\N	2023-06-27 20:35:16.625856+07	928513
\.


--
-- Data for Name: users_phones; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users_phones (uspo_entity_id, uspo_number, uspo_modified_date, uspo_ponty_code) FROM stdin;
2	86535085432	2023-06-20 22:13:54.07472+07	+62
3	86448907531	2023-06-20 22:13:54.07472+07	+62
4	85653357865	2023-06-20 22:13:54.07472+07	+62
86	081285711010	2023-06-23 19:37:20.208285+07	\N
95	098765443e2	2023-06-26 08:15:40.741835+07	\N
96	0987654	2023-06-26 08:16:31.820575+07	\N
97	09876543	2023-06-26 08:17:43.093561+07	\N
98	9876543	2023-06-26 08:59:55.815823+07	\N
99	098765	2023-06-26 12:32:35.9026+07	\N
120	0888888838	2023-06-27 04:08:17.259664+07	\N
121	098865789	2023-06-27 04:50:46.143463+07	\N
122	0987654	2023-06-27 05:01:19.330501+07	\N
123	1234567890	2023-06-27 05:21:43.488423+07	\N
124	1212	2023-06-27 05:26:55.354984+07	\N
126	123456789	2023-06-27 05:43:23.698572+07	\N
127	123456789	2023-06-27 05:54:33.984509+07	\N
128	0987654	2023-06-27 10:45:28.035523+07	\N
129	0123456789	2023-06-27 11:40:00.643148+07	\N
89	08128571010	2023-06-27 12:40:35.745+07	cellular
90	08128571010	2023-06-27 12:40:35.745+07	cellular
130	undefined	2023-06-27 13:01:37.410243+07	\N
131	undefined	2023-06-27 13:32:59.804333+07	\N
132	1212	2023-06-27 13:38:19.080402+07	\N
133	undefined	2023-06-27 13:38:26.346793+07	\N
134	081285711519	2023-06-27 14:33:46.5886+07	\N
104	0891999	2023-06-27 13:10:55.405+07	home
140	0987654	2023-06-27 20:33:24.111032+07	\N
144	0987646264276	2023-06-27 21:08:59.853868+07	\N
\.


--
-- Data for Name: users_roles; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users_roles (usro_entity_id, usro_role_id, usro_modified_date) FROM stdin;
86	1	2023-06-23 19:37:20.208285+07
89	1	2023-06-25 21:26:25.894308+07
97	3	2023-06-26 08:17:43.093561+07
96	6	2023-06-26 08:16:31.820575+07
95	9	2023-06-26 08:15:40.741835+07
98	10	2023-06-26 08:59:55.815823+07
99	2	2023-06-26 12:32:35.9026+07
105	2	2023-06-26 21:26:37.371879+07
106	3	2023-06-26 21:27:25.44095+07
104	1	2023-06-26 21:24:49.612696+07
112	10	2023-06-26 21:37:35.321655+07
111	9	2023-06-26 21:36:04.207519+07
110	8	2023-06-26 21:35:23.849784+07
109	7	2023-06-26 21:35:05.734098+07
108	6	2023-06-26 21:30:37.372786+07
107	5	2023-06-26 21:30:15.737171+07
113	2	2023-06-26 23:17:56.668477+07
120	10	2023-06-27 04:08:17.259664+07
121	10	2023-06-27 04:50:46.143463+07
122	10	2023-06-27 05:01:19.330501+07
123	10	2023-06-27 05:21:43.488423+07
124	2	2023-06-27 05:26:55.354984+07
125	10	2023-06-27 05:29:42.437933+07
126	10	2023-06-27 05:43:23.698572+07
127	10	2023-06-27 05:54:33.984509+07
128	10	2023-06-27 10:45:28.035523+07
129	10	2023-06-27 11:40:00.643148+07
130	10	2023-06-27 13:01:37.410243+07
131	10	2023-06-27 13:32:59.804333+07
132	2	2023-06-27 13:38:19.080402+07
133	10	2023-06-27 13:38:26.346793+07
134	10	2023-06-27 14:33:46.5886+07
90	8	2023-06-25 22:14:19.142462+07
140	10	2023-06-27 20:33:24.111032+07
144	2	2023-06-27 21:08:59.853868+07
\.


--
-- Data for Name: users_skill; Type: TABLE DATA; Schema: users; Owner: postgres
--

COPY users.users_skill (uski_id, uski_entity_id, uski_modified_date, uski_skty_name) FROM stdin;
1	90	2023-06-25 22:34:55.060949+07	Programming
4	104	2023-06-27 14:44:50.677814+07	Programming
6	104	2023-06-28 02:49:36.692086+07	Design
7	134	2023-06-28 03:16:58.561512+07	Programming
\.


--
-- Name: batch_batch_id_seq; Type: SEQUENCE SET; Schema: bootcamp; Owner: postgres
--

SELECT pg_catalog.setval('bootcamp.batch_batch_id_seq', 26, true);


--
-- Name: batch_trainee_batr_id_seq; Type: SEQUENCE SET; Schema: bootcamp; Owner: postgres
--

SELECT pg_catalog.setval('bootcamp.batch_trainee_batr_id_seq', 18, true);


--
-- Name: batch_trainee_evaluation_btev_id_seq; Type: SEQUENCE SET; Schema: bootcamp; Owner: postgres
--

SELECT pg_catalog.setval('bootcamp.batch_trainee_evaluation_btev_id_seq', 10, true);


--
-- Name: program_apply_progress_parog_id_seq; Type: SEQUENCE SET; Schema: bootcamp; Owner: postgres
--

SELECT pg_catalog.setval('bootcamp.program_apply_progress_parog_id_seq', 2, true);


--
-- Name: talents_talent_id_seq; Type: SEQUENCE SET; Schema: bootcamp; Owner: postgres
--

SELECT pg_catalog.setval('bootcamp.talents_talent_id_seq', 1, true);


--
-- Name: program_entity_prog_entity_id_seq; Type: SEQUENCE SET; Schema: curriculum; Owner: postgres
--

SELECT pg_catalog.setval('curriculum.program_entity_prog_entity_id_seq', 1, true);


--
-- Name: section_detail_material_sedm_id_seq; Type: SEQUENCE SET; Schema: curriculum; Owner: postgres
--

SELECT pg_catalog.setval('curriculum.section_detail_material_sedm_id_seq', 1, true);


--
-- Name: section_detail_material_sedm_secd_id_seq; Type: SEQUENCE SET; Schema: curriculum; Owner: postgres
--

SELECT pg_catalog.setval('curriculum.section_detail_material_sedm_secd_id_seq', 1, false);


--
-- Name: section_detail_secd_id_seq; Type: SEQUENCE SET; Schema: curriculum; Owner: postgres
--

SELECT pg_catalog.setval('curriculum.section_detail_secd_id_seq', 1, true);


--
-- Name: sections_sect_id_seq; Type: SEQUENCE SET; Schema: curriculum; Owner: postgres
--

SELECT pg_catalog.setval('curriculum.sections_sect_id_seq', 1, true);


--
-- Name: department_dept_id_seq; Type: SEQUENCE SET; Schema: hr; Owner: postgres
--

SELECT pg_catalog.setval('hr.department_dept_id_seq', 3, true);


--
-- Name: employee_client_contract_ecco_id_seq; Type: SEQUENCE SET; Schema: hr; Owner: postgres
--

SELECT pg_catalog.setval('hr.employee_client_contract_ecco_id_seq', 1, false);


--
-- Name: employee_department_history_edhi_id_seq; Type: SEQUENCE SET; Schema: hr; Owner: postgres
--

SELECT pg_catalog.setval('hr.employee_department_history_edhi_id_seq', 10, true);


--
-- Name: client_clit_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.client_clit_id_seq', 13, true);


--
-- Name: employee_range_emra_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.employee_range_emra_id_seq', 4, true);


--
-- Name: job_category_joca_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.job_category_joca_id_seq', 3, true);


--
-- Name: job_photo_jopho_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.job_photo_jopho_id_seq', 64, true);


--
-- Name: job_post_jopo_entity_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.job_post_jopo_entity_id_seq', 1, false);


--
-- Name: job_post_jopo_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.job_post_jopo_id_seq', 35, true);


--
-- Name: talent_apply_progress_tapr_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.talent_apply_progress_tapr_id_seq', 21, true);


--
-- Name: address_addr_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.address_addr_id_seq', 21, true);


--
-- Name: address_type_adty_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.address_type_adty_id_seq', 5, true);


--
-- Name: category_cate_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.category_cate_id_seq', 5, true);


--
-- Name: city_city_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.city_city_id_seq', 7, true);


--
-- Name: job_role_joro_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.job_role_joro_id_seq', 5, true);


--
-- Name: job_type_joty_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.job_type_joty_id_seq', 2, true);


--
-- Name: province_prov_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.province_prov_id_seq', 4, true);


--
-- Name: route_actions_roac_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.route_actions_roac_id_seq', 44, true);


--
-- Name: skill_template_skte_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.skill_template_skte_id_seq', 1, false);


--
-- Name: transaction_payment_trpa_id_seq; Type: SEQUENCE SET; Schema: payment; Owner: postgres
--

SELECT pg_catalog.setval('payment.transaction_payment_trpa_id_seq', 2, true);


--
-- Name: cart_items_cait_id_seq; Type: SEQUENCE SET; Schema: sales; Owner: postgres
--

SELECT pg_catalog.setval('sales.cart_items_cait_id_seq', 5, true);


--
-- Name: sales_order_detail_sode_id_seq; Type: SEQUENCE SET; Schema: sales; Owner: postgres
--

SELECT pg_catalog.setval('sales.sales_order_detail_sode_id_seq', 10, true);


--
-- Name: sales_order_header_sohe_id_seq; Type: SEQUENCE SET; Schema: sales; Owner: postgres
--

SELECT pg_catalog.setval('sales.sales_order_header_sohe_id_seq', 7, true);


--
-- Name: special_offer_programs_soco_id_seq; Type: SEQUENCE SET; Schema: sales; Owner: postgres
--

SELECT pg_catalog.setval('sales.special_offer_programs_soco_id_seq', 1, false);


--
-- Name: special_offer_spof_id_seq; Type: SEQUENCE SET; Schema: sales; Owner: postgres
--

SELECT pg_catalog.setval('sales.special_offer_spof_id_seq', 1, false);


--
-- Name: business_entity_entity_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.business_entity_entity_id_seq', 145, true);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.roles_role_id_seq', 10, true);


--
-- Name: users_education_usdu_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.users_education_usdu_id_seq', 19, true);


--
-- Name: users_email_pmail_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.users_email_pmail_id_seq', 40, true);


--
-- Name: users_experiences_usex_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.users_experiences_usex_id_seq', 4, true);


--
-- Name: users_license_usli_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.users_license_usli_id_seq', 1, false);


--
-- Name: users_media_usme_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.users_media_usme_id_seq', 16, true);


--
-- Name: users_skill_uski_id_seq; Type: SEQUENCE SET; Schema: users; Owner: postgres
--

SELECT pg_catalog.setval('users.users_skill_uski_id_seq', 7, true);


--
-- Name: batch batch_batch_name_key; Type: CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch
    ADD CONSTRAINT batch_batch_name_key UNIQUE (batch_name);


--
-- Name: batch batch_pkey; Type: CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch
    ADD CONSTRAINT batch_pkey PRIMARY KEY (batch_id, batch_entity_id);


--
-- Name: batch_trainee_evaluation batch_trainee_evaluation_pkey; Type: CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch_trainee_evaluation
    ADD CONSTRAINT batch_trainee_evaluation_pkey PRIMARY KEY (btev_id);


--
-- Name: batch_trainee batch_trainee_pkey; Type: CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch_trainee
    ADD CONSTRAINT batch_trainee_pkey PRIMARY KEY (batr_id, batr_batch_id);


--
-- Name: batch batch_unique_id; Type: CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch
    ADD CONSTRAINT batch_unique_id UNIQUE (batch_id);


--
-- Name: program_apply program_apply_pkey; Type: CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.program_apply
    ADD CONSTRAINT program_apply_pkey PRIMARY KEY (prap_user_entity_id, prap_prog_entity_id);


--
-- Name: program_apply_progress program_apply_progress_pkey; Type: CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.program_apply_progress
    ADD CONSTRAINT program_apply_progress_pkey PRIMARY KEY (parog_id);


--
-- Name: talents talents_pkey; Type: CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.talents
    ADD CONSTRAINT talents_pkey PRIMARY KEY (talent_id);


--
-- Name: trainer_programs trainer_programs_pkey; Type: CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.trainer_programs
    ADD CONSTRAINT trainer_programs_pkey PRIMARY KEY (batch_id, tpro_emp_entity_id);


--
-- Name: program_entity_description program_entity_description_pkey; Type: CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.program_entity_description
    ADD CONSTRAINT program_entity_description_pkey PRIMARY KEY (pred_prog_entity_id);


--
-- Name: program_entity program_entity_pkey; Type: CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.program_entity
    ADD CONSTRAINT program_entity_pkey PRIMARY KEY (prog_entity_id);


--
-- Name: program_reviews program_reviews_pkey; Type: CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.program_reviews
    ADD CONSTRAINT program_reviews_pkey PRIMARY KEY (prow_user_entity_id, prow_prog_entity_id);


--
-- Name: section_detail_material section_detail_material_pkey; Type: CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.section_detail_material
    ADD CONSTRAINT section_detail_material_pkey PRIMARY KEY (sedm_id);


--
-- Name: section_detail section_detail_pkey; Type: CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.section_detail
    ADD CONSTRAINT section_detail_pkey PRIMARY KEY (secd_id);


--
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (sect_id, sect_prog_entity_id);


--
-- Name: sections sections_sect_id_key; Type: CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.sections
    ADD CONSTRAINT sections_sect_id_key UNIQUE (sect_id);


--
-- Name: department department_dept_name_key; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.department
    ADD CONSTRAINT department_dept_name_key UNIQUE (dept_name);


--
-- Name: department department_pkey; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (dept_id);


--
-- Name: employee_client_contract employee_client_contract_pkey; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_client_contract
    ADD CONSTRAINT employee_client_contract_pkey PRIMARY KEY (ecco_id, ecco_entity_id);


--
-- Name: employee_department_history employee_department_history_pkey; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_department_history
    ADD CONSTRAINT employee_department_history_pkey PRIMARY KEY (edhi_id, edhi_entity_id);


--
-- Name: employee employee_emp_emp_number_key; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee
    ADD CONSTRAINT employee_emp_emp_number_key UNIQUE (emp_emp_number);


--
-- Name: employee employee_emp_national_id_key; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee
    ADD CONSTRAINT employee_emp_national_id_key UNIQUE (emp_national_id);


--
-- Name: employee_pay_history employee_pay_history_pkey; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_pay_history
    ADD CONSTRAINT employee_pay_history_pkey PRIMARY KEY (ephi_entity_id, ephi_rate_change_date);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (emp_entity_id);


--
-- Name: client client_clit_name_key; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.client
    ADD CONSTRAINT client_clit_name_key UNIQUE (clit_name);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (clit_id);


--
-- Name: employee_range employee_range_emra_range_max_key; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.employee_range
    ADD CONSTRAINT employee_range_emra_range_max_key UNIQUE (emra_range_max);


--
-- Name: employee_range employee_range_emra_range_min_key; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.employee_range
    ADD CONSTRAINT employee_range_emra_range_min_key UNIQUE (emra_range_min);


--
-- Name: employee_range employee_range_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.employee_range
    ADD CONSTRAINT employee_range_pkey PRIMARY KEY (emra_id);


--
-- Name: job_category job_category_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_category
    ADD CONSTRAINT job_category_pkey PRIMARY KEY (joca_id);


--
-- Name: job_photo job_photo_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_photo
    ADD CONSTRAINT job_photo_pkey PRIMARY KEY (jopho_id);


--
-- Name: job_post_desc job_post_desc_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post_desc
    ADD CONSTRAINT job_post_desc_pkey PRIMARY KEY (jopo_entity_id);


--
-- Name: job_post job_post_jopo_number_key; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_number_key UNIQUE (jopo_number);


--
-- Name: job_post job_post_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_pkey PRIMARY KEY (jopo_entity_id);


--
-- Name: talent_apply talent_apply_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply
    ADD CONSTRAINT talent_apply_pkey PRIMARY KEY (taap_user_entity_id, taap_entity_id);


--
-- Name: talent_apply_progress talent_apply_progress_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply_progress
    ADD CONSTRAINT talent_apply_progress_pkey PRIMARY KEY (tapr_id, tapr_taap_user_entity_id, tapr_taap_entity_id);


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (addr_id);


--
-- Name: address_type address_type_adty_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address_type
    ADD CONSTRAINT address_type_adty_name_key UNIQUE (adty_name);


--
-- Name: address_type address_type_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address_type
    ADD CONSTRAINT address_type_pkey PRIMARY KEY (adty_id);


--
-- Name: category category_cate_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.category
    ADD CONSTRAINT category_cate_name_key UNIQUE (cate_name);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (cate_id);


--
-- Name: city city_city_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.city
    ADD CONSTRAINT city_city_name_key UNIQUE (city_name);


--
-- Name: city city_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (city_id);


--
-- Name: country country_country_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.country
    ADD CONSTRAINT country_country_name_key UNIQUE (country_name);


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (country_code);


--
-- Name: education education_edu_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.education
    ADD CONSTRAINT education_edu_name_key UNIQUE (edu_name);


--
-- Name: education education_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.education
    ADD CONSTRAINT education_pkey PRIMARY KEY (edu_code);


--
-- Name: industry industry_indu_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.industry
    ADD CONSTRAINT industry_indu_name_key UNIQUE (indu_name);


--
-- Name: industry industry_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.industry
    ADD CONSTRAINT industry_pkey PRIMARY KEY (indu_code);


--
-- Name: job_role job_role_joro_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.job_role
    ADD CONSTRAINT job_role_joro_name_key UNIQUE (joro_name);


--
-- Name: job_role job_role_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.job_role
    ADD CONSTRAINT job_role_pkey PRIMARY KEY (joro_id);


--
-- Name: job_type job_type_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.job_type
    ADD CONSTRAINT job_type_pkey PRIMARY KEY (joty_id);


--
-- Name: modules modules_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (module_name);


--
-- Name: province province_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.province
    ADD CONSTRAINT province_pkey PRIMARY KEY (prov_id);


--
-- Name: province province_prov_code_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.province
    ADD CONSTRAINT province_prov_code_key UNIQUE (prov_code);


--
-- Name: route_actions route_actions_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.route_actions
    ADD CONSTRAINT route_actions_pkey PRIMARY KEY (roac_id);


--
-- Name: route_actions route_actions_roac_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.route_actions
    ADD CONSTRAINT route_actions_roac_name_key UNIQUE (roac_name);


--
-- Name: skill_template skill_template_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.skill_template
    ADD CONSTRAINT skill_template_pkey PRIMARY KEY (skte_id);


--
-- Name: skill_type skill_type_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.skill_type
    ADD CONSTRAINT skill_type_pkey PRIMARY KEY (skty_name);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (status);


--
-- Name: working_type working_code_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.working_type
    ADD CONSTRAINT working_code_pkey PRIMARY KEY (woty_code);


--
-- Name: working_type working_type_woty_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.working_type
    ADD CONSTRAINT working_type_woty_name_key UNIQUE (woty_name);


--
-- Name: bank bank_bank_code_key; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.bank
    ADD CONSTRAINT bank_bank_code_key UNIQUE (bank_code);


--
-- Name: bank bank_bank_name_key; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.bank
    ADD CONSTRAINT bank_bank_name_key UNIQUE (bank_name);


--
-- Name: bank bank_pkey; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.bank
    ADD CONSTRAINT bank_pkey PRIMARY KEY (bank_entity_id);


--
-- Name: fintech fintech_fint_code_key; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.fintech
    ADD CONSTRAINT fintech_fint_code_key UNIQUE (fint_code);


--
-- Name: fintech fintech_fint_name_key; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.fintech
    ADD CONSTRAINT fintech_fint_name_key UNIQUE (fint_name);


--
-- Name: fintech fintech_pkey; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.fintech
    ADD CONSTRAINT fintech_pkey PRIMARY KEY (fint_entity_id);


--
-- Name: transaction_payment transaction_payment_pkey; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.transaction_payment
    ADD CONSTRAINT transaction_payment_pkey PRIMARY KEY (trpa_id);


--
-- Name: transaction_payment transaction_payment_trpa_code_number_key; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.transaction_payment
    ADD CONSTRAINT transaction_payment_trpa_code_number_key UNIQUE (trpa_code_number);


--
-- Name: users_account users_account_pkey; Type: CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.users_account
    ADD CONSTRAINT users_account_pkey PRIMARY KEY (usac_user_entity_id, usac_bank_entity_id);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (cait_id);


--
-- Name: sales_order_detail sales_order_detail_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.sales_order_detail
    ADD CONSTRAINT sales_order_detail_pkey PRIMARY KEY (sode_id);


--
-- Name: sales_order_header sales_order_header_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.sales_order_header
    ADD CONSTRAINT sales_order_header_pkey PRIMARY KEY (sohe_id);


--
-- Name: sales_order_header sales_order_header_sohe_license_code_key; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.sales_order_header
    ADD CONSTRAINT sales_order_header_sohe_license_code_key UNIQUE (sohe_license_code);


--
-- Name: sales_order_header sales_order_header_sohe_order_number_key; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.sales_order_header
    ADD CONSTRAINT sales_order_header_sohe_order_number_key UNIQUE (sohe_order_number);


--
-- Name: special_offer special_offer_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.special_offer
    ADD CONSTRAINT special_offer_pkey PRIMARY KEY (spof_id);


--
-- Name: special_offer_programs special_offer_programs_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.special_offer_programs
    ADD CONSTRAINT special_offer_programs_pkey PRIMARY KEY (soco_id, soco_spof_id, soco_prog_entity_id);


--
-- Name: special_offer_programs special_offer_programs_soco_id_key; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.special_offer_programs
    ADD CONSTRAINT special_offer_programs_soco_id_key UNIQUE (soco_id);


--
-- Name: business_entity business_entity_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.business_entity
    ADD CONSTRAINT business_entity_pkey PRIMARY KEY (entity_id);


--
-- Name: phone_number_type phone_number_type_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.phone_number_type
    ADD CONSTRAINT phone_number_type_pkey PRIMARY KEY (ponty_code);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- Name: users_address users_address_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_address
    ADD CONSTRAINT users_address_pkey PRIMARY KEY (etad_addr_id);


--
-- Name: users_education users_education_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_education
    ADD CONSTRAINT users_education_pkey PRIMARY KEY (usdu_id, usdu_entity_id);


--
-- Name: users_email users_email_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_email
    ADD CONSTRAINT users_email_pkey PRIMARY KEY (pmail_entity_id, pmail_id);


--
-- Name: users_experiences users_experiences_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_experiences
    ADD CONSTRAINT users_experiences_pkey PRIMARY KEY (usex_id, usex_entity_id);


--
-- Name: users_experiences_skill users_experiences_skill_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_experiences_skill
    ADD CONSTRAINT users_experiences_skill_pkey PRIMARY KEY (uesk_usex_id, uesk_uski_id);


--
-- Name: users_experiences users_experiences_usex_id_key; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_experiences
    ADD CONSTRAINT users_experiences_usex_id_key UNIQUE (usex_id);


--
-- Name: users_license users_license_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_license
    ADD CONSTRAINT users_license_pkey PRIMARY KEY (usli_id, usli_entity_id);


--
-- Name: users_license users_license_usli_license_code_key; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_license
    ADD CONSTRAINT users_license_usli_license_code_key UNIQUE (usli_license_code);


--
-- Name: users_media users_media_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_media
    ADD CONSTRAINT users_media_pkey PRIMARY KEY (usme_id, usme_entity_id);


--
-- Name: users_phones users_phones_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_phones
    ADD CONSTRAINT users_phones_pkey PRIMARY KEY (uspo_entity_id, uspo_number);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_entity_id);


--
-- Name: users_roles users_roles_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_roles
    ADD CONSTRAINT users_roles_pkey PRIMARY KEY (usro_entity_id, usro_role_id);


--
-- Name: users_skill users_skill_pkey; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_skill
    ADD CONSTRAINT users_skill_pkey PRIMARY KEY (uski_id, uski_entity_id);


--
-- Name: users_skill users_skill_uski_id_key; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_skill
    ADD CONSTRAINT users_skill_uski_id_key UNIQUE (uski_id);


--
-- Name: users users_user_name_key; Type: CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_user_name_key UNIQUE (user_name);


--
-- Name: address_addr_line1_key; Type: INDEX; Schema: master; Owner: postgres
--

CREATE INDEX address_addr_line1_key ON master.address USING btree (addr_line1);


--
-- Name: address_addr_line2_key; Type: INDEX; Schema: master; Owner: postgres
--

CREATE INDEX address_addr_line2_key ON master.address USING btree (addr_line2);


--
-- Name: address_addr_postal_code_key; Type: INDEX; Schema: master; Owner: postgres
--

CREATE INDEX address_addr_postal_code_key ON master.address USING btree (addr_postal_code);


--
-- Name: job_photo trg_jopho_update_modified_date; Type: TRIGGER; Schema: job_hire; Owner: postgres
--

CREATE TRIGGER trg_jopho_update_modified_date BEFORE UPDATE ON job_hire.job_photo FOR EACH ROW EXECUTE FUNCTION job_hire.update_jopho_modified_date();


--
-- Name: job_post trg_jopo_update_modified_date; Type: TRIGGER; Schema: job_hire; Owner: postgres
--

CREATE TRIGGER trg_jopo_update_modified_date BEFORE UPDATE ON job_hire.job_post FOR EACH ROW EXECUTE FUNCTION job_hire.update_jopo_modified_date();


--
-- Name: job_post trigger_update_jopo_publish_date; Type: TRIGGER; Schema: job_hire; Owner: postgres
--

CREATE TRIGGER trigger_update_jopo_publish_date BEFORE UPDATE OF jopo_status ON job_hire.job_post FOR EACH ROW EXECUTE FUNCTION job_hire.update_jopo_publish_date();


--
-- Name: batch batch_batch_entity_id_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch
    ADD CONSTRAINT batch_batch_entity_id_fkey FOREIGN KEY (batch_entity_id) REFERENCES curriculum.program_entity(prog_entity_id);


--
-- Name: batch batch_batch_pic_id_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch
    ADD CONSTRAINT batch_batch_pic_id_fkey FOREIGN KEY (batch_pic_id) REFERENCES hr.employee(emp_entity_id);


--
-- Name: batch batch_batch_status_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch
    ADD CONSTRAINT batch_batch_status_fkey FOREIGN KEY (batch_status) REFERENCES master.status(status);


--
-- Name: batch_trainee batch_trainee_batr_batch_id_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch_trainee
    ADD CONSTRAINT batch_trainee_batr_batch_id_fkey FOREIGN KEY (batr_batch_id) REFERENCES bootcamp.batch(batch_id);


--
-- Name: batch_trainee batch_trainee_batr_status_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch_trainee
    ADD CONSTRAINT batch_trainee_batr_status_fkey FOREIGN KEY (batr_status) REFERENCES master.status(status);


--
-- Name: batch_trainee batch_trainee_batr_trainee_entity_id_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch_trainee
    ADD CONSTRAINT batch_trainee_batr_trainee_entity_id_fkey FOREIGN KEY (batr_trainee_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: batch_trainee_evaluation batch_trainee_evaluation_btev_batch_id_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch_trainee_evaluation
    ADD CONSTRAINT batch_trainee_evaluation_btev_batch_id_fkey FOREIGN KEY (btev_batch_id) REFERENCES bootcamp.batch(batch_id);


--
-- Name: batch_trainee_evaluation batch_trainee_evaluation_btev_trainee_entity_id_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.batch_trainee_evaluation
    ADD CONSTRAINT batch_trainee_evaluation_btev_trainee_entity_id_fkey FOREIGN KEY (btev_trainee_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: program_apply program_apply_prap_prog_entity_id_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.program_apply
    ADD CONSTRAINT program_apply_prap_prog_entity_id_fkey FOREIGN KEY (prap_prog_entity_id) REFERENCES curriculum.program_entity(prog_entity_id);


--
-- Name: program_apply program_apply_prap_status_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.program_apply
    ADD CONSTRAINT program_apply_prap_status_fkey FOREIGN KEY (prap_status) REFERENCES master.status(status);


--
-- Name: program_apply program_apply_prap_user_entity_id_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.program_apply
    ADD CONSTRAINT program_apply_prap_user_entity_id_fkey FOREIGN KEY (prap_user_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: program_apply_progress program_apply_progress_parog_progress_name_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.program_apply_progress
    ADD CONSTRAINT program_apply_progress_parog_progress_name_fkey FOREIGN KEY (parog_progress_name) REFERENCES master.route_actions(roac_name);


--
-- Name: program_apply_progress program_apply_progress_parog_status_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.program_apply_progress
    ADD CONSTRAINT program_apply_progress_parog_status_fkey FOREIGN KEY (parog_status) REFERENCES master.status(status);


--
-- Name: program_apply_progress program_apply_progress_parog_user_entity_id_parog_prog_ent_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.program_apply_progress
    ADD CONSTRAINT program_apply_progress_parog_user_entity_id_parog_prog_ent_fkey FOREIGN KEY (parog_user_entity_id, parog_prog_entity_id) REFERENCES bootcamp.program_apply(prap_user_entity_id, prap_prog_entity_id);


--
-- Name: talents talents_talent_batch_id_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.talents
    ADD CONSTRAINT talents_talent_batch_id_fkey FOREIGN KEY (talent_batch_id) REFERENCES bootcamp.batch(batch_id) ON DELETE CASCADE;


--
-- Name: talents talents_talent_status_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.talents
    ADD CONSTRAINT talents_talent_status_fkey FOREIGN KEY (talent_status) REFERENCES master.status(status);


--
-- Name: talents talents_talent_technology; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.talents
    ADD CONSTRAINT talents_talent_technology FOREIGN KEY (talent_technology) REFERENCES curriculum.program_entity(prog_entity_id);


--
-- Name: talents talents_talent_user_entity_id_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.talents
    ADD CONSTRAINT talents_talent_user_entity_id_fkey FOREIGN KEY (talent_user_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: trainer_programs trainer_programs_batch_id_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.trainer_programs
    ADD CONSTRAINT trainer_programs_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES bootcamp.batch(batch_id) ON DELETE CASCADE;


--
-- Name: trainer_programs trainer_programs_tpro_emp_entity_id_fkey; Type: FK CONSTRAINT; Schema: bootcamp; Owner: postgres
--

ALTER TABLE ONLY bootcamp.trainer_programs
    ADD CONSTRAINT trainer_programs_tpro_emp_entity_id_fkey FOREIGN KEY (tpro_emp_entity_id) REFERENCES hr.employee(emp_entity_id);


--
-- Name: program_entity_description program_entity_description_pred_prog_entity_id_fkey; Type: FK CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.program_entity_description
    ADD CONSTRAINT program_entity_description_pred_prog_entity_id_fkey FOREIGN KEY (pred_prog_entity_id) REFERENCES curriculum.program_entity(prog_entity_id);


--
-- Name: program_entity program_entity_prog_cate_id_fkey; Type: FK CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.program_entity
    ADD CONSTRAINT program_entity_prog_cate_id_fkey FOREIGN KEY (prog_cate_id) REFERENCES master.category(cate_id);


--
-- Name: program_entity program_entity_prog_city_id_fkey; Type: FK CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.program_entity
    ADD CONSTRAINT program_entity_prog_city_id_fkey FOREIGN KEY (prog_city_id) REFERENCES master.city(city_id);


--
-- Name: program_entity program_entity_prog_created_by_fkey; Type: FK CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.program_entity
    ADD CONSTRAINT program_entity_prog_created_by_fkey FOREIGN KEY (prog_created_by) REFERENCES hr.employee(emp_entity_id);


--
-- Name: program_entity program_entity_prog_entity_id_fkey; Type: FK CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.program_entity
    ADD CONSTRAINT program_entity_prog_entity_id_fkey FOREIGN KEY (prog_entity_id) REFERENCES users.business_entity(entity_id);


--
-- Name: program_reviews program_reviews_prow_prog_entity_id_fkey; Type: FK CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.program_reviews
    ADD CONSTRAINT program_reviews_prow_prog_entity_id_fkey FOREIGN KEY (prow_prog_entity_id) REFERENCES curriculum.program_entity(prog_entity_id);


--
-- Name: program_reviews program_reviews_prow_user_entity_id_fkey; Type: FK CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.program_reviews
    ADD CONSTRAINT program_reviews_prow_user_entity_id_fkey FOREIGN KEY (prow_user_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: section_detail_material section_detail_material_sedm_secd_id_fkey; Type: FK CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.section_detail_material
    ADD CONSTRAINT section_detail_material_sedm_secd_id_fkey FOREIGN KEY (sedm_secd_id) REFERENCES curriculum.section_detail(secd_id);


--
-- Name: section_detail section_detail_secd_sect_id_fkey; Type: FK CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.section_detail
    ADD CONSTRAINT section_detail_secd_sect_id_fkey FOREIGN KEY (secd_sect_id) REFERENCES curriculum.sections(sect_id);


--
-- Name: sections sections_sect_prog_entity_id_fkey; Type: FK CONSTRAINT; Schema: curriculum; Owner: postgres
--

ALTER TABLE ONLY curriculum.sections
    ADD CONSTRAINT sections_sect_prog_entity_id_fkey FOREIGN KEY (sect_prog_entity_id) REFERENCES curriculum.program_entity(prog_entity_id);


--
-- Name: employee_department_history employee_department_history_edhi_dept_id_fkey; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_department_history
    ADD CONSTRAINT employee_department_history_edhi_dept_id_fkey FOREIGN KEY (edhi_dept_id) REFERENCES hr.department(dept_id);


--
-- Name: employee_department_history employee_department_history_edhi_entity_id_fkey; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_department_history
    ADD CONSTRAINT employee_department_history_edhi_entity_id_fkey FOREIGN KEY (edhi_entity_id) REFERENCES hr.employee(emp_entity_id);


--
-- Name: employee employee_emp_emp_entity_id_fkey; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee
    ADD CONSTRAINT employee_emp_emp_entity_id_fkey FOREIGN KEY (emp_emp_entity_id) REFERENCES hr.employee(emp_entity_id);


--
-- Name: employee employee_emp_entity_id_fkey; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee
    ADD CONSTRAINT employee_emp_entity_id_fkey FOREIGN KEY (emp_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: employee employee_emp_joro_id_fkey; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee
    ADD CONSTRAINT employee_emp_joro_id_fkey FOREIGN KEY (emp_joro_id) REFERENCES master.job_role(joro_id);


--
-- Name: employee_pay_history employee_pay_history_ephi_entity_id_fkey; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_pay_history
    ADD CONSTRAINT employee_pay_history_ephi_entity_id_fkey FOREIGN KEY (ephi_entity_id) REFERENCES hr.employee(emp_entity_id);


--
-- Name: employee_client_contract fk_ecco_account_manager; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_client_contract
    ADD CONSTRAINT fk_ecco_account_manager FOREIGN KEY (ecco_account_manager) REFERENCES hr.employee(emp_entity_id);


--
-- Name: employee_client_contract fk_ecco_clit_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_client_contract
    ADD CONSTRAINT fk_ecco_clit_id FOREIGN KEY (ecco_clit_id) REFERENCES job_hire.client(clit_id);


--
-- Name: employee_client_contract fk_ecco_entity_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_client_contract
    ADD CONSTRAINT fk_ecco_entity_id FOREIGN KEY (ecco_entity_id) REFERENCES hr.employee(emp_entity_id);


--
-- Name: employee_client_contract fk_ecco_joty_id; Type: FK CONSTRAINT; Schema: hr; Owner: postgres
--

ALTER TABLE ONLY hr.employee_client_contract
    ADD CONSTRAINT fk_ecco_joty_id FOREIGN KEY (ecco_joty_id) REFERENCES master.job_type(joty_id);


--
-- Name: client client_clit_addr_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.client
    ADD CONSTRAINT client_clit_addr_id_fkey FOREIGN KEY (clit_addr_id) REFERENCES master.address(addr_id);


--
-- Name: client client_clit_emra_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.client
    ADD CONSTRAINT client_clit_emra_id_fkey FOREIGN KEY (clit_emra_id) REFERENCES job_hire.employee_range(emra_id);


--
-- Name: client client_clit_indu_code_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.client
    ADD CONSTRAINT client_clit_indu_code_fkey FOREIGN KEY (clit_indu_code) REFERENCES master.industry(indu_code) NOT VALID;


--
-- Name: job_photo job_photo_jopho_entity_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_photo
    ADD CONSTRAINT job_photo_jopho_entity_id_fkey FOREIGN KEY (jopho_entity_id) REFERENCES job_hire.job_post(jopo_entity_id);


--
-- Name: job_post_desc job_post_desc_jopo_entity_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post_desc
    ADD CONSTRAINT job_post_desc_jopo_entity_id_fkey FOREIGN KEY (jopo_entity_id) REFERENCES job_hire.job_post(jopo_entity_id);


--
-- Name: job_post job_post_jopo_addr_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_addr_id_fkey FOREIGN KEY (jopo_addr_id) REFERENCES master.address(addr_id);


--
-- Name: job_post job_post_jopo_clit_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_clit_id_fkey FOREIGN KEY (jopo_clit_id) REFERENCES job_hire.client(clit_id);


--
-- Name: job_post job_post_jopo_edu_code_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_edu_code_fkey FOREIGN KEY (jopo_edu_code) REFERENCES master.education(edu_code);


--
-- Name: job_post job_post_jopo_emp_entity_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_emp_entity_id_fkey FOREIGN KEY (jopo_emp_entity_id) REFERENCES hr.employee(emp_entity_id);


--
-- Name: job_post job_post_jopo_entity_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_entity_id_fkey FOREIGN KEY (jopo_entity_id) REFERENCES users.business_entity(entity_id);


--
-- Name: job_post job_post_jopo_joca_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_joca_id_fkey FOREIGN KEY (jopo_joca_id) REFERENCES job_hire.job_category(joca_id);


--
-- Name: job_post job_post_jopo_joro_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_joro_id_fkey FOREIGN KEY (jopo_joro_id) REFERENCES master.job_role(joro_id);


--
-- Name: job_post job_post_jopo_joty_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_joty_id_fkey FOREIGN KEY (jopo_joty_id) REFERENCES master.job_type(joty_id);


--
-- Name: job_post job_post_jopo_status_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_status_fkey FOREIGN KEY (jopo_status) REFERENCES master.status(status);


--
-- Name: job_post job_post_jopo_work_code_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_work_code_fkey FOREIGN KEY (jopo_work_code) REFERENCES master.working_type(woty_code);


--
-- Name: talent_apply_progress talent_apply_progress_tapr_progress_name_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply_progress
    ADD CONSTRAINT talent_apply_progress_tapr_progress_name_fkey FOREIGN KEY (tapr_progress_name) REFERENCES master.route_actions(roac_name) NOT VALID;


--
-- Name: talent_apply_progress talent_apply_progress_tapr_status_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply_progress
    ADD CONSTRAINT talent_apply_progress_tapr_status_fkey FOREIGN KEY (tapr_status) REFERENCES master.status(status);


--
-- Name: talent_apply_progress talent_apply_progress_tapr_taap_user_entity_id_tapr_taap_e_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply_progress
    ADD CONSTRAINT talent_apply_progress_tapr_taap_user_entity_id_tapr_taap_e_fkey FOREIGN KEY (tapr_taap_user_entity_id, tapr_taap_entity_id) REFERENCES job_hire.talent_apply(taap_user_entity_id, taap_entity_id);


--
-- Name: talent_apply talent_apply_taap_entity_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply
    ADD CONSTRAINT talent_apply_taap_entity_id_fkey FOREIGN KEY (taap_entity_id) REFERENCES job_hire.job_post(jopo_entity_id);


--
-- Name: talent_apply talent_apply_taap_status_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply
    ADD CONSTRAINT talent_apply_taap_status_fkey FOREIGN KEY (taap_status) REFERENCES master.status(status);


--
-- Name: talent_apply talent_apply_taap_user_entity_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply
    ADD CONSTRAINT talent_apply_taap_user_entity_id_fkey FOREIGN KEY (taap_user_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: address addr_city_id; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address
    ADD CONSTRAINT addr_city_id FOREIGN KEY (addr_city_id) REFERENCES master.city(city_id);


--
-- Name: category category_cate_cate_id_fkey; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.category
    ADD CONSTRAINT category_cate_cate_id_fkey FOREIGN KEY (cate_cate_id) REFERENCES master.category(cate_id);


--
-- Name: city city_city_prov_id_fkey; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.city
    ADD CONSTRAINT city_city_prov_id_fkey FOREIGN KEY (city_prov_id) REFERENCES master.province(prov_id);


--
-- Name: province prov_country_code; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.province
    ADD CONSTRAINT prov_country_code FOREIGN KEY (prov_country_code) REFERENCES master.country(country_code);


--
-- Name: route_actions roac_module_name; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.route_actions
    ADD CONSTRAINT roac_module_name FOREIGN KEY (roac_module_name) REFERENCES master.modules(module_name);


--
-- Name: skill_template skill_template_skte_skte_id_fkey; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.skill_template
    ADD CONSTRAINT skill_template_skte_skte_id_fkey FOREIGN KEY (skte_skte_id) REFERENCES master.skill_template(skte_id);


--
-- Name: skill_template skill_template_skty_name_fkey; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.skill_template
    ADD CONSTRAINT skill_template_skty_name_fkey FOREIGN KEY (skty_name) REFERENCES master.skill_type(skty_name);


--
-- Name: bank bank_bank_entity_id_fkey; Type: FK CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.bank
    ADD CONSTRAINT bank_bank_entity_id_fkey FOREIGN KEY (bank_entity_id) REFERENCES users.business_entity(entity_id);


--
-- Name: fintech fintech_fint_entity_id_fkey; Type: FK CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.fintech
    ADD CONSTRAINT fintech_fint_entity_id_fkey FOREIGN KEY (fint_entity_id) REFERENCES users.business_entity(entity_id);


--
-- Name: transaction_payment transaction_payment_trpa_user_entity_id_fkey; Type: FK CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.transaction_payment
    ADD CONSTRAINT transaction_payment_trpa_user_entity_id_fkey FOREIGN KEY (trpa_user_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: users_account users_account_usac_bank_entity_id_fkey; Type: FK CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.users_account
    ADD CONSTRAINT users_account_usac_bank_entity_id_fkey FOREIGN KEY (usac_bank_entity_id) REFERENCES payment.bank(bank_entity_id);


--
-- Name: users_account users_account_usac_fint_entity_id_fkey; Type: FK CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.users_account
    ADD CONSTRAINT users_account_usac_fint_entity_id_fkey FOREIGN KEY (usac_fint_entity_id) REFERENCES payment.fintech(fint_entity_id);


--
-- Name: users_account users_account_usac_user_entity_id_fkey; Type: FK CONSTRAINT; Schema: payment; Owner: postgres
--

ALTER TABLE ONLY payment.users_account
    ADD CONSTRAINT users_account_usac_user_entity_id_fkey FOREIGN KEY (usac_user_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: cart_items cart_items_cait_prog_entity_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.cart_items
    ADD CONSTRAINT cart_items_cait_prog_entity_id_fkey FOREIGN KEY (cait_prog_entity_id) REFERENCES curriculum.program_entity(prog_entity_id);


--
-- Name: cart_items cart_items_cait_user_entity_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.cart_items
    ADD CONSTRAINT cart_items_cait_user_entity_id_fkey FOREIGN KEY (cait_user_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: sales_order_detail sales_order_detail_sode_prog_entity_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.sales_order_detail
    ADD CONSTRAINT sales_order_detail_sode_prog_entity_id_fkey FOREIGN KEY (sode_prog_entity_id) REFERENCES curriculum.program_entity(prog_entity_id);


--
-- Name: sales_order_detail sales_order_detail_sode_soco_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.sales_order_detail
    ADD CONSTRAINT sales_order_detail_sode_soco_id_fkey FOREIGN KEY (sode_soco_id) REFERENCES sales.special_offer_programs(soco_id);


--
-- Name: sales_order_detail sales_order_detail_sode_sohe_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.sales_order_detail
    ADD CONSTRAINT sales_order_detail_sode_sohe_id_fkey FOREIGN KEY (sode_sohe_id) REFERENCES sales.sales_order_header(sohe_id);


--
-- Name: sales_order_header sales_order_header_sohe_status_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.sales_order_header
    ADD CONSTRAINT sales_order_header_sohe_status_fkey FOREIGN KEY (sohe_status) REFERENCES master.status(status);


--
-- Name: sales_order_header sales_order_header_sohe_user_entity_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.sales_order_header
    ADD CONSTRAINT sales_order_header_sohe_user_entity_id_fkey FOREIGN KEY (sohe_user_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: special_offer_programs special_offer_programs_soco_prog_entity_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.special_offer_programs
    ADD CONSTRAINT special_offer_programs_soco_prog_entity_id_fkey FOREIGN KEY (soco_prog_entity_id) REFERENCES curriculum.program_entity(prog_entity_id);


--
-- Name: special_offer_programs special_offer_programs_soco_spof_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.special_offer_programs
    ADD CONSTRAINT special_offer_programs_soco_spof_id_fkey FOREIGN KEY (soco_spof_id) REFERENCES sales.special_offer(spof_id);


--
-- Name: special_offer special_offer_spof_cate_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.special_offer
    ADD CONSTRAINT special_offer_spof_cate_id_fkey FOREIGN KEY (spof_cate_id) REFERENCES master.category(cate_id);


--
-- Name: users_address users_address_etad_addr_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_address
    ADD CONSTRAINT users_address_etad_addr_id_fkey FOREIGN KEY (etad_addr_id) REFERENCES master.address(addr_id);


--
-- Name: users_address users_address_etad_adty_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_address
    ADD CONSTRAINT users_address_etad_adty_id_fkey FOREIGN KEY (etad_adty_id) REFERENCES master.address_type(adty_id);


--
-- Name: users_address users_address_etad_entity_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_address
    ADD CONSTRAINT users_address_etad_entity_id_fkey FOREIGN KEY (etad_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: users_education users_education_usdu_entity_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_education
    ADD CONSTRAINT users_education_usdu_entity_id_fkey FOREIGN KEY (usdu_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: users_email users_email_pmail_entity_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_email
    ADD CONSTRAINT users_email_pmail_entity_id_fkey FOREIGN KEY (pmail_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: users_experiences_skill users_experiences_skill_uesk_usex_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_experiences_skill
    ADD CONSTRAINT users_experiences_skill_uesk_usex_id_fkey FOREIGN KEY (uesk_usex_id) REFERENCES users.users_experiences(usex_id);


--
-- Name: users_experiences_skill users_experiences_skill_uesk_uski_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_experiences_skill
    ADD CONSTRAINT users_experiences_skill_uesk_uski_id_fkey FOREIGN KEY (uesk_uski_id) REFERENCES users.users_skill(uski_id);


--
-- Name: users_experiences users_experiences_usex_city_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_experiences
    ADD CONSTRAINT users_experiences_usex_city_id_fkey FOREIGN KEY (usex_city_id) REFERENCES master.city(city_id);


--
-- Name: users_experiences users_experiences_usex_entity_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_experiences
    ADD CONSTRAINT users_experiences_usex_entity_id_fkey FOREIGN KEY (usex_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: users_license users_license_usli_entity_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_license
    ADD CONSTRAINT users_license_usli_entity_id_fkey FOREIGN KEY (usli_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: users_media users_media_usme_entity_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_media
    ADD CONSTRAINT users_media_usme_entity_id_fkey FOREIGN KEY (usme_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: users_phones users_phones_uspo_entity_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_phones
    ADD CONSTRAINT users_phones_uspo_entity_id_fkey FOREIGN KEY (uspo_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: users_phones users_phones_uspo_ponty_code_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_phones
    ADD CONSTRAINT users_phones_uspo_ponty_code_fkey FOREIGN KEY (uspo_ponty_code) REFERENCES users.phone_number_type(ponty_code);


--
-- Name: users_roles users_roles_usro_entity_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_roles
    ADD CONSTRAINT users_roles_usro_entity_id_fkey FOREIGN KEY (usro_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: users_roles users_roles_usro_role_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_roles
    ADD CONSTRAINT users_roles_usro_role_id_fkey FOREIGN KEY (usro_role_id) REFERENCES users.roles(role_id);


--
-- Name: users_skill users_skill_uski_entity_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_skill
    ADD CONSTRAINT users_skill_uski_entity_id_fkey FOREIGN KEY (uski_entity_id) REFERENCES users.users(user_entity_id);


--
-- Name: users_skill users_skill_uski_skty_name_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users_skill
    ADD CONSTRAINT users_skill_uski_skty_name_fkey FOREIGN KEY (uski_skty_name) REFERENCES master.skill_type(skty_name);


--
-- Name: users users_user_entity_id_fkey; Type: FK CONSTRAINT; Schema: users; Owner: postgres
--

ALTER TABLE ONLY users.users
    ADD CONSTRAINT users_user_entity_id_fkey FOREIGN KEY (user_entity_id) REFERENCES users.business_entity(entity_id);


--
-- PostgreSQL database dump complete
--

