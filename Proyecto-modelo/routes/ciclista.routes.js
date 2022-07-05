const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Ciclista = require("../models/Ciclista.model");

const User = require("../models/User.model");



router.get('/',isLoggedIn,(req, res)=>{
    
    
    Ciclista
    .find()
    .then((allCiclista) => {
        res.render(`ciclista/list`, {ciclista: allCiclista} )
    
    })
    .catch(err => console.log(err));
    
    
    
})




router.post("/add-favorite/:id", isLoggedIn ,(req, res) =>{
const id = req.params.id
User.findByIdAndUpdate(req.user._id,{$push : {favorites : id}})
 .then(()=>{
        res.redirect("/profile")
    })
    .catch(err => console.log(err))
})


router.post("/delete-favorite/:id",isLoggedIn,(req,res)=>{
    const {id} = req.params
    User.findByIdAndUpdate(req.user._id,{$pull : {favorites : id}})
    .then(()=>{
        res.redirect("/profile")
    })
    .catch(err => console.log(err))
})



module.exports = router;