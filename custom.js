var string = window.location.href;

    var cardid_get = string.slice(-10); 

    // const MongoClient = require('mongodb').MongoClient;
    // const uri = "mongodb+srv://Hardik:ee188001@cluster0-xkiex.mongodb.net/test?retryWrites=true&w=majority";
    // const client = new MongoClient(uri, { useNewUrlParser: true });
    // client.connect(err => {
    // const collection = client.db("Ideas_lab").collection("User_info");
    // // perform actions on the collection object
    // console.log("connected");

    //     // var ins={name: 'michael', email:'joshua.anderson17@imperial.ac.uk', cardid: '1234567899'};
    //     // collection.insertOne(ins, function(err,res){
    //     //     console.log("data inserted");
    //     // });

    //     var query = { cardid: cardid_get};

    //         collection.find(query).toArray(function(err, res){
    //             if(err) throw err;
    //             console.log(res);
    //             if(res=="[]"){
    //                 console.log("false");
    //             }else{
    //                 console.log("true");
    //                 var title = document.getElementById('imma');
    //                 console.log(res[0].name);
    //                 title.innerHTML = 'Hi '+ res[0].Email + ', you have ' + res[0].Credit +'£ credit';
    //             }
    //         });

    // client.close();
    // });


    function sending_custom(){
        
        var input = document.getElementById("myinput");
        //db_call(input.value);

        console.log(input.value);
        var dataParameter = {
              amount_money: {
                amount:        input.value,
                currency_code: "GBP"
              },
          
              // Replace this value with your application's callback URL
              callback_url: "https://ha6017.github.io/callback.html",
          
              // Replace this value with your application's ID
              client_id: "sq0idp-0BKuN18vmsKMlPj5Gmb1cw",

              card_id: cardid,
          
              version: "1.3",
              notes: "notes for the transaction",
              options: {
                supported_tender_types: ["CREDIT_CARD" ,"CASH"]
              }
            };

            var amo = parseInt(input.value);
            db_update(cardid_get, amo);
          
            console.log("sending request");
    
            window.location =
              "square-commerce-v1://payment/create?data=" +
              encodeURIComponent(JSON.stringify(dataParameter));
    }