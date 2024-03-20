const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, },
    genre: { type: String,},
    authorId: { type: String, },
})
 
module.exports = mongoose.model('Book',bookSchema);