var mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  amenities: [String],
  id: String,
  image: String,
  name: String,
  price: Number,
  stars: Number
});

module.exports = mongoose.model('Hotels', HotelSchema);
