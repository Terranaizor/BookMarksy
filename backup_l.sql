--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	books	book
2	books	genre
3	books	publisher
4	books	bookedition
5	admin	logentry
6	auth	permission
7	auth	group
8	auth	user
9	contenttypes	contenttype
10	sessions	session
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add book	1	add_book
2	Can change book	1	change_book
3	Can delete book	1	delete_book
4	Can view book	1	view_book
5	Can add genre	2	add_genre
6	Can change genre	2	change_genre
7	Can delete genre	2	delete_genre
8	Can view genre	2	view_genre
9	Can add publisher	3	add_publisher
10	Can change publisher	3	change_publisher
11	Can delete publisher	3	delete_publisher
12	Can view publisher	3	view_publisher
13	Can add book edition	4	add_bookedition
14	Can change book edition	4	change_bookedition
15	Can delete book edition	4	delete_bookedition
16	Can view book edition	4	view_bookedition
17	Can add log entry	5	add_logentry
18	Can change log entry	5	change_logentry
19	Can delete log entry	5	delete_logentry
20	Can view log entry	5	view_logentry
21	Can add permission	6	add_permission
22	Can change permission	6	change_permission
23	Can delete permission	6	delete_permission
24	Can view permission	6	view_permission
25	Can add group	7	add_group
26	Can change group	7	change_group
27	Can delete group	7	delete_group
28	Can view group	7	view_group
29	Can add user	8	add_user
30	Can change user	8	change_user
31	Can delete user	8	delete_user
32	Can view user	8	view_user
33	Can add content type	9	add_contenttype
34	Can change content type	9	change_contenttype
35	Can delete content type	9	delete_contenttype
36	Can view content type	9	view_contenttype
37	Can add session	10	add_session
38	Can change session	10	change_session
39	Can delete session	10	delete_session
40	Can view session	10	view_session
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$870000$28gP22f3wTw0ff5EhxIowF$aSR5r96/eccYzCYV76vwDcLyjSOMIT2NuWM5KjCAB9k=	2024-11-10 16:06:00.956344+00	t	nradin			nazarradin@gmail.com	t	t	2024-10-21 10:55:06.450654+00
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: authtoken_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.authtoken_token (key, created, user_id) FROM stdin;
\.


--
-- Data for Name: books_book; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books_book (id, title, author, description, "readersTotal", "readersWeek", "releaseDate", rating) FROM stdin;
1	Twenty Thousand Leagues Under the Seas	Jules Verne	Twenty Thousand Leagues Under the Seas by Jules Verne is a thrilling underwater adventure that follows Captain Nemo and the crew of the Nautilus as they explore the mysterious depths of the ocean. Encountering strange creatures, lost civilizations, and incredible wonders, this classic novel combines science fiction with marine exploration in a gripping journey beneath the waves.	0	10	1870-06-20	0
3	A Connecticut Yankee in King Arthur's Court	Mark Twain	A Connecticut Yankee in King Arthur's Court by Mark Twain is a satirical time-travel adventure where a 19th-century engineer, Hank Morgan, is transported back to medieval England. Using his modern knowledge, he attempts to reshape King Arthur's court with new technologies and ideas, leading to humorous and thought-provoking clashes between the past and present. This novel blends humor, social commentary, and fantasy in a unique twist on the Arthurian legend.	0	25	1889-01-01	0
4	The Surgeon	Tess Gerritsen	The Surgeon by Tess Gerritsen is a gripping medical thriller that introduces Detective Jane Rizzoli as she hunts down a brutal serial killer targeting women in Boston. Known as 'The Surgeon' for his precision and knowledge of human anatomy, the killer leaves behind chilling clues. With intense suspense, forensic detail, and a strong female lead, this novel weaves together crime, medicine, and psychological terror in a race against time.	0	15	2001-08-01	0
5	Frankenstein	Mary Shelley	Frankenstein by Mary Shelley is a classic Gothic novel that tells the story of Victor Frankenstein, a scientist who creates a living being from dead body parts. However, his monstrous creation, abandoned and shunned by society, seeks revenge on his maker. Blending themes of ambition, isolation, and the consequences of playing God, this haunting tale explores the darker sides of human nature and scientific advancement.	0	8	1818-01-01	0
6	Alice's Adventures in Wonderland	Lewis Carroll	Alice's Adventures in Wonderland by Lewis Carroll is a whimsical and imaginative tale about a young girl named Alice who falls down a rabbit hole into a fantastical world. In Wonderland, she encounters peculiar creatures like the Cheshire Cat, the Mad Hatter, and the Queen of Hearts. Filled with riddles, absurdities, and playful language, this beloved classic takes readers on a surreal journey through a dreamlike land where nothing is quite as it seems.	0	4	1865-11-01	0
2	The Mysterious Island	Jules Verne	The Mysterious Island by Jules Verne tells the story of five castaways stranded on a remote island during the American Civil War. Using their ingenuity and knowledge, they must survive the island's challenges, uncover its secrets, and face mysterious forces at work. Blending adventure, science, and mystery, this classic novel explores the resilience of the human spirit.	0	5	1875-01-01	0
\.


