const router = require('express').Router();
const BannerImage = require('../../models/BannerImage');


router.get('/', async(req, res) => {
    try{
        const BannerCollection = await BannerImage.find();
        res.json(BannerCollection);
    }catch(err) {
        res.json({message:err});
    }
})


router.get('/:productId', async(req, res) => {
    const productId = req.params.productId;
    try{
        const product = await BannerImage.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.json(product);
    }
    catch(err){
        res.json({message:err});
    }
})

router.post('/', async (req, res) => {
    try {
        const newBannerImage = new BannerImage({
            name: req.body.name,
            BannerImage: req.body.BannerImage,
        });
        const savedBannerImage = await newBannerImage.save();
        //res.status(201).json(savedBannerImage);
        res.status(201).json({message:"Banner Image add sucessfully!."})
    } catch (error) {
        res.json({message:error});
    }
});

router.put('/:productId', async(req, res) => {
    const productId = req.params.productId;

    try{
        const productIdUpdate = await BannerImage.findById(productId);
        if(!productIdUpdate){
            return res.status(404).json({message:"Product not found"});
        }
        productIdUpdate.name = req.body.name || productIdUpdate.name;
        productIdUpdate.BannerImage = req.body.BannerImage || productIdUpdate.BannerImage;
        const updateProduct = await productIdUpdate.save();
        //res.json(updateProduct);
        res.json({message:'Banner Images update sucessfully!..'});
    }catch(error){
        //console.log(error);
        res.json({message:error});
    }
})

module.exports = router;
