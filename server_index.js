const express = require('express');
const request = require('request');
const bodyParser = require("body-parser"); // For parsing data in POST request
const path = require('path');
const ping = require('ping');
const app = express(); // creates an instance of express. it is like the swrver object
const dbUtil = require('./server_dbutil.js');
const cors = require('cors');
// const util = require('./util.js');

app.use(express.static(__dirname)); // use / as root directory
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bo
app.use(cors())

// app.post("/findUser", (req, res) => {
//     console.log('req.body = ' + JSON.stringify(req.body));

//     //console.log('finding user with card ID: ' + card_ID);
//     var que = { 'Card ID': card_ID };

//    /*  dbUtil.findExt("User_info", que, dbres => {
//         sendCORS(res, 200, dbres);
//     });*/
// }); 



app.get("/authenticateCard", (req, res) => {

    var cardID = req.query["cardid"]; // the caRD ID IS NOT PASSING THROUGH YET. THE REQUEST BODY IS EMPTY.

    console.log(req.query);

    dbUtil.findExt("User_info", { "cardid": cardID }, dbres => {
        msg = (dbres.length == 0) ? "false" : true;
        console.log(msg);
        sendCORS(res, 200, msg);
    });
});

app.get("/test", (req, res) => {

    //var cardID = req.query["cardid"];

    console.log("TESTCHECK");

    sendCORS(res, 200, 'tes');
});

app.post("/findUser", (req, res) => {
    console.log("FIND USER");
    //console.log('req.body = ' + JSON.stringify(req.body));
    var card_ID = req.body["Card ID"];
    //console.log('check type ' + card_ID);
    //console.log('finding user with card ID: ' + card_ID);
    var que = {'Card ID': card_ID};
    //console.log('que = ' + que);
    dbUtil.findExt("User_info", que, dbres => {
        sendCORS(res, 200, dbres);
    });
});

app.post("/update", (req, res) => {
    console.log("CALLED UPDATE");
    //console.log('hxdrxtrcv = ' + JSON.stringify(req.body));
    var card_ID = req.body["Card ID"];
    var Amo = req.body["Update Credit"];
    //console.log('check type ' + Amo);
    //console.log('finding user with card ID: ' + card_ID);
    var que = {'Card ID': card_ID};
    var obj = {'Update Credit': Amo};
    //console.log('que = ' + que);
    //console.log('obj = ' + obj);
    dbUtil.update("User_info", que, obj, dbres => {
        sendCORS(res, 200, dbres);
    });
});

app.post("/updateamo", (req, res) => {
    console.log("UPDATE AMO");
    //console.log('hxdrxtrcv = ' + JSON.stringify(req.body));
    var card_ID = req.body["Card ID"];
    var Amo = req.body["Update Credit"];
    //console.log('check type ' + Amo);
    //console.log('finding user with card ID: ' + card_ID);
    var que = {'Card ID': card_ID};
    var obj = {Credit: Amo};
    // console.log('que = ' + que);
    // console.log('obj = ' + obj);
    dbUtil.update("User_info", que, obj, dbres => {
        sendCORS(res, 200, dbres);
    });
});


function sendCORS(res, code, message) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(code).send(message);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));//sets us, starts the server
