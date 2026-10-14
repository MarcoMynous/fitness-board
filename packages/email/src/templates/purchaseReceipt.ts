export function renderPurchaseReceiptEmail({
  productName,
  amountFormatted,
  verifyUrl,
  recipientEmail
}: {
  productName: string;
  amountFormatted: string;
  verifyUrl: string;
  recipientEmail: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Payment Receipt & Access</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 40px 20px; color: #1C1917; }
    .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E7E2DA; padding: 40px; box-shadow: 0 4px 12px rgba(28,25,23,0.04); }
    .brand { font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #6B1728; margin-bottom: 24px; }
    h1 { font-size: 24px; font-weight: 700; color: #1C1917; margin: 0 0 16px; line-height: 1.3; }
    .receipt-box { background: #FAF8F5; border-radius: 8px; border: 1px solid #E7E2DA; padding: 20px; margin: 24px 0; }
    .receipt-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
    .button { display: inline-block; background-color: #6B1728; color: #ffffff !important; padding: 14px 28px; font-size: 15px; font-weight: 600; text-decoration: none; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand">Creator Training & Nutrition</div>
    <h1>Welcome to the Platform</h1>
    <p>Thank you for your purchase! Your access to <strong>${productName}</strong> is now confirmed for ${recipientEmail}.</p>
    
    <div class="receipt-box">
      <div class="receipt-row"><strong>Item:</strong> <span>${productName}</span></div>
      <div class="receipt-row"><strong>Amount Paid:</strong> <span>${amountFormatted}</span></div>
      <div class="receipt-row"><strong>Status:</strong> <span>Confirmed & Entitled</span></div>
    </div>

    <p>Use the link below to sign in and begin your training or cookbook experience:</p>
    <a href="${verifyUrl}" class="button">Sign In to Dashboard</a>
  </div>
</body>
</html>
  `.trim();
}
