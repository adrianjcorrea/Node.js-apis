const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
  
const userSchema = new Schema({
  id: ObjectId,
  first_name: String,
  last_name: String,
  email_address: String,
  career: String
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;