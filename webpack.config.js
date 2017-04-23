var webpack = require('webpack');

module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "./dist/linkup.js",
        library: 'linkup',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE.ENV': "development"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        filename: "jeek.js",
        publicPath: "/static/js/",
        port: 5122,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    },
};

