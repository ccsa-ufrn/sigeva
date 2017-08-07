var path = require("path");

const common = {
	devtool: "eval-source-map",
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};

const front = {
	entry: path.join(__dirname, "/lib/front/main.js"),
	output: {
		path: path.join(__dirname, "/dist/front"),
		filename: "output.js"
	}
};

const back = {
	entry: path.join(__dirname, "/lib/back/main.js"),
	output: {
		path: path.join(__dirname, "/dist/back"),
		filename: "output.js"
	}
}

module.exports = [
	Object.assign({}, common, front),
	Object.assign({}, common, back)
];
