const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Ciclista = require("../models/Ciclista.model");

const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const CiclistasAPI = new Api()

router.get('/ciclista',(req, res)=>{
    
    
    Ciclista
    .find()
    .then((allCiclista) => {
        res.render(`ciclista/list`, {ciclista: allCiclista} )
    
    })
    .catch(err => console.log(err));
    
    
    
})

router.post("/add-favorite", isLoggedIn ,(req, res) =>{
const query = { name, status, species, gender, image, apiId } = req.body
const idToCheck = req.body.apiId;
    Ciclista.find({apiId: idToCheck})
	.then (charArray => {
		//comprobar si ese apiId ya esta en db characters
		if (charArray.length === 0) {
            Ciclista
                .create(query)
                .then(result => {
                  User
                    .findByIdAndUpdate(req.user._id,{$push : {favorites : result._id}})
                    .then(()=>{
                        res.redirect("/ciclista")
                    })
                })
                .catch(err => console.log(err))
        } else {
			User
            .findById(req.user._id)
            .then((user)=>{
                if (!user.favorites.includes(charArray[0]._id)){
                    User
                    .findByIdAndUpdate(req.user._id,{$push : {favorites : charArray[0]._id}})
                    .then(()=>{
                        res.redirect("/ciclista")
                    })
                }else{res.redirect("/ciclista")}
            })
            .catch((err)=>{
            console.log(err)
            })
            
            
            
		}
	}) 
})


router.post("/delete-favorite",isLoggedIn,(req,res)=>{
    const {id} = req.body
    User.findByIdAndUpdate(req.user._id,{$pull : {favorites : id}})
    .then(()=>{
        res.redirect("/profile")
    })
    .catch(err => console.log(err))
})

/**
 * ---arrays
{ field: { $in: [ value1, value2, ..... , valueN ] } }
{ field: { $nin: [ value1, value2, ..... , valueN ] } }
{ field: { $all: [ value1, value2, ..... , valueN ] } }
 */

module.exports = router;