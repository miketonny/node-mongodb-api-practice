require('./config/config');
const express = require('express');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');

const _ = require('lodash');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');




const app = express();
const port = process.env.PORT;

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

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Invalid id');
     }
     //findbyid
     Todo.findByIdAndRemove(id).then((todo) => {
         if(todo){
             res.send({todo});
         }else{
             res.status(404).send('No item deleted');
         } 
     }).catch(e => {
         res.status(400).send();
     });
});

app.patch('/todos/:id', (req, res) =>{
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Invalid id');
    }
    
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch(e =>{
        res.status(400).send();
    })
});


//POST users
app.post('/users', (req, res) =>{
    let body = _.pick(req.body, ['email', 'password']); 
    let user = new User(body);

    user.save().then((doc) => {
        return user.generateAuthToken(); 
    }).then((token) => { 
        res.header('x-auth', token).send(user);
    }).catch(e => res.status(400).send(e));   
});



app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};