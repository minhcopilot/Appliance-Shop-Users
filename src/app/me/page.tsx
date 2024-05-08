import Profile from "@/app/me/profile";
import { axiosClient } from "@/lib/axiosClient";
import { cookies } from "next/headers";

//page của server component
export default async function MeProfile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result: any = await axiosClient.get("/customers", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken?.value}`,
    },
  });

  return (
    <div>
      <h1>Profile</h1>
      <div>xin chao {result.data.payload.data.customer[0].lastName}</div>
      <Profile />
    </div>
  );
}
