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
-- Name: job_hire; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA job_hire;


ALTER SCHEMA job_hire OWNER TO postgres;

--
-- Name: createpostingjob(json, json, json); Type: PROCEDURE; Schema: job_hire; Owner: postgres
--

CREATE PROCEDURE job_hire.createpostingjob(IN data json, IN data1 json, IN data2 json)
    LANGUAGE plpgsql
    AS $$
DECLARE
	bus_entity_id INT;
BEGIN
	WITH result AS (
		INSERT INTO users.business_entity (entity_id) VALUES (DEFAULT)
		RETURNING entity_id
	)
	SELECT entity_id INTO bus_entity_id FROM result;

	INSERT INTO job_hire.job_post (
		jopo_entity_id,
		jopo_number,
		jopo_title,
		jopo_start_date,
		jopo_end_date,
		jopo_min_salary,
		jopo_max_salary,
		jopo_min_experience,
		jopo_max_experience,
		jopo_primary_skill,
		jopo_secondary_skill,
		jopo_publish_date,
		jopo_emp_entity_id,
		jopo_clit_id,
		jopo_joro_id,
		jopo_joty_id,
		jopo_joca_id,
		jopo_addr_id,
		jopo_work_code,
		jopo_edu_code,
		jopo_status,
		jopo_open
	)
	SELECT
		bus_entity_id,
		x.jopo_number,
		x.jopo_title,
		x.jopo_start_date,
		x.jopo_end_date,
		x.jopo_min_salary,
		x.jopo_max_salary,
		x.jopo_min_experience,
		x.jopo_max_experience,
		x.jopo_primary_skill,
		x.jopo_secondary_skill,
		CASE WHEN x.jopo_status = 'publish' THEN CURRENT_DATE ELSE NULL END,
		x.jopo_emp_entity_id,
		x.jopo_clit_id,
		x.jopo_joro_id,
		x.jopo_joty_id,
		x.jopo_joca_id,
		x.jopo_addr_id,
		x.jopo_work_code,
		x.jopo_edu_code,
		x.jopo_status,
		x.jopo_open
	FROM json_to_recordset(data) AS x(
		jopo_entity_id INT,
		jopo_number VARCHAR(25),
		jopo_title VARCHAR(256),
		jopo_start_date DATE,
		jopo_end_date DATE,
		jopo_min_salary INT,
		jopo_max_salary INT,
		jopo_min_experience INT,
		jopo_max_experience INT,
		jopo_primary_skill VARCHAR(256),
		jopo_secondary_skill VARCHAR(256),
		jopo_publish_date DATE,
		jopo_emp_entity_id INT,
		jopo_clit_id INT,
		jopo_joro_id INT,
		jopo_joty_id INT,
		jopo_joca_id INT,
		jopo_addr_id INT,
		jopo_work_code VARCHAR(15),
		jopo_edu_code VARCHAR(15),
		jopo_status VARCHAR(15),
		jopo_open CHAR(1)
	);

	INSERT INTO job_hire.job_post_desc (
		jopo_entity_id,
		jopo_description,
		jopo_responsibility,
		jopo_target,
		jopo_benefit
	)
	SELECT
		bus_entity_id,
		x.jopo_description,
		x.jopo_responsibility,
		x.jopo_target,
		x.jopo_benefit
	FROM json_to_recordset(data1) AS x(
		jopo_entity_id INT,
		jopo_description JSON,
		jopo_responsibility JSON,
		jopo_target JSON,
		jopo_benefit JSON
	);

	INSERT INTO job_hire.job_photo (
		jopho_entity_id,
		jopho_filename,
		jopho_filesize,
		jopho_filetype
	)
	SELECT
		bus_entity_id,
		x.jopho_filename,
		x.jopho_filesize,
		x.jopho_filetype
	FROM json_to_recordset(data2) AS x(
		jopho_entity_id INT,
		jopho_filename VARCHAR(55),
		jopho_filesize INT,
		jopho_filetype VARCHAR(15)
	);
END;
$$;


ALTER PROCEDURE job_hire.createpostingjob(IN data json, IN data1 json, IN data2 json) OWNER TO postgres;

--
-- Name: update_jopho_modified_date(); Type: FUNCTION; Schema: job_hire; Owner: postgres
--

CREATE FUNCTION job_hire.update_jopho_modified_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.jopho_modified_date := NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION job_hire.update_jopho_modified_date() OWNER TO postgres;

--
-- Name: update_jopo_modified_date(); Type: FUNCTION; Schema: job_hire; Owner: postgres
--

CREATE FUNCTION job_hire.update_jopo_modified_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.jopo_modified_date := NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION job_hire.update_jopo_modified_date() OWNER TO postgres;

--
-- Name: update_jopo_publish_date(); Type: FUNCTION; Schema: job_hire; Owner: postgres
--

