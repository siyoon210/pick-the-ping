drop policy "Enable insert access for service role" on "public"."quiz_log";

drop index if exists "public"."quiz_log_quiz_token_idx";

create policy "Enable insert for service role"
on "public"."quiz_log"
as permissive
for insert
to service_role
with check (true);



