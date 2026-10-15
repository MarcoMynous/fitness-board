import { betterAuth } from 'better-auth';
import { magicLink } from 'better-auth/plugins';
import { sendMagicLinkEmail } from '@repo/email';

export const auth = betterAuth({
  secret: process.env.AUTH_SECRET || 'dev_auth_secret_kinfolk_and_core_key_minimum_32_chars',
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await sendMagicLinkEmail({
          email,
          verifyUrl: url,
        });
      },
    }),
  ],
});
