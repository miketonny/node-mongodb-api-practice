const {MongoClient, ObjectID} = require('mongodb'); //destructuring ES6 to get props from object

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to DB');
    }

    const db = client.db('TodoApp');

    console.log('Connected to Mongodb');

    //delete many
    // db.collection('Todos').deleteMany({text: 'lunch'}).then((result) => {
    //     console.log(result);
    // });

    //delete one
    // db.collection('Todos').deleteOne({text: 'lunch'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAnd Delete
    db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
        console.log(result);
    });


    // client.close(); //close connection

});