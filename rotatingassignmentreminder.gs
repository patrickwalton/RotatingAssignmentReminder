function remindToClean() {
  //Get Rotating Assignment Sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Rotating Assignment Schedule");
  
  //Get "Who's Next" Key
  var wnkey = sheet.getRange("E2");
  
  //Email Volunteer with Matching Key
  volunteers = sheet.getRange("C2:C9");
  number_of_volunteers = volunteers.getHeight()
  match = 0;
  
  //Find Match
  for (i = 1; i <= number_of_volunteers; i++) {
    if (sheet.getRange(i+1,3).getValue() == wnkey.getValue()) {
      name = sheet.getRange(i+1,2).getValue();
      emailAddress = sheet.getRange(i+1,4).getValue();
      /*sheet.getRange(i+1,6).setValue(emailAddress); //Debug test */
      break
    }
  }
  
  //Send Email
  MailApp.sendEmail({
    to: emailAddress,
    //bcc: "youremail@email.com",
    subject: "Your Turn for Volunteer Assignment",
    body: name + ",\n\nThis week, it is your turn to do the volunteer assignment. \nThanks!",
    //replyTo: "youremail@email.com" //!!This is required.
    });
  
  //Update "Who's Next" Key
  if (wnkey.getValue() < sph)
    wnkey.setValue(wnkey.getValue()+1);
  else
    wnkey.setValue(1);
  
}
