// const webpack = require("webpack");

// module.exports = {
//     resolve: {
//         fallback: {
//             buffer: require.resolve("buffer/"),
//         },
//     },
//     plugins: [
//         new webpack.ProvidePlugin({
//             Buffer: ["buffer", "Buffer"],
//         }),
//     ],
// };


module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,  // Ensure Webpack processes .js and .mjs files correctly
                exclude: [/node_modules/],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.js$/, // Handle source maps
                enforce: "pre",
                use: ["source-map-loader"],
                exclude: [
                    /node_modules\/react-datepicker/, // ✅ Suppress map warnings here
                ],
            }
        ]
    },
    resolve: {
        fullySpecified: false // Fixes "fully specified" error
    }
};

