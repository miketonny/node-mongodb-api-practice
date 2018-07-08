const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var passowrd = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(passowrd, salt, (err, hash) => {
//         console.log(hash);
//     });
// });


var hashedPasword = '$2a$10$fDi9OHDib/skOrswSIFSzOZNtfjN3XdvfCTdgRiGIYKyeOcmJ9gYG';
bcrypt.compare(passowrd, hashedPasword, (err, res) => {
    console.log(res);
});


// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// var message = 'i am user number 3';

// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesercret').toString();

// if(resultHash === token.hash){ 
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed, do not trust!');
// }
