import { Resend } from 'resend';
import { renderMagicLinkEmail } from './templates/magicLink';
import { renderPurchaseReceiptEmail } from './templates/purchaseReceipt';

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

export const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// In-memory debug storage for local development testing
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
  const client = getResend();
  const from = process.env.RESEND_FROM_EMAIL || 'Kinfolk & Core <onboarding@resend.dev>';

  if (!client) {
    console.log('\n================== [DEV MAGIC LINK EMAIL] ==================');
    console.log(`To: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Verification URL: ${verifyUrl}`);
    console.log('============================================================\n');

    (globalThis as any).__LAST_DEV_MAGIC_LINK__ = {
      email,
      verifyUrl,
      timestamp: new Date()
    };
    return { success: true, mode: 'dev_logged' };
  }

  try {
    const response = await client.emails.send({
      from,
      to: [email],
      subject,
      html,
    });

    if (response.error) {
      console.error('[Resend Magic Link Error]:', response.error);
      throw new Error(response.error.message);
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Failed to send magic link via Resend:', error?.message || error);
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
  const client = getResend();
  const from = process.env.RESEND_FROM_EMAIL || 'Kinfolk & Core <onboarding@resend.dev>';

  if (!client) {
    console.log('\n================== [DEV RECEIPT EMAIL] ==================');
    console.log(`To: ${email}`);
    console.log(`Product: ${productName} (${amountFormatted})`);
    console.log(`Sign-In URL: ${verifyUrl}`);
    console.log('=========================================================\n');
    return { success: true, mode: 'dev_logged' };
  }

  try {
    const response = await client.emails.send({
      from,
      to: [email],
      subject,
      html,
    });

    if (response.error) {
      console.error('[Resend Receipt Error]:', response.error);
      throw new Error(response.error.message);
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Failed to send purchase receipt via Resend:', error?.message || error);
    throw error;
  }
}
