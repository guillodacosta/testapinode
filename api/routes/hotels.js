var hotelController = require('./../controllers/hotelCtrl');

routes = (app, appEnv) => {
  var _routes = appEnv.routes;
  _routes.route('/hotels')
    .get(hotelController.getList)
    .post(hotelController.save);
  _routes.route('/hotels/:id')
    .get(hotelController.get)
    .delete(hotelController.remove)
    .put(hotelController.update);
}


module.exports = {routes}
