const mongoose = require('mongoose');
const User = mongoose.model('Products');

// index.js needs to have access to these routes
module.exports = (app) => {

	// main page route
	app.get('/', (req, res) => {
		res.send("Please read the readme for documentation regarding this api");
	});

	// page that gets and shows all available items
	app.get('/api/all', (req, res) => {
		User.find((err, docs) => {
			console.log(docs);

			// array that will be passed to handle bars to render
			let availableProducts = [];

			// loop through all the items
			for (let i = 0; i < docs.length; i++) {
				console.log(i + docs[i]);
				// if the item is in stock add it to the array
				if (docs[i]['inventory_count'] > 0) {
					availableProducts.push(docs[i]);
				}
			}
			// render the items
			res.send({products: availableProducts});
		});
	});



	// get an item
	app.get('/api/get/:title', (req, res) => {
		// search the collection
		User.find({
			// find document with matching title
			title: req.params.title
		}, (err, docs) => {
			let item = docs[0];
			// if the returned objects length is less than 1, no items were found
			if (docs.length < 1){
				res.send({error_code: 1, error_message: "Error: No items were found"});
				// res.render('error', {error: "no items found sorry" + err});
			}
			// item was found
			else {
				// out of stock, dont show item
				if (item['inventory_count'] < 1) {
					res.send({error_code: 2, error_message: 'Out of stock'});
				}
				// the item is in stock, show it!
				else {
					res.send(item);
				}
			}
		});


	});

	app.get('/api/purchase/:title/', (req, res) => {
		// get the item title
		let title = req.params.title;
		let amount = req.query.amount;
		if (amount === undefined) {
			// req.params.amount is not a number
			// default set to purchase 1 item
			amount = 1;
		}

		// find the data
		User.find({
			title: title
		}, (err, docs) => {
			if (docs.length < 1) {
				// no items were found
				res.send({error_code: 1, error_message: "Error: No items were found. Cannot make purchase."});
			}
			else {
				// item was found

				// what will the stock be after the user buys it?
				let newStock = docs[0]['inventory_count'] - amount;
				if (newStock < 0 && amount === 1) {
					// if the new stock is less than 0, then the stock was already at 0 before!
					// the user can't buy this item, send back an error response
					console.log("Item is out of stock");
					res.send({error_code: 1, error_message: 'out of stock sorry'});
				}
				else if (newStock < 0 && amount > 1) {
					// the user is trying to purchase too many items
					console.log("trying to buy too many");
					res.send({error_code: 1, error_message: 'you are trying to buy too many.'})
				}
				else {
				// the item is in stock and can be purchased !
					console.log(newStock);
					// update the document to reflect the decrease in stock
					User.findOneAndUpdate({  // find the item
						title: title
					}, {
						inventory_count: newStock  // set the inventory_count to the new inventory_count value
					}).then((data) => {
						if (newStock === 0) {
							// the last item was just purchased, lets let the user know
							res.send({message: "you just bought the last one"})
						}
						else {
							// create a new item that reflects the changes
							let newItem = {
								id: data['id'],
								title: data['title'],
								price: data['price'],
								inventory_count: newStock
							};
							// send the user the item after the changes
							res.send(newItem);
						}
					})
				}
			}
		});
	});

	// route to reset data
	const reset = require('../seed/reset');
	app.get('/api/reset', (req, res) => {
		reset.resetData();
		res.send("data reset");
	});

};