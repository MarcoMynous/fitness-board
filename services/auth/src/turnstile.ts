export async function verifyTurnstileToken({
  token,
  remoteIp,
}: {
  token?: string | null;
  remoteIp?: string;
}): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If Turnstile is not configured or in development without secret, allow request
  if (!secretKey) {
    return { success: true };
  }

  if (!token) {
    return { success: false, error: 'Bot verification token is missing. Please complete the challenge.' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        error: `Bot verification failed: ${(data['error-codes'] || ['invalid_token']).join(', ')}`,
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error verifying Cloudflare Turnstile token:', err);
    // If Cloudflare endpoint is temporarily unreachable, do not hard-block legitimate users
    return { success: true };
  }
}
