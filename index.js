// this is the Master java script which calls all the functions using AJAX. It creates an object 
//of type XMLHTTP Server which sends request to your locally/globbally runnning server. This Server
//on recieving the request processes it e.g talking to database and replies back with a response top index.js. 


//var serverIP = "146.169.183.61:5000"; // USIng a local server. Could be scaled to online server as well.
var serverIP = "192.168.29.41:5000";
var userData;


function findUser(cardID) { // called from index.html. First function used to check if the user is registered or not

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
            if (userData == '') {
                console.log('ERROR LOADING USERS');
                alert('USER NOT REGISTERED. Contact Michael Hofmann to Register yourself');
            } else {
                window.location.replace('https://ha6017.github.io/link_table.html?cardid='+cardID);
                //console.log('userData=' + userData);
            }
        }
      };
      
    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
      };

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    //console.log(xhr);
    xhr.send(data);
}

function db_call(cardID) { // called from link_table.html. TRiggers server to send babck all the information and then 
                        //i query the name and cedit from the personds account
    //console.log("cardid=" + cardID);

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

function db_update(cardID, amount) { // called from link_table.html. TRiggers server to send babck all the information and then 
    //i query the name and cedit from the personds account
    //console.log("cardid=" + cardID);
    //console.log("amount =" + amount);

    var data = JSON.stringify({ "Card ID": cardID, "Update Credit": amount});
    //console.log('data = ' + data);
    var url = `http://${serverIP}/update`;
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
                //console.log(userData);
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

function db_updatecred(cardID, amount) { // called from link_table.html. TRiggers server to send babck all the information and then 
    //i query the name and cedit from the personds account
    //console.log("cardid=" + cardID);
    //console.log("amount =" + amount);

    var data = JSON.stringify({ "Card ID": cardID, "Update Credit": amount});
    //console.log('data = ' + data);
    var url = `http://${serverIP}/updateamo`;
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
                //console.log(userData);
                }
            }
    };

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    //console.log(xhr);
    xhr.send(data);
}

function update_credit(cardID){
    //console.log("cardid=" + cardID);

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
                //console.log(userData);
                var new_amo = userData[0].Credit + userData[0]['Update Credit'];
                console.log("new amount = " + new_amo);
                db_updatecred(cardID, new_amo);
                //info.innerHTML = 'Hi ' + userData[0]['First Name'] + ', you have £' + userData[0].Credit + ' balance in your account.';
            }
        }
      };
    
    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
      };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    //console.log(xhr);
    xhr.send(data);
}