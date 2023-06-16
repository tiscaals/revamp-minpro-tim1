-- Signup procedure
CREATE OR REPLACE PROCEDURE users.SignUpPC (
    IN p_username VARCHAR,
    IN p_password VARCHAR,
    IN p_phone VARCHAR,
    IN p_email VARCHAR,
    IN p_role_id INT
)
LANGUAGE plpgsql
AS
$$
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

-- signup procedure default password hash = 12345
CALL users.SignUpPC('admin', '$2b$10$1zw3vP9v4tYgLPRtfYX.I.HJJTD7DPjtSn4DcmtQqMd1PyUM6a4/G', '081285711010', 'admin@example.com', 1);

-- procedure add address
CREATE OR REPLACE PROCEDURE users.add_address (
    IN first_address VARCHAR,
    IN second_address VARCHAR,
    IN code_pos VARCHAR,
	IN city_id INT,
	IN user_id INT,
    IN address_type_id INT
)
LANGUAGE plpgsql
AS
$$
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

-- procedure update address
CREATE OR REPLACE PROCEDURE users.update_address (
    IN address_id INT,
    IN first_address VARCHAR,
    IN second_address VARCHAR,
    IN code_pos VARCHAR,
    IN city_id INT,
    IN address_type_id INT
)
LANGUAGE plpgsql
AS
$$
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

-- call untuk add address
call users.add_address('Jalan Depok 1', 'Test', '16439', 1, 2, 1)
-- call untuk update address
call users.update_address(1, 'Jalan Depok', 'Test', '16439', 2, 1);
