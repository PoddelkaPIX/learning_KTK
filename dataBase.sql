--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-04-24 14:01:31

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 232 (class 1259 OID 17735)
-- Name: Admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admin" (
    "Id" integer NOT NULL,
    "Login" character varying NOT NULL,
    "Password" character varying NOT NULL
);


ALTER TABLE public."Admin" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 17734)
-- Name: Admin_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Admin_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Admin_Id_seq" OWNER TO postgres;

--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 231
-- Name: Admin_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Admin_Id_seq" OWNED BY public."Admin"."Id";


--
-- TOC entry 222 (class 1259 OID 17649)
-- Name: Direction_study_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Direction_study_list" (
    "Id" integer NOT NULL,
    "Direction" character varying(255) NOT NULL
);


ALTER TABLE public."Direction_study_list" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 17648)
-- Name: Direction_study_list_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Direction_study_list_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Direction_study_list_Id_seq" OWNER TO postgres;

--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 221
-- Name: Direction_study_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Direction_study_list_Id_seq" OWNED BY public."Direction_study_list"."Id";


--
-- TOC entry 220 (class 1259 OID 17642)
-- Name: Program_level_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Program_level_list" (
    "Id" integer NOT NULL,
    "Level" character varying(255) NOT NULL
);


ALTER TABLE public."Program_level_list" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17641)
-- Name: Program_level_list_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Program_level_list_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Program_level_list_Id_seq" OWNER TO postgres;

--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 219
-- Name: Program_level_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Program_level_list_Id_seq" OWNED BY public."Program_level_list"."Id";


--
-- TOC entry 233 (class 1259 OID 17748)
-- Name: Education_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Education_list" (
    "Id" integer DEFAULT nextval('public."Program_level_list_Id_seq"'::regclass) NOT NULL,
    "Education" character varying NOT NULL
);


ALTER TABLE public."Education_list" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17656)
-- Name: Issued_document_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Issued_document_list" (
    "Id" integer NOT NULL,
    "Document" character varying(255) NOT NULL
);


ALTER TABLE public."Issued_document_list" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17655)
-- Name: Issued_document_list_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Issued_document_list_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Issued_document_list_Id_seq" OWNER TO postgres;

--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 223
-- Name: Issued_document_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Issued_document_list_Id_seq" OWNED BY public."Issued_document_list"."Id";


--
-- TOC entry 210 (class 1259 OID 17588)
-- Name: Listener; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Listener" (
    "Id" integer NOT NULL,
    "Surname" character varying(255) NOT NULL,
    "Name" character varying(255) NOT NULL,
    "Patronymic" character varying(255) NOT NULL,
    "Telephone" character varying(255) NOT NULL,
    "Education" character varying(255) NOT NULL,
    "Program_id" integer NOT NULL,
    "Email" character varying(255) NOT NULL,
    "Registration_date" character varying(255) NOT NULL,
    "Birth_date" character varying(255) NOT NULL,
    "Status_id" integer NOT NULL,
    "Snils" character varying NOT NULL
);


ALTER TABLE public."Listener" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17677)
-- Name: Listener_status_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Listener_status_list" (
    "Id" integer NOT NULL,
    "Status" character varying(255) NOT NULL
);


ALTER TABLE public."Listener_status_list" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 17676)
-- Name: Listener_status_list_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Listener_status_list_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Listener_status_list_Id_seq" OWNER TO postgres;

--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 229
-- Name: Listener_status_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Listener_status_list_Id_seq" OWNED BY public."Listener_status_list"."Id";


--
-- TOC entry 209 (class 1259 OID 17587)
-- Name: Listeners_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Listeners_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Listeners_Id_seq" OWNER TO postgres;

--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 209
-- Name: Listeners_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Listeners_Id_seq" OWNED BY public."Listener"."Id";


--
-- TOC entry 218 (class 1259 OID 17633)
-- Name: Place_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Place_list" (
    "Id" integer NOT NULL,
    "Place" text NOT NULL
);


ALTER TABLE public."Place_list" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 17632)
-- Name: Place_list_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Place_list_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Place_list_Id_seq" OWNER TO postgres;

--
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 217
-- Name: Place_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Place_list_Id_seq" OWNED BY public."Place_list"."Id";


