// require dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cors = require('cors');

// initialize express app and settings
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

// enable cross origin resource sharing
app.use(cors());

// require in the products models
require('./models/products');

// connect to mlab database
mongoose.connect(keys.mongoURI, {
	auth: {
		user: keys.mongoUser,
		password: keys.mongoPassword
	}, useNewUrlParser: true
}).then(() => {
	console.log("Mongo connection successful.");
}).catch((err) => {
	console.error(err);
});

// default port is 5000
const PORT = process.env.PORT || 5000;

require('./routes/routes')(app);
app.listen(PORT, () => {
	console.log("listening to port: " + PORT);
	console.log("CORS enabled web server");
});