const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

// Define schema
const UsersSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String
});

/**
 * Check if password provided is correct for given user
 * @param {string} password 
 */
UsersSchema.methods.isValidPassword = async function(password) {
    const compare = await bcrypt.compare(password, this.password);

    return compare;
}

mongoose.model('Users', UsersSchema);
