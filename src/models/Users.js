const mongoose = require("mongoose");

var Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: String,
  first_name: String,
  last_name: String,
  password: String
});

UsersSchema.methods.setPassword = function(password) {
    this.password = password;
}

UsersSchema.methods.validatePassword = function(password) {
    return this.password === password;
}
