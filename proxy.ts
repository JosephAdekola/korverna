import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers
    .get("host")
    ?.split(":")[0]
    .toLowerCase();

  if (
    hostname === "infrastructure.korverna.com" ||
    hostname === "infrastructure.localhost"
  ) {
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