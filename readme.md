# Usage
To start up the server, navigate to the directory that houses the project and run:
`node index.js`
The server is setup to run on localhost:5000. The `PORT` variable can be changed in the `index.js` file found in the main directory.

### `/api/all`
Gets all available items with `inventory_count` > 0.

### `/api/get/:title`
Searches the mongo collection and returns the matching document.
If `inventory_count` of the specified document is 0, then sends an error message. 
If no documents match the requested title, then sends an error message.

### `/api/purchase/:title?amount=`
Searches the mongo collection and reduces the `inventory_count` of the found document with `title` equal to the "title" passed into the url. A value can be added to the "amount" field to 
amounts of the item other than 1. For example:`/api/purchase/nails?amount=3` 
 will reduce the `inventory_count` of the `nails` item by 3.
By default, `amount` wil be set  to 1 and reduce `inventory_count` by 1.

### `/api/reset`
Resets the data base by clearing all documents and then repopulating it. The documents used to repopulate the database can be found in `reset.js`. 
`seeder.js` can be executed by running the command `node seeder.js` in the server directory. `seeder.js` does not clear the data first. Using the reset api is recommended. 

# Error Codes
* 1: Document could not be found.
* 2: Stock related issue.

# Config
`keys.js` in the `config` folder houses sensitive information for connecting to the database. These keys are only used for development.