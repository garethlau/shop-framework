const Product = require('../models/products');
const mongoose = require('mongoose');
const keys = require('../config/keys');

// instead of using the reset api, this file can be run to seed the data
// does not delete existing data
// RECOMMENDED TO USE THE API TO RESET DATA
mongoose.connect(keys.mongoURI, {
	auth: {
		user: keys.mongoUser,
		password: keys.mongoPassword
	}, useNewUrlParser: true
}).then(() => {
	console.log("Mongo connection successful (SEEDER).");
}).catch((err) => {
	console.error(err);
});

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

for (let i = 0; i < products.length; i++) {
	products[i].save(() => {
		if (i === products.length) {
			mongoose.disconnect().then(console.log("Disconnected from Mongo"));
		}
	});
}