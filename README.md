# Vue 3 + Typescript + Vite 模板搭建

### 初步 Vite +Vue 项目搭建

参考[vite 官方文档教程](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

```bash
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app -- --template vue
```

这里我选用yarn命令创建，用npm创建的话不会有相应库可供选择安装，在可选项中我选择vue-ts

cd 到 相应的目录文件夹

```bash
# 进入项目文件夹
cd 你自己命名的文件夹
# 安装依赖
yarn
# 启动
yarn dev
```

项目中引入ts后在.vue文件中导入vues时可能会出现无法识别vue的错误（也可能不出现）

解决方案：添加类型声明， 在shims-vue.d.ts`同级新增一个xx.d.ts文件（文件名随意，后缀一定是.d.ts） 加如以下配置

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route } from 'vue-router'
import { Store } from 'vuex'
import t from '@/i18n'
// 扩充
declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter
        $route: Route
        $store: Store<any>
        $t: t
    }
}
```



### 加入Eslint支持

#### eslint 安装

[eslint官方文档](https://eslint.org/docs/user-guide/getting-started)

[typeScript插件](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin)

``` bash
# eslint 安装
yarn add eslint --dev

# eslint 插件相关安装
yarn add eslint-plugin-vue --dev
yarn add @typescript-eslint/eslint-plugin --dev
yarn add eslint-plugin-prettier --dev

# typescript parser
yarn add @typescript-eslint/parser --dev

```

 注意: 如果 `eslint` 安装报错:如下

``` bash
error @eslint/eslintrc@1.2.2: The engine "node" is incompatible with this module. Expected version "^12.22.0 || ^14.17.0 || >=16.0.0". Got "14.15.3"
error Found incompatible module.
```

[解决方案参考链接](https://blog.csdn.net/qq_42144899/article/details/88574761)

执行以下命令

```bash
yarn config set ignore-engines true
再执行安装eslint的命令
yarn add eslint --dev
```

#### 项目下新建 .eslintrc.js

更多配置规则见[官方文档](http://eslint.cn/docs/rules/)

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // eslint-config-prettier 的缩写
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // eslint-plugin-vue @typescript-eslint/eslint-plugin eslint-plugin-prettier的缩写
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-var': 'error',
    'prettier/prettier': 'error',
    // 禁止出现console
    'no-console': 'warn',
    // 禁用debugger
    'no-debugger': 'warn',
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 'warn',
    // 禁止出现空语句块
    'no-empty': 'warn',
    // 禁止不必要的括号
    'no-extra-parens': 'off',
    // 禁止对 function 声明重新赋值
    'no-func-assign': 'warn',
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 'warn',
    // 强制所有控制语句使用一致的括号风格
    curly: 'warn',
    // 要求 switch 语句中有 default 分支
    'default-case': 'warn',
    // 强制尽可能地使用点号
    'dot-notation': 'warn',
    // 要求使用 === 和 !==
    eqeqeq: 'warn',
    // 禁止 if 语句中 return 语句之后有 else 块
    'no-else-return': 'warn',
    // 禁止出现空函数
    'no-empty-function': 'warn',
    // 禁用不必要的嵌套块
    'no-lone-blocks': 'warn',
    // 禁止使用多个空格
    'no-multi-spaces': 'warn',
    // 禁止多次声明同一变量
    'no-redeclare': 'warn',
    // 禁止在 return 语句中使用赋值语句
    'no-return-assign': 'warn',
    // 禁用不必要的 return await
    'no-return-await': 'warn',
    // 禁止自我赋值
    'no-self-assign': 'warn',
    // 禁止自身比较
    'no-self-compare': 'warn',
    // 禁止不必要的 catch 子句
    'no-useless-catch': 'warn',
    // 禁止多余的 return 语句
    'no-useless-return': 'warn',
    // 禁止变量声明与外层作用域的变量同名
    'no-shadow': 'off',
    // 允许delete变量
    'no-delete-var': 'off',
    // 强制数组方括号中使用一致的空格
    'array-bracket-spacing': 'warn',
    // 强制在代码块中使用一致的大括号风格
    'brace-style': 'warn',
    // 强制使用骆驼拼写法命名约定
    camelcase: 'warn',
    // 强制使用一致的缩进
    indent: 'off',
    // 强制在 JSX 属性中一致地使用双引号或单引号
    // 'jsx-quotes': 'warn',
    // 强制可嵌套的块的最大深度4
    'max-depth': 'warn',
    // 强制最大行数 300
    // "max-lines": ["warn", { "max": 1200 }],
    // 强制函数最大代码行数 50
    // 'max-lines-per-function': ['warn', { max: 70 }],
    // 强制函数块最多允许的的语句数量20
    'max-statements': ['warn', 100],
    // 强制回调函数最大嵌套深度
    'max-nested-callbacks': ['warn', 3],
    // 强制函数定义中最多允许的参数数量
    'max-params': ['warn', 3],
    // 强制每一行中所允许的最大语句数量
    'max-statements-per-line': ['warn', { max: 1 }],
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 3 }],
    // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-lonely-if': 'warn',
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 'warn',
    // 禁止出现多行空行
    'no-multiple-empty-lines': 'warn',
    // 禁止出现;
    semi: ['warn', 'never'],
    // 强制在块之前使用一致的空格
    'space-before-blocks': 'warn',
    // 强制在 function的左括号之前使用一致的空格
    // 'space-before-function-paren': ['warn', 'never'],
    // 强制在圆括号内使用一致的空格
    'space-in-parens': 'warn',
    // 要求操作符周围有空格
    'space-infix-ops': 'warn',
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': 'warn',
    // 强制在注释中 // 或 /* 使用一致的空格
    // "spaced-comment": "warn",
    // 强制在 switch 的冒号左右有空格
    'switch-colon-spacing': 'warn',
    // 强制箭头函数的箭头前后使用一致的空格
    'arrow-spacing': 'warn',
    'prefer-const': 'warn',
    'prefer-rest-params': 'warn',
    'no-useless-escape': 'warn',
    'no-irregular-whitespace': 'warn',
    'no-prototype-builtins': 'warn',
    'no-fallthrough': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-case-declarations': 'warn',
    'no-async-promise-executor': 'warn',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
```

#### 项目下新建 .eslintignore

 eslint 忽略检查 (根据项目需要自行添加)

```
node_modules
dist
```

### 加入prettier 支持

```
# 安装 prettier
yarn add prettier --dev
```



#### 解决 eslint 和 prettier 冲突

 解决 `ESLint` 中的样式规范和 `prettier` 中样式规范的`冲突`，以 `prettier` 的样式规范`为准`，使 ESLint 中的样式规范自动失效

```
# 安装插件 eslint-config-prettier
yarn add eslint-config-prettier --dev
```

#### 项目下新建  .prettierrc.js

Prettier 的配置文件可以用 4 种文件格式编写，随便喜欢哪一种，文件名不要写错就行

1. JavaScript `.prettierrc.js`或`prettier.config.js`
2. JSON `.prettierrc.json`
3. YAML `.prettierrc.yaml`或`.prettierrc.yml`
4. TOML `.prettierrc.toml`

 配置 `prettier` 格式化规则

更多配置详看[配置文档](https://prettier.io/docs/en/configuration.html)

```js
module.exports = {
  tabWidth: 2,
  jsxSingleQuote: true,
  jsxBracketSameLine: true,
  printWidth: 100,
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
  arrowParens: 'always',
}
```



#### 项目下新建 .prettierignore

```bash
# 忽略格式化文件 (根据项目需要自行添加)
node_modules
dist
!.prettierignore
```

在.prettierrc.js文件中可能会出现以下警告，可以在 .prettierignore中添加 !.prettierignore

```bash
 warning  File ignored by default.  Use a negated ignore pattern (like "--ignore-pattern '!<relative/path/to/filename>'") to override

```

#### package.json 文件的*scripts"*选项加入以下配置

```js
 "script": {
    "lint": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx",
    "prettier": "prettier --write ."
  }
```

 上面配置完成后,可以运行以下`命令`测试下代码检查个`格式化`效果:

``` bash
 # eslint 检查
 yarn lint

 # prettier 自动格式化
 yarn prettier
```

### 配置文件引入别名alias

修改 `vite.config.ts` 文件配置,注意__dirname前面是两个下划线

``` bash
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})

