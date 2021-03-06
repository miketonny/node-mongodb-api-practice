const {ObjectID} = require('mongodb');
const {Todo} = require('../../models/todo');
const {User} = require('../../models/user');
const jwt = require('jsonwebtoken'); 

const userOneID = new ObjectID();
const userTwoID = new ObjectID(); 
const users = [{
    _id: userOneID,
    email: 'mike@yahoo.com',
    password: 'userOnePass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userOneID, access:'auth'}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoID,
    email: 'jane@yahoo.com',
    password: 'userOnePass',
    tokens:[{
        access: 'auth',
        token: jwt.sign({_id: userTwoID, access:'auth'}, process.env.JWT_SECRET).toString()
    }]
}];

const todos = [{
    _id: new ObjectID(),
    text: 'first test todo',
    completed: false,
    _creator: userOneID
}, {
    _id: new ObjectID(),
    text: 'second test todo',
    _creator: userTwoID
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done()); //after each done, clear table
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();
        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};