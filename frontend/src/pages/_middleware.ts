import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_LOGOUT_URL } from "../constants";

export async function middleware(req: NextRequest) {
  // Add the user token to the response

  // console.log("middleware req: ", req);
  // console.log("req: ", req.headers);
  // console.log("url: ", req.url);
  // console.log("cookies: ", req.cookies);
  // console.log("x-session: ", req.cookies["x-session"]);

  // home page
  if (req.url === "/") {
    // redirect to login if no active session
    if (!req.cookies["x-session"]) {
      return NextResponse.redirect("/login");
    }
  }

  // // login page
  // if (req.url === "/login") {
  //   console.log("using login page");
  //   // redirect back to home page if already loggedin
  //   if (req.cookies["x-session"] !== null) {
  //     console.log("redirecting to home page");
  //     NextResponse.redirect("/");
  //   }
  // }

  return NextResponse.next();
}
