var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'babel-polyfill',
		'./src/index',
		'./src/css/style.css'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('styles.css', {
			allChunks: true
		})
	],
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loaders: ['eslint'],
				include: [
					path.resolve(__dirname, "src"),
				],
			}
		],
		loaders: [
			{
				loaders: ['babel-loader'],
				include: [
					path.resolve(__dirname, "src"),
				],
				test: /\.js$/,
				plugins: ['transform-runtime']
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
			}
		]
	}
}