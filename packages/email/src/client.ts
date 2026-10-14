import { Resend } from 'resend';
import { renderMagicLinkEmail } from './templates/magicLink';
import { renderPurchaseReceiptEmail } from './templates/purchaseReceipt';

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || 'Fitness Platform <noreply@fitness.example.com>';

export const resend = apiKey ? new Resend(apiKey) : null;

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
  const subject = 'Your Secure Sign-In Link';

  if (!resend) {
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
    const data = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send magic link via Resend:', error);
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
  const subject = `Your Access to ${productName}`;

  if (!resend) {
    console.log('\n================== [DEV RECEIPT EMAIL] ==================');
    console.log(`To: ${email}`);
    console.log(`Product: ${productName} (${amountFormatted})`);
    console.log(`Sign-In URL: ${verifyUrl}`);
    console.log('=========================================================\n');
    return { success: true, mode: 'dev_logged' };
  }

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send purchase receipt via Resend:', error);
    throw error;
  }
}
