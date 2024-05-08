//api next server session token vào cookie của client
export async function POST(request: Request) {
  const res = await request.json();
  if (!res) {
    return Response.json({ message: "Token not found" }, { status: 401 });
  }
  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${res}; Path=/; HttpOnly; `,
    },
  });
}
