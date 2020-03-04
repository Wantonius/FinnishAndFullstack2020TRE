var database = []

window.onload = function() {
	createForm();
}

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
	countinput.setAttribute("id","countinput");
	let countinputlabel = document.createElement("label");
	countinputlabel.setAttribute("for","countinput");
	let countlabeltext = document.createTextNode("Count:");
	countinputlabel.appendChild(countlabeltext);
	
	//price input
	
	let priceinput = document.createElement("input");
	priceinput.setAttribute("type","number");
	priceinput.setAttribute("value","");
	priceinput.setAttribute("name","priceinput");
	priceinput.setAttribute("id","priceinput");
	let priceinputlabel = document.createElement("label");
	priceinputlabel.setAttribute("for","priceinput");
	let pricelabeltext = document.createTextNode("Price:");
	priceinputlabel.appendChild(pricelabeltext);
	
	//submit button
	
	let submit = document.createElement("input");
	submit.setAttribute("type","submit");
	submit.setAttribute("value","Add");
	
	
	let br = document.createElement("br");
	
	shoppingForm.appendChild(typeinputlabel);
	shoppingForm.appendChild(typeinput);
	shoppingForm.appendChild(br);

	shoppingForm.appendChild(countinputlabel);
	shoppingForm.appendChild(countinput);
	shoppingForm.appendChild(br.cloneNode());	

	shoppingForm.appendChild(priceinputlabel);
	shoppingForm.appendChild(priceinput);
	shoppingForm.appendChild(br.cloneNode());	
		
	shoppingForm.appendChild(submit);
	
	shoppingForm.addEventListener("submit", function(e) {
		e.preventDefault();
		addToList();
	})
	
	anchor.appendChild(shoppingForm);
	let tableanchor = document.createElement("div");
	tableanchor.setAttribute("id","tableanchor");
	anchor.appendChild(tableanchor)
}

addToList = () => {
	let type = document.getElementById("typeinput").value;
	let price = document.getElementById("priceinput").value;
	let count = document.getElementById("countinput").value;	
	
	let shoppingItem = {
		type:type,
		count:count,
		price:price
	}
	database.push(shoppingItem);
	populateTable();
}

populateTable = () => {
	
	let tableanchor = document.getElementById("tableanchor");
	let table = document.getElementById("table");
	if(table) {
		tableanchor.removeChild(table);
	}
	let newTable = document.createElement("table");
	newTable.setAttribute("id","table");
	let header = document.createElement("thead");
	let headerRow = document.createElement("tr");
	
	let typeheader = document.createElement("th");
	let typetext = document.createTextNode("Type");
	typeheader.appendChild(typetext);

	let countheader = document.createElement("th");
	let counttext = document.createTextNode("Count");
	countheader.appendChild(counttext);

	let priceheader = document.createElement("th");
	let pricetext = document.createTextNode("Price");
	priceheader.appendChild(pricetext);	
	
	headerRow.appendChild(typeheader);
	headerRow.appendChild(countheader);
	headerRow.appendChild(priceheader);

	header.appendChild(headerRow);
	newTable.appendChild(header);
	
	let body = document.createElement("tbody");
	for(let i =0;i<database.length;i++) {
		let tableRow = document.createElement("tr");
		for(x in database[i]) {
			let column = document.createElement("td");
			let info = document.createTextNode(database[i][x]);
			column.appendChild(info);
			tableRow.appendChild(column)
		}
		body.appendChild(tableRow);
	}
	newTable.appendChild(body);
	tableanchor.appendChild(newTable);
}

