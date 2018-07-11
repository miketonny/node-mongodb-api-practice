require('./config/config');
const express = require('express');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');

const _ = require('lodash');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');




const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());


app.post('/todos', authenticate, (req, res) => { 
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, e => {
        res.status(400).send(e);
    });
});
 

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

//GET /todos/:id
app.get('/todos/:id', authenticate, (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
       return res.status(404).send('Invalid id');
    }
    //findbyid
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if(todo){
            res.send({todo});
        }else{
            res.status(400).send();
        } 
    }).catch(e => {
        res.status(400).send();
    });
    

})

app.delete('/todos/:id', authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        if(!ObjectID.isValid(id)){
            return res.status(404).send('Invalid id');
         }
         //findbyid
         const todo = await Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
         });
    
         if(todo) {
            res.send({todo});
         }else{
            res.status(404).send('No item deleted');
         }
    } catch (error) {
        res.status(400).send();
    }


    //  Todo.findOneAndRemove({
    //      _id: id,
    //      _creator: req.user._id
    //  }).then((todo) => {
    //      if(todo){
    //          res.send({todo});
    //      }else{
    //          res.status(404).send('No item deleted');
    //      } 
    //  }).catch(e => {
    //      res.status(400).send();
    //  });
});

app.patch('/todos/:id', authenticate, (req, res) =>{
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

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch(e =>{
        res.status(400).send();
    })
});








//POST users
app.post('/users', async (req, res) =>{
    try {
        const body = _.pick(req.body, ['email', 'password']); 
        const user = new User(body);
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
  

    // user.save().then((doc) => {
    //     return user.generateAuthToken(); 
    // }).then((token) => { 
    //     res.header('x-auth', token).send(user);
    // }).catch(e => res.status(400).send(e));   
});




app.get('/users/me', authenticate,  (req, res) => {
    res.send(req.user);
})

//POST /users/login
app.post('/users/login', async (req, res) =>{
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (error) {
        res.status(400).send();
    }


    // User.findByCredentials(body.email, body.password).then(user =>{
    //     return user.generateAuthToken().then((token) => {
    //         res.header('x-auth', token).send(user);
    //     });
    // }).catch(e => res.status(400).send());

});

app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (error) {
        res.status(400).send();
    }

    // req.user.removeToken(req.token).then(() => {
    //     res.status(200).send();
    // }, () => {
    //     res.status(400).send();
    // });
});


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};