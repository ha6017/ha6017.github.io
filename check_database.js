
const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://hardik:ee188001@cluster0-2iznk.mongodb.net/";
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("USER_INFORMATION").collection("MAKERSPACE_IOT");
   // perform actions on the collection object
   client.close();
});