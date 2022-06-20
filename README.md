# toutiao-m

## 项目_目录结构
```
 ├── node_modules # 安装的包
├── public	# 静态资源托管目录
│   ├── favicon.ico
│   └── index.html
└── src	# 源码
    ├── api	#请求接口封装模块
    	└── index.js #封装请求方法
    ├── assets	#资源目录
    ├── components	#组件目录
    ├── router	#路由模块
    	└── index.js #路由对象
    ├── store	#Vuex容器模块
    	└── index.js #store对象
    ├── styles #样式目录
    ├── utils  #工具模块目录
    ├── views  #视图组件目录
    ├── App.vue	#根组件
    └── main.js	#入口文件
├── .browserslistrc # 浏览器的约定
├── .editorconfig #对本项目要用到编辑器的约定
├── .eslintrc.js #eslint
├── .gitignore # git的忽略设置
├── babel.config.js	#babel配置文件
├── package-lock.json	#npm相关文件
├── package.json	#npm相关文件
└── README.md	#项目说明文件
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
