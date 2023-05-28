CREATE TABLE sales.special_offer (
 	spof_id serial primary key,
	spof_description varchar(256),
	spof_discount numeric,
	spof_type varchar(15),
	spof_start_date timestamptz,
	spof_end_time timestamptz,
	spof_min_qty int,
	spof_max_qty int,
	spof_modified_date timestamptz
)
CREATE TYPE sales.soco_type_status AS ENUM ('open', 'cancelled', 'close');
 
create table sales.special_offer_programs(
	soco_id serial,
	soco_spof_id serial references sales.special_offer(spof_id),
	soco_status sales.soco_type_status,
	soco_modified_date timestamptz,
	primary key(soco_spof_id, soco_id)
)

create table sales.cart_items(
	cait_id serial primary key,
	cait_quantity int,
	cait_unit_price numeric,
	cait_modified_date timestamptz
)

create table sales.sales_order_header (
	sohe_id serial primary key,
	sohe_order_date timestamptz,
	sohe_due_date timestamptz,
	sohe_ship_date timestamptz,
	sohe_order_number varchar(25) unique,
	sohe_account_number varchar(25),
	sohe_trpa_code_number varchar(25),
	sohe_tax numeric,
	sohe_total_due numeric,
	sohe_license_code varchar(512) unique,
	sohe_modified_date timestamptz
)

create table sales.sales_order_detail (
	sode_id serial primary key,
	sode_qty int,
	sode_unit_price numeric,
	sode_unit_discount numeric,
	sode_line_total numeric,
	sode_modified_date timestamptz,
	sode_sohe_id int references sales.sales_order_header (sohe_id)
)

ALTER TABLE sales.sales_order_header 
ADD COLUMN  sohe_status varchar(15);