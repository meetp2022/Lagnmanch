export function getWelcomeEmailHtml(name?: string): string {
  const displayName = name || "there";
  const siteUrl = "https://lagnamanch.com";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to LagnaManch</title>
</head>
<body style="margin:0;padding:0;background-color:#fdf8f0;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf8f0;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#800020 0%,#5c0018 100%);padding:40px 32px;text-align:center;">
              <table role="presentation" width="60" cellpadding="0" cellspacing="0" style="margin:0 auto 16px;">
                <tr><td style="height:2px;background-color:#CDA144;"></td></tr>
              </table>
              <h1 style="margin:0;font-size:36px;font-weight:bold;color:#ffffff;letter-spacing:1px;">
                <span style="color:#CDA144;">Lagna</span>Manch
              </h1>
              <p style="margin:8px 0 0;font-size:14px;color:#CDA144;letter-spacing:2px;text-transform:uppercase;">
                Kodi Patel Matrimonial Platform
              </p>
              <table role="presentation" width="60" cellpadding="0" cellspacing="0" style="margin:16px auto 0;">
                <tr><td style="height:2px;background-color:#CDA144;"></td></tr>
              </table>
            </td>
          </tr>

          <!-- WELCOME MESSAGE -->
          <tr>
            <td style="padding:40px 32px 24px;">
              <h2 style="margin:0 0 16px;font-size:24px;color:#800020;">
                Welcome, ${displayName}!
              </h2>
              <p style="margin:0 0 16px;font-size:16px;color:#444444;line-height:1.6;">
                Thank you for joining LagnaManch &mdash; a trusted matrimonial platform built specifically for the Kodi Patel community. We are glad to have you as part of our growing family.
              </p>
              <p style="margin:0;font-size:16px;color:#444444;line-height:1.6;">
                Your account has been created successfully. Here is how to get started:
              </p>
            </td>
          </tr>

          <!-- NEXT STEPS -->
          <tr>
            <td style="padding:0 32px 32px;">
              <!-- Step 1 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td width="48" valign="top">
                    <div style="width:40px;height:40px;background-color:#800020;border-radius:50%;color:#CDA144;font-size:18px;font-weight:bold;text-align:center;line-height:40px;">1</div>
                  </td>
                  <td style="padding-left:12px;vertical-align:middle;">
                    <p style="margin:0;font-size:16px;font-weight:600;color:#800020;">Create Your Profile</p>
                    <p style="margin:4px 0 0;font-size:14px;color:#666666;">Fill in your details, upload a photo, and submit your profile for review.</p>
                  </td>
                </tr>
              </table>
              <!-- Step 2 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td width="48" valign="top">
                    <div style="width:40px;height:40px;background-color:#800020;border-radius:50%;color:#CDA144;font-size:18px;font-weight:bold;text-align:center;line-height:40px;">2</div>
                  </td>
                  <td style="padding-left:12px;vertical-align:middle;">
                    <p style="margin:0;font-size:16px;font-weight:600;color:#800020;">Get Verified</p>
                    <p style="margin:4px 0 0;font-size:14px;color:#666666;">Our team will review and approve your profile to ensure trust and authenticity.</p>
                  </td>
                </tr>
              </table>
              <!-- Step 3 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="48" valign="top">
                    <div style="width:40px;height:40px;background-color:#800020;border-radius:50%;color:#CDA144;font-size:18px;font-weight:bold;text-align:center;line-height:40px;">3</div>
                  </td>
                  <td style="padding-left:12px;vertical-align:middle;">
                    <p style="margin:0;font-size:16px;font-weight:600;color:#800020;">Browse Matches</p>
                    <p style="margin:4px 0 0;font-size:14px;color:#666666;">Explore verified profiles from Kodi Patel families and find your perfect match.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA BUTTON -->
          <tr>
            <td style="padding:0 32px 32px;text-align:center;">
              <a href="${siteUrl}/create-profile" style="display:inline-block;background-color:#800020;color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;padding:14px 40px;border-radius:8px;letter-spacing:0.5px;">
                Create Your Profile
              </a>
            </td>
          </tr>

          <!-- DIVIDER -->
          <tr>
            <td style="padding:0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="height:1px;background-color:#e5e5e5;"></td></tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:24px 32px 32px;text-align:center;">
              <p style="margin:0 0 8px;font-size:14px;color:#800020;font-weight:bold;">
                <span style="color:#CDA144;">Lagna</span>Manch
              </p>
              <p style="margin:0 0 4px;font-size:12px;color:#999999;">
                A Kodi Patel Matrimonial Platform
              </p>
              <p style="margin:0 0 12px;font-size:12px;color:#999999;">
                Serving families of Vapi, Umbergaon, Pardi, Daman &amp; Silvassa
              </p>
              <a href="${siteUrl}" style="font-size:12px;color:#CDA144;text-decoration:none;">
                lagnamanch.com
              </a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
