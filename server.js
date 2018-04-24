require('./api/repositories/connection');
require('./api/model/hotels');
const DEFAULT_PORT = 8080;
var apiRoutes = require('./api/routes');
var app = require('express')();
var bodyParser = require('body-parser');
var port = process.env.PORT || DEFAULT_PORT;
var routes = require('express').Router();
var io = require('./api/middleware/io');
var server = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
apiRoutes(app, {routes: routes});

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/index.html');
});
app.get('/assets/:id', (req, res) => {
  res.sendFile(__dirname + '/assets/' + req.params.id);
});
app.use('/api', routes);
server.listen(port);
io.startIo(server);
