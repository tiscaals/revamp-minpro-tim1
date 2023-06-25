CREATE OR REPLACE PROCEDURE curriculum.create_curriculum (in data json)
LANGUAGE plpgsql
AS 
$$
DECLARE 
    curr_id int;
    secd_sect_id INT;
    sedm_secd_id INT;
BEGIN
    WITH results AS (
        INSERT INTO users.business_entity(entity_id) VALUES (nextval('users.business_entity_entity_id_seq'))
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
			prog_score
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
			x.prog_score
        FROM json_to_recordset(data) AS x (
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
    
    WITH sect AS (
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
            x.sect_description,
            x.sect_total_section,
            x.sect_total_lecture,
            x.sect_total_minute
        FROM json_to_recordset(data) AS x (
            sect_title VARCHAR,
            sect_description VARCHAR,
            sect_total_section INT,
            sect_total_lecture INT,
            sect_total_minute INT
        )
        RETURNING sect_id
    )
    SELECT sect_id INTO secd_sect_id FROM sect;
    
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
            x.secd_preview,
            x.secd_note,
            x.secd_minute,
            secd_sect_id
        FROM json_to_recordset(data) AS x (
            secd_title VARCHAR,
            secd_preview CHAR,
            secd_note VARCHAR,
            secd_minute INT
        )
        RETURNING secd_id
    )
    SELECT secd_id INTO sedm_secd_id FROM secd;
    
    INSERT INTO curriculum.section_detail_material (
        sedm_filename,
        sedm_filesize,
        sedm_filetype,
        sedm_secd_id
    )
    SELECT
        x.sedm_filename,
        x.sedm_filesize,
        x.sedm_filetype,
        sedm_secd_id
    FROM json_to_recordset(data) AS x (
        sedm_filename VARCHAR,
        sedm_filesize INT,
        sedm_filetype VARCHAR
    );
END;
$$;

CREATE OR REPLACE PROCEDURE section_detail (in data json)
LANGUAGE plpgsql
AS
$$
DECLARE
BEGIN
END;
$$;


CALL curriculum.create_curriculum('[
  {
    "prog_title": "Program Title",
    "prog_headline": "Program Headline",
    "prog_type": "bootcamp",
    "prog_learning_type": "offline",
    "prog_total_trainee": 100,
    "prog_image": "program_image.jpg",
    "prog_price": 99.99,
    "prog_language": "english",
    "prog_duration": 30,
    "prog_duration_type": "days",
    "prog_tag_skill": "Programming",
    "prog_city_id": 1,
    "prog_cate_id": 2,
    "prog_created_by": 1,
    "prog_status": "publish",
    "payment_type": "regular",
    "total_batch": 5,
    "pred_item_learning": {"key1": "value1", "key2": "value2"},
    "pred_item_include": {"key3": "value3", "key4": "value4"},
    "pred_requirement": {"key5": "value5", "key6": "value6"},
    "pred_description": {"key7": "value7", "key8": "value8"},
    "pred_target_level": {"key9": "value9", "key10": "value10"},
	"sect_title": "Section 1",
	"sect_description": "Section 1 Description",
	"sect_total_section": 3,
	"sect_total_lecture": 10,
	"sect_total_minute": 120,
	"secd_title": "Lecture 1",
	"secd_preview": "0",
	"secd_score": 90,
	"secd_note": "Lecture 1 Note",
	"secd_minute": 30,
	"materials": [
	  {
		"sedm_filename": "material1.pdf",
		"sedm_filesize": 1024,
		"sedm_filetype": "pdf"
	  },
	  {
		"sedm_filename": "material2.docx",
		"sedm_filesize": 2048,
		"sedm_filetype": "docx"
	  }
	]
  }
]');

select * from curriculum.program_reviews

insert into curriculum.program_reviews
values (1,41,'this reviews',4.8)

create view curriculum.view_curriculum as
SELECT distinct program_entity.prog_title, program_entity.prog_headline,program_entity.prog_duration, program_entity.prog_duration_type, program_entity.prog_total_trainee, program_entity.total_batch, program_entity.prog_type, 
(select avg (prow_rating) from curriculum.program_reviews where prow_prog_entity_id = prog_entity_id) as ratings
FROM curriculum.program_entity
JOIN curriculum.program_reviews ON program_entity.prog_entity_id = program_reviews.prow_prog_entity_id

CREATE OR REPLACE PROCEDURE curriculum.insert_program_review(IN data json)
LANGUAGE plpgsql
AS
$$
BEGIN
    INSERT INTO curriculum.program_reviews (
        prow_user_entity_id,
        prow_prog_entity_id,
        prow_review,
        prow_rating
    )
    SELECT 
        x.prow_user_entity_id,
        x.prow_prog_entity_id,
        x.prow_review,
        x.prow_rating
    FROM json_to_recordset (data) as x (
		prow_user_entity_id int,
		prow_prog_entity_id int,
		prow_review varchar,
		prow_rating int
	);

    -- Update prog_rating in program_entity table
    UPDATE curriculum.program_entity AS pe
    SET prog_rating = (
        SELECT ROUND(AVG(prow_rating),2)
        FROM curriculum.program_reviews AS pr
        WHERE prow_prog_entity_id = prog_entity_id
    )
    WHERE prog_entity_id = prog_entity_id;
END;
$$;

CALL curriculum.insert_program_review('[
  {
    "prow_user_entity_id": 2,
    "prow_prog_entity_id": 39,
    "prow_review": "This program is great!",
    "prow_rating": 4
  }
]');

-- Call the stored procedure with the JSON data directly
CALL curriculum.update_program_procedure('[{"prog_entity_id":41},{
    "prog_title": "New Program Title",
    "prog_headline": "New Program Headline",
    "prog_type": "bootcamp",
    "prog_learning_type": "online",
    "prog_total_trainee": 100,
    "prog_image": "new_image.jpg",
    "prog_price": 199.99,
    "prog_language": "english",
    "prog_duration": 30,
    "prog_duration_type": "days",
    "prog_tag_skill": "New Skills",
    "prog_city_id": 1,
    "prog_cate_id": 2,
    "prog_created_by": 1,
    "prog_status": "publish",
    "payment_type": "pay",
    "total_batch": 5,
	"prog_score": 85,
    "pred_item_learning": "New Learning Items",
    "pred_item_include": "Included Items",
    "pred_requirement": "Requirements",
    "pred_description": "Program Description",
    "pred_target_level": "Target Level",
    "sect_title": "New Section Title",
    "sect_description": "Section Description",
    "sect_total_section": 3,
    "sect_total_lecture": 10,
    "sect_total_minute": 120,
    "secd_title": "New Section Detail Title",
    "secd_preview": "0",
    "secd_note": "Section Detail Note",
    "secd_minute": 45,
    "sedm_filename": "file.pdf",
    "sedm_filesize": 1024,
    "sedm_filetype": "file",
    "sedm_filelink": "https://example.com/file.pdf"
}]');


