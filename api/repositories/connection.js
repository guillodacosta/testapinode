const DB_URL = `mongodb+srv://admin:admin@node-store-rest-hgmhh.mongodb.net/test`;


var mongoose = require('mongoose');

_onConnectionError = (error) => {
    console.error('Error trying connect to db', error);
};

_onConnectionSuccess = () => {
    console.log('Success open db connection');
};

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL);
mongoose.connection.on('error', _onConnectionError);
mongoose.connection.on('open', _onConnectionSuccess);

module.exports = {mongoose};
