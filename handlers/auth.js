const jwt = require('jsonwebtoken');
const db = require('../models');

exports.register = async (req,res,next) => {
	try{
		const user = await db.User.create(req.body);
		const {id,userHandle,email} =user;
		const token = jwt.sign({id,userHandle},process.env.SECRET);
		res.status(201).json({id,userHandle,email,token});
		} 
	catch(err){
		next(err);
		}
	};
	
exports.login = async (req,res,next) => {
	try{
		const user = await db.User.findOne({userHandle:req.body.userHandle});
		
		const {id,userHandle,email} = user;
		const valid = await user.comparePassword(req.body.password);
		
		if(valid)
		{
				const token = jwt.sign({id,userHandle},process.env.SECRET);
				res.status(200).json({id,userHandle,email,token});
		}
		else
		{
			throw new Error('Invalid Username/Password');
			}
		} 
	catch(err){
		next(err);
		}
	};
