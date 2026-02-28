/**
connecting to gemini API
STEP 1: Input: String (Python code) 
STEP 2: Output: String (Academic description)
 */
function getAcademicDescription(pythonCode) {
  const apiKey = 'AIzaSyBKrqyrLkUAVq1zTC3JzA9hTdoKE09h5Zg'; 
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

  const systemPrompt = "You are a professional academic writer specializing in Computer Science and Neurolinguistics. " +
                       "Analyze the provided Python code and write a structured description, utilize your neuroscientific knowledge too. " +
                       "Use formal academic language suitable for a BA thesis. " +
                       "Focus on methodology, algorithmic logic, and intended purpose. " +
                       "Avoid casual language or jargon unless it is technically necessary.";

  const payload = {
    "contents": [
      {
        "role": "user", 
        "parts": [
          {
            "text": systemPrompt + "\n\nCODE TO ANALYZE:\n" + pythonCode
          }
        ]
      }
    ]
  };

  const options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true 
  };

  try {
    const response = UrlFetchApp.fetch(apiUrl, options);
    const result = JSON.parse(response.getContentText());

    // Better Error Logging: This will tell us the EXACT error from Google if it fails
    if (result.error) {
      console.error("Gemini API Error: " + result.error.message);
      return "Error: " + result.error.message;
    }

    // Extract the text content from the Gemini response structure
    if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts) {
      return result.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected Response Structure: " + response.getContentText());
      return "Error: Could not parse AI response.";
    }
  } catch (e) {
    console.error("Connection Error: " + e.toString());
    return "Error: Failed to connect to Gemini API.";
  }
}