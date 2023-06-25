-- ADD FORM PROGRAM_ENTITY & DESCRIPTION
CREATE OR REPLACE PROCEDURE program_procedure_coba(In data JSON)
LANGUAGE plpgsql
AS
$$

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
			prog_best_seller char,
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

-- ADD SECTION
CREATE OR REPLACE PROCEDURE section_gas (IN data JSON)
LANGUAGE plpgsql
AS
$$
DECLARE
	curr_id INT;
BEGIN
	SELECT entity_id INTO curr_id FROM users.business_entity ORDER BY entity_id DESC LIMIT 1;
        INSERT INTO curriculum.sections (
            sect_prog_entity_id,
            sect_title,
            sect_description,
            sect_total_section,
            sect_total_lecture,
            sect_total_minute
        )
        SELECT
            curr_id,
            x.sect_title,
            x.description,
            x.total_section,
            x.total_lecture,
            x.total_minute
        FROM json_to_recordset(data) AS x (
            sect_title VARCHAR,
            description VARCHAR,
            total_section INT,
            total_lecture INT,
            total_minute INT
		);
END;
$$;

-- ADD SUB SECTION
CREATE OR REPLACE PROCEDURE section_detail_gas(IN id INTEGER, IN data JSON)
LANGUAGE plpgsql
AS
$$

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
END;
$$;

-- UPDATE PROGRAM_ENTITY & DESCRIPTION
CREATE OR REPLACE PROCEDURE update_program_coba(IN id INTEGER, IN data JSON)
LANGUAGE plpgsql
AS
$$
DECLARE 
    curr_id int;
BEGIN
    -- Retrieve the current program_entity_id from the provided data
    SELECT prog_entity_id INTO curr_id FROM curriculum.program_entity
	WHERE prog_entity_id=id;
    
    -- Update program_entity table
    UPDATE curriculum.program_entity AS pe
    SET
        prog_title = x.prog_title,
        prog_headline = x.prog_headline,
        prog_type = x.prog_type,
        prog_learning_type = x.prog_learning_type,
        prog_total_trainee = x.prog_total_trainee,
        prog_image = x.prog_image,
		prog_best_seller = x.prog_best_seller,
        prog_price = x.prog_price,
        prog_language = x.prog_language,
        prog_duration = x.prog_duration,
        prog_duration_type = x.prog_duration_type,
        prog_tag_skill = x.prog_tag_skill,
        prog_city_id = x.prog_city_id,
        prog_cate_id = x.prog_cate_id,
        prog_created_by = x.prog_created_by,
        prog_status = x.prog_status,
        payment_type = x.payment_type,
        total_batch = x.total_batch,
        prog_score = x.prog_score
	FROM json_to_recordset (data) AS x(
		prog_title varchar,
        prog_headline varchar,
        prog_type varchar,
        prog_learning_type varchar,
        prog_total_trainee int,
        prog_image varchar,
		prog_best_seller char,
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
        prog_score int
	)
    WHERE prog_entity_id = curr_id;
    
    -- Update program_entity_description table
    UPDATE curriculum.program_entity_description AS ped
    SET
        pred_item_learning = x.pred_item_learning,
        pred_item_include = x.pred_item_include,
        pred_requirement = x.pred_requirement,
        pred_description = x.pred_description,
        pred_target_level = x.pred_target_level
	FROM json_to_recordset (data) as x(
		pred_item_learning json,
		pred_item_include json,
		pred_requirement json,
		pred_description json,
		pred_target_level json
	)
    WHERE pred_prog_entity_id = curr_id;
END;
$$;

-- UPDATE SECTION
CREATE OR REPLACE PROCEDURE curriculum.update_section_fix(IN id INTEGER, IN data JSON)
LANGUAGE plpgsql
AS
$$
DECLARE 
    curr_id int;
BEGIN

	SELECT prog_entity_id INTO curr_id FROM curriculum.program_entity
	WHERE prog_entity_id=id;
	
	-- Update sections table
    UPDATE curriculum.sections AS se
    SET
        sect_title = x.sect_title,
        sect_description = x.sect_description,
        sect_total_section = x.sect_total_section,
        sect_total_lecture = x.sect_total_lecture,
        sect_total_minute = x.sect_total_minute
	FROM json_to_recordset(data)as x(
		sect_title varchar,
		sect_description varchar,
		sect_total_section int,
		sect_total_lecture int,
		sect_total_minute int
	);
END;
$$;

-- UPDATE SECTION DETAIL
CREATE OR REPLACE PROCEDURE curriculum.update_section_detail(IN id INTEGER, IN data JSON)
LANGUAGE plpgsql
AS
$$
DECLARE
	curr_id INT;
BEGIN
SELECT prog_entity_id INTO curr_id FROM curriculum.program_entity
	WHERE prog_entity_id=id;
UPDATE curriculum.section_detail AS sed
    SET
        secd_title = x.secd_title,
        secd_preview = x.secd_preview,
        secd_note = x.secd_note,
        secd_minute = x.secd_minute
	FROM json_to_recordset (data) x (
		secd_title varchar,
		secd_preview varchar,
		secd_note varchar,
		secd_minute int
	)
    WHERE secd_sect_id IN (
        SELECT sect_id FROM curriculum.sections WHERE sect_prog_entity_id = curr_id
    );
    
    -- Update section_detail_material table
    UPDATE curriculum.section_detail_material AS secdm
    SET
        sedm_filename = x.sedm_filename,
        sedm_filesize = x.sedm_filesize,
        sedm_filetype = x.sedm_filetype,
        sedm_filelink = x.sedm_filelink
	FROM json_to_recordset(data) as x(
		sedm_filename varchar,
		sedm_filesize int,
		sedm_filetype varchar,
		sedm_filelink varchar
	)
    WHERE sedm_secd_id IN (
        SELECT secd_id FROM curriculum.section_detail WHERE secd_sect_id IN (
            SELECT sect_id FROM curriculum.sections WHERE sect_prog_entity_id = curr_id
        )
    );
END;
$$;