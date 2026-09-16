/**
 * Auto-fill bridge for the MLA Formatting Lab's essay template.
 *
 * Deploy this as a Web App (Execute as: Me, Who has access: Anyone).
 * See README.md in this folder for step-by-step setup instructions.
 *
 * The lab calls this URL with the student's name and completion date, e.g.:
 *   https://script.google.com/macros/s/XXXXX/exec?name=Sarah+Mitchell&date=31+August+2026
 *
 * It copies the template, fills in ONLY the student's own placeholders
 * ([Last Name], Your Full Name, and the "Enter Date (Day Month Year)"
 * placeholder), and redirects the browser to the finished copy. Your name
 * and the course name already in the template are never touched. "Add
 * Creative Essay Title" is left as-is too, since the lab doesn't collect a
 * real essay title from the student.
 */

// The MLA essay template document ID (from its URL). Update this if you
// ever replace the template document.
var TEMPLATE_ID = "1uX8H2rXzRjhihsxSH9mj-oyEy13uar2dQXRLuD0Pr88";

// How many times to retry the whole copy/fill/share sequence if something
// fails partway through (for example a brief Google-side hiccup, or a
// temporary quota limit when many students finish the lab at once), and how
// long to pause between attempts (milliseconds; doubles-ish each retry).
var MAX_ATTEMPTS = 3;
var RETRY_DELAY_MS = 500;

function doGet(e) {
  var params = (e && e.parameter) || {};
  var fullName = (params.name || "Student Name").toString().trim();
  var dateText = (params.date || "").toString().trim();

  for (var attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      var url = createFilledCopy(fullName, dateText);
      return HtmlService.createHtmlOutput(
        "<html><body>Opening your MLA essay template&hellip;" +
          "<script>window.top.location.href = " + JSON.stringify(url) + ";</script>" +
          "<p>If nothing happens, <a target=\"_top\" href=\"" + url + "\">click here</a>.</p>" +
          "</body></html>"
      );
    } catch (err) {
      if (attempt < MAX_ATTEMPTS) {
        Utilities.sleep(RETRY_DELAY_MS * attempt);
      }
    }
  }

  // Every attempt failed — most likely a transient Google-side issue rather
  // than anything wrong with the template. Show a plain, friendly page with
  // a retry link instead of leaving the student looking at a raw error.
  return HtmlService.createHtmlOutput(
    "<html><body>" +
      "<p>Something went wrong opening your template. This is usually temporary.</p>" +
      "<p><a target=\"_top\" href=\"" + ScriptApp.getService().getUrl() + "?" + buildQuery(params) + "\">Click here to try again</a>.</p>" +
      "</body></html>"
  );
}

// Copies the template, fills in the student's own placeholders, shares the
// copy, and returns its URL. Throws if any step fails, so doGet() above can
// catch it and retry.
function createFilledCopy(fullName, dateText) {
  var nameParts = fullName.split(/\s+/).filter(Boolean);
  var lastName = nameParts.length ? nameParts[nameParts.length - 1] : "Student";

  var copyTitle = lastName + " - MLA Essay" + (dateText ? " - " + dateText : "");
  var copy = DriveApp.getFileById(TEMPLATE_ID).makeCopy(copyTitle);
  var doc = DocumentApp.openById(copy.getId());
  var body = doc.getBody();

  // Only the student's own placeholders are replaced. Instructor name and
  // course name are left exactly as they already appear in the template.
  // replaceText() takes a regex, so the brackets and parentheses in the
  // placeholders are escaped to match them literally.
  body.replaceText("\\[Last Name\\]", lastName);
  body.replaceText("Your Full Name", fullName);
  if (dateText) {
    body.replaceText("Enter Date \\(Day Month Year\\)", dateText);
  }

  // The running header (Last Name + page number) usually lives in the page
  // header, not the body — replace it there too if present.
  try {
    var header = doc.getHeader();
    if (header) {
      header.replaceText("\\[Last Name\\]", lastName);
    }
  } catch (err) {
    // No header on the template; nothing to do.
  }

  doc.saveAndClose();

  // The lab doesn't collect student email addresses, so each personal copy
  // is shared as "anyone with the link can edit." Only that one copy is
  // exposed if the link leaks — not the master template.
  copy.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);

  return copy.getUrl();
}

// Rebuilds the original name/date query string for the "try again" link.
function buildQuery(params) {
  var parts = [];
  if (params.name) parts.push("name=" + encodeURIComponent(params.name));
  if (params.date) parts.push("date=" + encodeURIComponent(params.date));
  return parts.join("&");
}
