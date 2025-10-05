function doPost(e) {
  try {
    Logger.log('doPost called');

    var sheetId = '1-rgBnfTw9GIhlcBRbeAa9CcZlSx_uU4IqEuDDQZAfTA';
    var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
    var folderId = '1BUwXGE-HQF1DOKD7MVU4zhGmIuglKuZk';

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        'FULL NAME', 'EMAIL', 'MOBILE', 'ALTERNATE CONTACT', 'DATE OF BIRTH', 'GENDER', 'PHOTOGRAPH',
        'CURRENT ADDRESS', 'PERMANENT ADDRESS', 'STATE', 'CITY', 'PINCODE',
        'QUALIFICATION', 'YEAR OF PASSING', 'INSTITUTE', 'OCCUPATION', 'WORK EXPERIENCE',
        'COURSE', 'BATCH TIMING', 'HOW DID YOU HEAR ABOUT US?',
        'ID PROOF', 'QUALIFICATION CERTIFICATE', 'SUPPORTING DOCUMENTS', 'DECLARATION'
      ];
      sheet.appendRow(headers);
    }

    var data = e.parameter || {};

    // Create user-specific folder for file uploads
    var userFolder;
    if (data.full_name) {
      var mainFolder = DriveApp.getFolderById(folderId);
      var folderName = data.full_name.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
      userFolder = mainFolder.createFolder(folderName);
    } else {
      userFolder = DriveApp.getFolderById(folderId);
    }

    Logger.log('Form data: ' + JSON.stringify(data));

    // Upload files from base64 data
    var fileNames = ['id_proof', 'qualification_cert', 'supporting_docs'];
    for (var i = 0; i < fileNames.length; i++) {
      var name = fileNames[i];
      if (data[name + '_data']) {
        try {
          var blob = Utilities.newBlob(Utilities.base64Decode(data[name + '_data']), data[name + '_type'] || 'application/octet-stream', data[name + '_filename'] || 'file');
          var file = userFolder.createFile(blob);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          data[name] = file.getUrl();
          Logger.log('File uploaded: ' + data[name + '_filename'] + ' - URL: ' + file.getUrl());
        } catch (fileError) {
          Logger.log('File upload error for ' + name + ': ' + fileError.toString());
          data[name] = 'Upload failed: ' + fileError.toString();
        }
      }
    }

    // Validate that we have some data
    if (Object.keys(data).length === 0) {
      Logger.log('No form data received');
      return HtmlService.createHtmlOutput('<h1>Error</h1><p>No form data received</p>');
    }

    var row = [
      data.full_name || '',
      data.email || '',
      data.mobile || '',
      data.alternate_contact || '',
      data.dob || '',
      data.gender || '',
      data.photograph || '',
      data.current_address || '',
      data.permanent_address || '',
      data.state || '',
      data.city || '',
      data.pincode || '',
      data.qualification || '',
      data.year_passing || '',
      data.institute || '',
      data.occupation || '',
      data.work_experience || '',
      data.course || '',
      data.batch_timing || '',
      data.hear_about || '',
      data.id_proof || '',
      data.qualification_cert || '',
      data.supporting_docs || '',
      data.declaration || ''
    ];

    sheet.appendRow(row);

    var html = HtmlService.createHtmlOutput('<h1>Registration Successful!</h1><p>Your registration has been submitted successfully.</p><script>setTimeout(function(){window.close();}, 3000);</script>');
    return html;

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}