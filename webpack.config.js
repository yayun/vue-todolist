module.exports = {
  entry: './main.js',
  output: {
    path: __dirname,
    filename: 'build.js'
  },
  resolve: {
    alias: {vue: 'vue/dist/vue.js'}
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
}
