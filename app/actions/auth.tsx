"use server";

import { encrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logIn(formData: FormData) {
  const user = { email: formData.get("email"), name: formData.get("username") };
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ user, expires });
  cookies().set("session", session, { expires, httpOnly: true });

  redirect("/");
}

export async function logOut() {
  cookies().set("session", "", { expires: new Date(0) });

  redirect("/");
}
