require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./models');
const handle = require('./handlers');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

mongoose.set('debug',true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true});
const connection=mongoose.connection;
connection.once('open',()=>{
   console.log("MongoDB database connection established successfully");
});
console.log(db)
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('asset'))

app.get('/',(req,res)=>{
	res.status(200).json('Its running');
	});
	
app.use('/api/auth',routes.auth);
app.use('/api/polls',routes.polls);
app.use(handle.notFound);
app.use(handle.errors);

app.listen(port,()=>{console.log(`Server is running on port ${port}`)});
