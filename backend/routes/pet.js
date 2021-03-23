const express=require('express');
const router=express.Router();
//Pets models
const Pets=require('../models/pets');

//details of the pets specified by the id
//@routes GET pet /pets
//@desc GET a pet
router.get('/:id', async (req, res) => {
    try{
        const pet=await Pets.findById(req.params.id);
        if(!pet) throw new Error('No Pet found.. ');
        res.json(pet);
    }catch(err){
        res.status(400).json('No Pet found.. ');
    }
})

module.exports=router;