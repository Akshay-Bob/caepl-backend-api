const mongoose = require('mongoose');
const categories = require('./Category');

const ProductSchema = mongoose.Schema({
    productName: {type: mongoose.Schema.Types.ObjectId, ref:'categories'},
    productCategory: {type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    productUrl: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    ProductBannerImage: {
        type: String,
        required: true,
    },
    productDesc: {
        type: String,
        required: true,
    },
    imageData: [
        {
            homeImages: String,
            IsMultiple: {type:Boolean, default:true},
            singleImage: String,
            innerImages: [
                {
                    type: String,
                },
            ],
        },
    ],
    status: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('product', ProductSchema);
