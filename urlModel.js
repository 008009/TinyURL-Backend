const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
	longUrl: String,
	shortUrl: String
})

const urlModel = mongoose.model('url',urlSchema);

module.exports = urlModel;