CREATE FUNCTION job_hire.update_jopo_publish_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.jopo_status = 'publish' THEN
    NEW.jopo_publish_date = CURRENT_DATE;
  ELSE
  	NEW.jopo_publish_date = OLD.jopo_publish_date;
  END IF;

  RETURN NEW;
END;
$$;


ALTER FUNCTION job_hire.update_jopo_publish_date() OWNER TO postgres;

--
-- Name: updatepostingjob(integer, json, json, json); Type: PROCEDURE; Schema: job_hire; Owner: postgres
--

CREATE PROCEDURE job_hire.updatepostingjob(IN id integer, IN data json, IN data1 json, IN data2 json)
    LANGUAGE plpgsql
    AS $$
DECLARE
	bus_entity_id INT;
BEGIN
    -- Retrieve the entity_id for the business entity
    SELECT jopo_entity_id INTO bus_entity_id
    FROM job_hire.job_post
    WHERE job_hire.job_post.jopo_entity_id=id;

    -- Update the job_post table
    UPDATE job_hire.job_post AS jp
    SET
        jopo_title = x.jopo_title,
        jopo_start_date = x.jopo_start_date,
        jopo_end_date = x.jopo_end_date,
        jopo_min_salary = x.jopo_min_salary,
        jopo_max_salary = x.jopo_max_salary,
        jopo_min_experience = x.jopo_min_experience,
        jopo_max_experience = x.jopo_max_experience,
        jopo_primary_skill = x.jopo_primary_skill,
        jopo_secondary_skill = x.jopo_secondary_skill,
        jopo_emp_entity_id = x.jopo_emp_entity_id,
        jopo_clit_id = x.jopo_clit_id,
        jopo_joro_id = x.jopo_joro_id,
        jopo_joty_id = x.jopo_joty_id,
        jopo_joca_id = x.jopo_joca_id,
        jopo_addr_id = x.jopo_addr_id,
        jopo_work_code = x.jopo_work_code,
        jopo_edu_code = x.jopo_edu_code,
        jopo_status = x.jopo_status,
		jopo_open = x.jopo_open
    FROM json_to_recordset(data) AS x(
        jopo_title VARCHAR(256),
        jopo_start_date DATE,
        jopo_end_date DATE,
        jopo_min_salary INT,
        jopo_max_salary INT,
        jopo_min_experience INT,
        jopo_max_experience INT,
        jopo_primary_skill VARCHAR(256),
        jopo_secondary_skill VARCHAR(256),
        jopo_emp_entity_id INT,
        jopo_clit_id INT,
        jopo_joro_id INT,
        jopo_joty_id INT,
        jopo_joca_id INT,
        jopo_addr_id INT,
        jopo_work_code VARCHAR(15),
        jopo_edu_code VARCHAR(15),
        jopo_status VARCHAR(15),
		jopo_open CHAR(1)
    )
    WHERE jp.jopo_entity_id = bus_entity_id;

    -- Update the job_post_desc table
    UPDATE job_hire.job_post_desc AS jpd
    SET
        jopo_description = x.jopo_description,
        jopo_responsibility = x.jopo_responsibility,
        jopo_target = x.jopo_target,
        jopo_benefit = x.jopo_benefit
    FROM json_to_recordset(data1) AS x(
        jopo_description JSON,
        jopo_responsibility JSON,
        jopo_target JSON,
        jopo_benefit JSON
    )
    WHERE jpd.jopo_entity_id = bus_entity_id;

    -- Update the job_photo table
    UPDATE job_hire.job_photo AS jp
    SET
        jopho_filename = x.jopho_filename,
        jopho_filesize = x.jopho_filesize,
        jopho_filetype = x.jopho_filetype
    FROM json_to_recordset(data2) AS x(
        jopho_filename VARCHAR(55),
        jopho_filesize INT,
        jopho_filetype VARCHAR(15)
    )
    WHERE jp.jopho_entity_id = bus_entity_id;
END;
$$;


ALTER PROCEDURE job_hire.updatepostingjob(IN id integer, IN data json, IN data1 json, IN data2 json) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: client; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.client (
    clit_id integer NOT NULL,
    clit_name character varying(256),
    clit_about character varying(512),
    clit_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    clit_addr_id integer,
    clit_emra_id integer,
    clit_indu_code character varying(15)
);


ALTER TABLE job_hire.client OWNER TO postgres;

--
-- Name: client_clit_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.client_clit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.client_clit_id_seq OWNER TO postgres;

--
-- Name: client_clit_id_seq; Type: SEQUENCE OWNED BY; Schema: job_hire; Owner: postgres
--

ALTER SEQUENCE job_hire.client_clit_id_seq OWNED BY job_hire.client.clit_id;


