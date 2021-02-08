const app = require('./app');
const debug = require('debug')('app');

const port = process.env.PORT || 3000;
app.listen(port, () => debug("App listening on port " + port));