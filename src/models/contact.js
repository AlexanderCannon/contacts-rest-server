var mongoose = require('mongoose');

var Contact = mongoose.model('Contact', {
    phone_number: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    name: {
        type: String,
        default: false
    },
    address: {
        type: String,
        default: null
    }
});
module.exports = { Contact }