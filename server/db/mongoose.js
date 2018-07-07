const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //built in promises for mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});


module.exports = {mongoose};