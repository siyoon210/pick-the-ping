drop policy "Enable insert for all users" on "public"."quiz_log";

drop policy "Enable read access for all users" on "public"."quiz_log";

drop policy "Enable read access for all users" on "public"."quiz_publish_log";

drop policy "Enable insert for all users" on "public"."ranking";

drop policy "Enable read access for all users" on "public"."ranking";

create policy "Enable insert access for service role"
on "public"."quiz_log"
as permissive
for insert
to service_role
with check (true);


create policy "Enable read access for service role"
on "public"."quiz_log"
as permissive
for select
to service_role
using (true);


create policy "Enable insert access for service role"
on "public"."quiz_publish_log"
as permissive
for insert
to service_role
with check (true);


create policy "Enable read access for service role"
on "public"."quiz_publish_log"
as permissive
for select
to service_role
using (true);


create policy "Enable insert access for service role"
on "public"."ranking"
as permissive
for insert
to service_role
with check (true);


create policy "Enable read access for service role"
on "public"."ranking"
as permissive
for select
to service_role
using (true);



