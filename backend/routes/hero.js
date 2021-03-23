const express=require('express');
const router=express.Router();
//Heroes models
const Heroes=require('../models/heroes');


//details of the hero specified by the id
//@routes GET Hero heroes
//@desc GET a hero
router.get('/:id', async (req, res) => {
    try{
        const hero=await Heroes.findById(req.params.id);
        if(!hero) throw new Error('No Hero found');
        res.json(hero);
    }catch(err){
        res.status(400).json('No Hero found');    
    }
})


// add new hero
//@routes POST Hero heroes
//@ create a hero
router.post('/', async (req, res) => {
    const newHero=new Heroes(req.body)

    try{
        const hero=await newHero.save();
        if(!hero) throw Error('Something went wrong while saving hero.');
        res.json(hero);
    }catch(err){
        res.status(400).json('Something went wrong while saving hero.');
    }
});

//update
//@routes PUT Hero heroes
//@desc PUT a hero
router.put('/:id', async (req, res) => {
    try{
        const hero=await Heroes.findByIdAndUpdate(req.params.id, req.body);
        if(!hero) throw new Error('Something went wrong updating.');
        res.json();
    }catch(err){
        res.status(400).json('Something went wrong updating.');    }
})

//delete hero
//@routes DELETE Hero heroes
//@desc DELETE a hero
router.delete('/:id', async (req, res) => {
    try{
        const hero=await Heroes.findByIdAndDelete(req.params.id);
        if(!hero) throw new Error('Sorry, no Hero found.');
        res.json();
    }catch(err){
        res.status(400).json('Sorry, no Hero found.');
    }
})

module.exports=router;