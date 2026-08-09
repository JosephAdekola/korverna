import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.toLocaleLowerCase()

  console.log({hostname});
  

  if (hostname?.startsWith("infrastructure")) {
    return NextResponse.rewrite(
      new URL("/infrastructure", request.url)
    );
  } else if(hostname?.startsWith("korverna")) {
    return NextResponse.rewrite(
        new URL("/welcome", request.url)
    )
  }

//   return NextResponse.rewrite(
//     new URL("/welcome", request.url)
//   );
}

export const config = {
  matcher: ["/"],
};