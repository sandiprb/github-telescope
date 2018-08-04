const path = require('path');
const webpack = require('webpack');

const projectPath = path.resolve(__dirname);
const appPath = `${projectPath}/public/app`;

module.exports = {
	entry: {
		app: `${appPath}/index.tsx`,
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

	output: {
		path: `${projectPath}/public/build/`,
		filename: '[name].bundle.js',
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
		],
	},

	plugins: [],
};
