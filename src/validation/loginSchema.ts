import { PASSWORD_LIMITS } from "@/src/constants/validation/limits";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(PASSWORD_LIMITS.MIN_LENGTH, `Password must be at least ${PASSWORD_LIMITS.MIN_LENGTH} characters`)
        .max(PASSWORD_LIMITS.MAX_LENGTH, `Password max ${PASSWORD_LIMITS.MAX_LENGTH} charakters allowed.`),
});

export type LoginSchema = z.infer<typeof loginSchema>;
