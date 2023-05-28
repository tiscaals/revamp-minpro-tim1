create table users.business_entity(
entity_id serial primary key
)

create table users.users(
user_entity_id serial primary key
)

create table payment.bank(
bank_entity_id integer primary key references users.business_entity(entity_id),	
bank_code varchar(10) unique,
bank_name varchar(55) unique,
bank_modified_date timestamptz
)

create table payment.fintech(
fint_entity_id integer primary key references users.business_entity(entity_id),
fint_code varchar(10) unique,
fint_name varchar(55) unique,
fint_modified_date timestamptz
)

create type payment.usac_type as enum ('debet','credit card','payment')
create type payment.usac_status as enum ('active', 'inactive', 'blokir')

create table payment.users_account(
usac_entity_id serial  references payment.bank(bank_entity_id) references payment.fintech(fint_entity_id),
usac_user_entity_id integer references users.users(user_entity_id),
usac_account_number varchar(25) unique,
usac_saldo numeric,
usac_type payment.usac_type,
usac_start_date timestamptz,
usac_end_date timestamptz,
usac_modified_date timestamptz,
usac_status payment.usac_status,
primary key (usac_user_entity_id,usac_entity_id)
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
trpa_source_id integer,
trpa_target_id integer,
trpa_user_entity_id integer references users.users(user_entity_id)
)




CREATE OR REPLACE FUNCTION payment.get_transaction_payment()
RETURNS TABLE (
  trpa_id INTEGER,
  trpa_code_number VARCHAR(55),
  trpa_order_number VARCHAR(25),
  trpa_debet NUMERIC,
  trpa_credit NUMERIC,
  trpa_type payment.trpa_type,
  trpa_note VARCHAR(255),
  trpa_modified_date TIMESTAMPTZ,
  trpa_source_id INTEGER,
  trpa_target_id INTEGER,
  trpa_user_entity_id INTEGER
)
AS $$
BEGIN
  RETURN QUERY
  SELECT tp.trpa_id, tp.trpa_code_number, tp.trpa_order_number, tp.trpa_debet, tp.trpa_credit,
         tp.trpa_type, tp.trpa_note, tp.trpa_modified_date,
         ua_source.usac_account_number, ua_target.usac_account_number,
         tp.trpa_user_entity_id
  FROM payment.transaction_payment tp
  JOIN payment.users_account ua_source ON CAST(tp.trpa_source_id AS VARCHAR) = ua_source.usac_account_number
  JOIN payment.users_account ua_target ON CAST(tp.trpa_target_id AS VARCHAR) = ua_target.usac_account_number;
END;
$$ LANGUAGE plpgsql;