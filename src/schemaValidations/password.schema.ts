import z from "zod";

export const PasswordBody = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
      .max(100),
    newPassword: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
      .max(100),
    confirmPassword: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
      .max(100),
  })
  .strict();

export type PasswordBodyType = z.TypeOf<typeof PasswordBody>;
