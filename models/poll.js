const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
	option:String,
	votes:{type:Number,default:0}
	});

const pollSchema = new Schema({
	user:{
		type:Schema.Types.ObjectId,
		ref:'User'
		},
	createdAt:{
		type:Date,
		default:Date.now
		},
		question:String,
		options:[optionSchema],
		voted:[{type:Schema.Types.ObjectId, ref:'User'}],
		
	});
	
	pollSchema.pre('remove', async function(next){
		try{
			const user = await User.findById(this.user);
			user.polls=user.polls.filter(
			poll=>poll._id.toString()!==this._id.toString()
			);
			await user.save();
			return next();
			}
			catch(err){
				return next(err);
				}
		});
		
module.exports = mongoose.model('Poll',pollSchema);
