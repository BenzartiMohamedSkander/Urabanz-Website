const {registerAdmin,loginAdmin} = require('../controllers/admin.controller')
const express = require('express');


const isAuth = require("../middleware/passport-setupAdmin");

const router = express.Router()


router.post('/registerAdmin',registerAdmin)
router.post('/loginAdmin',loginAdmin)
router.get('/dashboard',isAuth(), (req, res) => res.json(req.user))




module.exports = router