const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //built in promises for mongoose
mongoose.connect('mongodb://localhost:27017/TodoApp');


module.exports = {mongoose};