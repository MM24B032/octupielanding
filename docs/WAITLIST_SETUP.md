# Waitlist setup: Google Sheets (free, unlimited)

The `/api/waitlist` route validates name + email and then forwards the
entry to any HTTPS webhook. This guide wires it to a Google Sheet so you
can collect unlimited signups for free.

Total time: ~10 minutes. No credit card.

---

## 1. Create the sheet

1. Open https://sheets.new and name it `Octupie Waitlist`.
2. In row 1, add these headers in columns A-D:
   ```
   timestamp    name    email    source
   ```

## 2. Add the Apps Script webhook

1. In the sheet: **Extensions -> Apps Script**.
2. Delete the default code and paste:

```javascript
// Octupie waitlist webhook. Appends a row per signup.
function doPost(e) {
  // Must match WAITLIST_WEBHOOK_SECRET in your .env.
  const SECRET = 'REPLACE-WITH-A-LONG-RANDOM-STRING';

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: 'bad json' });
  }

  if (data.secret !== SECRET) {
    return json({ ok: false, error: 'unauthorized' });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    data.createdAt || new Date().toISOString(),
    String(data.name || '').slice(0, 100),
    String(data.email || '').slice(0, 200),
    String(data.source || 'octupie.com').slice(0, 50),
  ]);

  return json({ ok: true });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Replace `REPLACE-WITH-A-LONG-RANDOM-STRING` with a long random value.
   Generate one locally:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Save this value. You will paste it into your env vars in step 4.

4. Click **Save** (disk icon).

## 3. Deploy the Apps Script as a Web App

1. Top right: **Deploy -> New deployment**.
2. Click the gear next to "Select type" -> **Web app**.
3. Fill in:
   - Description: `Octupie waitlist`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**. Authorise the script (Google will warn; it is your own code).
5. Copy the **Web app URL**. It looks like:
   ```
   https://script.google.com/macros/s/AKfy...long-id.../exec
   ```

## 4. Set env vars on your host

### Local (`.env.local`)

```
WAITLIST_WEBHOOK_URL=https://script.google.com/macros/s/AKfy.../exec
WAITLIST_WEBHOOK_SECRET=the-same-long-random-string-from-step-2
```

### Vercel

Project -> **Settings -> Environment Variables**. Add both keys for
Production (and Preview if you want signups from preview URLs to land
in the same sheet). Redeploy so the new values take effect.

### Netlify / Render / Railway / Fly

Same idea. Every host has a UI for env vars. Add the two keys and
redeploy.

## 5. Test it end to end

1. Hit the live site, submit the waitlist form with a test name + email.
2. Open the sheet. A new row should appear within 1-3 seconds.
3. Submit the form 6 times in a row from the same browser. The 6th
   should return a 429 "Too many attempts" because the route
   rate-limits 5 submissions per minute per IP.

If nothing appears:

- Vercel logs (`vercel logs --follow` or the Functions tab in the UI)
  will show whether the webhook call failed.
- Re-deploy the Apps Script (any edit bumps a new version) and paste
  the new URL.
- Double-check the `Anyone` access setting on the web app deployment.
  Google sometimes defaults it back to `Only myself`.

---

## Upgrading later

When the list grows beyond a few thousand and you want real querying,
swap the webhook for one of these without touching the site code:

- **Supabase** (Postgres, generous free tier). Create a table, expose
  a row-insert RPC, point `WAITLIST_WEBHOOK_URL` at the RPC endpoint.
- **Resend Audiences** (purpose-built for email lists). 3k contacts
  free. Their REST API has a `POST /audiences/:id/contacts` endpoint
  that accepts the same shape Octupie already sends.
- **Loops.so**, **Beehiiv**, **MailerLite**. All offer free tiers and
  webhook-compatible contact-creation endpoints.

The API route already sends the right payload shape - you only change
the env vars.

---

## What the route sends

A single JSON POST per signup:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "createdAt": "2026-04-20T08:15:42.219Z",
  "source": "octupie.com",
  "secret": "<your-secret>"
}
```

The Apps Script above ignores everything except `name`, `email`,
`createdAt` and `source`. Whatever downstream tool you switch to,
extract the same four fields.
