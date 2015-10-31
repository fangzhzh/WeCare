// Require GoogleFit.js
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
// load the auth variables
var configAuth = require('../auth/auth'); // use this one for testing
var articleRouter = require('../routes/article');
var activityRouter = require('../routes/activity');


module.exports = FitnessAPI;

var fitness = google.fitness('v1');

function FitnessAPI() {
	var self = this;
}

FitnessAPI.prototype.fetchData = function(user, date) {
	var client = new OAuth2({
		client_id : configAuth.googleAuth.clientID,
	    client_secret : configAuth.googleAuth.clientSecret,
	    redirect_uri : configAuth.googleAuth.callbackURL
	});

	client.setCredentials({
	  access_token: user.google.token
	});

  var start = new Date(date);
  start.setHours(0,0,0,0);

  var end = new Date(date);
  end.setHours(23,59,59,999);
  // Example: Get user's Profile information

  fitness.users.dataSources.list({ userId:'me', auth:client }, function(err, reply) {
      if(err) { console.log(err); return;}

      // Do whatever you need with the API's reply.
      reply.dataSource.forEach(function(entry) {
        if(entry.dataType.name == "com.google.step_count.delta"
          && entry.dataStreamName == "estimated_steps") {
          var dataStreamId = entry.dataStreamId;
          var name = entry;
          var time = start.getTime() + "000000-" + end.getTime() + "000000";
          fitness.users.dataSources.datasets.get({ userId:'me', dataSourceId:dataStreamId, datasetId:time, auth:client}, function(err, resp){
            var count = 0;
            if(!resp || !resp.point)
              return;
            resp.point.forEach(function(pointData) {
              count = count + pointData.value[0].intVal;
            });
            activityRouter.saveActivity({
              user: user._id,
              userId: user.userId,
              dataTime: start.getTime(),
              steps:count
            });

            console.log("STEP: ", count)
          });
        }

        if(entry.dataType.name == "com.google.calories.expended"
          && entry.dataStreamName == "merge_calories_expended") {
          var dataStreamId = entry.dataStreamId;
          var name = entry;
          var time = start.getTime() + "000000-" + end.getTime() + "000000";
          fitness.users.dataSources.datasets.get({ userId:'me', dataSourceId:dataStreamId, datasetId:time, auth:client}, function(err, resp){
            var count = 0;
            if(!resp.point)
              return;
            resp.point.forEach(function(pointData) {
              count = count + pointData.value[0].fpVal;
            });
            activityRouter.saveActivity({
              user: user._id,
              userId: user.userId,
              dataTime: start.getTime(),
              calorie:count
            });
            console.log("CALORIE: ", count)
          });
        }
      });
  });
};
