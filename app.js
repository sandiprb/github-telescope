var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nunjucks = require('nunjucks');

var app = express();

//#region Webpack HMR Middelware
if (app.get('env') === 'development') {
	const webpack = require('webpack');
	const webpackConfig = require('./webpack.config');
	const compiler = webpack(webpackConfig);
	app.use(
		require('webpack-dev-middleware')(compiler, {
			writeToDisk: true,
			noInfo: false,
			stats: false,
			stats: {
				colors: true,
			},
		})
	);
	app.use(require('webpack-hot-middleware')(compiler));
}
//#endregion

app.set('view engine', 'html');
nunjucks.configure('views', {
	autoescape: true,
	express: app,
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));

module.exports = app;