--
-- TOC entry 212 (class 1259 OID 17597)
-- Name: Program_passport; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Program_passport" (
    "Id" integer NOT NULL,
    "Title" character varying(255) NOT NULL,
    "Level_id" integer NOT NULL,
    "Type_id" integer NOT NULL,
    "Direction_study_id" integer NOT NULL,
    "Training_form_id" integer NOT NULL,
    "Size" character varying(255) NOT NULL,
    "Length" character varying(255) NOT NULL,
    "Price" character varying(255) NOT NULL,
    "Place_id" integer NOT NULL,
    "Minimum_group_size" character varying(255) NOT NULL,
    "Start_date" character varying(255) DEFAULT 'По мере набора группы'::character varying,
    "Time_period" character varying(255) DEFAULT ''::character varying,
    "Issued_document_id" integer NOT NULL,
    "Requirement_id" integer NOT NULL,
    "Status_id" integer NOT NULL
);


ALTER TABLE public."Program_passport" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 17596)
-- Name: Program_passport_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Program_passport_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Program_passport_Id_seq" OWNER TO postgres;

--
-- TOC entry 3451 (class 0 OID 0)
-- Dependencies: 211
-- Name: Program_passport_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Program_passport_Id_seq" OWNED BY public."Program_passport"."Id";


--
-- TOC entry 228 (class 1259 OID 17670)
-- Name: Program_status_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Program_status_list" (
    "Id" integer NOT NULL,
    "Status" character varying(255) NOT NULL
);


ALTER TABLE public."Program_status_list" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 17669)
-- Name: Program_status_list_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Program_status_list_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Program_status_list_Id_seq" OWNER TO postgres;

--
-- TOC entry 3452 (class 0 OID 0)
-- Dependencies: 227
-- Name: Program_status_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Program_status_list_Id_seq" OWNED BY public."Program_status_list"."Id";


--
-- TOC entry 226 (class 1259 OID 17663)
-- Name: Requirements_listeners_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Requirements_listeners_list" (
    "Id" integer NOT NULL,
    "Requirement" character varying NOT NULL,
    "Reduction" character varying DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public."Requirements_listeners_list" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 17662)
-- Name: Requirements_listeners_list_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Requirements_listeners_list_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Requirements_listeners_list_Id_seq" OWNER TO postgres;

--
-- TOC entry 3453 (class 0 OID 0)
-- Dependencies: 225
-- Name: Requirements_listeners_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Requirements_listeners_list_Id_seq" OWNED BY public."Requirements_listeners_list"."Id";


--
-- TOC entry 216 (class 1259 OID 17624)
-- Name: Training_form_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Training_form_list" (
    "Id" integer NOT NULL,
    "Training_form" text NOT NULL,
    "Reduction" character varying DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public."Training_form_list" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 17623)
-- Name: Training_form_list_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Training_form_list_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Training_form_list_Id_seq" OWNER TO postgres;

--
-- TOC entry 3454 (class 0 OID 0)
-- Dependencies: 215
-- Name: Training_form_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Training_form_list_Id_seq" OWNED BY public."Training_form_list"."Id";


--
-- TOC entry 214 (class 1259 OID 17615)
-- Name: Type_program_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Type_program_list" (
    "Id" integer NOT NULL,
    "Type" text NOT NULL
);


ALTER TABLE public."Type_program_list" OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 17614)
-- Name: Type_program_list_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Type_program_list_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Type_program_list_Id_seq" OWNER TO postgres;

--
-- TOC entry 3455 (class 0 OID 0)
-- Dependencies: 213
-- Name: Type_program_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Type_program_list_Id_seq" OWNED BY public."Type_program_list"."Id";


--
-- TOC entry 3238 (class 2604 OID 17738)
-- Name: Admin Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin" ALTER COLUMN "Id" SET DEFAULT nextval('public."Admin_Id_seq"'::regclass);


--
-- TOC entry 3232 (class 2604 OID 17652)
-- Name: Direction_study_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Direction_study_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Direction_study_list_Id_seq"'::regclass);


--
-- TOC entry 3233 (class 2604 OID 17659)
-- Name: Issued_document_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Issued_document_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Issued_document_list_Id_seq"'::regclass);


--
-- TOC entry 3223 (class 2604 OID 17591)
-- Name: Listener Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listener" ALTER COLUMN "Id" SET DEFAULT nextval('public."Listeners_Id_seq"'::regclass);


