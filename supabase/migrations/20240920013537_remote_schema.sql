create policy "Enable read access for all users"
on "public"."teenieping"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."teenieping_image"
as permissive
for select
to public
using (true);