select * from curriculum.program_entity

alter table curriculum.program_entity
add column prog_curr_regis varchar(100)

CREATE OR REPLACE PROCEDURE curriculum.update_program_procedure_coba(in id integer,in data json)
LANGUAGE plpgsql
AS $$
DECLARE 
    curr_id int;
BEGIN
    -- Retrieve the current program_entity_id from the provided data
    SELECT prog_entity_id INTO curr_id FROM curriculum.program_entity
	WHERE curriculum.program_entiy=id;
    
    -- Update program_entity table
    UPDATE curriculum.program_entity AS pe
    SET
        prog_title = x.prog_title,
        prog_headline = x.prog_headline,
        prog_type = x.prog_type,
        prog_learning_type = x.prog_learning_type,
        prog_total_trainee = x.prog_total_trainee,
        prog_image = x.prog_image,
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
		pred_requerement json,
		pred_description json,
		pred_target_level json
	)
    WHERE pred_prog_entity_id = curr_id;
    
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
	)
    WHERE sect_prog_entity_id = curr_id;
    
    -- Update section_detail table
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
END
$$;
select*from program_entity
CALL curriculum.update_program_procedure_coba('[
    {
        "prog_entity_id":39,
        "prog_title": "New Program Title",
        "prog_headline": "New Program Headline",
        "prog_type": "bootcamp",
        "prog_learning_type": "online",
        "prog_total_trainee": 100,
        "prog_image": "new_image.jpg",
        "prog_price": 199.99,
        "prog_language": "english",
        "prog_duration": 30,
        "prog_duration_type": "days",
        "prog_tag_skill": "New Skills",
        "prog_city_id": 1,
        "prog_cate_id": 2,
        "prog_created_by": 1,
        "prog_status": "publish",
        "payment_type": "pay",
        "total_batch": 5,
        "prog_score": 85,
        "pred_item_learning": "New Learning Items",
        "pred_item_include": "Included Items",
        "pred_requirement": "Requirements",
        "pred_description": "Program Description",
        "pred_target_level": "Target Level",
        "sect_title": "New Section Title",
        "sect_description": "Section Description",
        "sect_total_section": 3,
        "sect_total_lecture": 10,
        "sect_total_minute": 120,
        "secd_title": "New Section Detail Title",
        "secd_preview": "0",
        "secd_note": "Section Detail Note",
        "secd_minute": 45,
        "sedm_filename": "file.pdf",
        "sedm_filesize": 1024,
        "sedm_filetype": "file",
        "sedm_filelink": "https://example.com/file.pdf"
    }
]');

