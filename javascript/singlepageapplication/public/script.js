var database = []

createForm = () => {
	let anchor = document.getElementById("anchor");
	let shoppingForm = document.createElement("form");
	
	//Item type input
	
	let typeinput = document.createElement("input");
	typeinput.setAttribute("type","text");
	typeinput.setAttribute("value","");
	typeinput.setAttribute("name","typeinput");
	typeinput.setAttribute("id","typeinput");
	let typeinputlabel = document.createElement("label");
	typeinputlabel.setAttribute("for","typeinput");
	let typelabeltext = document.createTextNode("Type:");
	typeinputlabel.appendChild(typelabeltext);

	//count input
	
	let countinput = document.createElement("input");
	countinput.setAttribute("type","number");
	countinput.setAttribute("value","");
	countinput.setAttribute("name","countinput");
	countinput.setAttribute("id","countinput¨");
	let countinputlabel = document.createElement("label");
	countinputlabel.setAttribute("for","countinput");
	let countlabeltext = document.createTextNode("Count:");
	countinputlabel.appendChild(countlabeltext);
	
	//price input
	
	let priceinput = document.createElement("input");
	priceinput.setAttribute("type","number");
	priceinput.setAttribute("value","");
	priceinput.setAttribute("name","priceinput");
	priceinput.setAttribute("id","priceinput¨");
	let priceinputlabel = document.createElement("label");
	priceinputlabel.setAttribute("for","priceinput");
	let pricelabeltext = document.createTextNode("Price:");
	priceinputlabel.appendChild(pricelabeltext);
	
	let br = document.createElement("br");
	
}