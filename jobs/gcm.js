/**
 * Created by zhenfangzhang on 30/10/15.
 */
var express = require('express');
var router = express.Router();
var gcm = require('node-gcm');

// Set up the sender with you API key
var sender = new gcm.Sender('AIzaSyAEftk9ZuLdOwuyH50le50o8pCkjGVWZeQ');


var sendPush = function (gcmToken) {
	var regTokens = [gcmToken];

	var message = new gcm.Message();

	message.addData('message','Your buddy has nudged you.');
	message.addNotification('title', 'Nudge');
	message.addNotification('body', 'Your buddy has nudged you.');

	sender.send(message, { registrationIds: regTokens }, function (err, result) {
	  if(err) console.error(err);
	  else    console.log(result);
	});
};

router.sendPush = sendPush;
module.exports = router;
