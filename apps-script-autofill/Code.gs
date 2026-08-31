/**
 * Auto-fill bridge for the MLA Formatting Lab's essay template.
 *
 * Deploy this as a Web App (Execute as: Me, Who has access: Anyone).
 * See README.md in this folder for step-by-step setup instructions.
 *
 * The lab calls this URL with the student's name and completion date, e.g.:
 *   https://script.google.com/macros/s/XXXXX/exec?name=Sarah+Mitchell&date=31+August+2026
 *
 * It copies the template, fills in ONLY the student's own placeholders,
 * and redirects the browser to the finished copy. Your name and the course
 * name already in the template are never touched.
 */

// The MLA essay template document ID (from its URL). Update this if you
// ever replace the template document.
var TEMPLATE_ID = "1vzhgYDH3BHDKE64cDlsb85bLlbeOvh3QfnFZtrfO_wg";

function doGet(e) {
  var params = (e && e.parameter) || {};
  var fullName = (params.name || "Student Name").toString().trim();
  var dateText = (params.date || "").toString().trim();
  var nameParts = fullName.split(/\s+/).filter(Boolean);
  var lastName = nameParts.length ? nameParts[nameParts.length - 1] : "Student";

  var copyTitle = lastName + " - MLA Essay" + (dateText ? " - " + dateText : "");
  var copy = DriveApp.getFileById(TEMPLATE_ID).makeCopy(copyTitle);
  var doc = DocumentApp.openById(copy.getId());
  var body = doc.getBody();

  // Only the student's own placeholders are replaced. Instructor name and
  // course name are left exactly as they already appear in the template.
  body.replaceText("LastName", lastName);
  body.replaceText("Type Your Name Here", fullName);
  if (dateText) {
    body.replaceText("Type Date Here", dateText);
  }

  // The running header (LastName + page number) usually lives in the page
  // header, not the body — replace it there too if present.
  try {
    var header = doc.getHeader();
    if (header) {
      header.replaceText("LastName", lastName);
    }
  } catch (err) {
    // No header on the template; nothing to do.
  }

  doc.saveAndClose();

  // The lab doesn't collect student email addresses, so each personal copy
  // is shared as "anyone with the link can edit." Only that one copy is
  // exposed if the link leaks — not the master template.
  copy.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);

  var url = copy.getUrl();
  return HtmlService.createHtmlOutput(
    "<html><body>Opening your MLA essay template&hellip;" +
      "<script>window.top.location.href = " + JSON.stringify(url) + ";</script>" +
      "<p>If nothing happens, <a target=\"_top\" href=\"" + url + "\">click here</a>.</p>" +
      "</body></html>"
  );
}
