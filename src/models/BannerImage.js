const mongoose = require('mongoose');

const BannerImageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    BannerImage: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,  
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('BannerImage', BannerImageSchema);
