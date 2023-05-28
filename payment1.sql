create table payment.business_entity(
entity_id serial primary key
)
drop table business_entity
drop table users

create table payment.bank(
bank_entity_id integer primary key references payment.business_entity(entity_id),	
bank_code varchar(10) unique,
bank_name varchar(55) unique,
bank_modified_date timestamptz
)
drop table payment.bank

create table payment.fintech(
fint_entity_id integer primary key references payment.business_entity(entity_id),
fint_code varchar(10) unique,
fint_name varchar(55) unique,
fint_modified_date timestamptz
)
drop table payment.fintech

create type payment.usac_type as enum ('debet','credit card','payment')
create type payment.usac_status as enum ('active', 'inactive', 'blokir')


create table payment.users_account(
usac_entity_id serial  references payment.bank(bank_entity_id) references payment.fintech(fint_entity_id),
usac_user_entity_id integer references payment.users(user_entity_id),
usac_account_number varchar(25) unique,
usac_saldo numeric,
usac_type payment.usac_type,
usac_start_date timestamptz,
usac_end_date timestamptz,
usac_modified_date timestamptz,
usac_status payment.usac_status,
primary key (usac_user_entity_id,usac_entity_id)
)
drop table payment.users_account

create table payment.users(
user_entity_id serial primary key
)

create type payment.trpa_type as enum('topup','transfer','order','refund')

create table payment.transaction_payment(
trpa_id serial primary key ,
trpa_code_number varchar(55) unique,
trpa_order_number varchar(25),
trpa_debet numeric,
trpa_credit numeric,
trpa_type payment.trpa_type,
trpa_note varchar(255),
trpa_modified_date timestamptz,
trpa_source_id integer references ,
trpa_target_id integer
)

drop table payment.transaction.payment