--
-- TOC entry 3237 (class 2604 OID 17680)
-- Name: Listener_status_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listener_status_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Listener_status_list_Id_seq"'::regclass);


--
-- TOC entry 3230 (class 2604 OID 17636)
-- Name: Place_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Place_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Place_list_Id_seq"'::regclass);


--
-- TOC entry 3231 (class 2604 OID 17645)
-- Name: Program_level_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_level_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Program_level_list_Id_seq"'::regclass);


--
-- TOC entry 3224 (class 2604 OID 17600)
-- Name: Program_passport Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport" ALTER COLUMN "Id" SET DEFAULT nextval('public."Program_passport_Id_seq"'::regclass);


--
-- TOC entry 3236 (class 2604 OID 17673)
-- Name: Program_status_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_status_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Program_status_list_Id_seq"'::regclass);


--
-- TOC entry 3234 (class 2604 OID 17666)
-- Name: Requirements_listeners_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Requirements_listeners_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Requirements_listeners_list_Id_seq"'::regclass);


--
-- TOC entry 3228 (class 2604 OID 17627)
-- Name: Training_form_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Training_form_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Training_form_list_Id_seq"'::regclass);


--
-- TOC entry 3227 (class 2604 OID 17618)
-- Name: Type_program_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Type_program_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Type_program_list_Id_seq"'::regclass);


--
-- TOC entry 3437 (class 0 OID 17735)
-- Dependencies: 232
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Admin" ("Id", "Login", "Password") VALUES (1, 'Admin', '621a877ed852dd47bb5ef134fd1eb14c1b212b329f3542e7a56ac2c6376d567e');


--
-- TOC entry 3427 (class 0 OID 17649)
-- Dependencies: 222
-- Data for Name: Direction_study_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Direction_study_list" ("Id", "Direction") VALUES (1, 'Сфера услуг');
INSERT INTO public."Direction_study_list" ("Id", "Direction") VALUES (2, 'Офисная деятельность, делопроизводство');
INSERT INTO public."Direction_study_list" ("Id", "Direction") VALUES (3, 'Информационные технологии ');
INSERT INTO public."Direction_study_list" ("Id", "Direction") VALUES (4, 'Производство и промышленност');
INSERT INTO public."Direction_study_list" ("Id", "Direction") VALUES (5, 'Транспорт и логистика');
INSERT INTO public."Direction_study_list" ("Id", "Direction") VALUES (6, 'Радиоэлектроника');
INSERT INTO public."Direction_study_list" ("Id", "Direction") VALUES (7, 'Электротехника и энергетика');
INSERT INTO public."Direction_study_list" ("Id", "Direction") VALUES (8, 'Механизированное промышленное производство');
INSERT INTO public."Direction_study_list" ("Id", "Direction") VALUES (9, 'Производство и инженерные технологии');
INSERT INTO public."Direction_study_list" ("Id", "Direction") VALUES (10, 'Сельское хозяйство');


--
-- TOC entry 3438 (class 0 OID 17748)
-- Dependencies: 233
-- Data for Name: Education_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Education_list" ("Id", "Education") VALUES (5, 'Основное общее образование');
INSERT INTO public."Education_list" ("Id", "Education") VALUES (6, 'Среднее общее образование');
INSERT INTO public."Education_list" ("Id", "Education") VALUES (7, 'Среднее профессиональное образование');
INSERT INTO public."Education_list" ("Id", "Education") VALUES (8, 'Высшее образование');


--
-- TOC entry 3429 (class 0 OID 17656)
-- Dependencies: 224
-- Data for Name: Issued_document_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Issued_document_list" ("Id", "Document") VALUES (1, 'Свидетельство о профессии рабочего, должности служащего');
INSERT INTO public."Issued_document_list" ("Id", "Document") VALUES (2, 'Свидетельство о профессии водителя');
INSERT INTO public."Issued_document_list" ("Id", "Document") VALUES (3, 'Свидетельство о прохождении обучения на право управления самоходными машинами');
INSERT INTO public."Issued_document_list" ("Id", "Document") VALUES (4, 'Диплом о профессиональной переподготовке с присвоением новой квалификации');


