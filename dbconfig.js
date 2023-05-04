const mongoose = require('mongoose');

mongoose.createConnection(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.rnkrmgc.mongodb.net/${DATABASENAME}?retryWrites=true&w=majority`)
  