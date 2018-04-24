var io = require('socket.io');
var socket = null;
const TIMEOUT_SOCKET_EVENT = 5000;

/**
 * Private methods
 */

_onConnectionIoError = (error) => {
  console.error('Error trying connect to io', error);
};

_onConnectionIoSuccess = (_socket) => {
    console.log('_onConnection IO');
    socket = _socket;
    socket.on('getHotels', (data) => {
        console.log(data);
    });
};

newHotelEvent = (hotel) => {
  setTimeout(()=> {socket.emit('newHotel', {hotel: hotel})}, TIMEOUT_SOCKET_EVENT);
};

removeHotelEvent = () => {
  setTimeout(()=> {socket.emit('removeHotel', {hotel: hotel})}, TIMEOUT_SOCKET_EVENT);
};

/**
 * Public methods
 */

startIo = (server) => {
    console.log('trying to start io');
    io = io(server);
    io.on('connection', _onConnectionIoSuccess);
    io.on('error', _onConnectionIoError);
}

module.exports = {startIo, newHotelEvent, removeHotelEvent};
