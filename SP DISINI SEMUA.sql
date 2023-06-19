create or replace procedure bootcamp.createBatch(in data json, in data2 json, in data3 json)
language plpgsql
as
$$
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

call bootcamp.createBatch('[{
							"batch_entity_id": 2,
							"batch_name": "batch#1",
							"batch_description": "batch#1description",
							"batch_start_date": "2023-06-06",
							"batch_end_date": "2024-06-06",
							"batch_status": "open",
							"batch_type": "offline",
							"batch_pic_id": 1
						  }]','[{
							"user_id": 5
						  },{
							"user_id": 4
						  }]','[{
							"tpro_emp_entity_id": 1
						  },{
							"tpro_emp_entity_id": 2
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
		batch_start_date date,
		batch_end_date date,
		trainer varchar(30),
		skills text
	);
end;
$$;

call bootcamp.closeBatch('[{
						 	"batch_id": 40,
						 	"batch_status": "closed",
						 	"talent_status": "idle"
						 }]','[{
						 	"fullname": "Nama 3",
						 	"user_entity_id": 3,
						 	"technology": "PHP ini boss",
						 	"batch_start_date": "2023-06-06",
						 	"batch_end_date": "2023-07-06",
						 	"trainer": 1,
						 	"skills": "Javascript, Nestjs, Nextjs"
						 },{
						 	"fullname": "Nama 4",
						 	"user_entity_id": 4,
						 	"technology": "PHP ini boss",
						 	"batch_start_date": "2023-06-06",
						 	"batch_end_date": "2023-07-06",
						 	"trainer": 1,
						 	"skills": "Javascript, Nestjs, Nextjs"
						 }]')
select * from bootcamp.talents

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
      "btev_week": "",
      "btev_skor": 3,
      "btev_note": "",
      "btev_batch_id": 17,
      "btev_trainee_entity_id": 1
    },
    {
      "btev_type": "softskill",
      "btev_header": "batch#3 anu",
      "btev_section": "softskill",
      "btev_skill": "komunikasi",
      "btev_week": "",
      "btev_skor": 3,
      "btev_note": "",
      "btev_batch_id": 17,
      "btev_trainee_entity_id": 1
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

insert into users.users(user_entity_id,user_first_name,user_last_name) values(3,'Jordy','Saputra');

call bootcamp.createProgramApply('[{
								 	"prap_user_entity_id": 5,
								 	"prap_prog_entity_id": 2
								 }]','[{
								 	"parog_progress_name": "apply",
								 	"parog_status": "open"
								 }]')

alter table bootcamp.batch
alter column batch_modified_date type timestamptz default now()

truncate table bootcamp.talents
	
----- UPDATE BATCH -----
create or replace procedure bootcamp.updatebatch (batchid int,in batch json, in added json, in deleted json, in trainer json)
language plpgsql
as 
$$
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
		batr_trainee_entity_id
	from json_to_recordset(added)x (
		batr_trainee_entity_id integer
		);
		
	delete from bootcamp.batch_trainee
	where batr_batch_id = batchid and batr_trainee_entity_id IN 
	(SELECT z.batr_trainee_entity_id FROM json_to_recordset(deleted)as z (batr_trainee_entity_id integer));
	
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

call bootcamp.updatebatch(59,'[{
							"batch_entity_id": 2,
							"batch_name": "gajadi",
							"batch_description": "batch#99_updated desc",
							"batch_start_date": "2026-06-06",
							"batch_end_date": "2026-06-06",
							"batch_type": "online"
						  }]','[{
							"user_id": 4
						  },{
							"user_id": 5
						  }]','[{
							"user_id": 1
						  },{
							"user_id": 2
						  }]','[{
							"tpro_emp_entity_id": 1   
						  },{
							"tpro_emp_entity_id": 2			   			   
							}]')
							
update bootcamp.batch set batch_name = 'anjay' where batch_id = 59
truncate table bootcamp.batch cascade
select * from bootcamp.talents

----- RUNNING BATCH -----

CREATE OR REPLACE PROCEDURE bootcamp.updateRunningBatch(
	IN data json,
	IN data2 json,
	IN data3 json
)
LANGUAGE 'plpgsql'
as
$$
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
		parog_progress_name = 'contract'
	where parog_prog_entity_id = data_store.batch_entity_id
	AND parog_user_entity_id = (data3->i->>'parog_user_entity_id')::integer;
	END LOOP;

end;
$$;