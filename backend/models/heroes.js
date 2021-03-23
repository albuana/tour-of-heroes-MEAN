const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heroesSchema=new Schema({
    hero:{
        type: String,
        required:true,
    },
    pet:{
        type: String,
        required:false,
    },
    photo:{
        type: String,
        required:false,
    }
});

module.exports = mongoose.model('Heroes', heroesSchema);