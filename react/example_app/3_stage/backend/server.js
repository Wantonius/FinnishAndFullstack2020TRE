const express = require("express");
const bodyParser = require("body-parser");
const apiroutes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");

// Library initializations 

let app = express();

app.use(bodyParser.json())

// Constants

const PORT = process.env.PORT || 3001
const ttl = 60*60*1000
//database

mongoose.connect("mongodb://localhost/finnishandfullstackshopping").then(
	() => console.log("Successfully connected to mongoDB"),
	(error) => console.log("Failed to connect to mongodb. Reason:"+error)
);

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
	let token = req.headers.token;
	if(!token) {
		return res.status(403).json({message:"forbidden"})
	}
	sessionModel.findOne({"token":token}, function(err,session) {
		if(err) {
			console.log("Failed to find session. Reason:"+err)
			return res.status(403).json({message:"forbidden"})
		}
		if(!session) {
			return res.status(403).json({message:"forbidden"})
		}
		let now = Date.now();
		if(now > session.ttl) {
			sessionModel.deleteOne({"_id":session._id},function(err) {
				if(err) {
					console.log("Failed to remove session:",err);
				}
				return res.status(403).json({message:"forbidden"}) 
			})
		} else {
			req.session = {}
			req.session.user = session.user
			session.ttl = now+ttl;
			session.save(function(err) {
				if(err) {
					console.log("Failed to save to session:",err)
				}
				return next();
			})
		}
	})
}

app.use("/api",isUserLogged,apiroutes);

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
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			console.log("Failed to create hashed password. Reason:"+err);
			return res.status(409).json({message:"provide credentials"})
		}
		let user = new userModel({
			username:req.body.username,
			password:hash
		})
		user.save(function(err,user) {
			if(err) {
				console.log("Register failed. Reason:"+err);
				return res.status(409).json({message:"Username is already in use"})
			} else {
				console.log("User registered. Username:"+user.username);
				return res.status(200).json({message:"success"})
			}
			
		})
	})	
});

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
	userModel.findOne({"username":req.body.username},function(err,user){
		if(err) {
			console.log("Failed to find user. Reason:"+err);
			return res.status(403).json({message:"Username or password not correct"})
		}
		if(!user) {
			return res.status(403).json({message:"Username or password not correct"})
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
			if(err) {
				return res.status(403).json({message:"Username or password not correct"})
			}
			if(!success) {
				return res.status(403).json({message:"Username or password not correct"})
			}
			let token = createToken();
			let temp = Date.now();
			let session = new sessionModel({
				user:user.username,
				token:token,
				ttl:temp+ttl
			})
			session.save(function(err,session) {
				if(err) {
					console.log("Session creation failed. Reason:"+err);
					return res.status(403).json({message:"Username or password not correct"})
				}
				return res.status(200).json({token:token})
			})
		})
	})
})

app.post("/logout", function(req,res) {
	let token = req.headers.token;
	if(!token) {
		return res.status(404).json({message:"not found"});
	}
	sessionModel.findOne({"token":token}, function(err,session) {
		if(err) {
			console.log("Failed to remove session while logging out. Reason:",err);
			return res.status(404).json({message:"not found"});
		}
		if(!session) {
			return res.status(404).json({message:"not found"});
		}
		sessionModel.deleteOne({"_id":session._id},function(err) {
			if(err) {
				console.log("Failed to remove session while logging out. Reason:",err);
			}
			return res.status(200).json({message:"success"})
		})
	})
})


// Server running and listening

app.listen(PORT);

console.log("Running in port "+PORT);