const express = require('express');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');



const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/todos', (req, res) => { 
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, e => {
        res.status(400).send(e);
    });
});
 

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

//GET /todos/:id
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
       return res.status(404).send('Invalid id');
    }
    //findbyid
    Todo.findById(id).then((todo) => {
        if(todo){
            res.send({todo});
        }else{
            res.status(400).send();
        } 
    }).catch(e => {
        res.status(400).send();
    });
    

})


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};