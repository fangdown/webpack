### 默认设置，简单配置
1， 引入js css img loader解析器
2， 引入webpack-dev-server 本地服务器
3， scripts脚本分start 和 build 命令
4， html-webpack-plugin 动态插入构建脚本


### 进价配置
1， 建立config文件夹， 分离开发模式 和生产模式
2， 引入css文件，把css代码抽取到公共文件中
3, 对一些常用路径的变量定义
4, 增加css的兼容性处理，
5，增加别名属性
6，增加热更新插件，热更新不等于自动刷新
7，生产模式下
  clean-webpack-plugin 清除目录
  mini-css-extract-plugin 抽取css代码
  splitChunks抽取公共代码-替代CommonsChunkPlugin
8，复用webpack公共部分代码
9, dll优化构建速度（webpack4不一定支持）