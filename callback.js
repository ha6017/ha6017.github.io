//If successful, Square Point of Sale returns the following parameters.
const clientTransactionId = "client_transaction_id";
const transactionId = "transaction_id";
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Hardik:ee188001@cluster0-xkiex.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });



//If there's an error, Square Point of Sale returns the following parameters.
const errorField = "error_code";

//Test response URL
// const responseUrl = new URL(
//   '/callback.html?data={' +
//   '"transaction_id":"transaction123",' +
//   '"client_transaction_id":"40",' +
//   '"status":"ok"' +
//   '}',
//   'https://ha6017.github.io'
// );

console.log(" hardik");

//get the data URL and encode in JSON
function getTransactionInfo(URL) { //page URL is bieng passed as an argument to the function
  console.log("URL: " + URL);

  var data = decodeURI(URL.searchParams.get('data'));
  console.log("data:  " + data);

  var transactionInfo = JSON.parse(data);
  console.log("transactionInfo: " + transactionInfo);
  return transactionInfo;
}

//URL.searchParams.get('data')

// Makes a result string for success situation
function handleSuccess(transactionInfo) {
  var resultString = "";

  if (clientTransactionId in transactionInfo) {
    resultString += "Client Transaction ID: " + transactionInfo[clientTransactionId] + "<br>";
  }
  if (transactionId in transactionInfo) {
    resultString += "Transaction ID: " + transactionInfo[transactionId] + "<br>";

    client.connect(err => {
      const collection = client.db("Ideas_lab").collection("User_info");
      // perform actions on the collection object
      console.log("connected");

      var query = { 'Card Id': transactionInfo[card_id]};
        collection.find(query).toArray(function(err, res){
            if(err) throw err;
            console.log(res);
            if(res=="[]"){
                console.log("false");
            }else{
                console.log("true");
                var cred = res[0].Credit;
                console.log(cred);
                cred = cred + transactionInfo[Amount_money[amount]];
                console.log(cred);
            }
        });
        
      var newvalues = { $set: {Credit: cred } };
      collection.updateOne(query, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
      });
  
      client.close();
    });

  }
  else {
    resultString += "Transaction ID: NO CARD USED<br>";
  }
  return resultString;
}


// Makes an error string for error situation
function handleError(transactionInfo) {
  var resultString = "";

  if (errorField in transactionInfo) {
    resultString += "Client Transaction ID: " + transactionInfo[clientTransactionId] + "<br>";
  }
  if (transactionId in transactionInfo) {
    resultString += "Transaction ID: " + transactionInfo[transactionId] + "<br>";
  }
  else {
    resultString += "Transaction ID: PROCESSED OFFLINE OR NO CARD USED<br>";
  }
  return resultString;
}

// Determines whether error or success based on urlParams, then prints the string
function printResponse() {
  console.log("cp3");
  var responseUrl2 = new URL(window.location.href);
  // console.log(responseUrl.href);
  // console.log('URL demo: '+ responseUrl);
  //document.getElementById('url1').innerHTML = responseUrl;

  var transactionInfo = getTransactionInfo(responseUrl2);
  var resultString = "";

  if (errorField in transactionInfo) {
    console.log("ERROR THROWN");
    resultString = handleError(transactionInfo);
  } else {
    console.log("SUCCESS");
    resultString = handleSuccess(transactionInfo);
  }

  document.getElementById('url').innerHTML = resultString;
}

