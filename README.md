# 项目说明

需要安装 node, npm, PM2，然后进入项目目录，运行：

```js
npm install # 安装依赖
npm run build # 项目构建
npm start # 启动服务
```

运行端口配置，在文件process.json

## 开发阶段命令

```s
npm run dev # 开发过程中启动服务调试，支持nodemon热加载
npm run build # 源文件打包为生产环境可运行文件(dist目录下)
npm run serve # 本地运行，简单的node命令运行服务，模拟生产环境快捷测试
npm run test # 运行单元测试
```

## 生产环境启动命令

生产环境需配置 process.json -> interpreter 到对应的node bin安装路径，以及下方的log文件放置路径

```s
npm run start # 通过PM2启动express服务
npm run restart # 重启服务
npm run stop # 停止服务
npm run killall # 杀死启动的PM2进程(比npm run stop更彻底，强制关闭运行程序)
```

## 进程管理工具PM2命令说明

```s
npm install pm2 -g # 命令行安装 pm2
$ pm2 start bin/www -i 4 # 后台运行pm2，启动4个app.js ，也可以把'max' 参数传递给 start，正确的进程数目依赖于Cpu的核心数目
$ pm2 start bin/www --name my-api # 命名进程
$ pm2 list # 显示所有进程状态
$ pm2 monit # 监视所有进程
$ pm2 logs # 显示所有进程日志
$ pm2 stop all # 停止所有进程
$ pm2 restart all # 重启所有进程
$ pm2 reload all # 0 秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop 0 # 停止指定的进程
$ pm2 restart 0 # 重启指定的进程
$ pm2 startup # 产生 init 脚本 保持进程活着
$ pm2 web # 运行健壮的 computer API endpoint (http://localhost:9615)
$ pm2 delete 0 # 杀死指定的进程
$ pm2 delete all # 杀死全部进程
```