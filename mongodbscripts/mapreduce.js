var myMapFunction = function() {
	emit(this.custID, this.price)
}

var myReduceFunction = function(keyCustId,valuesPrice) {
	return Array.sum(valuesPrice)
}

var conn = new Mongo();
var db = conn.getDB("mapReduceTestFullstack");

db.data.mapReduce(myMapFunction,myReduceFunction, {out:"mapReduceResults"})