const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());

let log = [];

/*
	severity: LOG_DEBUG,LOG_INFO,LOG_WARN,LOG_ERROR,LOG_FATAL,LOG_ALL,
	tag:String,
	desc:String,
	date:Date
*/

app.get("/hoclog",function(req,res) {
	return res.status(200).json(log);
})

app.post("/hoclog",function(req,res) {
	let now = Date.now();
	let logItem = {
		severity:req.body.severity,
		tag:req.body.tag,
		desc:req.body.desc,
		date:now
	}
	log.push(logItem);
	console.log("Log written",JSON.stringify(logItem));
	return res.status(200).json({message:"log added"})
})

app.listen(3002);
console.log("Running in port 3002");