--
-- TOC entry 3415 (class 0 OID 17588)
-- Dependencies: 210
-- Data for Name: Listener; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (32, 'Сеногноев', 'Артём', 'Владимирович', '4263348o545', 'Среднее профессиональное образование', 6, 'sgjajkagkjk@mail.ru', '2022-03-29 19:43:33', '2022-03-24', 1, '2345732');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (65, 'Бородин', 'Максим', 'Потапов', '+78909353636', 'Основное общее образование', 22, 'potap@mail.ru', '2022-04-21 10:04:18', '2018-01-09', 2, '98779897896');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (40, 'Кириешко', 'Иван', 'Андреевич', '89094636363', 'Среднее профессиональное образование', 19, 'kirieshka@gmail.com', '2022-04-12 17:55:40', '2009-06-17', 2, '45463272');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (66, 'Патютько', 'Наталья', 'Сергеевна', '88890990562', 'Высшее образование', 22, 'paputco@mail.ru', '2022-04-21 10:04:52', '2022-04-01', 2, '25734883246');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (38, 'Бородин', 'Максим', 'Потапов', '8909353636', 'Среднее общее образование', 10, 'potap@mail.ru', '2022-04-12 15:30:59', '1999-06-23', 1, '747364327');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (22, 'Молочков', 'Никита', 'Сергеевич', '8909433626', 'Среднее профессиональное образование', 3, 'вымяавп2,madfsf@.ru', '2022-03-25 11:28:55', '2003-01-06', 2, '21446538437');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (23, 'Попков', 'Дмитрий', 'Романович', '89092345625', 'Начальное общее образование', 3, 'aqwertt@mail.ru', '2021-03-25 10:28:55', '2001-01-06', 2, '236436843');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (27, 'Мухаметов', 'Станислав', 'Олегович', '8909314151', 'Высшее образование', 5, 'papapapap@gmail.com', '2022-03-25 15:15:27', '2001-02-13', 2, '976543224363');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (36, 'Казёлов', 'Артём', 'Васильевич', '89094633264', 'Высшее образование', 7, 'sssssssssss@mail.ru', '2022-04-09 18:00:53', '2002-05-17', 2, '6486542513');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (37, 'Васильев', 'Василий', 'Васильевич', '8909346543', 'Среднее общее образование', 7, 'vasiliev@mail.ru', '2022-04-09 20:54:26', '2012-07-11', 2, '84326783');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (24, 'Грязнов', 'Станислав', 'Олегович', '8908313451', 'Высшее образование', 5, 'ffffpap@gmail.com', '2022-03-25 15:15:27', '2001-02-13', 2, '976543224363');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (35, 'Дементьев', 'Владислав', 'Станиславович', '890924256266', 'Среднее профессиональное образование', 7, 'dementiev@gmail.com', '2022-04-05 10:16:46', '2001-06-21', 2, '56715195635');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (34, 'Москаленко', 'Максим', 'Матвеевич', '+73924249596', 'Среднее профессиональное образование', 7, 'pix333364@mail.ru', '2022-04-02 14:25:59', '2005-07-14', 2, '25734883246');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (42, 'Папук', 'Глеб', 'Потапов', '8909235251168', 'Основное общее образование', 21, 'popuc@email.ru', '2022-04-16 20:12:53', '2022-04-14', 2, '5674532');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (25, 'Сёмкин', 'Станислав', 'Олегович', '8909144156', 'Высшее образование', 5, 'baagaggapap@gmail.com', '2022-03-25 15:15:27', '2001-02-13', 2, '976543224363');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (39, 'Деревянко', 'Андрей', 'Сергеевич', '+79923850591', 'Основное общее образование', 8, 'sgdgsfaa@list.ru', '2022-04-12 16:53:09', '1997-07-16', 3, '6837422346');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (41, 'Патютько', 'Наталья', 'Сергеевна', '8890990562', 'Высшее образование', 33, 'paputco@mail.ru', '2022-04-16 19:48:09', '1997-02-05', 3, '54673422');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (64, 'Лукошенко', 'Максим', 'Викторович', '+78909353636', 'Среднее общее образование', 21, 'luk@mail.ru', '2022-04-20 11:55:26', '2007-02-08', 2, '25734883246');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (63, 'Бородин', 'Максим', 'Потапов', '+78909353636', 'Основное общее образование', 21, 'potap@mail.ru', '2022-04-20 10:28:13', '2022-02-01', 2, '56715195635');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (67, 'Лапух', 'Петя', 'Иванов', '+78909353636', 'Среднее общее образование', 24, 'LAPUH@email.ru', '2022-04-21 10:06:12', '2022-04-08', 3, '56715195635');
INSERT INTO public."Listener" ("Id", "Surname", "Name", "Patronymic", "Telephone", "Education", "Program_id", "Email", "Registration_date", "Birth_date", "Status_id", "Snils") VALUES (26, 'Власов', 'Кирилл', 'Олегович', '8990574345', 'Среднее общее образование', 3, 'sdfhsgdsfg@gmail.com', '2022-03-25 15:15:27', '2001-02-02', 2, '976543224363');


