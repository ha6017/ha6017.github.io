// this is the Master java script which calls all the functions using AJAX. It creates an object 
//of type XMLHTTP Server which sends request to your locally/globbally runnning server. This Server
//on recieving the request processes it e.g talking to database and replies back with a response top index.js. 


var serverIP = "localhost:5000"; // USIng a local server. Could be scaled to online server as well.
var userData;


// function createCORSRequest(method, url) { //Method to make CORS policy compliant request to allow cross domain access
//     var xhr = new XMLHttpRequest();
//     if ("withCredentials" in xhr) {
//       // XHR for Chrome/Firefox/Opera/Safari.
//       xhr.open(method, url, true);

//     } else if (typeof XDomainRequest != "undefined") {
//       // XDomainRequest for IE.
//       xhr = new XDomainRequest();
//       xhr.open(method, url);
//       xhr.setRequestHeader('Content-Type', 'application/json');
//     } else {
//       // CORS not supported.
//       xhr = null;
//     }
//     return xhr;
//   }
  

function findUser(cardID) { // called from index.html. First function used to check if the user is registered or not

    var data = JSON.stringify({ "Card ID": cardID });
    console.log('data = ' + data);

    var url = `http://${serverIP}/findUser`;
    //var xhr = createCORSRequest('POST', url);
    var xhr = new XMLHttpRequest();
    if (!xhr) {
        alert('CORS not supported');
        return;
      }

    xhr.onload = function() {
        if (this.status == 200 && this.readyState==4) {
            userData = JSON.parse(this.responseText);
            if (userData == '') {
                console.log('ERROR LOADING USERS');
                alert('USER NOT REGISTERED. Contact Michael Hofmann to Register yourself');
            } else {
                window.location.replace('https://ha6017.github.io/link_table.html?cardid='+cardID);
                console.log('userData=' + userData);
            }
        }
      };
      
    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
      };

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(xhr);
    xhr.send(data);
}

function db_call(cardID) { // called from link_table.html. TRiggers server to send babck all the information and then 
                        //i query the name and cedit from the personds account
    console.log("cardid=" + cardID);

    var data = JSON.stringify({ "Card ID": cardID });
    //console.log('data = ' + data);
    var url = `http://${serverIP}/findUser`;
    //var xhr = createCORSRequest('POST', url);
    var xhr = new XMLHttpRequest();
    if (!xhr) {
        alert('CORS not supported');
        return;
      }

    xhr.onload = function() {
        if (this.status == 200 && this.readyState==4) {
            userData = JSON.parse(this.responseText);
            if (userData == '[]') {
                console.log('ERROR LOADING USERS');
                alert('USER NOT REGISTERED. Contact Michael Hofmann to Register yourself');
            } else {
                //window.location.replace('https://ha6017.github.io/link_table.html?cardid='+cardID);
                console.log(userData);
                var info = document.getElementById('Heading');
                info.innerHTML = 'Hi ' + userData[0]['First Name'] + ', you have £' + userData[0].Credit + ' balance in your account.';
            }
        }
      };
    
    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
      };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(xhr);
    xhr.send(data);
}