var path = require("path");

const config = {
	devtool: "eval-source-map",
	entry: path.join(__dirname, "/lib/main.js"),
	output: {
		path: path.join(__dirname, "/dist/"),
		filename: "bundle.js",
		publicPath: "/"
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}]
	}
};

module.exports = config;
