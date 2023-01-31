---
title: nodemon热重启
categories:
  - Node
tags:
  - Node
author: 'Jake'
date: 2018-05-01 04:41:10
keywords: nodemon,node,自动,重启
comments:
original:
permalink:

---

![](//blogimg.jakeyu.top/nodemon%E7%83%AD%E9%87%8D%E5%90%AF/35731649-652807e8-080e-11e8-88fd-1b2f6d553b2d.png)

<!--more-->

[https://github.com/remy/nodemon](https://github.com/remy/nodemon)

## 本地安装

```sh
npm install nodemon --save
```

## 创建配置文件 `nodemon.json`

```json
{
  "restartable": "rs",
  "ignore": [
    "node_modules/",
    "public/**/*.*"
  ],
  "verbose": true,
  "execMap": {
    "js": "node --harmony"
  },
  "watch": [

  ],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js json"
}
```

* restartable-设置重启模式
* ignore-设置忽略文件
* verbose-设置日志输出模式，true 详细模式
* execMap-设置运行服务的后缀名与对应的命令
```json
{
	“js”: “node –harmony”
}
```
* 表示使用 nodemon 代替 node
* watch-监听哪些文件的变化，当变化的时候自动重启
* ext-监控指定的后缀文件名

## 运行

```sh
nodemon app.js
```
