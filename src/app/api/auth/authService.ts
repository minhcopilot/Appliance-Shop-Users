import axios from "axios";

export const apiLoginSuccess = (email: any) =>
  new Promise(async (resolve, reject) => {
    try {
      let response: any = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_baseURL}/user/auth/login-success`,
        data: {
          email: email,
        },
      });

      resolve(response); // Trả lại response khi request thành công
    } catch (error) {
      reject(error);
    }
  });
