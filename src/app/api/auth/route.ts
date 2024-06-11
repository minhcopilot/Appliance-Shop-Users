export async function POST(request: Request) {
  const res = await request.json();
  if (!res || !res.token || !res.user) {
    return Response.json(
      { message: "Token or user not found" },
      { status: 401 }
    );
  }

  const maxAge = 30 * 24 * 60 * 60; // 7 ngày
  const userCookie = encodeURIComponent(JSON.stringify(res.user));

  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": [
        `sessionToken=${res.token}; Path=/; HttpOnly; Max-Age=${maxAge};`,
        `user=${userCookie}; Path=/; HttpOnly; Max-Age=${maxAge};`,
      ].join(", "),
    },
  });
}
