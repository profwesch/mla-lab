# Auto-fill bridge for the MLA Essay Template (optional, one-time setup)

This is the piece that gets you the rest of the way to what you originally
pictured: a student finishes the lab and lands on a personal copy of the MLA
template with their name and the date **already typed into the document**,
not just a correctly-named file.

It only touches the student's own placeholders — `LastName`, `Type Your Name
Here`, and `Type Date Here`. Your name and the course name are left exactly
as they already appear in the template; the script never touches them.

## What it is

A small Google Apps Script, deployed as its own web app under **your**
Google account. When the lab finishes, it sends the student's name and the
date to this script instead of linking straight to the template. The script
copies the template, fills in the three placeholders, and sends the student
straight to their finished copy.

## One-time setup (about 5 minutes)

1. Go to [script.google.com](https://script.google.com) and sign in with the
   same Google account that owns the MLA template document.
2. Click **New project**.
3. Delete the placeholder code in the editor and paste in the contents of
   `Code.gs` (in this folder).
4. Click the **Deploy** button (top right) → **New deployment**.
5. Click the gear icon next to "Select type" and choose **Web app**.
6. Fill in:
   - Description: anything, e.g. "MLA template autofill"
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy**. The first time, Google will ask you to authorize the
   script — click **Authorize access**, choose your account, and if you see
   an "unverified app" warning, click **Advanced** → **Go to (your project
   name)** → **Allow**. This warning is expected for a script you wrote
   yourself and haven't submitted for Google's app review; it's safe to
   proceed.
8. Copy the **Web app URL** shown after deployment (it ends in `/exec`).
9. Send me that URL. I'll wire the lab's "Open MLA Essay Template" button to
   call it with the student's name and completion date, and update the
   on-screen instructions since students won't need to manually replace
   LastName / Type Your Name Here / Type Date Here anymore.

## What each student's copy will look like

- File name: `Mitchell - MLA Essay - 31 August 2026` (already set today by
  the quick fix already in the app)
- Inside the document: `LastName` → their last name, `Type Your Name Here` →
  their full name, `Type Date Here` → the date they finished the lab
- Everything else in the template — your name, the course name, `Type Your
  Title Here` — is left untouched, since the lab doesn't collect those from
  the student.

## If you ever need to change the template

If you replace the template document, update the `TEMPLATE_ID` constant at
the top of `Code.gs` (the long ID from the document's URL) and click
**Deploy → Manage deployments → Edit → Deploy** again. You don't need a new
URL — the same `/exec` link keeps working.

## A note on sharing

Each generated copy is shared as "anyone with the link can edit," since the
lab doesn't collect student email addresses to share it more narrowly. That
only exposes that one student's personal copy if their link leaked — not the
master template — but it's worth knowing.
