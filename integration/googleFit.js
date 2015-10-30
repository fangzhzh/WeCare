// Require GoogleFit.js
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
// load the auth variables
var configAuth = require('../auth/auth'); // use this one for testing
var articleRouter = require('../routes/article');

module.exports = FitnessAPI;

var fitness = google.fitness('v1');

function FitnessAPI() {
	var self = this;
}

FitnessAPI.prototype.fetchData = function(user) {
	var client = new OAuth2({
		client_id : configAuth.googleAuth.clientID,
	    client_secret : configAuth.googleAuth.clientSecret,
	    redirect_uri : configAuth.googleAuth.callbackURL
	});
	client.setCredentials({
	  access_token: user.google.token
	});
	
    // Example: Get user's Profile information
    fitness.users.dataSources.list({ userId:'me', auth:client }, function(err, reply) {
        if(err) { console.log(err); }

        // Do whatever you need with the API's reply.
        reply.dataSource.forEach(function(entry) {
        	if(entry.dataType.name == "com.google.step_count.delta"
        		&& entry.dataStreamName == "estimated_steps") {
        		var dataStreamId = entry.dataStreamId;
        		var name = entry;
        		var time = 1430265600 + "000000000-" + 1430352000 + "000000000";
        		fitness.users.dataSources.datasets.get({ userId:'me', dataSourceId:dataStreamId, datasetId:time, auth:client}, function(err, resp){
        			var count = 0;
        			if(!resp.point)
        				return;
        			resp.point.forEach(function(pointData) {
        				count = count + pointData.value[0].intVal;
        			});
        			console.log("STEP: ", count)
        			console.log("----------------")
        		});
        	}

        	if(entry.dataType.name == "com.google.calories.expended" 
        		&& entry.dataStreamName == "merge_calories_expended") {
        		var dataStreamId = entry.dataStreamId;
        		var name = entry;
        		var time = 1430265600 + "000000000-" + 1430352000 + "000000000";
        		fitness.users.dataSources.datasets.get({ userId:'me', dataSourceId:dataStreamId, datasetId:time, auth:client}, function(err, resp){
        			var count = 0;
        			if(!resp.point)
        				return;
        			resp.point.forEach(function(pointData) {
        				count = count + pointData.value[0].fpVal;
        			});
        			console.log("CALORIE: ", count)
        			console.log("----------------")
        		});
        	}
        });
    });
};