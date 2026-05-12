--
-- PostgreSQL database dump
--

\restrict W9DqGUdG5Z2jSjjtAbOms6IqoLvq6nFjfATBNt9si8uB6j5QWkdp47fMxxvvE9a

-- Dumped from database version 17.8 (ad62774)
-- Dumped by pg_dump version 18.3

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

DROP INDEX IF EXISTS public."Website_sortOrder_createdAt_idx";
DROP INDEX IF EXISTS public."Website_category_idx";
DROP INDEX IF EXISTS public."AdminUser_username_key";
ALTER TABLE IF EXISTS ONLY public."Website" DROP CONSTRAINT IF EXISTS "Website_pkey";
ALTER TABLE IF EXISTS ONLY public."AdminUser" DROP CONSTRAINT IF EXISTS "AdminUser_pkey";
DROP TABLE IF EXISTS public."Website";
DROP TABLE IF EXISTS public."AdminUser";
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AdminUser; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."AdminUser" (
    id text NOT NULL,
    username text NOT NULL,
    "passwordHash" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Website; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Website" (
    id text NOT NULL,
    name text NOT NULL,
    url text NOT NULL,
    note text DEFAULT ''::text NOT NULL,
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    category text DEFAULT '常用'::text NOT NULL
);


--
-- Data for Name: AdminUser; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."AdminUser" (id, username, "passwordHash", "createdAt", "updatedAt") FROM stdin;
cmp27m90v0000pcwhdwc4inao	admin	$2b$12$1yMA.Xr6iaBcrjgxUEp3b.Qzsw4P4eknX21HvC9JFUHelBTDEtTSu	2026-05-12 05:48:16.303	2026-05-12 05:48:16.303
\.


--
-- Data for Name: Website; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Website" (id, name, url, note, "sortOrder", "createdAt", "updatedAt", category) FROM stdin;
cmp253us50000gwwhhs5ifi8x	Vercel	https://vercel.com	Next.js application deployment platform.	10	2026-05-12 04:37:58.805	2026-05-12 09:21:10.261	部署
cmp253us60001gwwhpzmucy2v	Neon	https://neon.tech	Serverless PostgreSQL database for this project.	20	2026-05-12 04:37:58.805	2026-05-12 09:21:11.122	数据库
\.


--
-- Name: AdminUser AdminUser_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminUser"
    ADD CONSTRAINT "AdminUser_pkey" PRIMARY KEY (id);


--
-- Name: Website Website_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Website"
    ADD CONSTRAINT "Website_pkey" PRIMARY KEY (id);


--
-- Name: AdminUser_username_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "AdminUser_username_key" ON public."AdminUser" USING btree (username);


--
-- Name: Website_category_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Website_category_idx" ON public."Website" USING btree (category);


--
-- Name: Website_sortOrder_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Website_sortOrder_createdAt_idx" ON public."Website" USING btree ("sortOrder", "createdAt");


--
-- PostgreSQL database dump complete
--

\unrestrict W9DqGUdG5Z2jSjjtAbOms6IqoLvq6nFjfATBNt9si8uB6j5QWkdp47fMxxvvE9a

