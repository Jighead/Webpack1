var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// dev config for styles
var cssDev = ['style-loader', 'css-loader', 'sass-loader']
// production config for style (extract to seperate file(s))
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    loader: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
  })
// dev or prod build  flag
var isProd = process.env.NODE_ENV === 'production'
//set which css config to use
var cssConfig = isProd ? cssProd : cssDev

var minify = isProd ? true : false

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    stats: 'errors-only',
    
    devServer: {
        port: 3000,
        inline: true,
        open: true,
        stats: "errors-only",
        compress: true,
        contentBase: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            { // used for multiple html pages. They can be imported in app.js. In this example project it's second.html and third.html
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        }
                    }
                ],
                exclude: path.resolve(__dirname, 'src/index.html')
            },
            {
                test: /\.(jpg|png|svg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'main.css',
            disable: !isProd
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify : { collapseWhitespace: minify }
        })
        //new CleanWebpackPlugin(['dist']) // removes dist folder after build when using the webpack dev server. Run build:prod to see the dist folder.
    ]
};
