--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Ubuntu 14.2-1.pgdg22.04+1+b1)
-- Dumped by pg_dump version 14.2 (Ubuntu 14.2-1.pgdg22.04+1+b1)

-- Started on 2022-05-11 16:48:17 +05

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
-- TOC entry 209 (class 1259 OID 16385)
-- Name: Admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Admin" (
    "Id" integer NOT NULL,
    "Login" character varying NOT NULL,
    "Password" character varying NOT NULL
);


ALTER TABLE public."Admin" OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16390)
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
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 210
-- Name: Admin_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Admin_Id_seq" OWNED BY public."Admin"."Id";


--
-- TOC entry 211 (class 1259 OID 16391)
-- Name: Direction_study_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Direction_study_list" (
    "Id" integer NOT NULL,
    "Direction" character varying(255) NOT NULL
);


ALTER TABLE public."Direction_study_list" OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16394)
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
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 212
-- Name: Direction_study_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Direction_study_list_Id_seq" OWNED BY public."Direction_study_list"."Id";


--
-- TOC entry 213 (class 1259 OID 16395)
-- Name: Program_level_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Program_level_list" (
    "Id" integer NOT NULL,
    "Level" character varying(255) NOT NULL
);


ALTER TABLE public."Program_level_list" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16398)
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
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 214
-- Name: Program_level_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Program_level_list_Id_seq" OWNED BY public."Program_level_list"."Id";


--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: Education_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Education_list" (
    "Id" integer DEFAULT nextval('public."Program_level_list_Id_seq"'::regclass) NOT NULL,
    "Education" character varying NOT NULL
);


ALTER TABLE public."Education_list" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16405)
-- Name: Issued_document_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Issued_document_list" (
    "Id" integer NOT NULL,
    "Document" character varying(255) NOT NULL
);


ALTER TABLE public."Issued_document_list" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16408)
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
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 217
-- Name: Issued_document_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Issued_document_list_Id_seq" OWNED BY public."Issued_document_list"."Id";


--
-- TOC entry 218 (class 1259 OID 16409)
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
-- TOC entry 219 (class 1259 OID 16414)
-- Name: Listener_status_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Listener_status_list" (
    "Id" integer NOT NULL,
    "Status" character varying(255) NOT NULL
);


ALTER TABLE public."Listener_status_list" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16417)
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
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 220
-- Name: Listener_status_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Listener_status_list_Id_seq" OWNED BY public."Listener_status_list"."Id";


--
-- TOC entry 221 (class 1259 OID 16418)
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
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 221
-- Name: Listeners_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Listeners_Id_seq" OWNED BY public."Listener"."Id";


--
-- TOC entry 222 (class 1259 OID 16419)
-- Name: Place_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Place_list" (
    "Id" integer NOT NULL,
    "Place" text NOT NULL
);


ALTER TABLE public."Place_list" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16424)
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
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 223
-- Name: Place_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Place_list_Id_seq" OWNED BY public."Place_list"."Id";


--
-- TOC entry 224 (class 1259 OID 16425)
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
    "Status_id" integer NOT NULL,
    "Plan" character varying
);


ALTER TABLE public."Program_passport" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16432)
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
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 225
-- Name: Program_passport_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Program_passport_Id_seq" OWNED BY public."Program_passport"."Id";


--
-- TOC entry 226 (class 1259 OID 16433)
-- Name: Program_status_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Program_status_list" (
    "Id" integer NOT NULL,
    "Status" character varying(255) NOT NULL
);


ALTER TABLE public."Program_status_list" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16436)
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
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 227
-- Name: Program_status_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Program_status_list_Id_seq" OWNED BY public."Program_status_list"."Id";


--
-- TOC entry 228 (class 1259 OID 16437)
-- Name: Requirements_listeners_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Requirements_listeners_list" (
    "Id" integer NOT NULL,
    "Requirement" character varying NOT NULL,
    "Reduction" character varying DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public."Requirements_listeners_list" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16443)
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
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 229
-- Name: Requirements_listeners_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Requirements_listeners_list_Id_seq" OWNED BY public."Requirements_listeners_list"."Id";


--
-- TOC entry 230 (class 1259 OID 16444)
-- Name: Training_form_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Training_form_list" (
    "Id" integer NOT NULL,
    "Training_form" text NOT NULL,
    "Reduction" character varying DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public."Training_form_list" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16450)
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
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 231
-- Name: Training_form_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Training_form_list_Id_seq" OWNED BY public."Training_form_list"."Id";


--
-- TOC entry 232 (class 1259 OID 16451)
-- Name: Type_program_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Type_program_list" (
    "Id" integer NOT NULL,
    "Type" text NOT NULL
);


