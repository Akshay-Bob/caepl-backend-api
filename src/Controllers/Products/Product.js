const router = require("express").Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 
const productModel = require('../../models/Product')
const categoryModel = require('../../models/Category');

router.get('/', async (req, res) => {
    try {
        const productCollection = await productModel
            .find()
            .populate({
                path: 'productCategory',
                select: 'categoryName'
            });

        res.json(productCollection);
    } catch (err) {
        res.json({ message: err });
    }
});


router.post('/', async (req, res) => {
    try {
        const productsObj = new productModel({
            productName: new ObjectId(req.body.productName),
            productCategory: new ObjectId(req.body.productCategory),
            productUrl: req.body.productUrl,
            productImage: req.body.productImage,
            ProductBannerImage: req.body.ProductBannerImage,
            productDesc: req.body.productDesc,
        });

        const savedProduct = await productsObj.save();
        res.json(savedProduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:productId', async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.productName = req.body.productName || product.productName;
        product.productCategory = req.body.productCategory || product.productCategory;
        product.productUrl = req.body.productUrl || product.productUrl;
        product.productImage = req.body.productImage || product.productImage;
        product.ProductBannerImage = req.body.ProductBannerImage || product.ProductBannerImage;
        product.productDesc = req.body.productDesc || product.productDesc;

        const newImages = req.body.imageData;

        if (newImages && newImages.length > 0) {
            product.imageData = product.imageData.concat(newImages);
        }

        const updatedProduct = await product.save();

        res.json(updatedProduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/:productId/addImages', async(req, res) => {
    const productId = req.params.productId;

    try {
        const product = await productModel.findById(productId);

        if(!product){
            return res.status(404).json({message: 'product not found'})
        }
        const newImages = req.body.imageData;
        if (newImages && newImages.length > 0) {
            product.imageData = product.imageData.concat(newImages);
        }

        const updatedProduct = await product.save();

        res.json(updatedProduct);   
    } catch (error) {
    }

})
module.exports = router;
