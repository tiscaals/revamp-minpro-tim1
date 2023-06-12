------ CREATE BATCH ------
create or replace procedure bootcamp.createBatch(in data json, in data2 json, in data3 json)
language plpgsql
as 
$$
declare
	batchid int;
	instructor record;
begin
	with result as(
	insert into bootcamp.batch (
		batch_entity_id,
		batch_name,
		batch_description,
		batch_start_date,
		batch_end_date,
		batch_status,
		batch_reason,
		batch_type,
		batch_modified_date,
		batch_pic_id
	)
	select
		x.batch_entity_id,
		x.batch_name,
		x.batch_description,
		x.batch_start_date,
		x.batch_end_date,
		x.batch_status,
		x.batch_reason,
		x.batch_type,
		x.batch_modified_date,
		x.batch_pic_id
		
	from json_to_recordset(data) as x(
		batch_entity_id int,
		batch_name varchar(15),
		batch_description varchar(125),
		batch_start_date date,
		batch_end_date date,
		batch_status varchar(15),
		batch_reason varchar(256),
		batch_type varchar(15),
		batch_modified_date timestamptz,
		batch_pic_id int
	)
	returning batch_id
	)
	select batch_id into batchid from result;
	
	insert into bootcamp.batch_trainee (
		batr_status,
		batr_certificated,
		batr_certificate_link,
		batr_access_token,
		batr_access_grant,
		batr_review,
		batr_total_Score,
		batr_modified_date,
		batr_trainee_entity_id,
		batr_batch_id
	)
	select 
		y.batr_status,
		y.batr_certificated,
		y.batr_certificate_link,
		y.batr_access_token,
		y.batr_access_grant,
		y.batr_review,
		y.batr_total_Score,
		y.batr_modified_date,
		y.batr_trainee_entity_id,
		batchid
		
	from json_to_recordset(data2) as y(
		batr_status varchar(15),
		batr_certificated char(1),
		batr_certificate_link varchar(255),
		batr_access_token varchar(255),
		batr_access_grant char(1),
		batr_review varchar(1024),
		batr_total_score numeric,
		batr_modified_date timestamptz,
		batr_trainee_entity_id int
	);
	
	insert into bootcamp.trainer_programs (
		batch_id,
		tpro_entity_id,
		tpro_emp_entity_id,
		tpro_modified_date
	)
	select 
		batchid,
		z.tpro_entity_id,
		z.tpro_emp_entity_id,
		z.tpro_modified_date
	from json_to_recordset(data3) as z(
		tpro_entity_id int,
		tpro_emp_entity_id int,
		tpro_modified_date timestamptz
	);

end;
$$;

call bootcamp.createBatch('[{
							"batch_entity_id": 5,
							"batch_name": "batch#1",
							"batch_description": "batch#1description",
							"batch_start_date": "2023-06-06",
							"batch_end_date": "2024-06-06",
							"batch_status": "open",
							"batch_reason": "ya open aja",
							"batch_type": "online",
							"batch_modified_date": "2023-06-06 12:30:00 +00:00",
							"batch_pic_id": 1
						  }]','[{
						  	"batr_status": "running",
							"batr_certificated": "0",
							"batr_certificate_link": "certificate link",
							"batr_access_token": "access_token",
							"batr_access_grant": "0",
							"batr_review": "review#4",
							"batr_total_score": 92,
							"batr_modified_date": "2023-06-06 12:30:00 +00:00",
							"batr_trainee_entity_id": 2
						  },{
						  	"batr_status": "running",
							"batr_certificated": "0",
							"batr_certificate_link": "certificate link",
							"batr_access_token": "access_token",
							"batr_access_grant": "0",
							"batr_review": "review#4",
							"batr_total_score": 92,
							"batr_modified_date": "2023-06-06 12:30:00 +00:00",
							"batr_trainee_entity_id": 1
						  },{
						  	"batr_status": "running",
							"batr_certificated": "0",
							"batr_certificate_link": "certificate link",
							"batr_access_token": "access_token",
							"batr_access_grant": "0",
							"batr_review": "review#4",
							"batr_total_score": 92,
							"batr_modified_date": "2023-06-06 12:30:00 +00:00",
							"batr_trainee_entity_id": 3
						  }]','[{
						  	"tpro_entity_id": 1,
							"tpro_emp_entity_id": 1,
							"tpro_modified_date": "2023-06-06 12:30:00 +00:00"
						  },{
						  	"tpro_entity_id": 1,
							"tpro_emp_entity_id": 2,
							"tpro_modified_date": "2023-06-06 12:30:00 +00:00"
						  }]')
						  
						  
