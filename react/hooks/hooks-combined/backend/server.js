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

app.delete("/api/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			database.splice(i,1);
			return res.status(200).json({message:"success"})
		}
	}
	res.status(404).json({message:"not found"})
});

app.put("/api/shopping/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let item = {
		id:tempId,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price		
	}
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			database.splice(i,1,item);
			return res.status(200).json({message:"success"})			
		}
	}
	res.status(404).json({message:"not found"})
})

// Server running and listening

app.listen(PORT);

console.log("Running in port "+PORT);