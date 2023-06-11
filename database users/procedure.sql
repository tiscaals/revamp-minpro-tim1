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

-- default password hash 12345
-- untuk call procedurenya
CALL users.SignUpPC('admin', '$2b$10$1zw3vP9v4tYgLPRtfYX.I.HJJTD7DPjtSn4DcmtQqMd1PyUM6a4/G', '081285711010', 'admin@example.com', 1);