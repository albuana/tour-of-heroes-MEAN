const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petsSchema=new Schema({
    pet:{
        type: String,
        required:true,
    }
});

module.exports = mongoose.model('Pets', petsSchema);