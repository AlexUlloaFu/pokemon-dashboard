import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { logOut } from "../actions/auth";

async function UserProfile() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div>
      <Label>
        Welcome back! <strong>{session.user.name}</strong>
      </Label>
      <form className=" flex justify-end" action={logOut}>
        <Button type="submit" className="py-0">
          Logout
        </Button>
      </form>
    </div>
  );
}

export default UserProfile;
