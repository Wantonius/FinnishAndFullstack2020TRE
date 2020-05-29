const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	type:String,
	count:Number,
	price:Number,
	user:{type:String,indexed:true}
})

module.exports = mongoose.model("ShoppingItem",Schema);