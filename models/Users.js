const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    id: String,
    firstname:  String,
    lastname:   String,
    email:      String,
    birthday:   String,
    picture:    String
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;