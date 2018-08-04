const path = require('path');
const webpack = require('webpack');

const projectPath = path.resolve(__dirname);
const appPath = `${projectPath}/public/app`;

module.exports = {
	entry: {
		app: [
			'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
			`${appPath}/index.tsx`,
		],
		vendor: [
			'react',
			'react-dom',
			'react-loader',
			'react-redux',
			'react-router-dom',
			'redux',
			'redux-logger',
			'redux-saga',
			'immer',
		],
	},

	mode: 'development',

	output: {
		path: `${projectPath}/public/build/`,
		filename: '[name].bundle.js',
		publicPath: `./static/build/`,
		hotUpdateChunkFilename: 'hot/hot-update.js',
		hotUpdateMainFilename: 'hot/hot-update.json',
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
			},
			{
				test: /\.pcss$/,
				loader: 'style-loader!css-loader!postcss-loader',
			},
			{
				test: /\.(png|jpg|svg)$/,
				loader: 'url-loader',
			},
			{
				test: /\.tsx$/,
				loaders: ['react-hot-loader/webpack', 'babel'],
				include: path.join(__dirname, 'src'),
			},
		],
	},

	plugins: [new webpack.HotModuleReplacementPlugin()],
};
