/**
 * RUNNING THE AGENT PIPELINE
 */
function runAgentPipeline() {
  console.log("Agent started: Scanning for new code files...");

  // 1. Get the list of new Python files (The Scout)
  const newFiles = scoutNewFiles();

  if (newFiles.length === 0) {
    console.log("No new files to process. Sleeping.");
    return;
  }

  // 2. PROCESSING: The Agent iterates through the queue
  newFiles.forEach(fileData => {
    try {
      console.log("Processing: " + fileData.name);

      // A. Send code to Gemini API
      const academicText = getAcademicDescription(fileData.content);

      if (academicText.includes("Error")) {
        throw new Error("AI Generation failed for " + fileData.name);
      }

      // B. Create and format the Google Doc 
      const docId = createFormattedThesisDoc(fileData.name, academicText, fileData.content);
      
      // Manually construct the URL for the email
      const docUrl = "https://docs.google.com/document/d/" + docId;

      // C. Move the file and email (The Courier)
      const deliverySuccess = deliverResults(docId, fileData.name, docUrl);

      if (deliverySuccess) {
        const originalFile = DriveApp.getFileById(fileData.id);
        originalFile.setDescription("PROCESSED: " + new Date().toLocaleString());
        console.log("✅ Successfully documented: " + fileData.name);
      }

    } catch (error) {
      console.error("Pipeline Error on file " + fileData.name + ": " + error.toString());
    }
  });

  console.log("Agent finished current run.");
}