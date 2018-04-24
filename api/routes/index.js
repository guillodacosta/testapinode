// Import Endpoints
const routeHotel = require('./hotels');

// Insert routes below
module.exports = (app, appEnv) => {
  routeHotel.routes(app, appEnv)
};