--
-- TOC entry 3435 (class 0 OID 17677)
-- Dependencies: 230
-- Data for Name: Listener_status_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Listener_status_list" ("Id", "Status") VALUES (1, 'Waiting');
INSERT INTO public."Listener_status_list" ("Id", "Status") VALUES (2, 'Learning');
INSERT INTO public."Listener_status_list" ("Id", "Status") VALUES (3, 'Learned');
INSERT INTO public."Listener_status_list" ("Id", "Status") VALUES (4, 'Leaved');
INSERT INTO public."Listener_status_list" ("Id", "Status") VALUES (5, 'interrupted');


--
-- TOC entry 3423 (class 0 OID 17633)
-- Dependencies: 218
-- Data for Name: Place_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Place_list" ("Id", "Place") VALUES (1, 'г. Курган, пр. Конституции, 68');
INSERT INTO public."Place_list" ("Id", "Place") VALUES (2, 'г. Курган, пр. Машиностроителей, 14');
INSERT INTO public."Place_list" ("Id", "Place") VALUES (3, 'г. Курган, ул. Автозаводская, 3');
INSERT INTO public."Place_list" ("Id", "Place") VALUES (4, 'Курганская область, Кетовский район, с. Шмаково, ул. Рабочая, 20');
INSERT INTO public."Place_list" ("Id", "Place") VALUES (5, 'Курганская область, с. Шатрово, ул. 30 лет Победы, 1');


--
-- TOC entry 3425 (class 0 OID 17642)
-- Dependencies: 220
-- Data for Name: Program_level_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Program_level_list" ("Id", "Level") VALUES (1, 'Программа профессионального обучения');
INSERT INTO public."Program_level_list" ("Id", "Level") VALUES (2, 'Дополнительная профессиональная программа');


