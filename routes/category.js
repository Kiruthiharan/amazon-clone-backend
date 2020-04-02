const router = require('express').Router();
const Category = require('../models/category');

//POST Request
router.post('/category', async (req, res) => {
    try {
        let category = new Category();
        console.log(req.body);
        category.type = req.body.type;

        await category.save();

        res.json({
            success: true,
            message: "Category creation successfull"
        })
    }
    catch (err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

//GET request
router.get('/category', async (req, res) => {
    try {
        let categories = await Category.find();
        res.json({
            success: true,
            categories: categories
        });
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message
        });
    }
})

module.exports = router;
