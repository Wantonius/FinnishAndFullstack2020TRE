var canvas;
var context;
var running = 0;
var circles = 0;
var circleinterval;
var interval;

window.onload = function() {
	canvas = document.getElementById("mycanvas");
	context = canvas.getContext("2d");
}

function createRect() {
	let x=0;
	let y=0;
	let side=0;
	let color="#";
	let colorpicker = "0123456789ABCDEF"
	x = Math.floor(Math.random()*400)+1;
	y = Math.floor(Math.random()*400)+1;
	side = Math.floor(Math.random()*80)+20;
	for(let i=0;i<6;i++) {
		let temp = Math.floor(Math.random()*16);
		color = color + colorpicker[temp]
	}
	context.fillStyle = color;
	context.fillRect(x,y,side,side);
}
function createCircle() {
	let x=0;
	let y=0;
	let r=0;
	let color="#";
	let colorpicker = "0123456789ABCDEF"
	x = Math.floor(Math.random()*400)+1;
	y = Math.floor(Math.random()*400)+1;
	r = Math.floor(Math.random()*80)+20;
	for(let i=0;i<6;i++) {
		let temp = Math.floor(Math.random()*16);
		color = color + colorpicker[temp]
	}
	context.strokeStyle = color;
	context.beginPath();
	context.arc(x,y,r,0,2*Math.PI);
	context.stroke();
}
function startCanvas() {
	if(running) {
		running = 0;
		clearInterval(interval);
	} else {
		running = 1;
		interval = setInterval(createRect,200);
	}
}

function startCircles() {
	if(circles) {
		circles = 0;
		clearInterval(circleinterval);
	} else {
		circles = 1;
		circleinterval = setInterval(createCircle,200);
	}
}