--
-- TOC entry 3417 (class 0 OID 17597)
-- Dependencies: 212
-- Data for Name: Program_passport; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (33, 'Секретарь-машинистка', 1, 1, 2, 2, '288 часов', '2 месяца', '10000 руб.', 2, '5 человек', '2022-04-20', '', 1, 13, 3);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (37, 'Диспетчер автомобильного и городского наземного электрического транспорта', 2, 2, 5, 2, '256 часов', '2 месяца', '13000 руб.', 3, '5 человек', 'По мере набора группы', '', 4, 19, 2);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (21, 'Диспетчер автомобильного и городского наземного электрического транспорта', 2, 2, 5, 2, '256 часов', '2 месяца', '13000 руб.', 3, '5 человек', '2022-04-20', '', 4, 19, 1);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (38, 'Портной', 1, 1, 1, 1, '432 часа', '3 месяца', '15000 руб.', 1, '5 человек', 'По мере набора группы', '', 1, 13, 2);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (24, 'Портной', 1, 1, 1, 1, '432 часа', '3 месяца', '15000 руб.', 1, '5 человек', '2022-04-21', '2022-04-21', 1, 13, 3);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (3, 'Закройщик', 1, 1, 1, 1, '432 часа ', '3 месяца', '16200 руб', 1, '5 человек', '2022-04-14', '', 1, 13, 1);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (39, 'aaaaaaa', 1, 1, 6, 1, 'укпур', 'упуп', '88888', 1, '12', '', '2022-04-21', 1, 14, 4);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (40, 'Закройщик', 1, 1, 1, 1, '432 часа ', '3 месяца', '16200 руб', 1, '5 человек', 'По мере набора группы', '', 1, 13, 2);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (22, 'Закройщик', 1, 1, 1, 1, '432 часа ', '3 месяца', '16200 руб', 1, '5 человек', '2022-04-21', '', 1, 13, 1);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (5, 'Тракторист', 1, 1, 2, 1, '206 часов', '2 месяца', '300 руб', 2, '2 человека', '2022-04-14', '', 2, 13, 1);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (7, 'Портной', 1, 1, 1, 1, '432 часа', '3 месяца', '15000 руб.', 1, '5 человек', '2022-04-14', '', 1, 13, 1);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (23, 'Тракторист', 1, 1, 2, 1, '206 часов', '2 месяца', '300 руб', 2, '2 человека', 'По мере набора группы', '', 2, 13, 2);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (32, 'Швея', 1, 1, 1, 1, '160 часов', '1 месяц', '6000 руб.', 1, '8 человек', '', '', 1, 13, 2);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (34, 'Специалист по маникюру', 1, 1, 1, 1, '144 часа', '1 месяц', '6500 руб.', 1, '7 человек', '', '', 1, 11, 2);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (35, 'Специалист по педикюру', 1, 1, 1, 1, '144 часа', '1 месяц', '6500 руб.', 1, '7 человек', '', '', 1, 11, 2);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (36, 'Секретарь-машинистка', 1, 1, 2, 2, '288 часов', '2 месяца', '10000 руб.', 2, '5 человек', '', '', 1, 13, 2);
INSERT INTO public."Program_passport" ("Id", "Title", "Level_id", "Type_id", "Direction_study_id", "Training_form_id", "Size", "Length", "Price", "Place_id", "Minimum_group_size", "Start_date", "Time_period", "Issued_document_id", "Requirement_id", "Status_id") VALUES (8, 'Диспетчер автомобильного и городского наземного электрического транспорта', 2, 2, 5, 2, '256 часов', '2 месяца', '13000 руб.', 3, '5 человек', '2022-04-14', '2022-04-20', 4, 19, 3);


--
-- TOC entry 3433 (class 0 OID 17670)
-- Dependencies: 228
-- Data for Name: Program_status_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Program_status_list" ("Id", "Status") VALUES (1, 'Active');
INSERT INTO public."Program_status_list" ("Id", "Status") VALUES (4, 'Close');
INSERT INTO public."Program_status_list" ("Id", "Status") VALUES (3, 'Finished');
INSERT INTO public."Program_status_list" ("Id", "Status") VALUES (2, 'Open');


--
-- TOC entry 3431 (class 0 OID 17663)
-- Dependencies: 226
-- Data for Name: Requirements_listeners_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Requirements_listeners_list" ("Id", "Requirement", "Reduction") VALUES (11, 'Целевая аудитория курса – лица от 15 лет и старше, без предъявления требований к уровню образования.', 'от 15 лет и старше, без предъявления требований к уровню образования.');
INSERT INTO public."Requirements_listeners_list" ("Id", "Requirement", "Reduction") VALUES (12, 'Целевая аудитория курса – лица от 16 лет и старше, без предъявления требований к уровню образования.', 'от 16 лет и старше, без предъявления требований к уровню образования.');
INSERT INTO public."Requirements_listeners_list" ("Id", "Requirement", "Reduction") VALUES (13, 'Целевая аудитория курса – лица от 17 лет и старше, без предъявления требований к уровню образования.', 'от 17 лет и старше, без предъявления требований к уровню образования.');
INSERT INTO public."Requirements_listeners_list" ("Id", "Requirement", "Reduction") VALUES (14, 'Целевая аудитория курса – лица от 18 лет и старше, без предъявления требований к уровню образования. ', 'от 18 лет и старше, без предъявления требований к уровню образования. ');
INSERT INTO public."Requirements_listeners_list" ("Id", "Requirement", "Reduction") VALUES (15, 'Целевая аудитория курса – лица от 16 лет и старше, без предъявления требований к уровню образования. Возраст для получения права на управление транспортным средством категории «C» - 18 лет.', 'от 16 лет и старше, без предъявления требований к уровню образования. Управление ТС категории «C» - 18 лет.');
INSERT INTO public."Requirements_listeners_list" ("Id", "Requirement", "Reduction") VALUES (16, 'Целевая аудитория курса – лица от 17 лет и старше, без предъявления требований к уровню образования. Удостоверение тракториста - машиниста (тракториста) выдается после сдачи в государственной инспекции гостехнадзора экзаменов на право управления самоходными машинами', 'от 17 лет и старше, без предъявления требований к уровню образования. Удостоверение тракториста - машиниста (тракториста)');
INSERT INTO public."Requirements_listeners_list" ("Id", "Requirement", "Reduction") VALUES (17, 'Целевая аудитория курса – лица от 18 лет и старше, без предъявления требований к уровню образования. Удостоверение тракториста - машиниста (тракториста) выдается после сдачи в государственной инспекции гостехнадзора экзаменов на право управления самоходными машинами', 'от 18 лет и старше, без предъявления требований к уровню образования. Удостоверение тракториста - машиниста (тракториста)');
INSERT INTO public."Requirements_listeners_list" ("Id", "Requirement", "Reduction") VALUES (18, 'Целевая аудитория курса – лица от 16 лет и старше, без предъявления требований к уровню образования. Удостоверение тракториста  - машиниста (тракториста) выдается после сдачи в государственной инспекции гостехнадзора экзаменов на право управления самоходными машинами', 'от 16 лет и старше, без предъявления требований к уровню образования. Удостоверение тракториста - машиниста (тракториста)');
INSERT INTO public."Requirements_listeners_list" ("Id", "Requirement", "Reduction") VALUES (19, 'Целевая аудитория курса – лица, имеющие среднее профессиональное и (или) высшее образование; лица, получающие среднее профессиональное и (или) высшее образование', '');


