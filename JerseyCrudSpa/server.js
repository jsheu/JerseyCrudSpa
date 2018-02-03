/*
This app was built with the help of these tutorials:
http://www.dotnetcurry.com/nodejs/1032/nodejs-apps-in-visual-studio-mean-stack
https://www.js-tutorials.com/javascript-tutorial/angularjs-tutorial/angularjs-smart-table-add-edit-delete-records/
*/
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var jerseyDb = require(__dirname + '/server/jerseyDb.js');
var port = process.env.port || 1337;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//homepage
app.get('/', function (request, response) {
    //response.send("<b>This response is generated from Express router!!</b>");
    response.sendFile("views/pages/jerseyCrudSpa.html", { root: __dirname });
});
//jerseys API
app.get('/api/jerseys', jerseyDb.selectJerseyList); //list
app.get('/api/jerseys/:jerseyId', jerseyDb.selectJersey); //read
app.post('/api/jerseys', jerseyDb.insertJersey); //create
app.put('/api/jerseys/:jerseyId', jerseyDb.updateJersey); //update
app.delete('/api/jerseys/:jerseyId', jerseyDb.deleteJersey); //delete
//virtual folders
app.use('/modals', express.static(path.join(__dirname, '/views/modals')));
app.listen(port);
//# sourceMappingURL=server.js.map