```

 修改 `tsconfig.json`

```js
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"],
    "baseUrl": ".",
    "paths": {
      "@/*":["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### 配置 css 预处理器 scss

```bash
yarn add dart-sass --dev
yarn add sass --dev
```

#### 配置全局 scss 样式文件

在 `src/assets` 下新增 `style` 文件夹，用于存放全局样式文件

新建 `main.scss`, 设置一个用于测试的颜色`变量` :

``` bash
$test-color: red;
```

 如何将这个全局样式文件`全局注入`到项目中呢？配置 `Vite` 即可

在vite.config.ts文件中加入css项

```js
css:{
    preprocessorOptions:{
      scss:{
        additionalData:'@import "@/assets/style/main.scss";'
      }
    }
  },
```

#### VsCode ctr+s自动保存所有改动的文件

写到这里我突然发现了一个我知道了很久确一直没有解决的问题，就是每次修改文件的时候可能忘了保存，当在其他页面保存了的时候会发现报错，有时候半天都不知道是哪里出问题，每次因为这个都要化很多宝贵的时间，很悲催的此时此刻我遇到了，开始解决。

1、在vscode中搜索安装插件 [multi-command](https://marketplace.visualstudio.com/items?itemName=ryuta46.multi-command)

2、在项目根目录下创建 `.vscode` 文件，当然你也可以在vscode的配置文件中直接配置，随你喜欢

3、在 `.vscode` 文件下创建 `settings.json`。

4、在 `settings.json` 中拷入如下配置：

```
{
  "multiCommand.commands": [
    {
      "command": "workbench.action.files.save",
      "sequence": ["workbench.action.files.saveAll"]
    }
  ]
}
```

好了，现在不用担心自动保存的事情了

### 配置路由

``` bash
yarn add vue-router@4
```

 在 `src` 文件下新增router.ts文件,写入以下内容，如果路由比较多的话建议建一个文件夹

``` js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/pages/login/Login.vue'), // 注意这里要带上 文件后缀.vue
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

```

 修改入口文件 `mian.ts` ，全局引入router

``` js
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'

const app = createApp(App)
app.use(router)
createApp(App).mount('#app')

```

更多配置可看[官方文档](https://router.vuejs.org/zh/introduction.html)

### 封装axios

[axios封装相关库](https://github.com/attojs/vue-request)

``` bash
# 安装 axios
yarn add axios
# 安装 nprogress 用于请求 loading
# 也可以根据项目需求自定义其它 loading
yarn add nprogress
# 类型声明，或者添加一个包含 `declare module 'nprogress'
yarn add @types/nprogress --dev
```

新增service文件夹，service下新增http.ts文件以及api文件夹，其中http.ts用来axios封装

``` js
//http.ts
import axios, { AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'

// 设置请求头和请求路径
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      //@ts-ignore
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return error
  }
)
// 响应拦截
axios.interceptors.response.use((res) => {
  if (res.data.code === 111) {
    sessionStorage.setItem('token', '')
    // token过期操作
  }
  return res
})

interface ResType<T> {
  code: number
  data?: T
  msg: string
  err?: string
}
interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>
  post<T>(url: string, params?: unknown): Promise<ResType<T>>
  upload<T>(url: string, params: unknown): Promise<ResType<T>>
  download(url: string): void
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .get(url, { params })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      NProgress.start()
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          NProgress.done()
          resolve(res.data)
        })
        .catch((err) => {
          NProgress.done()
          reject(err.data)
        })
    })
  },
  download(url) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  },
}
export default http
```

## 状态管理 pinia

[官方文档](https://pinia.vuejs.org/)

``` bash
# 安装
yarn add pinia@next
```

main.ts 中增加

``` bash
# 引入
import { createPinia } from "pinia"
# 创建根存储库并将其传递给应用程序
app.use(createPinia())
```

创建store文件夹，在里面可以定义你需要的store,比如说保存用户信息的useeDataStore.ts

``` js
import { defineStore } from 'pinia'

export const userDataStore = defineStore('userData', {
  state: () => {
    return { userId: 0 }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {

  },
  getters: {

  },
})
```

更多详细自己看官方文档，反正用起来就是很舒服

#### 自动导入

我在想要不要加这一部分，我感觉如果加的话是可以少些一些代码，也不用一点一点地找路径去导入，但是有一个不太好的地方就是在看代码找相应的变量的时候哪些变量是引入，哪些变量是当前文件定义的就会比较难区分，增加了代码阅读的阻碍，我比较想有的一个功能是在你只管写，而不用自己去写import语句，写了变量之后会给你自己写import，不知道有没有这个功能，等无聊了再看吧。。。。。

## 引入vite打包可视化插件rollup-plugin-visualizer
用法详见[rollup-plugin-visualizer ](https://www.npmjs.com/package/rollup-plugin-visualizer)

## 引入图标库iconify
用法详见[iconify/vue引用方法](https://docs.iconify.design/icon-components/vue/)，图标列表详见[图标列表](http://icon-sets.iconify.design/material-symbols/)



