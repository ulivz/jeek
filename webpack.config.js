var webpack = require('webpack');

module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "./public/jeek.js",
        library: 'jeek',
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
        // new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        filename: "jeek.js",
        publicPath: "/public/",
        port: 8099,
        historyApiFallback: true,
        hot: true,
        inline: true
    },
};