UPDATE curriculum.program_entity AS pe
        SET
            prog_title = data->>'prog_title',
            prog_headline = data->>'prog_headline',
            prog_type = data->>'prog_type',
            prog_learning_type = data->>'prog_learning_type',
            prog_total_trainee = (data->>'prog_total_trainee')::int,
            prog_image = data->>'prog_image',
            prog_price = (data->>'prog_price')::numeric,
            prog_language = data->>'prog_language',
            prog_duration = (data->>'prog_duration')::int,
            prog_duration_type = data->>'prog_duration_type',
            prog_tag_skill = data->>'prog_tag_skill',
            prog_city_id = (data->>'prog_city_id')::int,
            prog_cate_id = (data->>'prog_cate_id')::int,
            prog_created_by = (data->>'prog_created_by')::int,
            prog_status = data->>'prog_status',
            payment_type = data->>'payment_type',
            total_batch = (data->>'total_batch')::int,
            prog_score = (data->>'prog_score')::int
        WHERE prog_entity_id = (data->>'prog_entity_id')::int
        RETURNING prog_entity_id

select*from curriculum.program_entity_description
select * from curriculum.section_detail_material where secd_prog_entity_id = 39

CALL curriculum.update_program_procedure_coba(41,'[{
    "prog_title": "New Program Title",
    "prog_headline": "New Program Headline",
    "prog_type": "bootcamp",
    "prog_learning_type": "online",
    "prog_total_trainee": 100,
    "prog_image": "new_image.jpg",
    "prog_price": 199.99,
    "prog_language": "english",
    "prog_duration": 30,
    "prog_duration_type": "days",
    "prog_tag_skill": "New Skills",
    "prog_city_id": 1,
    "prog_cate_id": 2,
    "prog_created_by": 1,
    "prog_status": "publish",
    "payment_type": "pay",
    "total_batch": 5,
    "prog_score": 85,
    "pred_item_learning": "New Learning Items",
    "pred_item_include": "Included Items",
    "pred_requirement": "Requirements",
    "pred_description": "Program Description",
    "pred_target_level": "Target Level",
    "sect_title": "New Section Title",
    "sect_description": "Section Description",
    "sect_total_section": 3,
    "sect_total_lecture": 10,
    "sect_total_minute": 120,
    "secd_title": "New Section Detail Title",
    "secd_preview": "0",
    "secd_note": "Section Detail Note",
    "secd_minute": 45,
    "sedm_filename": "file.pdf",
    "sedm_filesize": 1024,
    "sedm_filetype": "video",
    "sedm_filelink": "https://example.com/file.pdf"
}]');

SELECT * FROM curriculum.view_curriculum
	WHERE prog_entity_id=39;