--
-- TOC entry 3421 (class 0 OID 17624)
-- Dependencies: 216
-- Data for Name: Training_form_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Training_form_list" ("Id", "Training_form", "Reduction") VALUES (1, 'Реализация программы осуществляется преимущественно в очной форме обучения (возможно применение дистанционных образовательных технологий при изучении теоретической составляющей курса). ', 'Очно/Дистанционно при изучении теоретической составляющей курса');
INSERT INTO public."Training_form_list" ("Id", "Training_form", "Reduction") VALUES (2, 'Реализация программы осуществляется преимущественно в очной форме обучения Возможно применение дистанционных образовательных технологий как по отдельным дисциплинам (модулям) учебного плана, так и по всей программе в целом.', 'Очно/Дистанционно как по отдельным дисциплинам (модулям) учебного плана, так и по всей программе в целом');


--
-- TOC entry 3419 (class 0 OID 17615)
-- Dependencies: 214
-- Data for Name: Type_program_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Type_program_list" ("Id", "Type") VALUES (1, 'Программа профессиональной подготовки');
INSERT INTO public."Type_program_list" ("Id", "Type") VALUES (2, 'Программа профессиональной переподготовки');
INSERT INTO public."Type_program_list" ("Id", "Type") VALUES (3, 'Программа повышения квалификаци');


--
-- TOC entry 3456 (class 0 OID 0)
-- Dependencies: 231
-- Name: Admin_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Admin_Id_seq"', 1, true);


--
-- TOC entry 3457 (class 0 OID 0)
-- Dependencies: 221
-- Name: Direction_study_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Direction_study_list_Id_seq"', 10, true);


--
-- TOC entry 3458 (class 0 OID 0)
-- Dependencies: 223
-- Name: Issued_document_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Issued_document_list_Id_seq"', 4, true);


--
-- TOC entry 3459 (class 0 OID 0)
-- Dependencies: 229
-- Name: Listener_status_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Listener_status_list_Id_seq"', 5, true);


--
-- TOC entry 3460 (class 0 OID 0)
-- Dependencies: 209
-- Name: Listeners_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Listeners_Id_seq"', 67, true);


--
-- TOC entry 3461 (class 0 OID 0)
-- Dependencies: 217
-- Name: Place_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Place_list_Id_seq"', 5, true);


--
-- TOC entry 3462 (class 0 OID 0)
-- Dependencies: 219
-- Name: Program_level_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Program_level_list_Id_seq"', 8, true);


--
-- TOC entry 3463 (class 0 OID 0)
-- Dependencies: 211
-- Name: Program_passport_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Program_passport_Id_seq"', 40, true);


--
-- TOC entry 3464 (class 0 OID 0)
-- Dependencies: 227
-- Name: Program_status_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Program_status_list_Id_seq"', 4, true);


