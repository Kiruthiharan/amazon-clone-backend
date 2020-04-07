const router = require('express').Router();
const Owner = require('../models/owner');

const upload = require('../middlewares/upload-photo');

//POST
router.post('/owner', upload.single("photo") ,async (req, res) => {
    try {
        let owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;
        owner.photo = req.file.location;

        await owner.save();

        
        res.json({
            status: true,
            message: "Owner saved Successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message 
        });
    }
});

//GET request
router.get('/owner', async (req, res) => {
    try {
        let owners = await Owner.find();
        res.json({
            success: true,
            owners: owners
        });
    }
    catch (err) {
        res.json({
            success: false,
            categories: err.message
        });
    }
})

module.exports = router;