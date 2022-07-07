const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");


/* GET home page */
router.get("/", isLoggedIn, (req, res, next) =>{

  User.findById(req.user._id)
  .populate('favorites')
  .then((user) => {
    res.render("profile", {user: user});
  })
 

})

module.exports = router;
