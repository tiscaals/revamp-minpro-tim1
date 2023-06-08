CREATE TABLE master.route_actions(
	roac_name VARCHAR(15) UNIQUE
);

DROP TABLE bootcamp.program_apply_progress;

CREATE TABLE bootcamp.program_apply_progress (
    parog_id SERIAL PRIMARY KEY,
    parog_user_entity_id INT,
    parog_prog_entity_id INT,
    parog_action_date TIMESTAMPTZ,
    parog_modified_date TIMESTAMPTZ,
    parog_comment VARCHAR(512),
    parog_progress_name VARCHAR(15) CHECK (parog_progress_name in ('apply', 'filtering test', 'failed', 'contract', 'disqualified', 'not responding'))REFERENCES master.route_actions(roac_name) ,
    parog_emp_entity_id INT, --Ini Tabel apaan sih????
    parog_status VARCHAR(15) CHECK (parog_status in ('open', 'wait', 'cancelled', 'closed')) REFERENCES master.status(status) , --??????
    FOREIGN KEY (parog_user_entity_id, parog_prog_entity_id) REFERENCES bootcamp.program_apply(prap_user_entity_id, prap_prog_entity_id)
);

create table bootcamp.talents(
	talent_id serial primary key,
	talent_fullname varchar(100),
	talent_user_entity_id integer references users.users(user_entity_id),
	talent_technology varchar(50),
	talent_batch_id integer references bootcamp.batch(batch_id),
	talent_status varchar(15),
	talent_skill varchar(256)
);

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

insert into master.status(status)
values('passed')

insert into master.route_actions(roac_name)
values('apply')

call bootcamp.createProgramApply('[{
								 	"prap_user_entity_id": 1,
								 	"prap_prog_entity_id": 1,
								 	"prap_test_score": 69,
								 	"prap_gpa": 69,
								 	"prap_iq_test": 69,
								 	"prap_review": "ProgramApply Review Pertama ini boss",
								 	"prap_modified_date": "2023-06-06 12:30:00 +00:00",
								 	"prap_status": "passed"
								 }]','[{
								 	"parog_action_date": "2023-06-06 12:30:00 +00:00",
								 	"parog_modified_date": "2023-06-06 12:30:00 +00:00",
								 	"parog_comment": "Ini adalah comment Program Apply Progress Boss",
								 	"parog_progress_name": "apply",
								 	"parog_emp_entity_id": 1,
								 	"parog_status": "open"
								 }]')
								 

create or replace procedure bootcamp.closeBatch(in data json, in data2 json)
language plpgsql
as
$$
declare
	data_store record;
begin
	select * from json_to_recordset(data) as x(
		batch_id int,
		batch_status varchar(15)
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
		talent_status,
		talent_skill
	)
	select
		y.talent_fullname,
		y.talent_user_entity_id,
		y.talent_technology,
		data_store.batch_id,
		y.talent_status,
		y.talent_skill
	from json_to_recordset(data2) as y(
		talent_fullname varchar(100),
		talent_user_entity_id integer,
		talent_technology varchar(50),
		talent_status varchar(15),
		talent_skill varchar(256)
	);

end;
$$;

insert into master.status(status)
values('closed')

call bootcamp.closeBatch('[{
						 	"batch_id": 10,
						 	"batch_status": "closed"
						 }]','[{
						 	"talent_fullname": "Abu Musa",
						 	"talent_user_entity_id": 1,
						 	"talent_technology": "PHP ini boss",
						 	"talent_status": "idle",
						 	"talent_skill": "Menguasai 7 Elemen,bisa hack satelit bill gates"
						 },{
						 	"talent_fullname": "Abu Abdillah",
						 	"talent_user_entity_id": 1,
						 	"talent_technology": "java ini boss",
						 	"talent_status": "idle",
						 	"talent_skill": "Menguasai 10 Elemen,bisa hack satelit putin"
						 }]')


create or replace procedure bootcamp.createEvaluation(totalscore int, in data2 json)
language plpgsql
as 
$$
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

call bootcamp.createEvaluation(10,
							   '[{
							   	"btev_type": "hardskill",
							   	"btev_header": "batch#3 weekly evaluation fundamental javascript",
							   	"btev_section": "technical",
							   	"btev_skill": "fundamental javascript",
								"btev_week": "1",
							   	"btev_skor": 4,
								"btev_note": "",
								"btev_modified_date": "2024-06-06",
								"btev_batch_id": 10,
								"btev_trainee_entity_id": 1
							  },
							  {
							   	"btev_type": "softskill",
								"btev_header": "batch#3 weekly evaluation fundamental javascript",
							   	"btev_section": "softskill",
							   	"btev_skill": "komunikasi",
								"btev_week": "1",
							   	"btev_skor": 3,
								"btev_note": "",
								"btev_modified_date": "2024-06-06",
								"btev_batch_id": 10,
								"btev_trainee_entity_id": 1
							  }]')


