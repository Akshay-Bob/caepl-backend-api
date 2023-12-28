const mongoose = require('mongoose');


const CategorySchema = mongoose.Schema({
    categoryName: {type: String, required: true},
    relateProducts: [
        {
            productName: {type:String, required: true}
        }
    ],

    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('categories', CategorySchema);