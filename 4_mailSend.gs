/**
Organize the final file and send it to my e-mail
 */
function deliverResults(docId, fileName, docUrl) {
  const destinationFolderId = '1Hq8RJfcuQJiOZ0qrWXBxbwXwwgj8ZcUN'; 
  const myEmail = 'michu.ejan@gmail.com'; 

  try {
    // 1. ORGANIZE: Move the Doc from Root to your specific Thesis Folder
    const file = DriveApp.getFileById(docId);
    const destinationFolder = DriveApp.getFolderById(destinationFolderId);
    
    destinationFolder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
    
    console.log("File moved successfully to destination folder.");

    // 2. NOTIFY: Send the professional email
    const subject = `✅ Thesis Update: BA thesis description for ${fileName}`;
    const body = `Hello,\n\nBelow you can find the BA thesis description of your Python file: ${fileName}.\n\n` +
                 `The academic description has been generated and saved to your Google Drive.\n` +
                 `You can view it here: ${docUrl}\n\n` +
                 `Best regards,\nBA thesis Agent`;

    GmailApp.sendEmail(myEmail, subject, body);
    
    console.log("Notification email sent to: " + myEmail);
    return true;

  } catch (e) {
    console.error("Courier Error: " + e.toString());
    return false;
  }
}