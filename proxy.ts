import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
//   const hostname = request.headers.get("host")?.toLocaleLowerCase()

const reqUrl = request.url

  if (reqUrl.startsWith("https://www.infrastructure")) {
    return NextResponse.rewrite(
      new URL("/infrastructure", request.url)
    );
  }

  return NextResponse.rewrite(
    new URL("/welcome", request.url)
  );
}

export const config = {
  matcher: ["/"],
};