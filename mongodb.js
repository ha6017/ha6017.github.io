
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Hardik:ee188001@cluster0-xkiex.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("Ideas_lab").collection("User_info");
  // perform actions on the collection object
  console.log("connected");

    // var ins={name: 'michael', email:'joshua.anderson17@imperial.ac.uk', cardid: '1234567899'};
    // collection.insertOne(ins, function(err,res){
    //     console.log("data inserted");
    // });
    var string1 = 'Hardik';
    var string2 = 'First Name';

    var query = { 'First Name': string1};
        collection.find(query).toArray(function(err, res){
            if(err) throw err;
            console.log(res);
            console.log('query = '+ query['First Name']);
            console.log(query);
            if(res=="[]"){
                console.log("false");
            }else{
                console.log("true");
                console.log(res[0].Email);
            }
        });

  client.close();
});
