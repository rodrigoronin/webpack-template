import path from "node:path";
import { fileURLToPath } from "node:url";
import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    open: true,
    hot: false,
    liveReload: true,
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["css-loader", "style-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new Dotenv(), // loads .env file
    new HtmlWebpackPlugin({
      // injects the entry script into this html file
      template: "./public/index.html",
      inject: "body",
    }),
  ],
};
