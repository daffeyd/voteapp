import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/action";

export default async function Home() {
  // const supabase = createClient();
  // const setNewView = async () => {
  //   const { data, error } = await supabase.from("views").insert({
  //     name: "random name",
  //   });
  //   if (data) console.log(data);
  //   if (error) console.log(error);
  // };
  // setNewView();
  return (
    <div>
      Logged In
      <form>
        <button formAction={signOut}>Logout</button>
      </form>
    </div>
  );
}
