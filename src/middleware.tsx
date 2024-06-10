import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = [
  "/profile",
  "/profile/order",
  "/profile/password",
  "/profile/voucher",
];
const authPaths = ["/login", "/register"];
//check user khi vào website
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;
  //Nếu chưa đăng nhập vào các trang private thì sẽ redirect với trang login
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  //Nếu đăng nhập rồi thì sẽ redirect với trang /profile
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  //còn ko đúng điều kiện thì next()
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/profile/order",
    "/profile/password",
    "/profile/voucher",
    "/login",
    "/register",
  ],
};
