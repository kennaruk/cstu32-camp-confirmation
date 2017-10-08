let google = require('googleapis');
let authentication = require("./authentication");

function getData(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1YGpLmRwK2AII36RlOP4wJW63lViz91Cu1k7LkPvQZlE',
    range: 'Sheet1!A2:C', //Change Sheet1 if your worksheet's name is something else
    // valueInputOption: 'USER_ENTERED',
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    } 
    var rows = response.values;
    if (rows.length === 0) {
      console.log('No data found.');
    } else {
      for (var i = 0; rows.length; i++) {
        var row = rows[i];
        if(row === undefined)
            break;
        console.log(row.join(", "));
      }
    }
  });
}

authentication.authenticate().then((auth)=>{
    getData(auth);
});
