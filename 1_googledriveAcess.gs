/**
STEP 1: Google Drive access
 */

function scoutNewFiles() {
  const folderId = '1Hq8RJfcuQJiOZ0qrWXBxbwXwwgj8ZcUN'; 
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();
  const filesToProcess = [];

  while (files.hasNext()) {
    const file = files.next();
    const fileName = file.getName();
    const description = file.getDescription() || "";
// the filter looks specifically for the .py EXT here
    if (fileName.endsWith('.py') && !description.includes('PROCESSED')) {
      
      console.log('Scout found a new file: ' + fileName);
      
      // Data storage (single object)
      filesToProcess.push({
        id: file.getId(),
        name: fileName,
        content: file.getBlob().getDataAsString()
      });
    }
  }

  if (filesToProcess.length === 0) {
    console.log('Scout Report: No new files found.');
  }

  return filesToProcess;
}