/**
 * Created by zhenfangzhang on 30/10/15.
 */
var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var svm = require('node-svm');
var fs = require('fs');




var predict = function (data) {
  console.log(__function__line);

  var persistedModel = JSON.parse(fs.readFileSync('./utils/model.json')); // read persisted model
  console.log(__function__line+persistedModel);
  var svm1 =  new svm.CSVC({}, persistedModel);
  console.log(__function__line+svm1);

  data.forEach(function(ex){
    var prediction = svm1.predictSync(ex);
    console.log('result =%d', prediction);
  });
};

router.predict = predict;
module.exports = router;
