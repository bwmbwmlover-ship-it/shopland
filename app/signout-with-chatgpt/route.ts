function target(request: Request) {
  return new URL("/", request.url);
}

export async function GET(request: Request) {
  return Response.redirect(target(request), 302);
}

export async function POST(request: Request) {
  return Response.redirect(target(request), 303);
}
