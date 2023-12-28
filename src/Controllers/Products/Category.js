const router = require('express').Router();
const Category = require('../../models/Category')

router.get('/', async(req, res) => {
    try{
        const CategoryCollection = await Category.find();
        res.json(CategoryCollection);
    }catch(err) {
        res.json({message:err});
    }
})

router.get('/:productId', async(req, res) => {
    try{
        const productId = req.params.productId;
        const findProductId = await Category.findById(productId);
        res.json(findProductId);
    }catch(err){
        res.json({message:err});
    }
})

router.post('/', async(req, res) => {
    try{
        const Categories = new Category({
            categoryName: req.body.categoryName
        })
        if(req.body.relateProducts && req.body.relateProducts.length > 0){
            Categories.relateProducts = req.body.relateProducts;
        }
        const savedCategory = await Categories.save();

        res.json(savedCategory);
    }catch(err){
        res.json({message: err.message});
    }
})

router.post('/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        const categoryToUpdate = await Category.findById(categoryId);
        if (!categoryToUpdate) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const newProduct = {
            productName: req.body.productName, 
        };
        categoryToUpdate.relateProducts.push(newProduct);

        const updatedCategory = await categoryToUpdate.save();

        res.json(updatedCategory);
    } catch (error) {
        res.json({message:err});
        //res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/:categoryId/:productId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const productId = req.params.productId;

    try {
        const categoryToUpdate = await Category.findById(categoryId);

        if (!categoryToUpdate) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const relatedProductToUpdate = categoryToUpdate.relateProducts.find(product => product._id == productId);

//        console.log(relatedProductToUpdate);

        // Check if the related product exists
        if (!relatedProductToUpdate) {
            return res.status(404).json({ message: 'Related product not found' });
        }
        relatedProductToUpdate.productName = req.body.productName || relatedProductToUpdate.productName;

        const updatedCategory = await categoryToUpdate.save();

        res.json(updatedCategory);
    }catch(error){
        res.json({message:error});
    }
})

module.exports = router;