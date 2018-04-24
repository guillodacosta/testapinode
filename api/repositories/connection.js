const DB_URL = `mongodb://admin:admin@node-store-rest-shard-00-00-ev4hi.mongodb.net:27017,node-store-rest-shard-
    00-01-ev4hi.mongodb.net:27017,node-store-rest-shard-00-02-ev4hi.mongodb.net:27017/test?ssl=true&replicaSet=node
    -store-rest-shard-0&authSource=admin`;

// const DB_URL = `mongodb://test_almundo:test_almundo@almundotest-shard-00-00-hgmhh.mongodb.net:27017,almundotest-shard-00-
//       01-hgmhh.mongodb.net:27017,almundotest-shard-00-02-hgmhh.mongodb.net:27017/test?ssl=true&replicaSet=alMundoTest-
//       shard-0&authSource=admin`;

// const DB_URL = `mongodb+srv://test_almundo:test_almundo@almundotest-hgmhh.mongodb.net/test`;



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
