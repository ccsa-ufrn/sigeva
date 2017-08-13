var path = require("path");

const react = {
	devtool: "eval-source-map",
	entry: path.join(__dirname, "/src/components/app.js"),
	output: {
		path: path.join(__dirname, "/public/assets/js"),
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
};

module.exports = react;
