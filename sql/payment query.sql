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


create table payment.users_account(
usac_bank_entity_id integer references payment.bank(bank_entity_id) references payment.fintech(fint_entity_id),
usac_user_entity_id integer references users.users(user_entity_id),
usac_account_number varchar(25) unique,
usac_saldo numeric,
usac_type varchar(15) CHECK (usac_type in ('debet','credit card','payment')),
usac_start_date timestamptz,
usac_end_date timestamptz,
usac_modified_date timestamptz DEFAULT now(),
usac_status varchar(15) CHECK (usac_status in ('active','nactive','blokir')),
primary key (usac_user_entity_id,usac_bank_entity_id)
)


create table payment.transaction_payment(
trpa_id serial primary key ,
trpa_code_number varchar(55) unique,
trpa_order_number varchar(25),
trpa_debet numeric,
trpa_credit numeric,
trpa_type varchar(15) CHECK (trpa_type in ('topup','transfer','order','refund')),
trpa_note varchar(255),
trpa_modified_date timestamptz,
trpa_source_id varchar,
trpa_target_id varchar,
trpa_user_entity_id integer references users.users(user_entity_id)
)


CREATE OR REPLACE PROCEDURE payment.SPAccountNumber(In data1 json, In data2 json, In trpa_target_id varchar)
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