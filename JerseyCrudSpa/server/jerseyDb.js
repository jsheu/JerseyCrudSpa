var mongoose = require('mongoose');
var local_JerseyDbConnString = "mongodb://localhost/jerseyDb";
//Typically, you will need to define the "JerseyDbConnString" connection string in the custom database settings of your deployed web app.
//Otherwise, it will connect to your local MongoDB database.
//Mongoose connection string reference: http://mongoosejs.com/docs/connections.html
mongoose.connect(process.env.CUSTOMCONNSTR_JerseyDbConnString || local_JerseyDbConnString);
var db = mongoose.connection;

var jerseySchema = mongoose.Schema({
	league: String,
	team: String,
	era: String,
	uniform: String,
	color: String,
	player: String,
	number: Number
});

var jerseyModel = mongoose.model('Jersey', jerseySchema);

db.on('error', console.error.bind(console, "connection error"));

db.once('open', function () {
	console.log("jerseyDb is open...");

	//Initial database with sample data
	jerseyModel.find().exec(function (error, results) {
		if (results.length === 0) {
			jerseyModel.create({
				league: "AL",
				team: "Baltimore Orioles",
				era: "1989",
				uniform: "Home",
				color: "White",
				player: "Cal Ripken, Jr.",
				number: 8
			});
			jerseyModel.create({
				league: "AL",
				team: "Baltimore Orioles",
				era: "1995",
				uniform: "Road",
				color: "Gray",
				player: "Roberto Alomar",
				number: 12
			});
			jerseyModel.create({
				league: "AL",
				team: "Baltimore Orioles",
				era: "2004",
				uniform: "Alternate",
				color: "Black",
				player: "Miguel Tejada",
				number: 10
			});
			jerseyModel.create({
				league: "AL",
				team: "Baltimore Orioles",
				era: "2013",
				uniform: "Alternate",
				color: "Orange",
				player: "Manny Machado",
				number: 13
			});
			jerseyModel.create({
				league: "NL",
				team: "Montreal Expos",
				era: "2003",
				uniform: "Home",
				color: "White",
				player: "Vladimir Guerrero",
				number: 27
			});
			jerseyModel.create({
				league: "NL",
				team: "Washington Nationals",
				era: "2005",
				uniform: "Home",
				color: "White",
				player: "Ryan Zimmerman",
				number: 11
			});
			jerseyModel.create({
				league: "NL",
				team: "Washington Nationals",
				era: "2012",
				uniform: "Alternate",
				color: "Red",
				player: "Bryce Harper",
				number: 34
			});
		}
	});
});

exports.selectJerseyList = function (request, response) {
	jerseyModel.find().exec(function (err, res) {
		if (err) {
			response.send(500, { error: err });
		}
		else {
			response.send(res);
		}
	});
};

exports.selectJersey = function (request, response) {
	var jerseyId = request.params.jerseyId;
	jerseyModel.find({ _id: jerseyId }).exec(function (err, res) {
		if (err) {
			response.send(500, { error: err });
		}
		else {
			response.send(res);
		}
	});
};
					
exports.insertJersey = function (request, response) {
	var newJersey = {
		league: request.body.league,
		team: request.body.team,
		era: request.body.era,
		uniform: request.body.uniform,
		color: request.body.color,
		player: request.body.player,
		number: request.body.number
	};
	jerseyModel.create(newJersey, function (err, createdJersey) {
		if (err) {
			response.send(500, { error: err });
		}
		else {
			response.send({ success: true, jersey: createdJersey });
		}
	});
};

exports.updateJersey = function (request, response) {
	var jerseyId = request.params.jerseyId;
	jerseyModel.update({ _id: jerseyId }, {
		league: request.body.league,
		team: request.body.team,
		era: request.body.era,
		uniform: request.body.uniform,
		color: request.body.color,
		player: request.body.player,
		number: request.body.number
	}, { multi: false },
		function (err, rowsAffected) {
			if (err) {
				response.send(500, { error: err });
			}
			else if (rowsAffected == 0) {
				response.send(500, { error: "No rows affected" });
			}
			else {
				response.send(200);
			}
		}
	);
};

exports.deleteJersey = function (request, response) {
	var jerseyId = request.params.jerseyId;
	jerseyModel.remove({
		_id: jerseyId
	}, 
		function (error, rowsAffected) {
			if (error) {
				response.send(500, { error: error });
			}
			else if (rowsAffected == 0) {
				response.send(500, { error: "No rows affected" });
			}
			else {
				response.send(200);
			}
		}
	);
};
