var path = require("path");
var webpack = require("webpack");
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'polyfills': "./src/polyfills.ts",
        'app': "./src/main.ts"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "[name].js"
    },
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
                loader: "awesome-typescript-loader",
                options: {
                    configFileName: path.resolve(__dirname, "tsconfig.json")
                }
            },
                "angular2-template-loader"
            ]
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: "file-loader?name=assets/[name].[ext]"
        }, {
            test: /\.css$/,
            exclude: path.resolve(__dirname, "src/css"),
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.css$/,
        }]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.resolve(__dirname, "src"), {}
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "polyfills"]
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        new UglifyJsPlugin(),
        new ExtractTextPlugin("[name].css"),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false
            }
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/css',
                to: 'css'
            }
        ])
    ]
}