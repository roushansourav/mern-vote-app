require('dotenv').config();

const express = require('express');
const cors = require('cors');
require('./models');

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
	res.status(200).json('Its running');
	});
	
app.listen(port,()=>{console.log(`Server is running on port ${port}`)});
