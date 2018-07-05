//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb'); //destructuring ES6 to get props from object

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to DB');
    }

    const db = client.db('TodoApp');

    console.log('Connected to Mongodb');

    // db.collection('Todos').insertOne({
    //     text: 'something to do'
    // }, (err, results) => {
    //     if(err) return console.log('Unable to insert todo', err);
    //     console.log(JSON.stringify(results.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'mike',
    //     age: 25,
    //     location: 'Auckland'
    // }, (err, results) => {
    //     if(err) return console.log('Unable to insert Users', err);
    //     console.log(results.ops[0]._id.getTimestamp());
    // });

    client.close(); //close connection

});