import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getVisitorId } from "./helpers/cookies";

export async function middleware(request: NextRequest) {
  const visitor = getVisitorId();
  if (process.env.NODE_ENV !== "development" && visitor) {
    return NextResponse.redirect(new URL(`/shots/popular`, request.url));
  }
}

export const config = {
  matcher: ["/"],
};
