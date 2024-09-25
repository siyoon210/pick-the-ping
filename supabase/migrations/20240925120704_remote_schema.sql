alter table "public"."quiz_log" drop column "timer";

alter table "public"."quiz_log" add column "timer" integer not null;

CREATE INDEX ranking_quiz_token_idx ON public.ranking USING btree (quiz_token);

CREATE UNIQUE INDEX ranking_quiz_token_key ON public.ranking USING btree (quiz_token);

alter table "public"."ranking" add constraint "ranking_quiz_token_key" UNIQUE using index "ranking_quiz_token_key";


