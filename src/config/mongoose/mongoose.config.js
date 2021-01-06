const mongoose = require('mongoose');
// configure mongoose
mongoose.connect(process.env.DB_HOST_DEV + process.env.DB_NAME_DEV, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);
module.exports = mongoose;