import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  if (!sessionToken) {
    return Response.json({ message: "Token not found" }, { status: 401 });
  }

  const cookieHeaders = [
    `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
    // Optionally, clear the user cookie if it exists
    `user=; Path=/; HttpOnly; Max-Age=0`,
  ].join(", ");

  return Response.json(
    { message: "Logged out successfully" },
    {
      status: 200,
      headers: {
        "Set-Cookie": cookieHeaders,
      },
    }
  );
}
