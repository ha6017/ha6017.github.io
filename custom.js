var string = window.location.href;

    var cardid_get = string.slice(-10); 

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