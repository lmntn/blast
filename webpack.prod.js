const { merge } = require("webpack-merge");
const path = require("path");
const dev = require("./webpack.dev.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(dev, {
	mode: "production",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js",
		clean: true,
	},
	devtool: false,
	performance: {
		maxEntrypointSize: 1500000,
		maxAssetSize: 1500000
	},
	module: {
		rules: [
			{
				test: /\.(png|woff|woff2|ttf)$/i,
				type: "asset"
			}, {
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"less-loader"
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin()
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false
					}
				}
			}),
			// new ImageMinimizerPlugin({
			// 	minimizer: {
			// 		implementation: ImageMinimizerPlugin.imageminMinify,
			// 		options: {
			// 			plugins: [
			// 				["optipng", { optimizationLevel: 5 }]
			// 			],
			// 		},
			// 	},
			// }),
		]
	}
});