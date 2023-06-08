create table users.business_entity(
entity_id serial primary key
)

drop table users.business_entity


create table users.users(
user_entity_id serial primary key
)

drop table users.users


create table payment.bank(
bank_entity_id serial primary key references users.business_entity(entity_id),	
bank_code varchar(10) unique,
bank_name varchar(55) unique,
bank_modified_date timestamptz default now()
)



drop table payment.bank


create table payment.fintech(
fint_entity_id serial primary key references users.business_entity(entity_id),
fint_code varchar(10) unique,
fint_name varchar(55) unique,
fint_modified_date timestamptz default now()
)

drop table payment.fintech


create table payment.users_account(
usac_bank_entity_id serial references payment.bank(bank_entity_id) references payment.fintech(fint_entity_id),
usac_user_entity_id serial references users.users(user_entity_id),
usac_account_number varchar(25) unique,
usac_saldo numeric,
usac_type varchar(15) CHECK (usac_type in('debet','credit card','payment')),
usac_start_date date,
usac_end_date date,
usac_modified_date timestamptz default now(),
usac_status varchar(15) CHECK (usac_status in('active','inactive','blokir')),
primary key (usac_user_entity_id,usac_bank_entity_id)
)

drop table payment.users_account



create table payment.transaction_payment(
trpa_id serial primary key ,
trpa_code_number varchar(55) unique,
trpa_order_number varchar(25),
trpa_debet numeric,
trpa_credit numeric,
trpa_type varchar (15) CHECK (trpa_type in('topup','transfer','order','refund')),
trpa_note varchar(255),
trpa_modified_date timestamptz default now(),
trpa_source_id varchar (25) NOT NULL,
trpa_target_id varchar (25) NOT NULL,
trpa_user_entity_id integer references users.users(user_entity_id)
)

UPDATE payment.transaction_payment AS tp
SET trpa_source_id = ua_source.usac_account_number,
    trpa_target_id = ua_target.usac_account_number
FROM payment.users_account AS ua_source, payment.users_account AS ua_target
WHERE tp.trpa_source_id = ua_source.usac_user_entity_id::varchar
  AND tp.trpa_target_id = ua_target.usac_user_entity_id::varchar;

drop table payment.transaction_payment


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
    
    -- Transfer funds from source to target
    INSERT INTO payment.transaction_payment(trpa_source_id, trpa_target_id, trpa_debet, trpa_type, trpa_modified_date)
    SELECT tp.trpa_source_id, tp.trpa_target_id, tp.trpa_debet, 'transfer', now()
    FROM payment.transaction_payment tp
    WHERE tp.trpa_id = new_TransactionPaymentId;
    
    -- Update the source's credit by subtracting the transfer amount
    UPDATE payment.transaction_payment
    SET trpa_credit = trpa_credit - (SELECT trpa_debet FROM payment.transaction_payment WHERE trpa_id = new_TransactionPaymentId)
    WHERE trpa_id = new_TransactionPaymentId;
    
    -- Get the target's account number
    SELECT ua.usac_account_number INTO target_account_number
    FROM payment.transaction_payment tp
    JOIN payment.users_account ua ON ua.usac_user_entity_id = tp.trpa_target_id
    WHERE tp.trpa_id = new_TransactionPaymentId;
    
    -- Update the target's credit by adding the transfer amount
    UPDATE payment.transaction_payment
    SET trpa_credit = trpa_credit + (SELECT trpa_debet FROM payment.transaction_payment WHERE trpa_id = new_TransactionPaymentId)
    WHERE trpa_id = trpa_target_id;
    
    -- Optional: You can add additional validation or error handling here if required.
    
END;
$$;