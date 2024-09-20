import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = createClient();
  const data = await supabase.from("teenieping").select('*');
  const data2 = await supabase.from("teenieping_image").select('*');
  return (
    <>
    <h1>hello NextJs</h1>
    <p>${JSON.stringify(data)}</p>
      <br/>
    <p>${JSON.stringify(data2)}</p>
    </>
  );
}