--
-- TOC entry 3465 (class 0 OID 0)
-- Dependencies: 225
-- Name: Requirements_listeners_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Requirements_listeners_list_Id_seq"', 19, true);


--
-- TOC entry 3466 (class 0 OID 0)
-- Dependencies: 215
-- Name: Training_form_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Training_form_list_Id_seq"', 2, true);


--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 213
-- Name: Type_program_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Type_program_list_Id_seq"', 3, true);


--
-- TOC entry 3263 (class 2606 OID 17742)
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3253 (class 2606 OID 17654)
-- Name: Direction_study_list Direction_study_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Direction_study_list"
    ADD CONSTRAINT "Direction_study_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3265 (class 2606 OID 17755)
-- Name: Education_list Education_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Education_list"
    ADD CONSTRAINT "Education_list_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3255 (class 2606 OID 17661)
-- Name: Issued_document_list Issued_document_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Issued_document_list"
    ADD CONSTRAINT "Issued_document_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3261 (class 2606 OID 17682)
-- Name: Listener_status_list Listener_status_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listener_status_list"
    ADD CONSTRAINT "Listener_status_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3241 (class 2606 OID 17757)
-- Name: Listener Listeners_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listener"
    ADD CONSTRAINT "Listeners_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3249 (class 2606 OID 17640)
-- Name: Place_list Place_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Place_list"
    ADD CONSTRAINT "Place_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3251 (class 2606 OID 17647)
-- Name: Program_level_list Program_level_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_level_list"
    ADD CONSTRAINT "Program_level_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3243 (class 2606 OID 17606)
-- Name: Program_passport Program_passport_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3259 (class 2606 OID 17675)
-- Name: Program_status_list Program_status_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_status_list"
    ADD CONSTRAINT "Program_status_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3257 (class 2606 OID 17668)
-- Name: Requirements_listeners_list Requirements_listeners_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Requirements_listeners_list"
    ADD CONSTRAINT "Requirements_listeners_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3247 (class 2606 OID 17631)
-- Name: Training_form_list Training_form_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Training_form_list"
    ADD CONSTRAINT "Training_form_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3245 (class 2606 OID 17622)
-- Name: Type_program_list Type_program_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Type_program_list"
    ADD CONSTRAINT "Type_program_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3266 (class 2606 OID 17688)
-- Name: Listener Listeners_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listener"
    ADD CONSTRAINT "Listeners_fk1" FOREIGN KEY ("Status_id") REFERENCES public."Listener_status_list"("Id");


--
-- TOC entry 3267 (class 2606 OID 17693)
-- Name: Program_passport Program_passport_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk0" FOREIGN KEY ("Level_id") REFERENCES public."Program_level_list"("Id");


--
-- TOC entry 3268 (class 2606 OID 17698)
-- Name: Program_passport Program_passport_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk1" FOREIGN KEY ("Type_id") REFERENCES public."Type_program_list"("Id");


--
-- TOC entry 3269 (class 2606 OID 17703)
-- Name: Program_passport Program_passport_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk2" FOREIGN KEY ("Direction_study_id") REFERENCES public."Direction_study_list"("Id");


--
-- TOC entry 3270 (class 2606 OID 17708)
-- Name: Program_passport Program_passport_fk3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk3" FOREIGN KEY ("Training_form_id") REFERENCES public."Training_form_list"("Id");


--
-- TOC entry 3271 (class 2606 OID 17713)
-- Name: Program_passport Program_passport_fk4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk4" FOREIGN KEY ("Place_id") REFERENCES public."Place_list"("Id");


--
-- TOC entry 3272 (class 2606 OID 17718)
-- Name: Program_passport Program_passport_fk5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk5" FOREIGN KEY ("Issued_document_id") REFERENCES public."Issued_document_list"("Id");


--
-- TOC entry 3273 (class 2606 OID 17723)
-- Name: Program_passport Program_passport_fk6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk6" FOREIGN KEY ("Requirement_id") REFERENCES public."Requirements_listeners_list"("Id");


--
-- TOC entry 3274 (class 2606 OID 17728)
-- Name: Program_passport Program_passport_fk7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk7" FOREIGN KEY ("Status_id") REFERENCES public."Program_status_list"("Id");


-- Completed on 2022-04-24 14:01:31

--
-- PostgreSQL database dump complete
--

