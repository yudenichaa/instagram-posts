const path = require("path");

module.exports = (env = {}) => ({
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.join(__dirname, "public/"),
        filename: "bundle.js",
    },
    mode: env.production ? "production" : "development",
    devtool: env.production ? "" : "inline-source-map",
    devServer: {
        contentBase: "./public",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
});
