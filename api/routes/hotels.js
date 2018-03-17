module.exports = function (app, appEnv) {
    var routes = appEnv.routes;
    var hotelController = require('./../controllers/hotels-controller');


    routes.route('/hotels')
        .post(hotelController.store)
        .get(hotelController.list_hotel);

    routes.route('/hotels/:id')
        .get(hotelController.show)
        .delete(hotelController.delete)
        .put(hotelController.update);
}