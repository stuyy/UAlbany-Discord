const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/danediscord', { useNewUrlParser: true }, err => {
    if(err)
        throw err;
});

var memberSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    clientID: {
        type: String,
        required: true
    },
    joinedDate: {
        type: Date,
        required: true
    },
    discriminator: {
        type: String,
        required: true
    }
});

var Member = module.exports = mongoose.model('member', memberSchema);