var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    //CommonChunksPlugin = require('webpack/lib/optimize/CommonsChunkPlugin'),
    prodfolder = "_prod-dist",
    bootstrapEntryPoints = require('./webpack.bootstrap.config');
// const VENDORS = [
//     "bootstrap", "jquery"
// ];
// dev config for styles
var cssDev = ['style-loader', 'css-loader', 'sass-loader']
// production config for style (extract to seperate file(s))
var cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    loader: ['css-loader', 'sass-loader'],
    publicPath: '/' + prodfolder
})

// dev or prod build  flag
var isProd = process.env.NODE_ENV === 'production'
//set which css config to use
var cssConfig = isProd ? cssProd : cssDev;
var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;
var minify = isProd ? true : false;

module.exports = {
    entry: {
       // common: ["jquery"],
        app: './src/js/app.js',
        about: './src/js/about.js',
        bootstrap: bootstrapConfig,
        //vendor: VENDORS
    },
    output: {
        path: path.resolve(__dirname, prodfolder),
        filename: 'js/[name].bundle.js',
    },
    devtool: 'source-map',
    stats: 'errors-only',
    devServer: {
        port: 3000,
        open: true,
        stats: {
			colors: true,
			reasons: true,
			chunks: false,
			modules: false
		},
        compress: true,
        //contentBase: path.join(__dirname, prodfolder)
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            // { // used for multiple html pages. They can be imported in app.js. In this example project it's about.htm
            //     test: /\.html$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //         }
            //     }],
            //     exclude: path.resolve(__dirname, 'src/index.html')
            // },
            {
                test: /\.(jpg|png|svg|gif|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/'
                    }
                }]
            },
            // needed for twitter bootstrap icons
            {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
            },
            {
                test: /\.(ttf|eot)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
                use: 'imports-loader?jQuery=jquery,$=jquery'
            }
        ]
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     '$': 'jquery',
        //     'jQuery': 'jquery'
        //   }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disable: !isProd
        }),
        new HtmlWebpackPlugin({
            title: "Webpack 2",
            filename: 'index.html',
            template: 'src/index.html',
            excludeChunks: ['about'], // we need to exclude the other pages.
            hash: true,
            // minify: {
            //     collapseWhitespace: minify
            // }
        }),
        new HtmlWebpackPlugin({
            title: "About Us",
            filename: 'about.html',
            template: 'src/about.html',
            chunks: ['bootstrap','about'], // we need to include twitter bootsrap here
            hash: true,
            // minify: {
            //     collapseWhitespace: minify
            // }
        })
    ]
};