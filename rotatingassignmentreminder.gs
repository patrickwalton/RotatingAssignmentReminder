function remindToClean() {
  //Get Stake Suite Cleaning Schedule Sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Stake Suite Cleaning Schedule");
  
  //Get "Who's Next" Key
  var wnkey = sheet.getRange("E2");
  
  //Email Stake Presidency Member with Matching Key
  stakepresidency = sheet.getRange("C2:C9");
  sph = stakepresidency.getHeight()
  match = 0;
  //Find Match
  for (i = 1; i <= sph; i++) {
    if (sheet.getRange(i+1,3).getValue() == wnkey.getValue()) {
      name = sheet.getRange(i+1,2).getValue();
      emailAddress = sheet.getRange(i+1,4).getValue();
      /*sheet.getRange(i+1,6).setValue(emailAddress); //Debug */
      break
    }
  }
  //Send Email
  MailApp.sendEmail({
    to: emailAddress,
    bcc: "northparkpresidency@gmail.com",
    subject: "Your Turn to Clean the Stake Offices",
    body: name + ",\n\nThis week, it is your turn to clean the Stake Offices. This might include:\nWatering the plant by the door.\n-Garbages (clerk office, lobby, SP office, HC room)\n-Paper shredder bin\n-Vacuum\n-High council table wipe down\n-White Boards\n\nRegards,\nStake Executive Secretary",
    replyTo: "northparkpresidency@gmail.com"
    });
  
  //Update "Who's Next" Key
  if (wnkey.getValue() < sph)
    wnkey.setValue(wnkey.getValue()+1);
  else
    wnkey.setValue(1);
  
}
