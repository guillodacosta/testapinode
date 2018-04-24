var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotels');
var socket = require('./../middleware/io');
var successResponse = require('../utilities/serviceResponse').success;

_onSaveDeleteAction = (obj, responseObj, error, event) => {
  var response;
  if (error) {
    _onError(ERRORS.serverError, responseObj);
    return;
  }
  response = new successResponse();
  response.id = obj._id;
  responseObj.json(response);
  /** Emit changes on hotels **/
  socket[event](response);
};

findOnSchema = (obj, responseObj) => {
  Hotel.find(obj, (error, hotels) => {
    var response = null;
    if (error) {
      _onError(ERRORS.serverError, responseObj);
      return;
    }
    response = new successResponse(hotels.length);
    response.hotels = hotels;
    responseObj.json(response);
  });
};

removeOnSchema = (obj, responseObj) => {
  Hotel.remove(obj, (error, hotel) => {
    try {
      _onSaveDeleteAction(obj, responseObj, error, 'removeHotelEvent');
    } catch (error) {
      _onError(ERRORS.serverError, responseObj);
    }
  });
};

saveOnSchema = (hotel, responseObj) => {
  hotel.save((error, obj) => {
    try {
      _onSaveDeleteAction(obj, responseObj, error, 'newHotelEvent');
    } catch (error) {
      _onError(ERRORS.serverError, responseObj);
    }
  });
};


module.exports = {findOnSchema, removeOnSchema, saveOnSchema};
