// Require GoogleFit.js
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
// load the auth variables
var configAuth = require('../auth/auth'); // use this one for testing

module.exports = ArticleAPI;

var search = google.customsearch('v1');

function ArticleAPI() {
	var self = this;
}

ArticleAPI.prototype.search = function(query) {
	// Example: Get user's Profile information
	search.cse.list({
		
		key: 'AIzaSyBwrjpU0ROGuOSlKTNkxJ3eAlbZX3HXUtQ',
		cx: '017493724765068128262:wp65txxlx00',
		num:5,
		q:query

	}, function(err, reply) {
		if(err) { console.log(err); }

		// Do whatever you need with the API's reply.
		console.log(reply);
	});
};
