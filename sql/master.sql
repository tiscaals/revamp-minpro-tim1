--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: master; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA master;


ALTER SCHEMA master OWNER TO postgres;

--
-- Name: roac_display; Type: TYPE; Schema: master; Owner: postgres
--

CREATE TYPE master.roac_display AS ENUM (
    '0',
    '1'
);


ALTER TYPE master.roac_display OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.address (
    addr_id integer NOT NULL,
    addr_line1 character varying(255),
    addr_line2 character varying(255),
    addr_postal_code character varying(10),
    addr_spatial_location json,
    addr_modifed_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    addr_city_id integer
);


ALTER TABLE master.address OWNER TO postgres;

--
-- Name: address_addr_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.address_addr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.address_addr_id_seq OWNER TO postgres;

--
-- Name: address_addr_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.address_addr_id_seq OWNED BY master.address.addr_id;


--
-- Name: address_type; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.address_type (
    adty_id integer NOT NULL,
    adty_name character varying(15),
    adty_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE master.address_type OWNER TO postgres;

--
-- Name: address_type_adty_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.address_type_adty_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.address_type_adty_id_seq OWNER TO postgres;

--
-- Name: address_type_adty_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.address_type_adty_id_seq OWNED BY master.address_type.adty_id;


--
-- Name: category; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.category (
    cate_id integer NOT NULL,
    cate_name character varying(255),
    cate_cate_id integer,
    cate_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE master.category OWNER TO postgres;

--
-- Name: category_cate_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.category_cate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.category_cate_id_seq OWNER TO postgres;

--
-- Name: category_cate_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.category_cate_id_seq OWNED BY master.category.cate_id;


--
-- Name: city; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.city (
    city_id integer NOT NULL,
    city_name character varying(115),
    city_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    city_prov_id integer
);


ALTER TABLE master.city OWNER TO postgres;

--
-- Name: city_city_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.city_city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.city_city_id_seq OWNER TO postgres;

--
-- Name: city_city_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.city_city_id_seq OWNED BY master.city.city_id;


--
-- Name: country; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.country (
    country_code character varying(3) NOT NULL,
    country_name character varying(85),
    country_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE master.country OWNER TO postgres;

--
-- Name: job_role; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.job_role (
    joro_id integer NOT NULL,
    joro_name character varying(55),
    joro_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE master.job_role OWNER TO postgres;

--
-- Name: job_role_joro_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.job_role_joro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.job_role_joro_id_seq OWNER TO postgres;

--
-- Name: job_role_joro_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.job_role_joro_id_seq OWNED BY master.job_role.joro_id;


--
-- Name: job_type; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.job_type (
    joty_id integer NOT NULL,
    joty_name character varying(55)
);


ALTER TABLE master.job_type OWNER TO postgres;

--
-- Name: job_type_joty_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.job_type_joty_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.job_type_joty_id_seq OWNER TO postgres;

--
-- Name: job_type_joty_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.job_type_joty_id_seq OWNED BY master.job_type.joty_id;


--
-- Name: modules; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.modules (
    module_name character varying(125) NOT NULL
);


ALTER TABLE master.modules OWNER TO postgres;

--
-- Name: province; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.province (
    prov_id integer NOT NULL,
    prov_code character varying(5),
    prov_name character varying(85),
    prov_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    prov_country_code character varying(3)
);


ALTER TABLE master.province OWNER TO postgres;

--
-- Name: province_prov_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.province_prov_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.province_prov_id_seq OWNER TO postgres;

--
-- Name: province_prov_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.province_prov_id_seq OWNED BY master.province.prov_id;


--
-- Name: route_actions; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.route_actions (
    roac_id integer NOT NULL,
    roac_name character varying(15),
    roac_orderby integer,
    roac_display character(1),
    roac_module_name character varying(125),
    CONSTRAINT route_actions_roac_display_check CHECK ((roac_display = ANY (ARRAY['0'::bpchar, '1'::bpchar])))
);


ALTER TABLE master.route_actions OWNER TO postgres;

--
-- Name: skill_template; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.skill_template (
    skte_id integer NOT NULL,
    skte_skill character varying(256),
    skte_description character varying(256),
    skte_week integer,
    skte_orderby integer,
    skte_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    skty_name character varying(55),
    skte_skte_id integer
);


ALTER TABLE master.skill_template OWNER TO postgres;

--
-- Name: skill_template_skte_id_seq; Type: SEQUENCE; Schema: master; Owner: postgres
--

CREATE SEQUENCE master.skill_template_skte_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE master.skill_template_skte_id_seq OWNER TO postgres;

--
-- Name: skill_template_skte_id_seq; Type: SEQUENCE OWNED BY; Schema: master; Owner: postgres
--

ALTER SEQUENCE master.skill_template_skte_id_seq OWNED BY master.skill_template.skte_id;


--
-- Name: skill_type; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.skill_type (
    skty_name character varying(55) NOT NULL
);


ALTER TABLE master.skill_type OWNER TO postgres;

--
-- Name: status; Type: TABLE; Schema: master; Owner: postgres
--

CREATE TABLE master.status (
    status character varying(15) NOT NULL,
    status_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE master.status OWNER TO postgres;

--
-- Name: address addr_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address ALTER COLUMN addr_id SET DEFAULT nextval('master.address_addr_id_seq'::regclass);


--
-- Name: address_type adty_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address_type ALTER COLUMN adty_id SET DEFAULT nextval('master.address_type_adty_id_seq'::regclass);


--
-- Name: category cate_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.category ALTER COLUMN cate_id SET DEFAULT nextval('master.category_cate_id_seq'::regclass);


--
-- Name: city city_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.city ALTER COLUMN city_id SET DEFAULT nextval('master.city_city_id_seq'::regclass);


--
-- Name: job_role joro_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.job_role ALTER COLUMN joro_id SET DEFAULT nextval('master.job_role_joro_id_seq'::regclass);


--
-- Name: job_type joty_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.job_type ALTER COLUMN joty_id SET DEFAULT nextval('master.job_type_joty_id_seq'::regclass);


--
-- Name: province prov_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.province ALTER COLUMN prov_id SET DEFAULT nextval('master.province_prov_id_seq'::regclass);


--
-- Name: skill_template skte_id; Type: DEFAULT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.skill_template ALTER COLUMN skte_id SET DEFAULT nextval('master.skill_template_skte_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.address (addr_id, addr_line1, addr_line2, addr_postal_code, addr_spatial_location, addr_modifed_date, addr_city_id) FROM stdin;
1	jalan garuda1212	jalan rajawali1212	88880	"antara jalan garuda dan rajawali"	2023-05-27 20:56:26.835595	1
\.


--
-- Data for Name: address_type; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.address_type (adty_id, adty_name, adty_modified_date) FROM stdin;
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.category (cate_id, cate_name, cate_cate_id, cate_modified_date) FROM stdin;
\.


--
-- Data for Name: city; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.city (city_id, city_name, city_modified_date, city_prov_id) FROM stdin;
1	bogor	2023-05-28 13:20:47.679272+07	1
\.


--
-- Data for Name: country; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.country (country_code, country_name, country_modified_date) FROM stdin;
IDN	indonesia	2023-05-28 13:05:16.257821+07
MLY	malaysia	2023-05-28 15:47:21.74727+07
\.


--
-- Data for Name: job_role; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.job_role (joro_id, joro_name, joro_modified_date) FROM stdin;
\.


--
-- Data for Name: job_type; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.job_type (joty_id, joty_name) FROM stdin;
\.


--
-- Data for Name: modules; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.modules (module_name) FROM stdin;
coba
\.


--
-- Data for Name: province; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.province (prov_id, prov_code, prov_name, prov_modified_date, prov_country_code) FROM stdin;
1	JABAR	jawa barat	2023-05-28 13:12:04.626687+07	IDN
\.


--
-- Data for Name: route_actions; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.route_actions (roac_id, roac_name, roac_orderby, roac_display, roac_module_name) FROM stdin;
\.


--
-- Data for Name: skill_template; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.skill_template (skte_id, skte_skill, skte_description, skte_week, skte_orderby, skte_modified_date, skty_name, skte_skte_id) FROM stdin;
\.


--
-- Data for Name: skill_type; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.skill_type (skty_name) FROM stdin;
java
javascript
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: master; Owner: postgres
--

COPY master.status (status, status_modified_date) FROM stdin;
\.


--
-- Name: address_addr_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.address_addr_id_seq', 1, true);


--
-- Name: address_type_adty_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.address_type_adty_id_seq', 1, false);


--
-- Name: category_cate_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.category_cate_id_seq', 1, false);


--
-- Name: city_city_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.city_city_id_seq', 1, true);


--
-- Name: job_role_joro_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.job_role_joro_id_seq', 1, false);


--
-- Name: job_type_joty_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.job_type_joty_id_seq', 1, false);


--
-- Name: province_prov_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.province_prov_id_seq', 1, true);


--
-- Name: skill_template_skte_id_seq; Type: SEQUENCE SET; Schema: master; Owner: postgres
--

SELECT pg_catalog.setval('master.skill_template_skte_id_seq', 1, false);


--
-- Name: address address_addr_line1_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address
    ADD CONSTRAINT address_addr_line1_key UNIQUE (addr_line1);


--
-- Name: address address_addr_line2_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address
    ADD CONSTRAINT address_addr_line2_key UNIQUE (addr_line2);


--
-- Name: address address_addr_postal_code_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address
    ADD CONSTRAINT address_addr_postal_code_key UNIQUE (addr_postal_code);


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (addr_id);


--
-- Name: address_type address_type_adty_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address_type
    ADD CONSTRAINT address_type_adty_name_key UNIQUE (adty_name);


--
-- Name: address_type address_type_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address_type
    ADD CONSTRAINT address_type_pkey PRIMARY KEY (adty_id);


--
-- Name: category category_cate_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.category
    ADD CONSTRAINT category_cate_name_key UNIQUE (cate_name);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (cate_id);


--
-- Name: city city_city_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.city
    ADD CONSTRAINT city_city_name_key UNIQUE (city_name);


--
-- Name: city city_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (city_id);


--
-- Name: country country_country_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.country
    ADD CONSTRAINT country_country_name_key UNIQUE (country_name);


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (country_code);


--
-- Name: job_role job_role_joro_name_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.job_role
    ADD CONSTRAINT job_role_joro_name_key UNIQUE (joro_name);


--
-- Name: job_role job_role_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.job_role
    ADD CONSTRAINT job_role_pkey PRIMARY KEY (joro_id);


--
-- Name: job_type job_type_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.job_type
    ADD CONSTRAINT job_type_pkey PRIMARY KEY (joty_id);


--
-- Name: modules modules_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.modules
    ADD CONSTRAINT modules_pkey PRIMARY KEY (module_name);


--
-- Name: province province_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.province
    ADD CONSTRAINT province_pkey PRIMARY KEY (prov_id);


--
-- Name: province province_prov_code_key; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.province
    ADD CONSTRAINT province_prov_code_key UNIQUE (prov_code);


--
-- Name: skill_template skill_template_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.skill_template
    ADD CONSTRAINT skill_template_pkey PRIMARY KEY (skte_id);


--
-- Name: skill_type skill_type_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.skill_type
    ADD CONSTRAINT skill_type_pkey PRIMARY KEY (skty_name);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (status);


--
-- Name: address addr_city_id; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.address
    ADD CONSTRAINT addr_city_id FOREIGN KEY (addr_city_id) REFERENCES master.city(city_id);


--
-- Name: category category_cate_cate_id_fkey; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.category
    ADD CONSTRAINT category_cate_cate_id_fkey FOREIGN KEY (cate_cate_id) REFERENCES master.category(cate_id);


--
-- Name: city city_city_prov_id_fkey; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.city
    ADD CONSTRAINT city_city_prov_id_fkey FOREIGN KEY (city_prov_id) REFERENCES master.province(prov_id);


--
-- Name: province prov_country_code; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.province
    ADD CONSTRAINT prov_country_code FOREIGN KEY (prov_country_code) REFERENCES master.country(country_code);


--
-- Name: route_actions roac_module_name; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.route_actions
    ADD CONSTRAINT roac_module_name FOREIGN KEY (roac_module_name) REFERENCES master.modules(module_name);


--
-- Name: skill_template skill_template_skte_skte_id_fkey; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.skill_template
    ADD CONSTRAINT skill_template_skte_skte_id_fkey FOREIGN KEY (skte_skte_id) REFERENCES master.skill_template(skte_id);


--
-- Name: skill_template skill_template_skty_name_fkey; Type: FK CONSTRAINT; Schema: master; Owner: postgres
--

ALTER TABLE ONLY master.skill_template
    ADD CONSTRAINT skill_template_skty_name_fkey FOREIGN KEY (skty_name) REFERENCES master.skill_type(skty_name);


--
-- PostgreSQL database dump complete
--

