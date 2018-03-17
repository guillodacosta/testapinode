var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var HotelSchema = new Schema({
    name: String,
    stars: Number,
    price: Number,
    image: String,
    amenities: [String]
});


module.exports = mongoose.model('Hotels', HotelSchema);