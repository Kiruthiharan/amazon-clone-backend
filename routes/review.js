const router = require('express').Router();
const Review = require('../models/review');
const Product = require('../models/product');
const verifyToken = require('../middlewares/verify-token');
const upload = require('../middlewares/upload-photo');

router.post('/reviews/:productId', [ verifyToken, upload.single("photo") ], async(req, res) => {
    try {
        const review = new Review();
        review.headline = req.body.headline;
        review.body = req.body.body;
        review.rating = req.body.rating;
        review.photo = req.body.photo;
        review.user = req.decoded._id;
        review.productId = req.params.productId;
        
        await Product.update({ $push: review._id });
        const savedReview = await review.save();

        if(savedReview) {
            res.json({
                success: true,
                message: "Successfully added Review"
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


router.get('/reviews/:productId', verifyToken, async(req, res) => {
    try {
        const productReviews = await Review.find({
            productId: req.params.productId
        }).populate("user").exec();

        res.json({
            success: true,
            reviews: productReviews
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


module.exports = router;