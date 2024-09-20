SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.6 (Ubuntu 15.6-1.pgdg20.04+1)

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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: teenieping; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."teenieping" ("id", "name_ko", "name_en", "created_at") VALUES
	(1, '하츄핑', 'Heartsping', '2024-09-19 12:33:47.105476+00'),
	(2, '바로핑', 'Dadaping', '2024-09-19 12:33:47.105476+00'),
	(3, '아자핑', 'Gogoping', '2024-09-19 12:33:47.105476+00'),
	(4, '차차핑', 'Chachaping', '2024-09-19 12:33:47.105476+00'),
	(5, '라라핑', 'Lalaping', '2024-09-19 12:33:47.105476+00'),
	(6, '해핑', 'Happying', '2024-09-19 12:33:47.105476+00'),
	(7, '조아핑', 'Joahping', '2024-09-19 12:33:47.105476+00'),
	(8, '방글핑', 'Teeheeping', '2024-09-19 12:33:47.105476+00'),
	(9, '믿어핑', 'Trustping', '2024-09-19 12:33:47.105476+00'),
	(10, '꾸래핑', 'Okeydokeyping', '2024-09-19 12:33:47.105476+00'),
	(11, '나나핑', 'Nanaping', '2024-09-19 12:33:47.105476+00'),
	(12, '솔찌핑', 'Trueping', '2024-09-19 12:33:47.105476+00'),
	(13, '포실핑', 'Fluffyping', '2024-09-19 12:33:47.105476+00'),
	(14, '말랑핑', 'Jellyping', '2024-09-19 12:33:47.105476+00'),
	(15, '샤샤핑', 'Shashaping', '2024-09-19 12:33:47.105476+00'),
	(16, '빛나핑', 'Shimmerping', '2024-09-19 12:33:47.105476+00'),
	(17, '초롱핑', 'Sparkleping', '2024-09-19 12:33:47.105476+00'),
	(18, '반짝핑', 'Twinkleping', '2024-09-19 12:33:47.105476+00');


--
-- Data for Name: teenieping_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."teenieping_image" ("id", "teenieping_id", "image_url", "created_at") VALUES
	(1, 1, '/img/teenieping/1.webp', '2024-09-20 01:28:39.881857+00'),
	(2, 2, '/img/teenieping/2.webp', '2024-09-20 01:28:39.881857+00'),
	(3, 3, '/img/teenieping/3.webp', '2024-09-20 01:28:39.881857+00'),
	(4, 4, '/img/teenieping/4.webp', '2024-09-20 01:28:39.881857+00'),
	(5, 5, '/img/teenieping/5.webp', '2024-09-20 01:28:39.881857+00'),
	(6, 6, '/img/teenieping/6.webp', '2024-09-20 01:28:39.881857+00'),
	(7, 7, '/img/teenieping/7.webp', '2024-09-20 01:28:39.881857+00'),
	(8, 8, '/img/teenieping/8.webp', '2024-09-20 01:28:39.881857+00'),
	(9, 9, '/img/teenieping/9.webp', '2024-09-20 01:28:39.881857+00'),
	(10, 10, '/img/teenieping/10.webp', '2024-09-20 01:28:39.881857+00'),
	(11, 11, '/img/teenieping/11.webp', '2024-09-20 01:28:39.881857+00'),
	(12, 12, '/img/teenieping/12.webp', '2024-09-20 01:28:39.881857+00'),
	(13, 13, '/img/teenieping/13.webp', '2024-09-20 01:28:39.881857+00'),
	(14, 14, '/img/teenieping/14.webp', '2024-09-20 01:28:39.881857+00'),
	(15, 15, '/img/teenieping/15.webp', '2024-09-20 01:28:39.881857+00'),
	(18, 18, '/img/teenieping/18.webp', '2024-09-20 01:28:39.881857+00'),
	(17, 17, '/img/teenieping/17.webp', '2024-09-20 01:28:39.881857+00'),
	(16, 16, '/img/teenieping/16.webp', '2024-09-20 01:28:39.881857+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: teenieping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."teenieping_id_seq"', 18, true);


--
-- Name: teenieping_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."teenieping_image_id_seq"', 18, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
