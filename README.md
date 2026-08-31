# MLA Formatting Lab

Interactive MLA formatting practice lab for online Composition courses.

## Important

This Vercel-ready package uses Tailwind CSS v3 so it avoids the Tailwind 4/PostCSS build error.

## v1.1.0 changes

- **Margins step now actually checks the margins.** The Page Setup dialog's four
  dropdowns are wired to real state; the step only passes when all four sides
  read "1 inch." (Previously the Apply button marked the step correct no
  matter what was selected.)
- **Progress autosaves to the browser** (localStorage) after every action.
  Refreshing the page, or closing and reopening the tab, resumes exactly
  where a student left off — including their name and, once finished, their
  certificate ID. A "Start over instead" / "Start a new attempt" link clears
  saved progress for a fresh run. A confirmation prompt warns before closing
  an unfinished tab.
- **Removed two dead toolbar buttons** (Undo, a bare Type icon) that did
  nothing when clicked.
- **Fixed duplicate feedback messages** — a wrong action used to show the
  same message in two stacked boxes at once; there's now a single message
  region.
- Visual refresh: replaced the rainbow-gradient theme with a calmer,
  more consistent academic palette; added icon labels and a focus trap /
  Escape-to-close on the Page Setup dialog for accessibility.
- **The MLA Essay Template link is now fully auto-filled.** When a student
  finishes the lab, "Open MLA Essay Template" hands their name (from the
  certificate) and completion date to an Apps Script bridge, which creates
  their own copy of the template with `LastName`, `Type Your Name Here`, and
  `Type Date Here` already filled in, and opens it directly — no manual copy
  step, no placeholders left for the student to find and replace except
  `Type Your Title Here`. See `apps-script-autofill/` for the script itself
  and setup notes if you ever need to redeploy it (e.g. after replacing the
  template document).

## Deploy to Vercel

1. Upload these files to a GitHub repository.
2. In Vercel, import that repository.
3. Leave the default Vercel settings.
4. Click Deploy.

## Blackboard Student Instructions

Complete the MLA Formatting Lab.
Save your completion certificate as a PDF.
Upload the certificate only to the MLA Formatting Lab assignment link in Blackboard.
Then open the MLA Essay Template — your personal copy opens automatically,
already filled in with your name and today's date.
