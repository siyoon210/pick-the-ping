create table "public"."ranking" (
    "id" bigint generated by default as identity not null,
    "score" integer not null,
    "name" character varying not null,
    "message" character varying,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."ranking" enable row level security;

CREATE INDEX ranking_created_at_idx ON public.ranking USING btree (created_at);

CREATE UNIQUE INDEX ranking_pkey ON public.ranking USING btree (id);

CREATE INDEX ranking_score_idx ON public.ranking USING btree (score);

alter table "public"."ranking" add constraint "ranking_pkey" PRIMARY KEY using index "ranking_pkey";

grant delete on table "public"."ranking" to "anon";

grant insert on table "public"."ranking" to "anon";

grant references on table "public"."ranking" to "anon";

grant select on table "public"."ranking" to "anon";

grant trigger on table "public"."ranking" to "anon";

grant truncate on table "public"."ranking" to "anon";

grant update on table "public"."ranking" to "anon";

grant delete on table "public"."ranking" to "authenticated";

grant insert on table "public"."ranking" to "authenticated";

grant references on table "public"."ranking" to "authenticated";

grant select on table "public"."ranking" to "authenticated";

grant trigger on table "public"."ranking" to "authenticated";

grant truncate on table "public"."ranking" to "authenticated";

grant update on table "public"."ranking" to "authenticated";

grant delete on table "public"."ranking" to "service_role";

grant insert on table "public"."ranking" to "service_role";

grant references on table "public"."ranking" to "service_role";

grant select on table "public"."ranking" to "service_role";

grant trigger on table "public"."ranking" to "service_role";

grant truncate on table "public"."ranking" to "service_role";

grant update on table "public"."ranking" to "service_role";

create policy "Enable insert for all users"
on "public"."ranking"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."ranking"
as permissive
for select
to public
using (true);



