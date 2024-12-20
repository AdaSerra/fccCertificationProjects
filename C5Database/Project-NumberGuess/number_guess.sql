--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

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

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

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
-- Name: games; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.games (
    game_id integer NOT NULL,
    user_id integer NOT NULL,
    number_of_guesses integer NOT NULL,
    secret_number integer NOT NULL
);


ALTER TABLE public.games OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_game_id_seq OWNER TO freecodecamp;

--
-- Name: games_game_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.games_game_id_seq OWNED BY public.games.game_id;


--
-- Name: players; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.players (
    user_id integer NOT NULL,
    username character varying(22)
);


ALTER TABLE public.players OWNER TO freecodecamp;

--
-- Name: players_user_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.players_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.players_user_id_seq OWNER TO freecodecamp;

--
-- Name: players_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.players_user_id_seq OWNED BY public.players.user_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: players user_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.players ALTER COLUMN user_id SET DEFAULT nextval('public.players_user_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games VALUES (1, 4, 10, 779);
INSERT INTO public.games VALUES (2, 7, 730, 729);
INSERT INTO public.games VALUES (3, 7, 671, 670);
INSERT INTO public.games VALUES (4, 8, 891, 890);
INSERT INTO public.games VALUES (5, 8, 610, 609);
INSERT INTO public.games VALUES (6, 7, 62, 59);
INSERT INTO public.games VALUES (7, 7, 435, 433);
INSERT INTO public.games VALUES (8, 7, 622, 621);
INSERT INTO public.games VALUES (9, 9, 504, 503);
INSERT INTO public.games VALUES (10, 9, 258, 257);
INSERT INTO public.games VALUES (11, 10, 751, 750);
INSERT INTO public.games VALUES (12, 10, 562, 561);
INSERT INTO public.games VALUES (13, 9, 871, 868);
INSERT INTO public.games VALUES (14, 9, 209, 207);
INSERT INTO public.games VALUES (15, 9, 129, 128);
INSERT INTO public.games VALUES (16, 4, 12, 978);
INSERT INTO public.games VALUES (17, 11, 673, 672);
INSERT INTO public.games VALUES (18, 11, 986, 985);
INSERT INTO public.games VALUES (19, 12, 541, 540);
INSERT INTO public.games VALUES (20, 12, 451, 450);
INSERT INTO public.games VALUES (21, 11, 791, 788);
INSERT INTO public.games VALUES (22, 11, 976, 974);
INSERT INTO public.games VALUES (23, 11, 250, 249);
INSERT INTO public.games VALUES (24, 13, 370, 369);
INSERT INTO public.games VALUES (25, 13, 105, 104);
INSERT INTO public.games VALUES (26, 14, 577, 576);
INSERT INTO public.games VALUES (27, 14, 910, 909);
INSERT INTO public.games VALUES (28, 13, 297, 294);
INSERT INTO public.games VALUES (29, 13, 226, 224);
INSERT INTO public.games VALUES (30, 13, 454, 453);
INSERT INTO public.games VALUES (31, 15, 319, 318);
INSERT INTO public.games VALUES (32, 15, 110, 109);
INSERT INTO public.games VALUES (33, 16, 807, 806);
INSERT INTO public.games VALUES (34, 16, 723, 722);
INSERT INTO public.games VALUES (35, 15, 589, 586);
INSERT INTO public.games VALUES (36, 15, 840, 838);
INSERT INTO public.games VALUES (37, 15, 397, 396);
INSERT INTO public.games VALUES (38, 17, 636, 635);
INSERT INTO public.games VALUES (39, 17, 416, 415);
INSERT INTO public.games VALUES (40, 18, 725, 724);
INSERT INTO public.games VALUES (41, 18, 604, 603);
INSERT INTO public.games VALUES (42, 17, 306, 303);
INSERT INTO public.games VALUES (43, 17, 582, 580);
INSERT INTO public.games VALUES (44, 17, 143, 142);


--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.players VALUES (1, 'Paolo');
INSERT INTO public.players VALUES (2, 'user_1732005808684');
INSERT INTO public.players VALUES (3, 'user_1732005808683');
INSERT INTO public.players VALUES (4, 'Luca');
INSERT INTO public.players VALUES (5, 'user_1732007310619');
INSERT INTO public.players VALUES (6, 'user_1732007310618');
INSERT INTO public.players VALUES (7, 'user_1732008613541');
INSERT INTO public.players VALUES (8, 'user_1732008613540');
INSERT INTO public.players VALUES (9, 'user_1732008741485');
INSERT INTO public.players VALUES (10, 'user_1732008741484');
INSERT INTO public.players VALUES (11, 'user_1732009614212');
INSERT INTO public.players VALUES (12, 'user_1732009614211');
INSERT INTO public.players VALUES (13, 'user_1732009885731');
INSERT INTO public.players VALUES (14, 'user_1732009885730');
INSERT INTO public.players VALUES (15, 'user_1732009961003');
INSERT INTO public.players VALUES (16, 'user_1732009961002');
INSERT INTO public.players VALUES (17, 'user_1732010003325');
INSERT INTO public.players VALUES (18, 'user_1732010003324');


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 44, true);


--
-- Name: players_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.players_user_id_seq', 18, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: players players_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (user_id);


--
-- Name: games games_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.players(user_id);


--
-- PostgreSQL database dump complete
--

