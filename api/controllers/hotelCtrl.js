var _operations = require('./../repositories/actions');
var mongoose = require('mongoose');
var socket = require('./../middleware/io');
const ERRORS = require('./../utilities/errorCodes').errors;
var Hotel = mongoose.model('Hotels');
var errorResponse = require('../utilities/serviceResponse').error;
var successResponse = require('../utilities/serviceResponse').success;


/**
 * Private methods
 */

_filterList = (req, res) => {
  try {
    const FILTERS = JSON.parse(req.query.filter);
    var find = {};
    for (var filter in FILTERS) {
      if (Array.isArray(FILTERS[filter])) {
        var $or = [];
        FILTERS[filter].forEach((value) => {
          const aux = {};
          aux[filter] = {$eq: value};
          $or.push(aux);
        });
        find['$or'] = $or;
      } else if (isNaN(FILTERS[filter])) {
        find[filter] = { $regex: `.*${FILTERS[filter]}.*`, $options: 'i' }
      } else {
        find[filter] = { $eq: FILTERS[filter] }
      }
    }
    _operations.findOnSchema(find, res);
  } catch (error) {
    _onError(ERRORS.serverError, res);
  }
};

_onError = (error, res) => {
  res.status(error.code).send(new errorResponse(error));
};


/**
 * Public methods
 */

get = (req, res) => {
  const SUCCESS_RESPONSE = 1;
  try {
    if(req.params && req.params.id) {
      Hotel.findById(req.params.id, (error, hotel) => {
          var response;
          switch (true) {
            case error:
              _onError(ERRORS.badRequest, res);
              return;
              return;
            case !hotel:
              _onError(ERRORS.notFound, res);
              return;
            default:
              response = new successResponse(SUCCESS_RESPONSE);
              response.hotel = hotel;
              socket.newHotelEvent(response);
              res.json(response);
              break;
          }
      });
    } else {
        _onError(ERRORS.notFound, res);
    }
  } catch (error) {
      _onError(ERRORS.serverError, res);
  }
};

getList = (req, res) => {
  try {
    if (req.query && req.query.filter) {
      _filterList(req, res);
      return;
    } else {
      _operations.findOnSchema({}, res);
    }
  } catch (error) {
    _onError(ERRORS.serverError, res);
  }
};

remove = (req, res) => {
  if (req.params && req.params.id) {
    _operations.removeOnSchema({ _id: id }, res);
  } else {
    _onError(ERRORS.badRequest, res);
  }
};

save = (req, res) => {
  try {
    _operations.saveOnSchema(new Hotel(req.body), res);
  } catch (error) {
    console.error(error);
    _onError(ERRORS.serverError, res);
  }
};

update = (req, res) => {
    try {
      if(req.params && req.params.id) {
        Hotel.findById(req.params.id, (error, hotel) => {
          switch(true) {
            case error:
              _onError(ERRORS.badRequest, res);
              return;
            case !hotel:
              _onError(ERRORS.notFound, res);
              return;
            default:
              _operations.saveOnSchema(Object.assign(hotel, req.body), res);
              break;
          }
        });
      }
    } catch (error) {
        _onError(ERRORS.server, res);
    }
};

module.exports = {
  get, getList, remove, save, update
};




