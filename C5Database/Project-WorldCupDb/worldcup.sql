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

DROP DATABASE worldcup;
--
-- Name: worldcup; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE worldcup WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE worldcup OWNER TO freecodecamp;

\connect worldcup

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
    year integer NOT NULL,
    round character varying(20) NOT NULL,
    winner_id integer NOT NULL,
    opponent_id integer NOT NULL,
    winner_goals integer NOT NULL,
    opponent_goals integer NOT NULL
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
-- Name: teams; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.teams (
    team_id integer NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE public.teams OWNER TO freecodecamp;

--
-- Name: teams_team_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.teams_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teams_team_id_seq OWNER TO freecodecamp;

--
-- Name: teams_team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.teams_team_id_seq OWNED BY public.teams.team_id;


--
-- Name: games game_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);


--
-- Name: teams team_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams ALTER COLUMN team_id SET DEFAULT nextval('public.teams_team_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.games VALUES (65, 2018, 'Final', 322, 323, 4, 2);
INSERT INTO public.games VALUES (66, 2018, 'Third Place', 324, 325, 2, 0);
INSERT INTO public.games VALUES (67, 2018, 'Semi-Final', 323, 325, 2, 1);
INSERT INTO public.games VALUES (68, 2018, 'Semi-Final', 322, 324, 1, 0);
INSERT INTO public.games VALUES (69, 2018, 'Quarter-Final', 323, 331, 3, 2);
INSERT INTO public.games VALUES (70, 2018, 'Quarter-Final', 325, 333, 2, 0);
INSERT INTO public.games VALUES (71, 2018, 'Quarter-Final', 324, 335, 2, 1);
INSERT INTO public.games VALUES (72, 2018, 'Quarter-Final', 322, 337, 2, 0);
INSERT INTO public.games VALUES (73, 2018, 'Eighth-Final', 325, 339, 2, 1);
INSERT INTO public.games VALUES (74, 2018, 'Eighth-Final', 333, 341, 1, 0);
INSERT INTO public.games VALUES (75, 2018, 'Eighth-Final', 324, 343, 3, 2);
INSERT INTO public.games VALUES (76, 2018, 'Eighth-Final', 335, 345, 2, 0);
INSERT INTO public.games VALUES (77, 2018, 'Eighth-Final', 323, 347, 2, 1);
INSERT INTO public.games VALUES (78, 2018, 'Eighth-Final', 331, 349, 2, 1);
INSERT INTO public.games VALUES (79, 2018, 'Eighth-Final', 337, 351, 2, 1);
INSERT INTO public.games VALUES (80, 2018, 'Eighth-Final', 322, 353, 4, 3);
INSERT INTO public.games VALUES (81, 2014, 'Final', 354, 353, 1, 0);
INSERT INTO public.games VALUES (82, 2014, 'Third Place', 356, 335, 3, 0);
INSERT INTO public.games VALUES (83, 2014, 'Semi-Final', 353, 356, 1, 0);
INSERT INTO public.games VALUES (84, 2014, 'Semi-Final', 354, 335, 7, 1);
INSERT INTO public.games VALUES (85, 2014, 'Quarter-Final', 356, 363, 1, 0);
INSERT INTO public.games VALUES (86, 2014, 'Quarter-Final', 353, 324, 1, 0);
INSERT INTO public.games VALUES (87, 2014, 'Quarter-Final', 335, 339, 2, 1);
INSERT INTO public.games VALUES (88, 2014, 'Quarter-Final', 354, 322, 1, 0);
INSERT INTO public.games VALUES (89, 2014, 'Eighth-Final', 335, 371, 2, 1);
INSERT INTO public.games VALUES (90, 2014, 'Eighth-Final', 339, 337, 2, 0);
INSERT INTO public.games VALUES (91, 2014, 'Eighth-Final', 322, 375, 2, 0);
INSERT INTO public.games VALUES (92, 2014, 'Eighth-Final', 354, 377, 2, 1);
INSERT INTO public.games VALUES (93, 2014, 'Eighth-Final', 356, 345, 2, 1);
INSERT INTO public.games VALUES (94, 2014, 'Eighth-Final', 363, 381, 2, 1);
INSERT INTO public.games VALUES (95, 2014, 'Eighth-Final', 353, 341, 1, 0);
INSERT INTO public.games VALUES (96, 2014, 'Eighth-Final', 324, 385, 2, 1);


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.teams VALUES (322, 'France');
INSERT INTO public.teams VALUES (323, 'Croatia');
INSERT INTO public.teams VALUES (324, 'Belgium');
INSERT INTO public.teams VALUES (325, 'England');
INSERT INTO public.teams VALUES (331, 'Russia');
INSERT INTO public.teams VALUES (333, 'Sweden');
INSERT INTO public.teams VALUES (335, 'Brazil');
INSERT INTO public.teams VALUES (337, 'Uruguay');
INSERT INTO public.teams VALUES (339, 'Colombia');
INSERT INTO public.teams VALUES (341, 'Switzerland');
INSERT INTO public.teams VALUES (343, 'Japan');
INSERT INTO public.teams VALUES (345, 'Mexico');
INSERT INTO public.teams VALUES (347, 'Denmark');
INSERT INTO public.teams VALUES (349, 'Spain');
INSERT INTO public.teams VALUES (351, 'Portugal');
INSERT INTO public.teams VALUES (353, 'Argentina');
INSERT INTO public.teams VALUES (354, 'Germany');
INSERT INTO public.teams VALUES (356, 'Netherlands');
INSERT INTO public.teams VALUES (363, 'Costa Rica');
INSERT INTO public.teams VALUES (371, 'Chile');
INSERT INTO public.teams VALUES (375, 'Nigeria');
INSERT INTO public.teams VALUES (377, 'Algeria');
INSERT INTO public.teams VALUES (381, 'Greece');
INSERT INTO public.teams VALUES (385, 'United States');


--
-- Name: games_game_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.games_game_id_seq', 96, true);


--
-- Name: teams_team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.teams_team_id_seq', 385, true);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (game_id);


--
-- Name: teams teams_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_name_key UNIQUE (name);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (team_id);


--
-- Name: games fk_opponent_id; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT fk_opponent_id FOREIGN KEY (opponent_id) REFERENCES public.teams(team_id);


--
-- Name: games fk_winnder_id; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT fk_winnder_id FOREIGN KEY (winner_id) REFERENCES public.teams(team_id);


--
-- PostgreSQL database dump complete
--

