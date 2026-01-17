// validation/registerSchema.ts
import { PASSWORD_LIMITS } from "@/src/constants/validation/limits";
import { checkPasswordRules } from "@/src/validation/CheckPasswords";
import { z } from "zod";
export const registerSchema = z
  .object({
    email: z
      .string()
      .email("Bitte eine gültige E‑Mail-Adresse eingeben."),

    password: z
      .string()
      .refine((val) => checkPasswordRules(val).length, {
        message: `Das Passwort muss mindestens ${PASSWORD_LIMITS.MIN_LENGTH} Zeichen lang sein.`,
      })
      .refine((val) => checkPasswordRules(val).maxLength, {
        message: `Das Passwort darf höchstens ${PASSWORD_LIMITS.MAX_LENGTH} Zeichen lang sein.`,
      })
      .refine((val) => checkPasswordRules(val).lower, {
        message: "Mindestens ein Kleinbuchstabe erforderlich.",
      })
      .refine((val) => checkPasswordRules(val).upper, {
        message: "Mindestens ein Großbuchstabe erforderlich.",
      })
      .refine((val) => checkPasswordRules(val).number, {
        message: "Mindestens eine Zahl erforderlich.",
      })
      .refine((val) => checkPasswordRules(val).special, {
        message: "Mindestens ein Sonderzeichen erforderlich.",
      })
      .refine((val) => checkPasswordRules(val).complexity, {
        message:
          "Das Passwort muss 3 der folgenden enthalten: Kleinbuchstaben, Großbuchstaben, Zahl, Sonderzeichen.",
      })
      .refine((val) => checkPasswordRules(val).common, {
        message: "Dieses Passwort ist unsicher und wird häufig verwendet.",
      })
      .refine((val) => checkPasswordRules(val).pattern, {
        message: "Das Passwort enthält unsichere Muster.",
      }),

    confirmPassword: z.string(),

    agreed: z
      .boolean()
      .refine((val) => val === true, {
        message: "Bitte AGB und Datenschutz bestätigen.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Die Passwörter stimmen nicht überein.",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
