const app = require('./app');
const serverless = require('serverless-http');

const isProduction = process.env.NODE_ENV === 'production';

const port = process.env.PORT;
if (isProduction) {
   module.exports.handler = serverless(app); 
} else {
    app.listen(port, () => console.log("App listening on port " + port));
}