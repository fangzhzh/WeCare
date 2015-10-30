/**
 * Created by zhenfangzhang on 31/10/15.
 */
var express = require('express');
var router = express.Router();
var RECOMMENDATION_TYPE_ARTICLE = 0;
var RECOMMENDATION_TYPE_NUDGE = 1;

router.RECOMMENDATION_TYPE_ARTICLE = RECOMMENDATION_TYPE_ARTICLE;
router.RECOMMENDATION_TYPE_NUDGE = RECOMMENDATION_TYPE_NUDGE;
module.exports = router;
