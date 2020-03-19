const express = require("express");
const bodyParser = require("body-parser");

// Library initializations 

let app = express();

app.use(express.static("public"));
app.use(bodyParser.json())

// Constants

const PORT = process.env.PORT || 3001

//database

let database = []
let id = 100

// Content REST API

app.get("/api/shopping",function(req,res) {
	res.status(200).json(database);
})

app.post("/api/shopping",function(req,res) {
	let item = {
		id:id,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	}
	id++;
	database.push(item);
	res.status(200).json({message:"success!"})
});

// Server running and listening

app.listen(PORT);

console.log("Running in port "+PORT);