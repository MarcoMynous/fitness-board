import nodemailer, { type Transporter } from 'nodemailer';
import { renderMagicLinkEmail } from './templates/magicLink';
import { renderPurchaseReceiptEmail } from './templates/purchaseReceipt';

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  auth?: {
    user: string;
    pass: string;
  };
}

let cachedTransporter: Transporter | null = null;

export function getSmtpConfig(): SmtpConfig | null {
  const host =
    process.env.SMTP_HOST?.trim() ||
    ((process.env.SMTP_USER?.includes('@gmail.com') || process.env.EMAIL_FROM?.includes('@gmail.com'))
      ? 'smtp.gmail.com'
      : '');

  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  const rawUser = process.env.SMTP_USER?.trim() || process.env.EMAIL_FROM?.trim();
  const rawPass = process.env.SMTP_PASSWORD?.trim();

  if (!host && !rawPass) {
    return null;
  }

  const effectiveHost = host || 'smtp.gmail.com';
  // Strip spaces from password if it is formatted as Google App Password (4x4)
  const effectivePass = rawPass ? rawPass.replace(/\s+/g, '') : '';
  const effectiveUser = rawUser ? rawUser.replace(/.*<([^>]+)>.*/, '$1') : '';

  return {
    host: effectiveHost,
    port,
    secure,
    ...(effectiveUser && effectivePass
      ? {
          auth: {
            user: effectiveUser,
            pass: effectivePass,
          },
        }
      : {}),
  };
}

export function getTransporter(): Transporter | null {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const config = getSmtpConfig();
  if (!config) {
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  return cachedTransporter;
}

export function getSenderEmail(): string {
  const from = process.env.EMAIL_FROM?.trim();
  if (!from) {
    return 'Kinfolk & Core <ulonnamugochukwu@gmail.com>';
  }
  if (from.includes('<') && from.includes('>')) {
    return from;
  }
  return `Kinfolk & Core <${from}>`;
}

// In-memory debug storage for development
export const lastDevEmail: {
  recipient: string;
  subject: string;
  verifyUrl: string;
  timestamp: Date;
} | null = null;

export async function sendMagicLinkEmail({
  email,
  verifyUrl,
}: {
  email: string;
  verifyUrl: string;
}) {
  const html = renderMagicLinkEmail({ verifyUrl, recipientEmail: email });
  const subject = 'Your Secure Access Link — Kinfolk & Core';
  const transporter = getTransporter();
  const from = getSenderEmail();

  if (!transporter) {
    console.log('\n================== [DEV MAGIC LINK EMAIL (NODEMAILER MOCK)] ==================');
    console.log(`To: ${email}`);
    console.log(`From: ${from}`);
    console.log(`Subject: ${subject}`);
    console.log(`Verification URL: ${verifyUrl}`);
    console.log('==============================================================================\n');

    (globalThis as any).__LAST_DEV_MAGIC_LINK__ = {
      email,
      verifyUrl,
      timestamp: new Date(),
    };
    return { success: true, mode: 'dev_mock' };
  }

  try {
    const info = await transporter.sendMail({
      from,
      to: email,
      subject,
      html,
    });

    console.log(`[Nodemailer SMTP] Magic link sent to ${email}: ${info.messageId}`);
    return { success: true, data: { id: info.messageId } };
  } catch (error: any) {
    console.error('Failed to send magic link via Nodemailer SMTP:', error?.message || error);
    throw error;
  }
}

export async function sendPurchaseReceiptEmail({
  email,
  productName,
  amountFormatted,
  verifyUrl,
}: {
  email: string;
  productName: string;
  amountFormatted: string;
  verifyUrl: string;
}) {
  const html = renderPurchaseReceiptEmail({
    productName,
    amountFormatted,
    verifyUrl,
    recipientEmail: email,
  });
  const subject = `Welcome to ${productName} — Kinfolk & Core`;
  const transporter = getTransporter();
  const from = getSenderEmail();

  if (!transporter) {
    console.log('\n================== [DEV RECEIPT EMAIL (NODEMAILER MOCK)] ==================');
    console.log(`To: ${email}`);
    console.log(`Product: ${productName} (${amountFormatted})`);
    console.log(`Sign-In URL: ${verifyUrl}`);
    console.log('===========================================================================\n');
    return { success: true, mode: 'dev_mock' };
  }

  try {
    const info = await transporter.sendMail({
      from,
      to: email,
      subject,
      html,
    });

    console.log(`[Nodemailer SMTP] Purchase receipt sent to ${email}: ${info.messageId}`);
    return { success: true, data: { id: info.messageId } };
  } catch (error: any) {
    console.error('Failed to send purchase receipt via Nodemailer SMTP:', error?.message || error);
    throw error;
  }
}
