// utils/sessionUtils.ts
import { cookies } from "next/headers";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  exp: number;
}

let lastCheckTime = 0; // Biến lưu trữ thời gian của lần kiểm tra cuối cùng
let allowCheck = true; // Biến đánh dấu cho phép kiểm tra

export const isSessionTokenExpired = () => {
  const cookieStore = cookies();
  const sessionToken: string | undefined =
    cookieStore.get("sessionToken")?.value;

  // Nếu không cho phép kiểm tra hoặc khoảng cách từ lần kiểm tra cuối cùng < 60 giây
  if (!allowCheck || Date.now() - lastCheckTime < 60000) {
    return false; // Không kiểm tra nếu chưa đến thời gian 60 giây
  }

  allowCheck = false; // Đánh dấu không cho phép kiểm tra trong vòng 60 giây tiếp theo

  if (!sessionToken) {
    // Không có sessionToken
    return true;
  }

  try {
    const decodedToken: DecodedToken = jwtDecode(sessionToken);

    // Kiểm tra xem decodedToken có chứa thuộc tính exp hay không
    if (!decodedToken.hasOwnProperty("exp")) {
      console.error("Invalid token format");
      return true;
    }

    const currentTime = Date.now() / 1000;
    const isExpired = decodedToken.exp < currentTime; // Kiểm tra thời gian hết hạn

    lastCheckTime = Date.now(); // Cập nhật thời gian của lần kiểm tra hiện tại
    allowCheck = true; // Cho phép kiểm tra sau 60 giây kể từ lúc này

    return isExpired;
  } catch (err) {
    console.error("Error decoding token:", err);
    lastCheckTime = Date.now(); // Cập nhật thời gian của lần kiểm tra hiện tại
    allowCheck = true; // Cho phép kiểm tra sau 60 giây kể từ lúc này
    return true; // Lỗi giải mã token, coi như hết hạn
  }
};
