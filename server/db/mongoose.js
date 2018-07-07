const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //built in promises for mongoose
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});


module.exports = {mongoose};