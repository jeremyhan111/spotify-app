const express = require('express');
const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');

require('./services/passport');

const app = express();

app.get('/', (req, res) => {
	res.send({name: 'Jeremy'});
})

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);