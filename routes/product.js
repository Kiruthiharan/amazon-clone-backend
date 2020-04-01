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
//GET - get a single product
//PUT - update a single product
//DELETE - delete a single product


module.exports = router;