require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./models');
const handle = require('./handlers');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
	res.status(200).json('Its running');
	});
	
app.use('/api/auth',routes.auth);
app.use(handle.notFound);
app.use(handle.errors);

app.listen(port,()=>{console.log(`Server is running on port ${port}`)});
