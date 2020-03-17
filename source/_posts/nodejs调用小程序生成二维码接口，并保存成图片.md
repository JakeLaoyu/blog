---
title: nodejs调用小程序生成二维码接口，并保存成图片
categories:
  - 小程序
tags:
  - 小程序
author: Jake
date: 2018-10-25 22:08:22
description:
keywords: nodejs,小程序,二维码,图片,axios,request
comments:
original:
permalink:
---

小程序生成二维码接口返回的是二进制，所以我们要把二进制流保存成图片，再返回给前端。

这里我分别用`axios`和`request`实现请求

<!--more-->

## 获取token

```js
const {data: { access_token }} = await axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET')
```

## axios

```js
axios({
  method: 'post',
  url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${access_token}`,
  data: {
    path: ''
  },
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('path.jpg'))
  })
```

## request

```js
request.post({
  url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${access_token}`,
  json: true,
  headers: { 'content-type': 'application/json' },
  body: {
    path: ''
  }
}, function (error, response, body) {
  res.send(imgUrl)
}).pipe(fs.createWriteStream('path.png'))
```