----- CLOSE BATCH -----

create or replace procedure bootcamp.closeBatch(in data json, in data2 json)
language plpgsql
as
$$
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
		batch_id integer,
		batch_start_date date,
		batch_end_date date,
		trainer varchar(30),
		skills text
	);
end;
$$;

call bootcamp.closeBatch('[{
						 	"batch_id": 36,
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

----- CREATE EVALUATION -----
create or replace procedure bootcamp.createEvaluation(score int, in data2 json)
language plpgsql
as 
$$
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
	
	SELECT batr_total_score INTO total_score
    FROM bootcamp.batch_trainee WHERE batr_trainee_entity_id = trainee_entity_id
  	AND batr_batch_id = batch_id;
	
	UPDATE bootcamp.batch_trainee
	SET batr_total_score = (total_score + score)/2
	WHERE batr_trainee_entity_id = trainee_entity_id
  	AND batr_batch_id = batch_id;

end;
$$;

call bootcamp.createEvaluation(80,
  '[
    {
      "btev_type": "hardskill",
      "btev_header": "batch#3 anu",
      "btev_section": "technical",
      "btev_skill": "fundamental javascript",
      "btev_week": "1",
      "btev_skor": 4,
      "btev_note": "",
      "btev_batch_id": 36,
      "btev_trainee_entity_id": 3
    },
    {
      "btev_type": "softskill",
      "btev_header": "batch#3 anu",
      "btev_section": "softskill",
      "btev_skill": "komunikasi",
      "btev_week": "1",
      "btev_skor": 3,
      "btev_note": "",
      "btev_batch_id": 36,
      "btev_trainee_entity_id": 3
    }
  ]'
);

----- CREATE PROGRAM APPLY PROGRESS ----- 

create or replace procedure bootcamp.createProgramApply(in data json, in data2 json)
language plpgsql
as
$$
declare
	userEntityId int;
	progEntityId int;
	
begin
	with result as(
	insert into bootcamp.program_apply(
		prap_user_entity_id,
		prap_prog_entity_id,
		prap_test_score,
		prap_gpa,
		prap_iq_test,
		prap_review,
		prap_modified_date,
		prap_status
	)
	select
		x.prap_user_entity_id,
		x.prap_prog_entity_id,
		x.prap_test_score,
		x.prap_gpa,
		x.prap_iq_test,
		x.prap_review,
		x.prap_modified_date,
		x.prap_status
	
	from json_to_recordset(data) as x(
		prap_user_entity_id int,
		prap_prog_entity_id int,
		prap_test_score int,
		prap_gpa numeric,
		prap_iq_test numeric,
		prap_review varchar(256) ,
		prap_modified_date TIMESTAMPTZ,
		prap_status VARCHAR(15)
	)
	returning prap_user_entity_id,prap_prog_entity_id
	)
	select prap_user_entity_id,prap_prog_entity_id into userEntityId,progEntityId from result;
	
	insert into bootcamp.program_apply_progress(
		parog_user_entity_id,
		parog_prog_entity_id,
		parog_action_date,
		parog_modified_date,
		parog_comment,
		parog_progress_name,
		parog_emp_entity_id,
		parog_status
	)
	select
		userEntityId,
		progEntityId,
		y.parog_action_date,
		y.parog_modified_date,
		y.parog_comment,
		y.parog_progress_name,
		y.parog_emp_entity_id,
		y.parog_status
		
	from json_to_recordset(data2) as y(
		parog_action_date TIMESTAMPTZ,
		parog_modified_date TIMESTAMPTZ,
		parog_comment VARCHAR(512),
		parog_progress_name VARCHAR(15),
		parog_emp_entity_id INT,
		parog_status VARCHAR(15)
	);
end;
$$;

call bootcamp.createProgramApply('[{
								 	"prap_user_entity_id": 1,
								 	"prap_prog_entity_id": 1,
								 	"prap_test_score": 69,
								 	"prap_gpa": 69,
								 	"prap_iq_test": 69,
								 	"prap_review": "a",
								 	"prap_modified_date": "2023-06-06 12:30:00 +00:00",
								 	"prap_status": "passed"
								 }]','[{
								 	"parog_action_date": "2023-06-06 12:30:00 +00:00",
								 	"parog_modified_date": "2023-06-06 12:30:00 +00:00",
								 	"parog_comment": "a",
								 	"parog_progress_name": "apply",
								 	"parog_emp_entity_id": 1,
								 	"parog_status": "open"
								 }]')
								 