// Require GoogleFit.js
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
// load the auth variables
var configAuth = require('../auth/auth'); // use this one for testing
var articleRouter = require('../routes/article');

module.exports = ArticleAPI;

var search = google.customsearch('v1');

function ArticleAPI() {
	var self = this;
}

ArticleAPI.prototype.search = function(query) {
	// Example: Get user's Profile information
	// search.cse.list({
		
	// 	key: 'AIzaSyBm6Al4EfX5LflmIeQmsLDBy_-UXvxJ2HU',
	// 	cx: '003656702939349543987:l_hpmdvght0',
	// 	q:query

	// }, function(err, reply) {
	// 	if(err) { console.log(err); }

	// 	// Do whatever you need with the API's reply.
	// 	reply.items.forEach(function(entry) {
	// 		var imageLink = "";
	// 		if(entry.pagemap) {
	// 			if(entry.pagemap.cse_image) {
	// 				if(entry.pagemap.cse_image[0]) {
	// 					if(entry.pagemap.cse_image[0].src) {
	// 						imageLink = entry.pagemap.cse_image[0].src;
	// 					}
	// 				}
	// 			}
	// 		}
	// 		articleRouter.saveArticle({
	// 			thumbUrl: imageLink,
	// 			title: entry.title,
	// 			summary: entry.snippet,
	// 			link: entry.link,
	// 			displayLink: entry.displayLink,
	// 			queryString: query
	// 		});
	// 	});
	// });
};

ArticleAPI.prototype.searchLocal = function(tag, callback) {
  var queryString = articleRouter.tag2QueryString[tag];
  console.log(queryString);
  articleRouter.getArticle(queryString, function(article){
    console.log("from search local");
  });
};