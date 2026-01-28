import { z } from "zod";

export const emailSchema = z
    .object({
        email: z
            .string()
            .email("Bitte eine gültige E‑Mail-Adresse eingeben."),
    });

export type EmailSchema = z.infer<typeof emailSchema>;