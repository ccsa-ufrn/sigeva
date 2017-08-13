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
	},
	node: {
		fs: 'empty',
		module: 'empty',
		net: 'empty',
		tls: 'empty'
	}
};

const front = {
	entry: path.join(__dirname, "/src/front/main.js"),
	output: {
		path: path.join(__dirname, "/dist/front"),
		filename: "output.js"
	}
};

const back = {
	entry: path.join(__dirname, "/src/controllers/main.js"),
	output: {
		path: path.join(__dirname, "/dist/back"),
		filename: "output.js"
	}
};

// TODO: Each service must exports one separated file
const services = {
	entry: path.join(__dirname, "/src/services/main.js"),
	output: {
		path: path.join(__dirname, "/dist/service"),
		filename: "service.js"
	}
};

module.exports = [
	Object.assign({}, common, front),
	Object.assign({}, common, back),
	Object.assign({}, common, services)
];
