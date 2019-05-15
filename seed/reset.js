const Product = require('../models/products');
const mongoose = require('mongoose');
const User = mongoose.model('Products');

// make the seeder function available for the api call to use
module.exports = { resetData };

function resetData() {
	// make a new list of products
	const products = [
		new Product({
			title: 'nails',
			price: 14,
			inventory_count: 5
		}),
		new Product({
			title: 'wrench',
			price: 47,
			inventory_count: 3
		}),
		new Product({
			title: 'bucket',
			price: 54,
			inventory_count: 4
		}),
		new Product({
			title: 'shoes',
			price: 1,
			inventory_count: 2
		}),
	];

	// delete the existing products
	User.deleteMany({}, () => {
		// cycle through each product and add the product to the collection
		for (let i = 0; i < products.length; i++) {
			products[i].save(() => {
				console.log(products[i] + 'saved');
			});
		}
	});
}