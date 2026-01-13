import { validationData } from '@/src/constants/validation';
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(validationData.PASSWORD_MIN_LENGTH, `Password must be at least ${validationData.PASSWORD_MIN_LENGTH} characters`)
        .max(validationData.PASSWORD_MAX_LENGTH, `Password max ${validationData.PASSWORD_MAX_LENGTH} charakters allowed.`),
});

export type LoginSchema = z.infer<typeof loginSchema>;
