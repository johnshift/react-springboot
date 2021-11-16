import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Add the user token to the response

  console.log("/login middleware x-session: ", req.cookies["x-session"]);

  if (!!req.cookies["x-session"]) {
    console.log("redirecting to home page");
    return NextResponse.redirect("/");
  }

  return NextResponse.next();
}
