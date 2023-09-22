import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // if (token) {
  //   return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  // }
}

// export const config = {
//   matcher: ["/((?!login|signup).{1,})"],
// };

// matcher needs to be changed