ALTER TABLE public."Type_program_list" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16456)
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
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 233
-- Name: Type_program_list_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Type_program_list_Id_seq" OWNED BY public."Type_program_list"."Id";


--
-- TOC entry 3268 (class 2604 OID 16457)
-- Name: Admin Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin" ALTER COLUMN "Id" SET DEFAULT nextval('public."Admin_Id_seq"'::regclass);


--
-- TOC entry 3269 (class 2604 OID 16458)
-- Name: Direction_study_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Direction_study_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Direction_study_list_Id_seq"'::regclass);


--
-- TOC entry 3272 (class 2604 OID 16459)
-- Name: Issued_document_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Issued_document_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Issued_document_list_Id_seq"'::regclass);


--
-- TOC entry 3273 (class 2604 OID 16460)
-- Name: Listener Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listener" ALTER COLUMN "Id" SET DEFAULT nextval('public."Listeners_Id_seq"'::regclass);


--
-- TOC entry 3274 (class 2604 OID 16461)
-- Name: Listener_status_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listener_status_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Listener_status_list_Id_seq"'::regclass);


--
-- TOC entry 3275 (class 2604 OID 16462)
-- Name: Place_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Place_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Place_list_Id_seq"'::regclass);


--
-- TOC entry 3270 (class 2604 OID 16463)
-- Name: Program_level_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_level_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Program_level_list_Id_seq"'::regclass);


--
-- TOC entry 3278 (class 2604 OID 16464)
-- Name: Program_passport Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport" ALTER COLUMN "Id" SET DEFAULT nextval('public."Program_passport_Id_seq"'::regclass);


--
-- TOC entry 3279 (class 2604 OID 16465)
-- Name: Program_status_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_status_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Program_status_list_Id_seq"'::regclass);


--
-- TOC entry 3281 (class 2604 OID 16466)
-- Name: Requirements_listeners_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Requirements_listeners_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Requirements_listeners_list_Id_seq"'::regclass);


--
-- TOC entry 3283 (class 2604 OID 16467)
-- Name: Training_form_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Training_form_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Training_form_list_Id_seq"'::regclass);


--
-- TOC entry 3284 (class 2604 OID 16468)
-- Name: Type_program_list Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Type_program_list" ALTER COLUMN "Id" SET DEFAULT nextval('public."Type_program_list_Id_seq"'::regclass);


--
-- TOC entry 3459 (class 0 OID 16385)
-- Dependencies: 209
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Admin" ("Id", "Login", "Password") VALUES (1, 'Admin', '621a877ed852dd47bb5ef134fd1eb14c1b212b329f3542e7a56ac2c6376d567e');


--
-- TOC entry 3461 (class 0 OID 16391)
-- Dependencies: 211
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
-- TOC entry 3465 (class 0 OID 16399)
-- Dependencies: 215
-- Data for Name: Education_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Education_list" ("Id", "Education") VALUES (5, 'Основное общее образование');
INSERT INTO public."Education_list" ("Id", "Education") VALUES (6, 'Среднее общее образование');
INSERT INTO public."Education_list" ("Id", "Education") VALUES (7, 'Среднее профессиональное образование');
INSERT INTO public."Education_list" ("Id", "Education") VALUES (8, 'Высшее образование');


