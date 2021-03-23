const express=require('express');
const router=express.Router();
var cors = require('cors')

//Heroes models
const Heroes=require('../models/heroes');
//Pets models
const Pets=require('../models/pets');

router.use(cors())

//clean the DB content and inicialize the collections that saves the heroes and the pets with some values
//@routes GET /init
//@ GET init db
router.get('/', async (req, res) => {
  try{

    //Delete Heroes && Pets
    deleteHeroes(await Heroes.find());
    deletePets(await Pets.find());
    
    //Create Heroes Albuana, Proffesor Petter, WonderWoman Milah, Flashyyyy, Aquaman cleaner
    createHero("Albuana", "Betty");
    createHero("Proffesor Petter", "Lua");
    createHero("Wonder Milah", "Plutão");
    createHero("Flashyyyy", "");
    createHero("Aquaman cleaner", "BabbyShark");

    //Create Betty, Lua, Plutao, Fluffy, Eggie...
    createPet("Betty");
    createPet("Lua");
    createPet("Plutao");
    createPet("Fluffy");
    createPet("Eggie");

    res.status(200).json("DB Restarted...! ");
    
}catch(err){
    res.status(400).json({msg: err});
}
})
module.exports=router;

async function createHero (heroName, petName ) {
  const newHero=new Heroes({
    "hero":heroName,
    "pet":petName,
    "photo": " ",
  });
  const hero=await newHero.save();
  if(!hero) throw Error('Something went wrong while saving hero.');
}

async function createPet (petName ) {
  const newPet=new Pets({
    "pet":petName,
  });
  const pet=await newPet.save();
  if(!pet) throw Error('Something went wrong while saving hero.');
}

async function deleteHeroes (content) {
  for(const hero in content){
    await Heroes.findOneAndDelete(hero);
  }
}

async function deletePets (content) {
  for(const pet in content){
    await Pets.findOneAndDelete(pet);
  }
}