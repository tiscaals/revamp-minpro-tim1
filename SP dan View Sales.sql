-----------------------------------------------------------------------------------
|---------------------------- Insert Cart Items Sales ----------------------------|
-----------------------------------------------------------------------------------

CREATE OR REPLACE PROCEDURE sales.insert_cart_item(
    IN p_cait_id integer,
    IN p_cait_quantity integer,
    IN p_cait_unit_price numeric,
    IN p_cait_user_entity_id integer,
    IN p_cait_prog_entity_id integer
)
AS $$
BEGIN
    INSERT INTO sales.cart_items (
        cait_id,
        cait_quantity,
        cait_unit_price,
        cait_modified_date,
        cait_user_entity_id,
        cait_prog_entity_id
    )
    VALUES (
        p_cait_id,
        p_cait_quantity,
        p_cait_unit_price,
        CURRENT_TIMESTAMP,
        p_cait_user_entity_id,
        p_cait_prog_entity_id
    );
    
    COMMIT;
END;
$$ LANGUAGE plpgsql;


--------------------------------------------------------------------------------------------------
|---------------------------- Insert Special Offer dan Programs Sales----------------------------|
--------------------------------------------------------------------------------------------------

CREATE OR REPLACE PROCEDURE sales.insert_special_offer_and_programs(
    p_spof_id integer,
    p_spof_description character varying(256),
    p_spof_discount numeric,
    p_spof_type character varying(15),
    p_spof_start_date date,
    p_spof_end_date date,
    p_spof_min_qty integer,
    p_spof_max_qty integer,
    p_spof_cate_id integer,
    p_soco_id integer,
    p_soco_prog_entity_id integer,
    p_soco_status character varying(15)
)
AS $$
BEGIN
    -- Insert ke tabel special_offer
    INSERT INTO sales.special_offer (spof_id, spof_description, spof_discount, spof_type, spof_start_date, spof_end_date, spof_min_qty, spof_max_qty, spof_cate_id)
    VALUES (p_spof_id, p_spof_description, p_spof_discount, p_spof_type, p_spof_start_date, p_spof_end_date, p_spof_min_qty, p_spof_max_qty, p_spof_cate_id);

    -- Insert ke tabel special_offer_programs
    INSERT INTO sales.special_offer_programs (soco_id, soco_spof_id, soco_prog_entity_id, soco_status)
    VALUES (p_soco_id, p_spof_id, p_soco_prog_entity_id, p_soco_status);

    -- Output pesan sukses
    RAISE NOTICE 'Special offer and programs inserted successfully';
END;
$$ LANGUAGE PLPGSQL;


------------------------------------------------------------------------------------------------------
|---------------------------- Insert Order Detail dan Order Header Sales ----------------------------|
------------------------------------------------------------------------------------------------------

CREATE OR REPLACE PROCEDURE sales.sales_place_order(
    IN p_cait_id integer,
    IN p_cait_quantity integer,
    IN p_cait_unit_price numeric,
    IN p_cait_user_entity_id integer,
    IN p_cait_prog_entity_id integer,
    IN p_sode_unit_discount numeric,
    IN p_sode_soco_id integer,
    IN p_sohe_order_number character varying(25),
    IN p_sohe_account_number character varying(25),
    IN p_sohe_trpa_code_number character varying(55),
    IN p_sohe_license_code character varying(512),
    IN p_sohe_user_entity_id integer,
    IN p_sohe_status character varying(15)
)
AS $$
DECLARE
    v_sode_id integer;
    v_sode_line_total numeric;
    v_sohe_subtotal numeric;
    v_sohe_tax numeric;
    v_sohe_total_due numeric;
BEGIN

    v_sode_line_total := p_cait_quantity * p_cait_unit_price;

    v_sohe_subtotal := v_sode_line_total;
    v_sohe_tax := v_sohe_subtotal * 0.1;
    v_sohe_total_due := v_sohe_subtotal + v_sohe_tax;

    INSERT INTO sales.sales_order_header (
        sohe_id,
        sohe_order_date,
        sohe_due_date,
        sohe_ship_date,
        sohe_order_number,
        sohe_account_number,
        sohe_trpa_code_number,
        sohe_license_code,
        sohe_subtotal,
        sohe_tax,
        sohe_total_due,
        sohe_modified_date,
        sohe_user_entity_id,
        sohe_status
    )
    VALUES (
        DEFAULT,
        now(),
        now(),
        now(),
        p_sohe_order_number,
        p_sohe_account_number,
        p_sohe_trpa_code_number,
        p_sohe_license_code,
        v_sohe_subtotal,
        v_sohe_tax,
        v_sohe_total_due,
        CURRENT_TIMESTAMP,
        p_sohe_user_entity_id,
        p_sohe_status
    )
    RETURNING sohe_id INTO v_sode_id;

    INSERT INTO sales.sales_order_detail (
        sode_id,
        sode_qty,
        sode_unit_price,
        sode_unit_discount,
        sode_line_total,
        sode_modified_date,
        sode_sohe_id,
        sode_soco_id,
        sode_prog_entity_id
    )
    VALUES (
        DEFAULT,
        p_cait_quantity,
        p_cait_unit_price,
        p_sode_unit_discount,
        v_sode_line_total,
        CURRENT_TIMESTAMP,
        v_sode_id,
        p_sode_soco_id,
        p_cait_prog_entity_id
    );

    UPDATE sales.cart_items
    SET cait_modified_date = CURRENT_TIMESTAMP,
        cait_user_entity_id = p_cait_user_entity_id,
        cait_prog_entity_id = p_cait_prog_entity_id
    WHERE cait_id = p_cait_id;

    COMMIT;
END;
$$ LANGUAGE plpgsql;


---------------------------------------------------------------------------------
|---------------------------- View Cart Items Sales ----------------------------|
---------------------------------------------------------------------------------

CREATE VIEW sales.viev_cart_items AS
 SELECT c.prog_headline,
    c.prog_title,
    c.prog_price,
    s.cait_id,
    s.cait_quantity,
    s.cait_unit_price,
    s.cait_modified_date,
    s.cait_user_entity_id,
    s.cait_prog_entity_id
   FROM curriculum.program_entity c
     JOIN sales.cart_items s ON c.prog_entity_id = s.cait_prog_entity_id;


-----------------------------------------------------------------------------
|---------------------------- View Diskon Sales ----------------------------|
-----------------------------------------------------------------------------

CREATE VIEW sales.diskon_view AS
 SELECT so.spof_id,
    so.spof_description,
    so.spof_discount,
    so.spof_type,
    so.spof_start_date,
    so.spof_end_date,
    so.spof_min_qty,
    so.spof_max_qty,
    so.spof_modified_date,
    sop.soco_prog_entity_id,
    pe.prog_entity_id
   FROM sales.special_offer so
     JOIN sales.special_offer_programs sop ON so.spof_id = sop.soco_spof_id
     JOIN curriculum.program_entity pe ON sop.soco_prog_entity_id = pe.prog_entity_id;


-----------------------------------------------------------------------------------
|---------------------------- View Cart Payment Sales ----------------------------|
-----------------------------------------------------------------------------------

CREATE VIEW sales.payment_users_view AS
SELECT ua.usac_bank_entity_id,
       ua.usac_fint_entity_id,
       ua.usac_user_entity_id,
       ua.usac_account_number,
       f.fint_code,
       f.fint_name,
       u.user_name
FROM payment.users_account ua
JOIN payment.fintech f ON ua.usac_fint_entity_id = f.fint_entity_id
JOIN users.users u ON ua.usac_user_entity_id = u.user_entity_id;
