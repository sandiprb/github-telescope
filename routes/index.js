var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Welcome' });
});

router.get('/:username', function(req, res, next) {
	const { username } = req.params;
	res.render('index', { title: username });
});

module.exports = router;
