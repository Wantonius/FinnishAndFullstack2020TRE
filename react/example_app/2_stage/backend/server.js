const express = require("express");
const bodyParser = require("body-parser");

// Library initializations 

let app = express();

app.use(bodyParser.json())

// Constants

const PORT = process.env.PORT || 3001

//database

let database = []
let id = 100

//user database

let registeredUsers = [];
let loggedSessions = [];

//middleware

createToken = () => {
	let token = "";
	let letters = "abcdefghijABCDEFGHIJ0123456789"
	for(let i=0;i<256;i++) {
		let temp = Math.floor(Math.random()*30);
		token = token + letters[temp]
	}
	return token;
}

isUserLogged = (req,res,next) => {
	if(req.headers.token) {
		token = req.headers.token;
		for(let i=0;i<loggedSessions.length;i++) {
			if(token === loggedSessions[i].token) {
				return next();
			}
		}
	}
	res.status(403).json({message:"forbidden"})
}

app.use("/api",isUserLogged);

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(409).json({message:"provide credentials"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(409).json({message:"provide credentials"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(409).json({message:"provide credentials"});
	}
	let user = {
		username:req.body.username,
		password:req.body.password
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(user.username === registeredUsers[i].username) {
			return res.status(409).json({message:"Username is already in use"});
		}
	}
	registeredUsers.push(user);
	console.log(registeredUsers);
	return res.status(200).json({message:"success"});
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(409).json({message:"wrong credentials"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(409).json({message:"wrong credentials"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(409).json({message:"wrong credentials"});
	}
	let user = {
		username:req.body.username,
		password:req.body.password
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(user.username === registeredUsers[i].username) {
			if(user.password === registeredUsers[i].password) {
				let token = createToken();
				loggedSessions.push({
					token:token,
					user:user.username
				})
				return res.status(200).json({token:token})
			}
		}
	}
	res.status(409).json({message:"wrong credentials"});
})

app.post("/logout", function(req,res) {
	let token = req.headers.token;
	if(!token) {
		return res.status(404).json({message:"not found"});
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(loggedSessions.token === token) {
			loggedSessions.splice(i,1);
			return res.status(200).json({message:"success"})
		}
	}
	return res.status(404).json({message:"not found"});
})

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