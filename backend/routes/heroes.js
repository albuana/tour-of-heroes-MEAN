const express=require('express');
const router=express.Router();
//Heroes models
const Heroes=require('../models/heroes');

//information about all heroes
//@routes GET Hero heroes
//@ GET heroes
router.get('/', async (req, res) => {
    try{
        const heroes=await Heroes.find();
        if(!heroes) throw new Error('Sorry, there is no Heroes..');
        res.json(heroes);
    }catch(err){
        res.status(400).json('Sorry, there is no Heroes..');
    }
})

module.exports=router;