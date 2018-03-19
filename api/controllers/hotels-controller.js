var mongoose = require('mongoose'),
    Hotel = mongoose.model('Hotels'),
    SuccessResponse = require('./../utilities/responses').success,
    ErrorResponse = require('./../utilities/responses').error,
    errorCodes = require('./../utilities/errorCodes').errors;


exports.store = function (req, res) {
    if (Array.isArray(req.body)) {
        multiple_store(req, res);
    } else {
        simple_store(req, res);
    }
}

exports.list_hotel = function (req, res) {
    try {

        if (req.query.filter) {
            filter_hotels(req, res);
            return;
        }

        Hotel.find({}, function (err, hotels) {
            var response;
            if (err) {
                console.log(err);
                handleError(errorCodes.serverError, res);
                return;
            }

            response = new SuccessResponse(hotels.length);
            response.hotels = hotels;

            res.json(response);
        });
    } catch (error) {
        console.log(error);
        handleError(errorCodes.serverError, res);
    }
}

exports.show = function (req, res) {
    try {
        var id = req.params.id;

        Hotel.findById(id, function (err, hotel) {
            var response;

            if (err) {
                console.log(err);
                handleError(errorCodes.badRequest, res);
                return;
            }

            if (!hotel) {
                handleError(errorCodes.notFound, res);
                return;
            }


            response = new SuccessResponse(1);
            response.hotel = hotel;
            res.json(response);
        });
    } catch (error) {
        console.log(error);
        handleError(errorCodes.serverError, res);
    }
}


exports.delete = function (req, res) {
    var id = req.params.id;
    Hotel.remove({ _id: id }, function (err, hotel) {
        try {
            if (err) {
                handleError(errorCodes.serverError, res);
                return;
            }

            response = new SuccessResponse();
            response.id = id;
            res.json(response);
        } catch (error) {
            handleError(errorCodes.serverError, res);
        }
    });
}


exports.update = function (req, res) {
    try {
        var id = req.params.id;

        Hotel.findById(id, function (err, hotel) {
            var response;

            if (err) {
                handleError(errorCodes.badRequest, res);
                return;
            }

            if (!hotel) {
                handleError(errorCodes.notFound, res);
                return;
            }

            hotel = Object.assign(hotel, req.body);

            hotel.save(function (err, updatedHotel) {
                if (err) {
                    handleError(err, res);
                    return;
                }

                response = new SuccessResponse();
                response._id = updatedHotel._id;

                res.json(response);
            });
        });
    } catch (error) {
        handleError(errorCodes.server, res);
    }
}


function filter_hotels(req, res) {
    try {
        var filters = JSON.parse(req.query.filter);
        var find = {};
        for (var filter in filters) {
            if (Array.isArray(filters[filter])) {
                let $or = [];

                filters[filter].forEach((value) => {
                    const aux = {};
                    aux[filter] = { $eq: value };

                    $or.push(aux);
                });

                find['$or'] = $or;

            } else if (isNaN(filters[filter])) {
                find[filter] = { $regex: `.*${filters[filter]}.*`, $options: 'i' }
            } else {
                find[filter] = { $eq: filters[filter] }
            }

        }

        Hotel.find(find, function (err, hotels) {
            var response;

            if (err) {
                console.log(err);
                handleError(errorCodes.serverError, res);
                return;
            }

            response = new SuccessResponse(hotels.length);
            response.hotels = hotels;
            res.json(response);
        })

    } catch (error) {
        console.log(error);
        handleError(errorCodes.serverError, res);
    }

}


function simple_store(req, res) {
    try {
        var hotel = new Hotel(req.body);

        hotel.save(function (err, hotel) {
            var response;
            if (err) {
                handleError(errorCodes.serverError, res);
                return;
            }

            response = new SuccessResponse();
            response._id = hotel._id;

            res.json(response);
            return;
        });

    } catch (error) {
        console.log(error);
        handleError(errorCodes.serverError, res);
    }
}


function multiple_store(req, res) {
    try {
        var hotel = new Hotel(req.body);

        Hotel.insertMany(req.body, function (err, hotels) {
            var response;
            if (err) {
                handleError(errorCodes.serverError, res);
                return;
            }

            response = new SuccessResponse();
            response.hotels = hotels;

            res.json(response);
        });
    } catch (error) {
        console.log(error);
        handleError(errorCodes.serverError, res);
    }
}

function handleError(error, res) {
    var response = new ErrorResponse(error);
    res.status(error.code).send(response);
}