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
        console.log(row);
        console.log(row.join(", "));
      }
    }
  });
}

// authentication.authenticate().then((auth)=>{
//     getData(auth);
// });

const spreadsheetId = '1YGpLmRwK2AII36RlOP4wJW63lViz91Cu1k7LkPvQZlE';
const range = 'Sheet1!A2:C';
const sheets = google.sheets('v4');

getInformationById = (id, callback) => {
  authentication.authenticate().then((auth) => {
    sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: spreadsheetId,
      range: range, 
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        callback(err, null);
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
          if(row[1] === id) {
            callback(null, row);
            return;   
          }
        }
        callback('not found', null);
        return;
      }
    });
  });
}

getInformationByName = (name, callback) => {
  authentication.authenticate().then((auth) => {
    sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: spreadsheetId,
      range: range, 
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        callback(err, null);
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
          if(row[2] === name) {
            callback(null, row);
            return;   
          }
        }
        callback('not found', null);
        return;
      }
    });
  });
}

exports.getInformation = (key, callback) => {
  var numberRegex = '\\d+';
  if(key.match(numberRegex)) {
    console.log('by number!')
    getInformationById(key, callback);
      
  }
  else {
    console.log('by name!');
    getInformationByName(key, callback);    
  }
}

var getId = (callback) => {
  var crypto = require("crypto");
  var id = crypto.randomBytes(2).toString('hex');
  id = id.toLocaleLowerCase();

  callback(id);
}




