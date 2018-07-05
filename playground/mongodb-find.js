const {MongoClient, ObjectID} = require('mongodb'); //destructuring ES6 to get props from object

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to DB');
    }

    const db = client.db('TodoApp');

    console.log('Connected to Mongodb');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b3e930261e9b33060193215')    
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });

    
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`); 
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });

    db.collection('Users').find({
       name: 'mike'   
    }).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('unable to fetch users', err);
    });

    // client.close(); //close connection

});