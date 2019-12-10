// Script for controller, responsible for communication between react-based front end and mongodb
// Use nodemon to listen to requests via express package 
// Queries mongodb and returns the result of query

// Take environment variable

// MongoDBsSetup
var mongo = require('mongodb')
var mongoClient = mongo.MongoClient;
var MONGO_URI = "mongodb://guest:guest@128.174.126.230:27017/";

// Listener setup
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
var DB_DRIVER_PORTNUMBER = 4000

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.listen(DB_DRIVER_PORTNUMBER, function() {
	console.log("node listening on port " + DB_DRIVER_PORTNUMBER)
});

var os = require('os')
console.log(os.hostname())
// Request Handlers
app.get("/gRNAquery", (req, res) => {
	// Acutal query inputs
	/**
	const genome = req.query.genome
	const system = req.query.system
	const chr = parseInt(req.query.chr)
	const start = parseInt(req.query.start)
	const end = parseInt(req.query.end)
	*/

	//toy query to parse data
	const genome = 'Sorghum'
	const system = 'Cas9'
	const chr = 'Chr01'
	const start = 800
	const end = 900

	mongoClient.connect(MONGO_URI, {'useUnifiedTopology': true}, (err, cli) => {
		if (err) throw err;
		const db = cli.db(genome)
		var test;
		console.log('connected')	
		db.collection(system).find({'chromosome': chr, 'cutsite': {$gt: start, $lt: end}}).limit(10).toArray(function(err,docs) {
			if (err) return res.send(err); 
			return res.send(docs)
		
		})
	});

});