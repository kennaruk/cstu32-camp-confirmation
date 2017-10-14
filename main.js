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
//     getDataAdmin(auth);
// });

const spreadsheetId = '1p3a80RSb-q8bhZ1rS2inQtle5eYAr62JL7YPC5em868';
const range = 'Sheet1!A2:I';
const sheets = google.sheets('v4');

exports.getDataAdmin = (callback) =>  {
  authentication.authenticate().then((auth) => {
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1iiSfNAWCohSUrETuVu-xCqqKOoXB2aE38aWNvjVOrR0',
    range: 'Sheet1!A1:D', //Change Sheet1 if your worksheet's name is something else
    // valueInputOption: 'USER_ENTERED',
  },  (err, response) => {
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
          if(row === undefined){
            callback(null, data);
            return;
          }
        var data = row;
        }
        callback('not found', null);
        return;
      }
    });
  });
}

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
      // console.log('rows: ', rows);
      if (rows.length === 0) {
        console.log('No data found.');
      } else {
        for (var i = 0; rows.length; i++) {
          var row = rows[i];
          if(row === undefined)
              break;
          row.push(i);
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
          row.push(i);
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
  key = key.trim();
  var numberRegex = '\\d+';
  if(key.match(numberRegex)) {
    // console.log('by number!')
    getInformationById(key, callback);
      
  }
  else {
    // console.log('by name!');
    getInformationByName(key, callback);    
  }
}

exports.getCodeByIndex = (index, callback) => {
  var readRange = 'G'+(index+2)+':G'+(index+2);
  console.log('readRange: ', readRange);
  authentication.authenticate().then((auth) => {
    sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: spreadsheetId,
      range: readRange, 
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
        callback(null, rows[0][0]);
      }
    });
  });
}

exports.updateCode = (code, index, callback) => {
  var updateRange = 'G'+(index+2);
  // console.log('updateRange: ', updateRange);

  authentication.authenticate().then((auth) => {
    sheets.spreadsheets.values.update({
      auth: auth,
      spreadsheetId: spreadsheetId,
      range: updateRange, 
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[code]]
      } 
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        callback(err);
        return;
      } else {
        console.log('Update!!');
        callback(null);
      }
    });
  });
}

exports.getDataByCode = (code, callback) => {
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
        callback('data not found', null);
      } else {
        for(var i = 0 ; i < rows.length ; i++) {
          if(rows[i][6] === code) {
            rows[i].push(i);
            callback(null, rows[i]);
            return;
          }
        }
        callback('not match any code', null);
      }
    });
  });
}

exports.getDataByIndex = (index, callback) => {
  var readRange = 'A'+(index+2)+':I'+(index+2);  
  
  authentication.authenticate().then((auth) => {
    sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: spreadsheetId,
      range: readRange, 
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        callback(err, null);
        return;
      }
      var rows = response.values;
      if (rows.length === 0) {
        console.log('No data found.');
        callback('data not found', null);
      } else {
        rows[0].push(index);
        callback(null, rows[0]);
      }
    });
  });
}

exports.updateShirtByIndex = (index, callback) => { 
  var updateRange = 'I'+(index+2);

  authentication.authenticate().then((auth) => {
    sheets.spreadsheets.values.update({
      auth: auth,
      spreadsheetId: spreadsheetId,
      range: updateRange, 
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [["รับเสื้อแล้ว"]]
      } 
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        callback(err);
        return;
      } else {
        console.log('Update!! รับเสื้อแล้ว');
        callback(null);
      }
    });
  });
}

exports.updateMoneyByIndex = (index, callback) => { 
  var updateRange = 'H'+(index+2);

  authentication.authenticate().then((auth) => {
    sheets.spreadsheets.values.update({
      auth: auth,
      spreadsheetId: spreadsheetId,
      range: updateRange, 
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [["จ่ายแล้ว"]]
      } 
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        callback(err);
        return;
      } else {
        console.log('Update!! จ่ายเงินแล้ว');
        callback(null);
      }
    });
  });
}