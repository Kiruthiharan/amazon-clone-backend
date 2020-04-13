const router = require('express').Router();
const Product = require('../models/product');

const upload = require('../middlewares/upload-photo');

//POST - create a new product
router.post('/products', upload.single("photo"), async (req, res) => {
    try {
        console.log("hit");
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.stockQuantity = req.body.stockQuantity;
        product.price = req.body.price;
        product.categoryId = req.body.categoryId;
        product.ownerId =  req.body.ownerId;

        await product.save();

        res.json({
            status: true,
            message: "Successfully saved product"
        });
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
});

//GET - get all products
router.get('/products', async(req,res) => {
    try {
        let products = await Product.find().populate('owner category').exec();

        res.json({
            success: true,
            products: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});


//GET - get a single product
router.get('/products/:id', async(req,res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id }).populate('owner category').exec();

        res.json({
            success: true,
            product: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

//PUT - update a single product
router.put('/products/:id', upload.single("photo"), async(req,res) => {
    try {
        let product = await Product.findOneAndUpdate(
            { _id: req.params.id }, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                photo: req.file.location,
                stockQuantity: req.body.stockQuantity,
                price: req.body.price,
                category: req.body.categoryId,
                owner: req.body.ownerId
            }
        }, {upsert: true});
         

        res.json({
            success: true,
            updatedProduct: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

//DELETE - delete a single product
router.delete('/products/:id', async(req,res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });

        if(deletedProduct){
            res.json({
                success: true,
                message: "Succesffuly deleted"
            });
        }        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});


module.exports = router;