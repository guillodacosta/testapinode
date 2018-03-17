var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 8080,
    mongoURL = 'mongodb://admin:admin@node-store-rest-shard-00-00-ev4hi.mongodb.net:27017,node-store-rest-shard-00-01-ev4hi.mongodb.net:27017,node-store-rest-shard-00-02-ev4hi.mongodb.net:27017/test?ssl=true&replicaSet=node-store-rest-shard-0&authSource=admin';


mongoose.Promise = global.Promise;
mongoose.connect(`${mongoURL}`);


mongoose.connection.on('error', function (error) {
    console.log('error', error);
});
mongoose.connection.on('open', function () {
    console.log('conected to DB');
});

var hotels = require('./api/model/hotels');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = express.Router();

const appEnv = {
    routes: routes
}

require('./api/routes')(app, appEnv);

app.get('/images/:image', function (req, res) {
    res.sendFile(__dirname + '/images/' + req.params.image);
});
app.use('/api', routes);

app.listen(port);
console.log(`API listening on port ${port}`);