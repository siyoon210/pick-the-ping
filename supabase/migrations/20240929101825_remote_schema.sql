alter table "public"."quiz_log" drop column "timer";

alter table "public"."quiz_log" add column "timer" double precision not null;


