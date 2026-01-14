import { z } from "zod";
import { validationData } from "../constants/validation";

export const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email"),

    password: z
      .string()
      .min(validationData.PASSWORD_MIN_LENGTH, `Password must be at least ${validationData.PASSWORD_MIN_LENGTH} characters (BSI recommendation)`)
      .max(validationData.PASSWORD_MAX_LENGTH, `Password must be shorter than ${validationData.PASSWORD_MAX_LENGTH} characters`)
      .refine((val) => !/\s/.test(val), {
        message: "Password must not contain spaces",
      })
      .refine(
        (val) =>
          [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) =>
            r.test(val)
          ).length >= 3,
        {
          message:
            "Password must include at least 3 of the following: lowercase, uppercase, number, special character",
        }
      )
      .refine(
        (val) =>
          ![
            "123456",
            "123456789",
            "password",
            "qwerty",
            "letmein",
            "abc123",
            "111111",
          ].includes(val.toLowerCase()),
        {
          message: "Password is too common and insecure",
        }
      )
      .refine(
        (val) => !/(1234|abcd|qwerty|password)/i.test(val),
        {
          message: "Password contains insecure patterns",
        }
      ),

    confirmPassword: z.string(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  export type RegisterSchema = z.infer<typeof registerSchema>;