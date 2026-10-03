import { seedProducts } from "@/lib/catalog";
import { defaultContent } from "@/lib/content";

export const dynamic = "force-dynamic";

function response(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function GET(request: Request) {
  const view = new URL(request.url).searchParams.get("view") || "bootstrap";

  if (view === "bootstrap") {
    return response({
      products: seedProducts,
      cart: [],
      wishlist: [],
      user: null,
      isAdmin: false,
      content: defaultContent,
      announcements: [],
    });
  }

  if (view === "announcements") {
    return response({ announcements: [] });
  }

  return response({ error: "sessionError" }, 401);
}

export async function POST() {
  return response({ error: "sessionError" }, 401);
}
