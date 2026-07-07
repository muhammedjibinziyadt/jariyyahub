# Google Apps Script Setup Instructions

To store the booking data in your Google Sheet, follow these steps:

1.  Open your Google Sheet.
2.  Go to **Extensions** > **Apps Script**.
3.  Delete any code in `Code.gs` and paste the following:

```javascript
// --- CONFIGURATION ---
var NOTIFICATION_EMAIL = "your-email@example.com"; // REPLACE THIS WITH YOUR EMAIL
// ---------------------

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Parse the POST data
  var data = JSON.parse(e.postData.contents);
  var timestamp = new Date();
  
  // Add row with timestamp
  sheet.appendRow([
    timestamp,
    data.bookingId,
    data.name,
    data.place,
    data.phone,
    data.phone2, 
    data.address,
    data.post,
    data.pinCode,
    data.copies,
    data.totalAmount || (data.copies * 300), // Total Price (Use sent amount or fallback)
    data.paymentMethod,
    data.deliveryMethod || '' // Delivery Method
  ]);
  
  // Send Email Notification
  try {
    sendEmail(data, timestamp);
  } catch (err) {
    Logger.log("Error sending email: " + err);
  }
  
  // Return success response with CORS headers
  return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendEmail(data, timestamp) {
  var subject = "New Al-Muneer Pre-booking: " + data.bookingId + " - " + data.name;
  
  var body = "";
  body += "New Booking Received!\n\n";
  body += "Booking ID: " + data.bookingId + "\n";
  body += "Time: " + timestamp + "\n";
  body += "Name: " + data.name + "\n";
  body += "Phone: " + data.phone + "\n";
  body += "Place: " + data.place + "\n";
  body += "Copies: " + data.copies + "\n";
  body += "Total Amount: ₹" + (data.totalAmount || (data.copies * 300)) + "\n";
  body += "Payment Method: " + data.paymentMethod + "\n";
  if (data.deliveryMethod) {
    body += "Delivery Method: " + data.deliveryMethod.toUpperCase() + "\n";
  }
  
  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    body: body
  });
}

function createTrigger() {
  // Triggers are actually mostly for time-based or edit-based events.
  // Since we are using doPost (Web App), it runs automatically when proper request sends.
  // However, if you wanted an 'On Form Submit' trigger for a Google Form, you'd use this.
  // For this custom API, no explicit trigger setup is needed for the Web App to work. 
  // ensure you deploy as Web App with 'Execute as: Me' and 'Access: Anyone'.
  
  // If you want to get notified on spreadsheet edits manually:
  ScriptApp.newTrigger('onEditNotification')
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onEdit()
      .create();
}
```

4.  Click **Deploy** > **New deployment**.
5.  Click the **Select type** icon (gear) > **Web app**.
6.  Fill in the details:
    *   **Description**: "Booking API"
    *   **Execute as**: **Me** (your email)
    *   **Who has access**: **Anyone**
7.  Click **Deploy**.
8.  Copy the **Web app URL** (it starts with `https://script.google.com/macros/s/...`).
9.  Update `AlMuneerBookingModal.tsx` or your `.env` file with this URL. I have added a placeholder for now.
