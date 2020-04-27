const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	user:String,
	token:String,
	ttl:String
})

module.exports = mongoose.model("Session",Schema);