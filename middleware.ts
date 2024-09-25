import { NextRequest } from "next/server";
import { updateSession } from "./lib/session";

// Keep updating the session everyTime next makes a req
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