--
-- TOC entry 3466 (class 0 OID 16405)
-- Dependencies: 216
-- Data for Name: Issued_document_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Issued_document_list" ("Id", "Document") VALUES (1, 'Свидетельство о профессии рабочего, должности служащего');
INSERT INTO public."Issued_document_list" ("Id", "Document") VALUES (2, 'Свидетельство о профессии водителя');
INSERT INTO public."Issued_document_list" ("Id", "Document") VALUES (3, 'Свидетельство о прохождении обучения на право управления самоходными машинами');
INSERT INTO public."Issued_document_list" ("Id", "Document") VALUES (4, 'Диплом о профессиональной переподготовке с присвоением новой квалификации');
INSERT INTO public."Issued_document_list" ("Id", "Document") VALUES (5, 'Удостоверение о повышении квалификации
');
INSERT INTO public."Issued_document_list" ("Id", "Document") VALUES (6, 'Диплом о профессиональной переподготовке');


--
-- TOC entry 3468 (class 0 OID 16409)
-- Dependencies: 218
-- Data for Name: Listener; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3469 (class 0 OID 16414)
-- Dependencies: 219
-- Data for Name: Listener_status_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Listener_status_list" ("Id", "Status") VALUES (1, 'Waiting');
INSERT INTO public."Listener_status_list" ("Id", "Status") VALUES (2, 'Learning');
INSERT INTO public."Listener_status_list" ("Id", "Status") VALUES (3, 'Learned');
INSERT INTO public."Listener_status_list" ("Id", "Status") VALUES (4, 'Leaved');
INSERT INTO public."Listener_status_list" ("Id", "Status") VALUES (5, 'Interrupted');


--
-- TOC entry 3472 (class 0 OID 16419)
-- Dependencies: 222
-- Data for Name: Place_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Place_list" ("Id", "Place") VALUES (1, 'г. Курган, пр. Конституции, 68');
INSERT INTO public."Place_list" ("Id", "Place") VALUES (2, 'г. Курган, пр. Машиностроителей, 14');
INSERT INTO public."Place_list" ("Id", "Place") VALUES (3, 'г. Курган, ул. Автозаводская, 3');
INSERT INTO public."Place_list" ("Id", "Place") VALUES (4, 'Курганская область, Кетовский район, с. Шмаково, ул. Рабочая, 20');
INSERT INTO public."Place_list" ("Id", "Place") VALUES (5, 'Курганская область, с. Шатрово, ул. 30 лет Победы, 1');


--
-- TOC entry 3463 (class 0 OID 16395)
-- Dependencies: 213
-- Data for Name: Program_level_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Program_level_list" ("Id", "Level") VALUES (1, 'Программа профессионального обучения');
INSERT INTO public."Program_level_list" ("Id", "Level") VALUES (2, 'Дополнительная профессиональная программа');


--
-- TOC entry 3474 (class 0 OID 16425)
-- Dependencies: 224
-- Data for Name: Program_passport; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3476 (class 0 OID 16433)
-- Dependencies: 226
-- Data for Name: Program_status_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Program_status_list" ("Id", "Status") VALUES (1, 'Active');
INSERT INTO public."Program_status_list" ("Id", "Status") VALUES (4, 'Close');
INSERT INTO public."Program_status_list" ("Id", "Status") VALUES (3, 'Finished');
INSERT INTO public."Program_status_list" ("Id", "Status") VALUES (2, 'Open');


--
-- TOC entry 3478 (class 0 OID 16437)
-- Dependencies: 228
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
INSERT INTO public."Requirements_listeners_list" ("Id", "Requirement", "Reduction") VALUES (19, 'Целевая аудитория курса – лица, имеющие среднее профессиональное и (или) высшее образование; лица, получающие среднее профессиональное и (или) высшее образование', 'Целевая аудитория курса – лица, имеющие среднее профессиональное и (или) высшее образование; лица, получающие среднее профессиональное и (или) высшее образование');


--
-- TOC entry 3480 (class 0 OID 16444)
-- Dependencies: 230
-- Data for Name: Training_form_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Training_form_list" ("Id", "Training_form", "Reduction") VALUES (1, 'Реализация программы осуществляется преимущественно в очной форме обучения (возможно применение дистанционных образовательных технологий при изучении теоретической составляющей курса). ', 'Очно/Дистанционно при изучении теоретической составляющей курса');
INSERT INTO public."Training_form_list" ("Id", "Training_form", "Reduction") VALUES (2, 'Реализация программы осуществляется преимущественно в очной форме обучения Возможно применение дистанционных образовательных технологий как по отдельным дисциплинам (модулям) учебного плана, так и по всей программе в целом.', 'Очно/Дистанционно как по отдельным дисциплинам (модулям) учебного плана, так и по всей программе в целом');


--
-- TOC entry 3482 (class 0 OID 16451)
-- Dependencies: 232
-- Data for Name: Type_program_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Type_program_list" ("Id", "Type") VALUES (1, 'Программа профессиональной подготовки');
INSERT INTO public."Type_program_list" ("Id", "Type") VALUES (2, 'Программа профессиональной переподготовки');
INSERT INTO public."Type_program_list" ("Id", "Type") VALUES (3, 'Программа повышения квалификаци');


--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 210
-- Name: Admin_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Admin_Id_seq"', 1, true);


--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 212
-- Name: Direction_study_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Direction_study_list_Id_seq"', 10, true);


--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 217
-- Name: Issued_document_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Issued_document_list_Id_seq"', 6, true);


--
-- TOC entry 3504 (class 0 OID 0)
-- Dependencies: 220
-- Name: Listener_status_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Listener_status_list_Id_seq"', 5, true);


--
-- TOC entry 3505 (class 0 OID 0)
-- Dependencies: 221
-- Name: Listeners_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Listeners_Id_seq"', 1, false);


--
-- TOC entry 3506 (class 0 OID 0)
-- Dependencies: 223
-- Name: Place_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Place_list_Id_seq"', 5, true);


--
-- TOC entry 3507 (class 0 OID 0)
-- Dependencies: 214
-- Name: Program_level_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Program_level_list_Id_seq"', 8, true);


--
-- TOC entry 3508 (class 0 OID 0)
-- Dependencies: 225
-- Name: Program_passport_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Program_passport_Id_seq"', 1, false);


--
-- TOC entry 3509 (class 0 OID 0)
-- Dependencies: 227
-- Name: Program_status_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Program_status_list_Id_seq"', 4, true);


--
-- TOC entry 3510 (class 0 OID 0)
-- Dependencies: 229
-- Name: Requirements_listeners_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Requirements_listeners_list_Id_seq"', 19, true);


--
-- TOC entry 3511 (class 0 OID 0)
-- Dependencies: 231
-- Name: Training_form_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Training_form_list_Id_seq"', 2, true);


--
-- TOC entry 3512 (class 0 OID 0)
-- Dependencies: 233
-- Name: Type_program_list_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Type_program_list_Id_seq"', 3, true);


--
-- TOC entry 3286 (class 2606 OID 16470)
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3288 (class 2606 OID 16472)
-- Name: Direction_study_list Direction_study_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Direction_study_list"
    ADD CONSTRAINT "Direction_study_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3292 (class 2606 OID 16474)
-- Name: Education_list Education_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Education_list"
    ADD CONSTRAINT "Education_list_pkey" PRIMARY KEY ("Id");


--
-- TOC entry 3294 (class 2606 OID 16476)
-- Name: Issued_document_list Issued_document_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Issued_document_list"
    ADD CONSTRAINT "Issued_document_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3298 (class 2606 OID 16478)
-- Name: Listener_status_list Listener_status_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listener_status_list"
    ADD CONSTRAINT "Listener_status_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3296 (class 2606 OID 16480)
-- Name: Listener Listeners_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listener"
    ADD CONSTRAINT "Listeners_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3300 (class 2606 OID 16482)
-- Name: Place_list Place_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Place_list"
    ADD CONSTRAINT "Place_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3290 (class 2606 OID 16484)
-- Name: Program_level_list Program_level_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_level_list"
    ADD CONSTRAINT "Program_level_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3302 (class 2606 OID 16486)
-- Name: Program_passport Program_passport_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3304 (class 2606 OID 16488)
-- Name: Program_status_list Program_status_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_status_list"
    ADD CONSTRAINT "Program_status_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3306 (class 2606 OID 16490)
-- Name: Requirements_listeners_list Requirements_listeners_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Requirements_listeners_list"
    ADD CONSTRAINT "Requirements_listeners_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3308 (class 2606 OID 16492)
-- Name: Training_form_list Training_form_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Training_form_list"
    ADD CONSTRAINT "Training_form_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3310 (class 2606 OID 16494)
-- Name: Type_program_list Type_program_list_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Type_program_list"
    ADD CONSTRAINT "Type_program_list_pk" PRIMARY KEY ("Id");


--
-- TOC entry 3311 (class 2606 OID 16495)
-- Name: Listener Listeners_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listener"
    ADD CONSTRAINT "Listeners_fk1" FOREIGN KEY ("Status_id") REFERENCES public."Listener_status_list"("Id");


--
-- TOC entry 3312 (class 2606 OID 16500)
-- Name: Program_passport Program_passport_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk0" FOREIGN KEY ("Level_id") REFERENCES public."Program_level_list"("Id");


--
-- TOC entry 3313 (class 2606 OID 16505)
-- Name: Program_passport Program_passport_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk1" FOREIGN KEY ("Type_id") REFERENCES public."Type_program_list"("Id");


--
-- TOC entry 3314 (class 2606 OID 16510)
-- Name: Program_passport Program_passport_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk2" FOREIGN KEY ("Direction_study_id") REFERENCES public."Direction_study_list"("Id");


--
-- TOC entry 3315 (class 2606 OID 16515)
-- Name: Program_passport Program_passport_fk3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk3" FOREIGN KEY ("Training_form_id") REFERENCES public."Training_form_list"("Id");


--
-- TOC entry 3316 (class 2606 OID 16520)
-- Name: Program_passport Program_passport_fk4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk4" FOREIGN KEY ("Place_id") REFERENCES public."Place_list"("Id");


--
-- TOC entry 3317 (class 2606 OID 16525)
-- Name: Program_passport Program_passport_fk5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk5" FOREIGN KEY ("Issued_document_id") REFERENCES public."Issued_document_list"("Id");


--
-- TOC entry 3318 (class 2606 OID 16530)
-- Name: Program_passport Program_passport_fk6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk6" FOREIGN KEY ("Requirement_id") REFERENCES public."Requirements_listeners_list"("Id");


--
-- TOC entry 3319 (class 2606 OID 16535)
-- Name: Program_passport Program_passport_fk7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Program_passport"
    ADD CONSTRAINT "Program_passport_fk7" FOREIGN KEY ("Status_id") REFERENCES public."Program_status_list"("Id");


-- Completed on 2022-05-11 16:48:17 +05

--
-- PostgreSQL database dump complete
--