--
-- Name: employee_range; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.employee_range (
    emra_id integer NOT NULL,
    emra_range_min integer,
    emra_range_max integer,
    emra_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE job_hire.employee_range OWNER TO postgres;

--
-- Name: employee_range_emra_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.employee_range_emra_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.employee_range_emra_id_seq OWNER TO postgres;

--
-- Name: employee_range_emra_id_seq; Type: SEQUENCE OWNED BY; Schema: job_hire; Owner: postgres
--

ALTER SEQUENCE job_hire.employee_range_emra_id_seq OWNED BY job_hire.employee_range.emra_id;


--
-- Name: job_category; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.job_category (
    joca_id integer NOT NULL,
    joca_name character varying(255),
    joca_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE job_hire.job_category OWNER TO postgres;

--
-- Name: job_category_joca_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.job_category_joca_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.job_category_joca_id_seq OWNER TO postgres;

--
-- Name: job_category_joca_id_seq; Type: SEQUENCE OWNED BY; Schema: job_hire; Owner: postgres
--

ALTER SEQUENCE job_hire.job_category_joca_id_seq OWNED BY job_hire.job_category.joca_id;


--
-- Name: job_list_client_view; Type: VIEW; Schema: job_hire; Owner: postgres
--

CREATE VIEW job_hire.job_list_client_view AS
 SELECT client.clit_name,
    city.city_name,
    client.clit_id
   FROM ((job_hire.client
     LEFT JOIN master.address ON ((client.clit_addr_id = address.addr_id)))
     LEFT JOIN master.city ON ((address.addr_city_id = city.city_id)));


ALTER TABLE job_hire.job_list_client_view OWNER TO postgres;

--
-- Name: job_photo; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.job_photo (
    jopho_id integer NOT NULL,
    jopho_filename character varying(55),
    jopho_filesize integer,
    jopho_filetype character varying(15),
    jopho_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    jopho_entity_id integer,
    CONSTRAINT job_photo_jopho_filetype_check CHECK (((jopho_filetype)::text = ANY ((ARRAY['png'::character varying, 'jpg'::character varying, 'jpeg'::character varying])::text[])))
);


ALTER TABLE job_hire.job_photo OWNER TO postgres;

--
-- Name: job_post; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.job_post (
    jopo_entity_id integer NOT NULL,
    jopo_number character varying(25),
    jopo_title character varying(256),
    jopo_start_date date,
    jopo_end_date date,
    jopo_min_salary numeric,
    jopo_max_salary numeric,
    jopo_min_experience integer,
    jopo_max_experience integer,
    jopo_primary_skill character varying(256),
    jopo_secondary_skill character varying(256),
    jopo_publish_date date,
    jopo_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    jopo_emp_entity_id integer,
    jopo_clit_id integer,
    jopo_joro_id integer,
    jopo_joty_id integer,
    jopo_joca_id integer,
    jopo_addr_id integer,
    jopo_work_code character varying(15),
    jopo_edu_code character varying(15),
    jopo_status character varying(15) NOT NULL,
    jopo_id integer NOT NULL,
    jopo_open character(1) DEFAULT 1 NOT NULL,
    CONSTRAINT job_post_jopo_open_check CHECK ((jopo_open = ANY (ARRAY['0'::bpchar, '1'::bpchar]))),
    CONSTRAINT job_post_jopo_status_check CHECK (((jopo_status)::text = ANY ((ARRAY['publish'::character varying, 'draft'::character varying, 'cancelled'::character varying, 'remove'::character varying])::text[])))
);


ALTER TABLE job_hire.job_post OWNER TO postgres;

--
-- Name: job_post_desc; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.job_post_desc (
    jopo_entity_id integer NOT NULL,
    jopo_description json,
    jopo_responsibility json,
    jopo_target json,
    jopo_benefit json
);


ALTER TABLE job_hire.job_post_desc OWNER TO postgres;

--
-- Name: job_list_posting_view; Type: VIEW; Schema: job_hire; Owner: postgres
--

CREATE VIEW job_hire.job_list_posting_view AS
 SELECT job_post.jopo_entity_id,
    job_photo.jopho_filename,
    job_post.jopo_title,
    job_post.jopo_min_experience,
    job_post.jopo_max_experience,
    job_post.jopo_joro_id,
    job_post.jopo_joty_id,
    job_post.jopo_work_code,
    job_post.jopo_modified_date,
    job_post.jopo_clit_id
   FROM ((job_hire.job_post
     LEFT JOIN job_hire.job_post_desc ON ((job_post.jopo_entity_id = job_post_desc.jopo_entity_id)))
     LEFT JOIN job_hire.job_photo ON ((job_post.jopo_entity_id = job_photo.jopho_entity_id)))
  WHERE ((job_post.jopo_open = '1'::bpchar) AND ((job_post.jopo_status)::text = 'publish'::text));


ALTER TABLE job_hire.job_list_posting_view OWNER TO postgres;

--
-- Name: job_list_view; Type: VIEW; Schema: job_hire; Owner: postgres
--

CREATE VIEW job_hire.job_list_view AS
 SELECT v1.jopo_entity_id,
    v1.jopho_filename,
    v1.jopo_title,
    v1.jopo_min_experience,
    v1.jopo_max_experience,
    v1.jopo_joro_id,
    v1.jopo_joty_id,
    v1.jopo_work_code,
    v1.jopo_modified_date,
    v1.jopo_clit_id,
    v2.clit_name,
    v2.city_name,
    v2.clit_id
   FROM (job_hire.job_list_posting_view v1
     LEFT JOIN job_hire.job_list_client_view v2 ON ((v1.jopo_clit_id = v2.clit_id)));


ALTER TABLE job_hire.job_list_view OWNER TO postgres;

--
-- Name: job_photo_jopho_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.job_photo_jopho_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.job_photo_jopho_id_seq OWNER TO postgres;

--
-- Name: job_photo_jopho_id_seq; Type: SEQUENCE OWNED BY; Schema: job_hire; Owner: postgres
--

ALTER SEQUENCE job_hire.job_photo_jopho_id_seq OWNED BY job_hire.job_photo.jopho_id;


--
-- Name: job_post_jopo_entity_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.job_post_jopo_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.job_post_jopo_entity_id_seq OWNER TO postgres;

--
-- Name: job_post_jopo_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: job_hire; Owner: postgres
--

ALTER SEQUENCE job_hire.job_post_jopo_entity_id_seq OWNED BY job_hire.job_post.jopo_entity_id;


--
-- Name: job_post_jopo_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.job_post_jopo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.job_post_jopo_id_seq OWNER TO postgres;

--
-- Name: job_post_jopo_id_seq; Type: SEQUENCE OWNED BY; Schema: job_hire; Owner: postgres
--

ALTER SEQUENCE job_hire.job_post_jopo_id_seq OWNED BY job_hire.job_post.jopo_id;


--
-- Name: talent_apply; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.talent_apply (
    taap_user_entity_id integer NOT NULL,
    taap_entity_id integer NOT NULL,
    taap_intro character varying(512),
    taap_scoring integer,
    taap_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    taap_status character varying(15),
    CONSTRAINT talent_apply_taap_status_check CHECK (((taap_status)::text = ANY ((ARRAY['interview'::character varying, 'failed'::character varying, 'succeed'::character varying])::text[])))
);


ALTER TABLE job_hire.talent_apply OWNER TO postgres;

--
-- Name: talent_apply_progress; Type: TABLE; Schema: job_hire; Owner: postgres
--

CREATE TABLE job_hire.talent_apply_progress (
    tapr_id integer NOT NULL,
    tapr_taap_user_entity_id integer NOT NULL,
    tapr_taap_entity_id integer NOT NULL,
    tapr_modified_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    tapr_status character varying(15),
    tapr_comment character varying(256),
    tapr_progress_name character varying(55),
    CONSTRAINT talent_apply_progress_tapr_status_check CHECK (((tapr_status)::text = ANY ((ARRAY['Open'::character varying, 'Waiting'::character varying, 'Done'::character varying, 'Cancelled'::character varying, 'Closed'::character varying])::text[])))
);


ALTER TABLE job_hire.talent_apply_progress OWNER TO postgres;

--
-- Name: talent_apply_progress_tapr_id_seq; Type: SEQUENCE; Schema: job_hire; Owner: postgres
--

CREATE SEQUENCE job_hire.talent_apply_progress_tapr_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_hire.talent_apply_progress_tapr_id_seq OWNER TO postgres;

--
-- Name: talent_apply_progress_tapr_id_seq; Type: SEQUENCE OWNED BY; Schema: job_hire; Owner: postgres
--

ALTER SEQUENCE job_hire.talent_apply_progress_tapr_id_seq OWNED BY job_hire.talent_apply_progress.tapr_id;


--
-- Name: client clit_id; Type: DEFAULT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.client ALTER COLUMN clit_id SET DEFAULT nextval('job_hire.client_clit_id_seq'::regclass);


--
-- Name: employee_range emra_id; Type: DEFAULT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.employee_range ALTER COLUMN emra_id SET DEFAULT nextval('job_hire.employee_range_emra_id_seq'::regclass);


--
-- Name: job_category joca_id; Type: DEFAULT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_category ALTER COLUMN joca_id SET DEFAULT nextval('job_hire.job_category_joca_id_seq'::regclass);


--
-- Name: job_photo jopho_id; Type: DEFAULT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_photo ALTER COLUMN jopho_id SET DEFAULT nextval('job_hire.job_photo_jopho_id_seq'::regclass);


--
-- Name: job_post jopo_id; Type: DEFAULT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post ALTER COLUMN jopo_id SET DEFAULT nextval('job_hire.job_post_jopo_id_seq'::regclass);


--
-- Name: talent_apply_progress tapr_id; Type: DEFAULT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply_progress ALTER COLUMN tapr_id SET DEFAULT nextval('job_hire.talent_apply_progress_tapr_id_seq'::regclass);


--
-- Data for Name: client; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.client (clit_id, clit_name, clit_about, clit_modified_date, clit_addr_id, clit_emra_id, clit_indu_code) FROM stdin;
3	PT. Astra International	About Client A	2023-06-09 01:40:46.627321+07	4	1	TECH
4	PT. Bulan Bintang	About Client B	2023-06-09 01:40:46.627321+07	5	2	FASH
\.


--
-- Data for Name: employee_range; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.employee_range (emra_id, emra_range_min, emra_range_max, emra_modified_date) FROM stdin;
1	1	50	2023-06-09 01:39:13.009704+07
2	50	1000	2023-06-09 01:39:13.009704+07
3	1000	5000	2023-06-09 01:39:13.009704+07
4	5000	10000	2023-06-11 02:44:26.66666+07
\.


--
-- Data for Name: job_category; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.job_category (joca_id, joca_name, joca_modified_date) FROM stdin;
1	Job Category 1	2023-06-09 02:03:29.06829+07
2	Job Category 2	2023-06-09 02:03:29.06829+07
3	Job Category 3	2023-06-09 02:03:29.06829+07
\.


--
-- Data for Name: job_photo; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.job_photo (jopho_id, jopho_filename, jopho_filesize, jopho_filetype, jopho_modified_date, jopho_entity_id) FROM stdin;
1	job_photo1.jpg	1024	png	2023-06-09 02:08:28.630485+07	9
2	job_photo1.jpg	1024	png	2023-06-09 02:08:28.630485+07	9
3	job_photo1.jpg	1024	jpeg	2023-06-10 07:59:35.725027+07	11
4	job_photo2.jpg	2048	jpeg	2023-06-10 07:59:35.725027+07	11
5	job_photo1.jpg	1024	jpeg	2023-06-10 08:50:52.300141+07	15
6	job_photo2.jpg	2048	jpeg	2023-06-10 08:50:52.300141+07	15
7	job_photo1.jpg	1024	jpeg	2023-06-10 09:56:12.988318+07	17
8	job_photo2.jpg	2048	jpeg	2023-06-10 09:56:12.988318+07	17
9	PT. Astra International-logo-astra.jpg	8684	\N	2023-06-10 11:28:06.32088+07	18
10	PT. Astra International-kantor1.jpg	27325	\N	2023-06-10 11:28:06.32088+07	18
11	PT. Astra International-kantor2.jpg	45468	\N	2023-06-10 11:28:06.32088+07	18
18	job_photo1.jpg	1024	jpeg	2023-06-10 12:33:40.067408+07	29
19	job_photo2.jpg	2048	jpeg	2023-06-10 12:33:40.067408+07	29
15	PT. Astra International-topi1.jpg	19778	jpeg	2023-06-10 12:55:01.226584+07	28
16	PT. Astra International-topi1.jpg	19778	jpeg	2023-06-10 12:55:01.226584+07	28
17	PT. Astra International-topi1.jpg	19778	jpeg	2023-06-10 12:55:01.226584+07	28
20	PT. Astra International-kaoswanita2.jpg	88687	jpeg	2023-06-10 16:00:10.081419+07	35
21	PT. Astra International-kaoswanita1.jpg	120733	jpeg	2023-06-10 16:00:10.081419+07	35
12	PT. Bulan Bintang-kemejamaroon.jpg	73703	jpeg	2023-06-10 16:16:27.020184+07	26
13	PT. Bulan Bintang-kemejamaroon.jpg	73703	jpeg	2023-06-10 16:16:27.020184+07	26
14	PT. Bulan Bintang-kemejamaroon.jpg	73703	jpeg	2023-06-10 16:16:27.020184+07	26
27	PT. Astra International-20230430_174543.jpg	2419911	jpeg	2023-06-11 01:03:54.492813+07	42
\.


--
-- Data for Name: job_post; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.job_post (jopo_entity_id, jopo_number, jopo_title, jopo_start_date, jopo_end_date, jopo_min_salary, jopo_max_salary, jopo_min_experience, jopo_max_experience, jopo_primary_skill, jopo_secondary_skill, jopo_publish_date, jopo_modified_date, jopo_emp_entity_id, jopo_clit_id, jopo_joro_id, jopo_joty_id, jopo_joca_id, jopo_addr_id, jopo_work_code, jopo_edu_code, jopo_status, jopo_id, jopo_open) FROM stdin;
9	J001	UI/UX Designer	2023-06-01	2023-06-30	300000	800000	0	3	Figma	Adobe	2023-05-31	2023-06-09 02:08:28.630485+07	2	3	1	1	1	4	FT	BS	publish	1	1
11	J005	Software Engineer	2023-06-01	2023-06-30	50000	80000	2	5	Java	SQL	2023-05-31	2023-06-10 07:59:35.725027+07	2	3	1	1	1	4	FT	BS	publish	3	1
42	J054	Jadi leader bukan ketua	2023-07-01	2023-07-31	1000000	10000000	4	7	JavaScript	SQL	\N	2023-06-11 01:03:54.492813+07	2	3	1	1	1	4	PT	BS	draft	31	0
15	J006	Software Engineer	2023-06-01	2023-06-30	50000	80000	2	5	Java	SQL	2023-06-10	2023-06-10 08:50:52.300141+07	2	3	1	1	1	4	FT	BS	publish	6	1
17	J007	Software Engineer	2023-06-01	2023-06-30	50000	80000	2	5	Java	SQL	2023-06-10	2023-06-10 09:56:12.988318+07	2	3	1	1	1	4	FT	BS	publish	8	1
18	J008	Node JS Developer	2023-07-01	2023-07-31	1000000	10000000	4	7	JavaScript	SQL	\N	2023-06-10 11:28:06.32088+07	2	3	1	1	1	4	PT	BS	draft	9	0
20	J009	Node JS Developer	2023-07-01	2023-07-31	1000000	10000000	4	7	JavaScript	SQL	\N	2023-06-10 11:41:40.103672+07	2	3	1	1	1	4	PT	BS	draft	11	0
24	J010	Node JS Developer	2023-07-01	2023-07-31	1000000	10000000	4	7	JavaScript	SQL	\N	2023-06-10 11:45:44.239043+07	2	3	1	1	1	4	PT	BS	draft	15	0
29	J013	Software Engineer	2023-06-01	2023-06-30	50000	80000	2	5	Java	SQL	\N	2023-06-10 12:33:40.067408+07	2	3	1	1	1	4	FT	BS	draft	20	1
28	J012	Update JS Developer	2023-07-01	2023-07-31	5000000	50000000	8	10	SQL	JavaScript	2023-06-10	2023-06-10 12:55:01.226584+07	2	3	1	1	1	4	FT	BS	publish	19	1
35	J050	Express JS Developer	2023-07-01	2023-07-31	1000000	10000000	4	7	JavaScript	SQL	\N	2023-06-10 16:00:10.081419+07	2	3	1	1	1	4	PT	BS	draft	26	0
26	J011	Update JS Developer	2023-07-01	2023-07-31	5000000	50000000	8	10	SQL	JavaScript	2023-06-10	2023-06-10 16:16:27.020184+07	2	4	1	1	1	4	FT	BS	publish	17	1
36	J049	Ketua kelompok lucknut	2023-07-01	2023-07-31	1000000	8000000	8	10	Tupperware	Hijau	2023-06-10	2023-06-10 23:26:58.713963+07	2	3	1	1	1	4	FT	BS	publish	27	1
\.


--
-- Data for Name: job_post_desc; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.job_post_desc (jopo_entity_id, jopo_description, jopo_responsibility, jopo_target, jopo_benefit) FROM stdin;
9	"This is a job description update."	"These are the job responsibilities update."	"This is the target for the job update."	"These are the job benefits update."
11	"This is a job description."	"These are the job responsibilities."	"This is the target for the job."	"These are the job benefits."
15	"This is a job description."	"These are the job responsibilities."	"This is the target for the job."	"These are the job benefits."
17	"This is a job description."	"These are the job responsibilities."	"This is the target for the job."	"These are the job benefits."
18	"Membuat program job_hire"	"Menjadi ketua sok sibuk"	{"jopo_min_experience":"4","jopo_primary_skill":"JavaScript"}	"Dapat makan, Main sama jaki"
20	"Membuat program job_hire"	"Menjadi ketua sok sibuk"	{"jopo_min_experience":"4","jopo_primary_skill":"JavaScript"}	"Dapat makan, Main sama jaki"
24	"Membuat program job_hire"	"Menjadi ketua sok sibuk"	{"jopo_min_experience":"4","jopo_primary_skill":"JavaScript"}	"Dapat makan, Main sama jaki"
29	"This is a job description."	"These are the job responsibilities."	"This is the target for the job."	"These are the job benefits."
28	"Membuat program job_hire"	"Menjadi ketua sok sibuk"	{"jopo_min_experience":"8","jopo_primary_skill":"SQL"}	"Dapat makan, Main sama jaki"
35	"Membuat program job_hire"	"Menjadi ketua sok sibuk"	{"jopo_min_experience":"4","jopo_primary_skill":"JavaScript"}	"Dapat makan, Main sama jaki"
26	"Membuat program job_hire"	"Menjadi ketua sok sibuk"	{"jopo_min_experience":"8","jopo_primary_skill":"SQL"}	"Dapat makan, Main sama jaki"
36	"Membuat program job_hire"	"Menjadi ketua sok sibuk"	{"jopo_min_experience":"8","jopo_primary_skill":"Tupperware"}	"Dapat makan, Main sama jaki"
42	"Membuat program job_hire"	"Menjadi ketua sok sibuk"	{"jopo_min_experience":"4","jopo_primary_skill":"JavaScript"}	"Dapat makan, Main sama jaki"
\.


--
-- Data for Name: talent_apply; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.talent_apply (taap_user_entity_id, taap_entity_id, taap_intro, taap_scoring, taap_modified_date, taap_status) FROM stdin;
\.


--
-- Data for Name: talent_apply_progress; Type: TABLE DATA; Schema: job_hire; Owner: postgres
--

COPY job_hire.talent_apply_progress (tapr_id, tapr_taap_user_entity_id, tapr_taap_entity_id, tapr_modified_date, tapr_status, tapr_comment, tapr_progress_name) FROM stdin;
\.


--
-- Name: client_clit_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.client_clit_id_seq', 4, true);


--
-- Name: employee_range_emra_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.employee_range_emra_id_seq', 4, true);


--
-- Name: job_category_joca_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.job_category_joca_id_seq', 3, true);


--
-- Name: job_photo_jopho_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.job_photo_jopho_id_seq', 30, true);


--
-- Name: job_post_jopo_entity_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.job_post_jopo_entity_id_seq', 1, false);


--
-- Name: job_post_jopo_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.job_post_jopo_id_seq', 35, true);


--
-- Name: talent_apply_progress_tapr_id_seq; Type: SEQUENCE SET; Schema: job_hire; Owner: postgres
--

SELECT pg_catalog.setval('job_hire.talent_apply_progress_tapr_id_seq', 1, false);


--
-- Name: client client_clit_name_key; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.client
    ADD CONSTRAINT client_clit_name_key UNIQUE (clit_name);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (clit_id);


--
-- Name: employee_range employee_range_emra_range_max_key; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.employee_range
    ADD CONSTRAINT employee_range_emra_range_max_key UNIQUE (emra_range_max);


--
-- Name: employee_range employee_range_emra_range_min_key; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.employee_range
    ADD CONSTRAINT employee_range_emra_range_min_key UNIQUE (emra_range_min);


--
-- Name: employee_range employee_range_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.employee_range
    ADD CONSTRAINT employee_range_pkey PRIMARY KEY (emra_id);


--
-- Name: job_category job_category_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_category
    ADD CONSTRAINT job_category_pkey PRIMARY KEY (joca_id);


--
-- Name: job_photo job_photo_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_photo
    ADD CONSTRAINT job_photo_pkey PRIMARY KEY (jopho_id);


--
-- Name: job_post_desc job_post_desc_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post_desc
    ADD CONSTRAINT job_post_desc_pkey PRIMARY KEY (jopo_entity_id);


--
-- Name: job_post job_post_jopo_number_key; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_number_key UNIQUE (jopo_number);


--
-- Name: job_post job_post_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_pkey PRIMARY KEY (jopo_entity_id);


--
-- Name: talent_apply talent_apply_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply
    ADD CONSTRAINT talent_apply_pkey PRIMARY KEY (taap_user_entity_id, taap_entity_id);


--
-- Name: talent_apply_progress talent_apply_progress_pkey; Type: CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply_progress
    ADD CONSTRAINT talent_apply_progress_pkey PRIMARY KEY (tapr_id, tapr_taap_user_entity_id, tapr_taap_entity_id);


--
-- Name: job_photo trg_jopho_update_modified_date; Type: TRIGGER; Schema: job_hire; Owner: postgres
--

CREATE TRIGGER trg_jopho_update_modified_date BEFORE UPDATE ON job_hire.job_photo FOR EACH ROW EXECUTE FUNCTION job_hire.update_jopho_modified_date();


--
-- Name: job_post trg_jopo_update_modified_date; Type: TRIGGER; Schema: job_hire; Owner: postgres
--

CREATE TRIGGER trg_jopo_update_modified_date BEFORE UPDATE ON job_hire.job_post FOR EACH ROW EXECUTE FUNCTION job_hire.update_jopo_modified_date();


--
-- Name: job_post trigger_update_jopo_publish_date; Type: TRIGGER; Schema: job_hire; Owner: postgres
--

CREATE TRIGGER trigger_update_jopo_publish_date BEFORE UPDATE OF jopo_status ON job_hire.job_post FOR EACH ROW EXECUTE FUNCTION job_hire.update_jopo_publish_date();


--
-- Name: client client_clit_addr_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.client
    ADD CONSTRAINT client_clit_addr_id_fkey FOREIGN KEY (clit_addr_id) REFERENCES master.address(addr_id);


--
-- Name: client client_clit_emra_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.client
    ADD CONSTRAINT client_clit_emra_id_fkey FOREIGN KEY (clit_emra_id) REFERENCES job_hire.employee_range(emra_id);


--
-- Name: client client_clit_indu_code_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.client
    ADD CONSTRAINT client_clit_indu_code_fkey FOREIGN KEY (clit_indu_code) REFERENCES master.industry(indu_code) NOT VALID;


--
-- Name: job_photo job_photo_jopho_entity_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_photo
    ADD CONSTRAINT job_photo_jopho_entity_id_fkey FOREIGN KEY (jopho_entity_id) REFERENCES job_hire.job_post(jopo_entity_id);


--
-- Name: job_post_desc job_post_desc_jopo_entity_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post_desc
    ADD CONSTRAINT job_post_desc_jopo_entity_id_fkey FOREIGN KEY (jopo_entity_id) REFERENCES job_hire.job_post(jopo_entity_id);


--
-- Name: job_post job_post_jopo_addr_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_addr_id_fkey FOREIGN KEY (jopo_addr_id) REFERENCES master.address(addr_id);


--
-- Name: job_post job_post_jopo_clit_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_clit_id_fkey FOREIGN KEY (jopo_clit_id) REFERENCES job_hire.client(clit_id);


--
-- Name: job_post job_post_jopo_edu_code_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_edu_code_fkey FOREIGN KEY (jopo_edu_code) REFERENCES master.education(edu_code);


--
-- Name: job_post job_post_jopo_emp_entity_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_emp_entity_id_fkey FOREIGN KEY (jopo_emp_entity_id) REFERENCES hr.employee(emp_entity_id);


--
-- Name: job_post job_post_jopo_entity_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_entity_id_fkey FOREIGN KEY (jopo_entity_id) REFERENCES users.business_entity(entity_id);


--
-- Name: job_post job_post_jopo_joca_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_joca_id_fkey FOREIGN KEY (jopo_joca_id) REFERENCES job_hire.job_category(joca_id);


--
-- Name: job_post job_post_jopo_joro_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_joro_id_fkey FOREIGN KEY (jopo_joro_id) REFERENCES master.job_role(joro_id);


--
-- Name: job_post job_post_jopo_joty_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_joty_id_fkey FOREIGN KEY (jopo_joty_id) REFERENCES master.job_type(joty_id);


--
-- Name: job_post job_post_jopo_status_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_status_fkey FOREIGN KEY (jopo_status) REFERENCES master.status(status);


--
-- Name: job_post job_post_jopo_work_code_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.job_post
    ADD CONSTRAINT job_post_jopo_work_code_fkey FOREIGN KEY (jopo_work_code) REFERENCES master.working_type(woty_code);


--
-- Name: talent_apply_progress talent_apply_progress_tapr_progress_name_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply_progress
    ADD CONSTRAINT talent_apply_progress_tapr_progress_name_fkey FOREIGN KEY (tapr_progress_name) REFERENCES master.route_actions(roac_name) NOT VALID;


--
-- Name: talent_apply_progress talent_apply_progress_tapr_status_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply_progress
    ADD CONSTRAINT talent_apply_progress_tapr_status_fkey FOREIGN KEY (tapr_status) REFERENCES master.status(status);


--
-- Name: talent_apply_progress talent_apply_progress_tapr_taap_user_entity_id_tapr_taap_e_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply_progress
    ADD CONSTRAINT talent_apply_progress_tapr_taap_user_entity_id_tapr_taap_e_fkey FOREIGN KEY (tapr_taap_user_entity_id, tapr_taap_entity_id) REFERENCES job_hire.talent_apply(taap_user_entity_id, taap_entity_id);


--
-- Name: talent_apply talent_apply_taap_entity_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply
    ADD CONSTRAINT talent_apply_taap_entity_id_fkey FOREIGN KEY (taap_entity_id) REFERENCES job_hire.job_post(jopo_entity_id);


--
-- Name: talent_apply talent_apply_taap_status_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply
    ADD CONSTRAINT talent_apply_taap_status_fkey FOREIGN KEY (taap_status) REFERENCES master.status(status);


--
-- Name: talent_apply talent_apply_taap_user_entity_id_fkey; Type: FK CONSTRAINT; Schema: job_hire; Owner: postgres
--

ALTER TABLE ONLY job_hire.talent_apply
    ADD CONSTRAINT talent_apply_taap_user_entity_id_fkey FOREIGN KEY (taap_user_entity_id) REFERENCES users.users(user_entity_id);


--
-- PostgreSQL database dump complete
--

