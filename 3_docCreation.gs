/**
 * THE BUILDER: Creates and formats the Google Doc.
 */
function createFormattedThesisDoc(fileName, academicDescription, originalCode) {
  const destinationFolderId = '1Hq8RJfcuQJiOZ0qrWXBxbwXwwgj8ZcUN'; 
  
  // 1. Create the Doc
  const doc = DocumentApp.create('Academic Description: ' + fileName);
  const body = doc.getBody();

  // 2. Add Title - Fixed: Create first, then style
  const title = body.appendParagraph('Technical Analysis: ' + fileName);
  title.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  title.setAlignment(DocumentApp.HorizontalAlignment.CENTER);

  // 3. Add Description Section
  const sectionHeader = body.appendParagraph('Methodology & Logic');
  sectionHeader.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph(academicDescription);

  // 4. Add the Original Code
  body.appendPageBreak();
  const codeHeader = body.appendParagraph('Source Code Attachment');
  codeHeader.setHeading(DocumentApp.ParagraphHeading.HEADING2);
  
  const codeBlock = body.appendParagraph(originalCode);
  codeBlock.setFontFamily('Courier New');
  codeBlock.setFontSize(9);

  // 5. Save and Close
  doc.saveAndClose();

  // 6. Move the file (The standard "move" logic)
  const file = DriveApp.getFileById(doc.getId());
  const destFolder = DriveApp.getFolderById(destinationFolderId);
  destFolder.addFile(file);
  DriveApp.getRootFolder().removeFile(file);

return doc.getId();
}