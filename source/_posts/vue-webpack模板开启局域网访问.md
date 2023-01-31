---
title: vue webpack模板开启局域网访问
categories:
  - 前端
tags:
  - VUE
author: Jake
date: 2018-09-20 10:18:51
description:
keywords: vue,webpack,vue-cli,局域网,ip,访问
comments:
original:
permalink:
---

修改`config/index.js`文件：

```js
const { networkInterfaces } = require('os')
const getIpAddress = () => (networkInterfaces().en0 || networkInterfaces().en4).filter(({ family }) => family === 'IPv4')[0].address

dev: {
    ...
    host: getIpAddress()
    ...
}

```
