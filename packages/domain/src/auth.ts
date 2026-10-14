import { z } from 'zod';

export const RequestMagicLinkSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .transform((val) => val.trim().toLowerCase())
});

export type RequestMagicLinkInput = z.infer<typeof RequestMagicLinkSchema>;

export const VerifyTokenSchema = z.object({
  token: z.string().min(16, 'Invalid token format')
});

export type VerifyTokenInput = z.infer<typeof VerifyTokenSchema>;
