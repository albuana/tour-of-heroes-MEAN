const express=require('express');
const router=express.Router();
//Pets models
const Pets=require('../models/pets');

//@routes GET Pet /pets
//@ GET heroes
router.get('/', async (req, res) => {
    try{
        const pets=await Pets.find();
        if(!pets) throw new Error('Sorry, no Pets.');
        res.json(pets);
    }catch(err){
        res.status(400).json('Sorry, no Pets.');
    }
})

module.exports=router;