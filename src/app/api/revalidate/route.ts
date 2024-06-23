import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const type = request.nextUrl.searchParams.get("type");

  if (path) {
    revalidatePath(path, (type as "layout" | "page") || "page");
    console.log(`Revalidated path: ${path} with type: ${type}`);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path to revalidate",
  });
}
