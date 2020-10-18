var mongoose = require('mongoose');
// // mongodb+srv://raghavmongodb:<password>@mongodbdemocluster.jyzxk.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect('mongodb://localhost:27017/book_management', {useNewUrlParser: true});
// //mongoose.connect('mongodb://raghu556:herokumongo@ds015995.mlab.com:15995/heroku_273pwkbl');

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://raghavmongodb:raghavmongodb@mongodbdemocluster.jyzxk.mongodb.net/book_management?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("book_management").collection("Books");
//   console.log(collection);
//   // perform actions on the collection object
//   client.close();
// });