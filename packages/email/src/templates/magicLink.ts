export function renderMagicLinkEmail({
  verifyUrl,
  recipientEmail
}: {
  verifyUrl: string;
  recipientEmail: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Your Secure Sign-In Link</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 40px 20px; color: #1C1917; }
    .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2DA; padding: 40px; box-shadow: 0 4px 12px rgba(28,25,23,0.04); }
    .brand { font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #6B1728; margin-bottom: 24px; }
    h1 { font-size: 24px; font-weight: 700; color: #1C1917; margin: 0 0 16px; line-height: 1.3; }
    p { font-size: 15px; line-height: 1.6; color: #57534E; margin: 0 0 24px; }
    .button { display: inline-block; background-color: #6B1728; color: #ffffff !important; padding: 14px 28px; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 8px; margin-bottom: 24px; }
    .notice { font-size: 13px; color: #78716C; border-top: 1px solid #E7E2DA; padding-top: 20px; margin-top: 32px; }
    .link-alt { font-size: 12px; color: #A8A29E; word-break: break-all; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand">Creator Training & Nutrition</div>
    <h1>Your Access Link is Ready</h1>
    <p>Click the button below to sign in to your member account (${recipientEmail}). This single-use link expires in 15 minutes.</p>
    <a href="${verifyUrl}" class="button">Access Member Area</a>
    <p class="notice">
      If you did not request this link or have questions, you can safely ignore this email.
    </p>
    <p class="link-alt">
      Or copy and paste this URL into your browser:<br>
      ${verifyUrl}
    </p>
  </div>
</body>
</html>
  `.trim();
}
