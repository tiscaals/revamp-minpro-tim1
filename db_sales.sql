CREATE TABLE curriculum.program_entity (
    prog_entity_id SERIAL PRIMARY KEY
);

CREATE TABLE users.users (
    user_entity_id SERIAL PRIMARY KEY
);

CREATE TABLE master.status (
    status varchar(15) PRIMARY KEY
);

CREATE TABLE master.category (
    cate_id SERIAL PRIMARY KEY
);

---------------------------------------------------

CREATE TABLE sales.sales_order_detail (
    sode_id SERIAL PRIMARY KEY,
    sode_qty integer,
    sode_unit_price numeric,
    sode_unit_discount numeric,
    sode_line_total numeric,
    sode_modified_date timestamptz,
    sode_sohe_id integer REFERENCES sales.sales_order_header(sohe_id),
    sode_prog_entity_id integer REFERENCES curriculum.program_entity(prog_entity_id)
);

CREATE TABLE sales.sales_order_header (
    sohe_id SERIAL PRIMARY KEY,
    sohe_order_date timestamptz,
    sohe_due_date timestamptz,
    sohe_ship_date timestamptz,
    sohe_order_number varchar(25) unique,
    sohe_account_number varchar(25),
    sohe_trpa_code_number varchar(25),
    sohe_subtotal numeric,
    sohe_tax numeric,
    sohe_total_due numeric,
    sohe_license_code varchar(512) unique,
    sohe_modified_date timestamptz,
    sohe_user_entity_id integer REFERENCES users.users(user_entity_id),
    sohe_status varchar(15) REFERENCES master.status(status)
);

ALTER TABLE sales.sales_order_header
DROP CONSTRAINT sales_order_header_sohe_status_fkey;

ALTER TABLE sales.sales_order_header
ALTER COLUMN sohe_status TYPE varchar(15);

ALTER TABLE sales.sales_order_header
ADD CONSTRAINT valid_sohe_status CHECK (sohe_status IN ('open', 'shipping', 'cancelled', 'refund'));

CREATE TABLE sales.special_offer (
    spof_id SERIAL PRIMARY KEY,
    spof_description varchar(256),
    spof_discount numeric,
    spof_type varchar(15),
    spof_start_date timestamptz,
    spof_end_date timestamptz,
    spof_min_qty integer,
    spof_max_qty integer,
    spof_modified_date timestamptz,
    spof_cate_id integer REFERENCES master.category(cate_id)
);

CREATE TABLE sales.special_offer_programs (
    soco_id SERIAL,
    soco_spof_id integer,
    soco_prog_entity_id integer,
    soco_status varchar(15),
    soco_modified_date timestamptz,
    PRIMARY KEY (soco_id, soco_spof_id, soco_prog_entity_id),
    FOREIGN KEY (soco_spof_id) REFERENCES sales.special_offer(spof_id),
    FOREIGN KEY (soco_prog_entity_id) REFERENCES curriculum.program_entity(prog_entity_id)
);

CREATE TYPE sales.soco_status_type as enum ('open','cancelled','closed')
ALTER TABLE sales.special_offer_programs
ALTER COLUMN soco_status TYPE sales.soco_status_type USING soco_status::sales.soco_status_type

CREATE TABLE sales.cart_items (
    cait_id SERIAL PRIMARY KEY,
    cait_quantity integer,
    cait_unit_price numeric,
    cait_modified_date timestamptz,
    cait_user_entity_id integer REFERENCES users.users(user_entity_id),
    cait_prog_entity_id integer REFERENCES curriculum.program_entity(prog_entity_id)
);
