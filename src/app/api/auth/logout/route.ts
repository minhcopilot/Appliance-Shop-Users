import { cookies } from "next/headers";

//api logout next server xoá session token của client
export async function POST(request: Request) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  if (!sessionToken) {
    return Response.json({ message: "Token not found" }, { status: 401 });
  }
  sessionToken.value = "";
  return Response.json(sessionToken, {
    status: 200,
    headers: {
      //xoá cookie sessionToken
      "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
    },
  });
}
