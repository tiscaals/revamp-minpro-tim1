-- Insert ke table role
INSERT INTO users.roles(role_name, role_type) VALUES ('Admin', 'role admin'), ('Guest', 'role guest'), ('Employee', 'role employee'), ('Direksi', 'role direksi'), ('Business Development', 'role business'), ('HR', 'role hr'), ('Talent', 'role talent'), ('Trainer', 'role trainer'), ('Recruiter', 'role recruiter')


-- //Gajadi pakai, jadinya pakai model
CREATE VIEW users.selectUsers AS 
	SELECT users.user_name, users.user_password, users_phones.uspo_number, users_email.pmail_address,
		   roles.role_name
	FROM users.users JOIN users.users_phones ON user_entity_id = uspo_entity_id
					 JOIN users.users_email ON user_entity_id = pmail_entity_id
					 JOIN users.users_roles ON user_current_role = usro_entity_id
					 JOIN users.roles ON role_id = usro_role_id