--
-- Data for Name: books_genre; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books_genre (id, name) FROM stdin;
1	Adventure
2	Science fiction
3	Adventure novel
4	Alternate history
5	Fantasy
6	Crime
7	Gothic novel
8	Horror fiction
9	Portal fantasy
10	Literary nonsense
\.


--
-- Data for Name: books_book_genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books_book_genres (id, book_id, genre_id) FROM stdin;
1	1	1
2	1	2
3	2	2
4	2	3
5	3	2
6	3	4
7	3	5
8	4	6
9	5	8
10	5	2
11	5	7
12	6	9
13	6	10
14	2	1
\.


--
-- Data for Name: books_publisher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books_publisher (id, name) FROM stdin;
1	Barnes & Noble
3	Aladdin
4	CreateSpace
5	Bantam Classics
6	SeaWolf Press
7	Ballantine Books
2	Wordsworth
8	Pan Macmillan
10	Evertype
\.


--
-- Data for Name: books_bookedition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books_bookedition (id, "numberPages", book_id, publisher_id, cover, "readersTotal") FROM stdin;
2	256	1	2	images/Twenty_Thousand_Leagues_Under_the_Seas_-_Wordsworth_Classic.jpg	15
1	269	1	1	images/Twenty_Thousand_Leagues_Under_the_Sea_-_Barnes__Noble.jpg	10
4	528	2	2	images/The_Mysterious_Island_-_Wordsworth_Classic.jpg	20
3	768	2	3	images/The_Mysterious_Island_-_Aladdin.jpg	5
5	342	2	4	images/The_Mysterious_Island_-_CreateSpace.jpg	2
6	336	3	5	images/A_Connecticut_Yankee_in_King_Arthurs_Court_-_Bantam_Classics.jpg	2
7	438	3	6	images/A_Connecticut_Yankee_in_King_Arthurs_Court_-_SeaWolf_Press.jpg	5
8	359	4	7	images/The_Surgeon_-_Ballantine_Books.jpg	30
9	176	5	2	images/Frankenstein_-_Wordsworth_Classic.jpg	15
10	320	6	8	images/Alices_Adventures_in_Wonderland_-_Pan_Macmillan.jpg	7
11	132	6	10	images/Alices_Adventures_in_Wonderland_-_Evertype.jpg	9
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2024-10-21 10:55:24.327662+00	1	Adventure	1	[{"added": {}}]	2	1
2	2024-10-21 10:56:48.89078+00	2	Science fiction	1	[{"added": {}}]	2	1
3	2024-10-21 11:09:11.794312+00	3	Adventure novel	1	[{"added": {}}]	2	1
4	2024-10-21 11:09:25.185526+00	1	Barnes & Noble	1	[{"added": {}}]	3	1
5	2024-10-21 11:09:30.623108+00	2	Wordsworth Classics	1	[{"added": {}}]	3	1
6	2024-10-21 11:11:00.474585+00	1	Twenty Thousand Leagues Under the Seas	1	[{"added": {}}]	1	1
7	2024-10-21 11:13:55.480735+00	2	The Mysterious Island	1	[{"added": {}}]	1	1
8	2024-10-21 11:17:04.038894+00	1	Twenty Thousand Leagues Under the Seas - Barnes & Noble Edition	1	[{"added": {}}]	4	1
9	2024-10-21 11:20:11.016079+00	2	Twenty Thousand Leagues Under the Seas - Wordsworth Classics Edition	1	[{"added": {}}]	4	1
10	2024-10-21 11:20:19.085277+00	1	Twenty Thousand Leagues Under the Seas - Barnes & Noble Edition	2	[{"changed": {"fields": ["ReadersTotal"]}}]	4	1
11	2024-10-21 11:21:15.282785+00	3	Aladdin	1	[{"added": {}}]	3	1
12	2024-10-21 11:30:36.731231+00	3	The Mysterious Island - Aladdin Edition	1	[{"added": {}}]	4	1
13	2024-10-21 11:31:05.020903+00	4	The Mysterious Island - Wordsworth Classics Edition	1	[{"added": {}}]	4	1
14	2024-10-21 11:31:11.735913+00	3	The Mysterious Island - Aladdin Edition	2	[{"changed": {"fields": ["ReadersTotal"]}}]	4	1
15	2024-10-21 11:32:15.642208+00	4	CreateSpace	1	[{"added": {}}]	3	1
16	2024-10-21 11:34:46.839378+00	5	The Mysterious Island - CreateSpace Edition	1	[{"added": {}}]	4	1
17	2024-10-21 11:43:48.475491+00	4	Alternate history	1	[{"added": {}}]	2	1
18	2024-10-21 11:44:02.40765+00	5	Fantasy	1	[{"added": {}}]	2	1
19	2024-10-21 11:45:02.813301+00	3	A Connecticut Yankee in King Arthur's Court	1	[{"added": {}}]	1	1
20	2024-10-21 11:46:06.528953+00	5	Bantam Classics	1	[{"added": {}}]	3	1
21	2024-10-21 11:47:43.607884+00	6	A Connecticut Yankee in King Arthur's Court - Bantam Classics Edition	1	[{"added": {}}]	4	1
22	2024-10-21 11:49:27.342699+00	6	SeaWolf Press	1	[{"added": {}}]	3	1
23	2024-10-21 11:50:23.295476+00	7	A Connecticut Yankee in King Arthur's Court - SeaWolf Press Edition	1	[{"added": {}}]	4	1
24	2024-10-21 11:55:26.890884+00	6	Crime	1	[{"added": {}}]	2	1
25	2024-10-21 11:57:17.833244+00	4	The Surgeon	1	[{"added": {}}]	1	1
26	2024-10-21 11:58:42.715147+00	7	Ballantine Books	1	[{"added": {}}]	3	1
27	2024-10-21 11:58:59.320476+00	8	The Surgeon - Ballantine Books Edition	1	[{"added": {}}]	4	1
28	2024-10-21 12:00:27.066955+00	7	Gothic novel	1	[{"added": {}}]	2	1
29	2024-10-21 12:00:46.309819+00	8	Horror fiction	1	[{"added": {}}]	2	1
30	2024-10-21 12:01:42.711108+00	5	Frankenstein	1	[{"added": {}}]	1	1
31	2024-10-21 12:04:24.188475+00	2	Wordsworth	2	[{"changed": {"fields": ["Name"]}}]	3	1
32	2024-10-21 12:04:58.238628+00	9	Frankenstein - Wordsworth Edition	1	[{"added": {}}]	4	1
33	2024-10-21 12:06:58.423768+00	9	Portal fantasy	1	[{"added": {}}]	2	1
34	2024-10-21 12:07:05.440009+00	10	Literary nonsense	1	[{"added": {}}]	2	1
35	2024-10-21 12:07:34.956094+00	6	Alice's Adventures in Wonderland	1	[{"added": {}}]	1	1
36	2024-10-21 12:08:50.294044+00	8	Pan Macmillan	1	[{"added": {}}]	3	1
37	2024-10-21 12:10:23.148774+00	10	Alice's Adventures in Wonderland - Pan Macmillan Edition	1	[{"added": {}}]	4	1
38	2024-10-21 12:11:44.925436+00	9	Evertype	1	[{"added": {}}]	3	1
39	2024-10-21 12:11:45.168317+00	10	Evertype	1	[{"added": {}}]	3	1
40	2024-10-21 12:13:18.843096+00	11	Alice's Adventures in Wonderland - Evertype Edition	1	[{"added": {}}]	4	1
41	2024-10-29 15:51:29.913061+00	2	The Mysterious Island	2	[{"changed": {"fields": ["Genres"]}}]	1	1
42	2024-11-10 16:06:08.365124+00	9	Evertype	3		3	1
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2024-11-10 16:00:44.051538+00
2	auth	0001_initial	2024-11-10 16:00:44.079281+00
3	admin	0001_initial	2024-11-10 16:00:44.089894+00
4	admin	0002_logentry_remove_auto_add	2024-11-10 16:00:44.096393+00
5	admin	0003_logentry_add_action_flag_choices	2024-11-10 16:00:44.102068+00
6	contenttypes	0002_remove_content_type_name	2024-11-10 16:00:44.115826+00
7	auth	0002_alter_permission_name_max_length	2024-11-10 16:00:44.122613+00
8	auth	0003_alter_user_email_max_length	2024-11-10 16:00:44.13092+00
9	auth	0004_alter_user_username_opts	2024-11-10 16:00:44.138053+00
10	auth	0005_alter_user_last_login_null	2024-11-10 16:00:44.144564+00
11	auth	0006_require_contenttypes_0002	2024-11-10 16:00:44.145971+00
12	auth	0007_alter_validators_add_error_messages	2024-11-10 16:00:44.151759+00
13	auth	0008_alter_user_username_max_length	2024-11-10 16:00:44.15965+00
14	auth	0009_alter_user_last_name_max_length	2024-11-10 16:00:44.166621+00
15	auth	0010_alter_group_name_max_length	2024-11-10 16:00:44.173676+00
16	auth	0011_update_proxy_permissions	2024-11-10 16:00:44.181124+00
17	auth	0012_alter_user_first_name_max_length	2024-11-10 16:00:44.18799+00
18	books	0001_initial	2024-11-10 16:00:44.192887+00
19	books	0002_genre_publisher_remove_book_genre_and_more	2024-11-10 16:00:44.217348+00
20	books	0003_remove_book_cover_bookedition_cover_and_more	2024-11-10 16:00:44.228504+00
21	books	0004_rename_number_pages_bookedition_numberpages	2024-11-10 16:00:44.234455+00
22	sessions	0001_initial	2024-11-10 16:00:44.239918+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
hlr6z4hntc56ut6z0ytnoj2vdlykrf9w	.eJxVjDsOwjAQRO_iGln-xR9K-pzB2vU6OIBsKU4qxN1JpBRQTDPvzbxZhG0tcet5iTOxK5Ps8tshpGeuB6AH1HvjqdV1mZEfCj9p52Oj_Lqd7t9BgV72tQYzmWyU9kGS0AmkcMJZK70kQyqgzhYmIUE544MYgvLos8BhT9KA7PMFuyM3Kw:1t2q49:Pjob_lz3oHGcQslAtV3xLrynf-hP5NhoiIEE9x4nvtU	2024-11-04 10:55:13.431802+00
idiqinw2s3infgbrjbnxgjy189u8n09b	.eJxVjDsOwjAQRO_iGln-xR9K-pzB2vU6OIBsKU4qxN1JpBRQTDPvzbxZhG0tcet5iTOxK5Ps8tshpGeuB6AH1HvjqdV1mZEfCj9p52Oj_Lqd7t9BgV72tQYzmWyU9kGS0AmkcMJZK70kQyqgzhYmIUE544MYgvLos8BhT9KA7PMFuyM3Kw:1t4l3M:ea_7kIxj9AdaYB6dRoD532fCIAk4xGV4TilOXHkwMoM	2024-11-09 17:58:20.593784+00
xz6y169v5n72yz2o7hmyckb2ncsp35zy	.eJxVjDsOwjAQRO_iGln-xR9K-pzB2vU6OIBsKU4qxN1JpBRQTDPvzbxZhG0tcet5iTOxK5Ps8tshpGeuB6AH1HvjqdV1mZEfCj9p52Oj_Lqd7t9BgV72tQYzmWyU9kGS0AmkcMJZK70kQyqgzhYmIUE544MYgvLos8BhT9KA7PMFuyM3Kw:1t5oMq:eFfC1MKQyR1sHmOOJMVjyFYJxgNrZjVhKhbEg30gkTM	2024-11-12 15:42:48.369458+00
m4orho78nd7xm4hxpu8v97nqxibevwaa	.eJxVjDsOwjAQRO_iGln-xR9K-pzB2vU6OIBsKU4qxN1JpBRQTDPvzbxZhG0tcet5iTOxK5Ps8tshpGeuB6AH1HvjqdV1mZEfCj9p52Oj_Lqd7t9BgV72tQYzmWyU9kGS0AmkcMJZK70kQyqgzhYmIUE544MYgvLos8BhT9KA7PMFuyM3Kw:1tAARs:V0H2oZ6XuolGlFPZbdxfqDm67haCd1woCkKNyq_o6t0	2024-11-24 16:06:00.975492+00
\.


--
-- Data for Name: user_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_profile (id, picture, last_activity, user_id) FROM stdin;
\.


--
-- Data for Name: user_profile_friends; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_profile_friends (id, profile_id, user_id) FROM stdin;
\.


--
-- Data for Name: user_profile_savedBookEditions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user_profile_savedBookEditions" (id, profile_id, bookedition_id) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 52, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 1, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: books_book_genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_book_genres_id_seq', 14, true);


--
-- Name: books_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_book_id_seq', 6, true);


--
-- Name: books_bookedition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_bookedition_id_seq', 11, true);


--
-- Name: books_genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_genre_id_seq', 10, true);


--
-- Name: books_publisher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_publisher_id_seq', 10, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 42, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 13, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 27, true);


--
-- Name: user_profile_friends_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_profile_friends_id_seq', 1, false);


--
-- Name: user_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_profile_id_seq', 1, false);


--
-- Name: user_profile_savedBookEditions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."user_profile_savedBookEditions_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

