const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: {type: String, required: true},
	price: {type: Number, required: true},
	inventory_count: {type: Number, required: true}
});

module.exports = mongoose.model('Products', productSchema);