//生产环境中通用的配置
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');//并行运行uglifyjs插件
const HappyPack = require('happypack');//让loader可以多进程去处理文件
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const CleanWebpackPlugin = require('clean-webpack-plugin');//清空文件夹
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');//脚本内联到html
const CompressionPlugin = require("compression-webpack-plugin"); // gzip压缩


const path = require('path');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')  // css压缩
const autoprefixer = require('autoprefixer'); // 浏览器前缀
const px2rem = require('postcss-plugin-px2rem'); // 转换px为rem
const NODE_ENV = require('./config/config.dev.env');
const utils = require('./config/utils');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');// 将dll插入到HTML
// const XhrEvalChunkPlugin = require('xhr-eval-chunk-webpack-plugin').default; // xhr + eval 加载模块

var isProd = process.env.NODE_ENV === 'dev'

 
module.exports = {
    entry: {
        index: './src/main.js',
        vendor: ['vue', 'vuex', 'axios', './src/lib/rem', 'mcx-ui', 'fastclick']
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'assets/js/[name]-[id].js?[hash]' + +new Date(),
        publicPath: isProd ? '/' : '/dist/' ,
        //chunkFilename: 'assets/js/[name].chunk.js'
    },
    module: {
        rules: [
            // {
            //     test: /\.vue$/,
            //     loader: 'vue-loader',
            //     options: {
            //         extractCSS: false,
            //         postcss: [
            //         autoprefixer({
            //             browsers: ['Android > 1', 'ChromeAndroid > 1', 'FirefoxAndroid > 1', 'Samsung > 1', 'and_uc > 1', 'iOS > 1']
            //         }),
            //         require('postcss-plugin-px2rem')({
            //             rootValue:75, // 根字体大小
            //             unitPrecision: 3 // 渲染单位小数个数
            //         })
            //         ]
            //     },
            //     // include: path.resolve(__dirname, './node_modules/mcx-ui')
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  extractCSS: false,
                  postcss: [
                    autoprefixer({
                      browsers: ['Android > 1', 'ChromeAndroid > 1', 'FirefoxAndroid > 1', 'Samsung > 1', 'and_uc > 1', 'iOS > 1']
                    }),
                    require('postcss-plugin-px2rem')({
                        rootValue:75, // 根字体大小
                        unitPrecision: 3 // 渲染单位小数个数
                    })
                  ]
                },
                //include: path.resolve(__dirname, './src'),
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },       
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!less-loader' })
            },
            // {
            //     test: /\.js$/,
            //     loader: 'HappyPack/loader?id=jsHappy', //ES6转换为ES5
            //     exclude: /node_modules/,
            //     include: path.resolve(__dirname, './src'),
            //   },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                //exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, './src'),
                    path.resolve(__dirname, './node_modules/mcx-ui')
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  name: 'assets/images/[name].[ext]?[hash]',
                  limit: 10000
                },
                //include: path.resolve(__dirname, './src'),
            },
            {
            test: /\.(ttf|eot|svg|woff|woff2)/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]?[hash]'
                    }
                }
            ]
            }
        ]
    },
    resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          //'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    performance: {
        hints: false
    },
    plugins: [
        new ExtractTextPlugin('assets/css/main.css?[hash]' + +new Date()),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
              safe: true
            }
        }),
        //根据已有的html文件生成html文件
        new HtmlWebpackPlugin({  // 打包输出HTML
            minify:{ //压缩HTML文件
              removeComments:true,    //移除HTML中的注释
              collapseWhitespace:true    //删除空白符与换行符
            },
            filename: 'index.html',
            template: 'index.html'
        }),
        new CleanWebpackPlugin(['dist']), // 清空打包文件
        new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify(NODE_ENV.env)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // 提取公共基础库
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'assets/js/[name]-[id].js?[hash:8]' + +new Date // 被打包好的文件路径及公共模块名称
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            include: ['main.js'],
            exclude: ['vendor.js'],
            column: false
        }),
        //js 内联
        // new InlineManifestWebpackPlugin({
        //     name: 'webpackManifest'
        // }),
        //让loader可以多进程去处理文件
        // new HappyPack({
        //     id: 'jsHappy',
        //     threadPool: happyThreadPool,
        //     loaders: [{
        //         path: 'babel-loader',
        //         query: {
        //             // cacheDirectory: 'dll/.webpack_cache',
        //             presets: [
        //                 ["env", { "modules": false }],
        //                 'stage-3'
        //             ],
        //             "plugins": ["syntax-dynamic-import"]
        //         }
        //     }]
        // }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
              warnings: false
            },
            except: ['$super', '$', 'exports', 'require', 'const', 'let', '_']
        })
        // new CompressionPlugin({ // gzip
        //     asset: "[path].gz[query]",
        //     algorithm: "gzip",
        //     test: /\.js$|\.css$|\.html$/,
        //     threshold: 10240,
        //     minRatio: 0
        // }),
        
        // new webpack.DllReferencePlugin({  // dll
        //     context: __dirname,
        //     /** 
        //         下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
        //         这样webpack打包时，就先直接去这个json文件中把那些预编译的资源弄进来
        //     **/
        //     manifest: require('./dll/dll.manifest.json')
        // }),
        // 将 dll.dll.js 插入HTML里
        // new HtmlWebpackIncludeAssetsPlugin({
        //     publicPath: '/',
        //     assets: 'dll/dll.js',
        //     files: ['index.html'],
        //     append: false,
        //     hash: true
        // }),
        
        // new XhrEvalChunkPlugin()
    ],
    //devtool: '#source-map'
}