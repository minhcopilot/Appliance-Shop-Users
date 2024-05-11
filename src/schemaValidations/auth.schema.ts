import z from "zod";

export const RegisterBody = z
  .object({
    firstName: z.string().min(2, {
      message: "Họ người dùng phải có ít nhất 2 ký tự.",
    }),
    lastName: z.string().min(2, {
      message: "Tên người dùng phải có ít nhất 2 ký tự.",
    }),
    email: z.string().email({ message: "Email không đúng định dạng" }),
    phoneNumber: z
      .string()
      .regex(/^(?:\+?84|0)(3[2-9]|5[689]|7[0|6-9]|8[1-6]|9\d)(\d{7})$/, {
        message: "số điện thoại không đúng định dạng",
      }),
    password: z
      .string()
      .min(6, { message: "Mật khẩu tối phải có ít nhất 6 ký tự" })
      .max(100),
  })
  .strict();

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
  }),
  message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z
  .object({
    email: z.string().email({ message: "Email không đúng định dạng" }),
    password: z
      .string()
      .min(6, { message: "Mật khẩu tối phải có ít nhất 6 ký tự" })
      .max(100),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const ForgotPassBody = z
  .object({
    email: z.string().email({ message: "Email không đúng định dạng" }),
  })
  .strict();

export type ForgotPassType = z.TypeOf<typeof ForgotPassBody>;

export const ResetPassBody = z
  .object({
    password: z
      .string()
      .min(6, { message: "Mật khẩu tối phải có ít nhất 6 ký tự" })
      .max(100),
  })
  .strict();

export type ResetPassType = z.TypeOf<typeof ResetPassBody>;

export const LoginRes = RegisterRes;

export type LoginResType = z.TypeOf<typeof LoginRes>;
