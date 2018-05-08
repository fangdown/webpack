### Tech Stack 技术栈
 打包构建：Babel Webpack(4.x)
 热更新
 包管理：Yarn || Npm
 UI库：React & React-Dom(16.2.0)
 UI组件：Antd(3.x)
 路由：react-router(4.x)、react-router-redux
 JS：ES6、ES7
 样式：less
 状态管理：redux
 Ajax：Fetch
 跨域: 基于 CORS 实现
 代码校验: Eslint
 国际化: i18n
### Project Structure 项目结构
├── build.js                   项目打包后的文件
├── config                     webpack配置文件
│   ├──...
│   ├──webpack.config.dev.js   开发环境配置(启动速度优化)
│   ├──webpack.config.prod.js  生产环境配置(打包体积优化)
├── node_modules               node模块目录
├── public
│   └──index.html
├── scripts
│   ├── build.js               打包项目文件
│   ├── start.js               启动项目文件
│   └── test.js                测试项目文件(未用)
├── src
|   ├── index.js               项目入口文件
|   ├── App.js                 应用入口文件
|   ├── I18n.js                国际化文件
│   ├── main                   布局目录
│   │   ├── Main.jsx           布局文件
│   │   └── component          布局组件
│   ├── common                 核心目录
│   │   ├── component          通用功能组件
│   │   ├── utils              工具类
│   │   │   ├── index.js       通用工具
│   │   │   └── constant.js    通用常量配置
│   │   └── lib                第三方目录
│   ├── style                  通用样式目录
│   ├── images                 通用图片目录
│   ├── modules                页面模块
│   ├── locales                国际化目录
│   ├── store                  redux目录
│   └── server                 服务端目录(日后用到)
│       └── controller
├── .gitignore                 git忽略文件
├── package.json               项目包
├── README.md                  自我描述
└── yarn.lock                  yarn包文件