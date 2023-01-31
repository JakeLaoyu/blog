---
title: antd upload组件不能显示参数图片缩略图
categories:
  - 前端
tags:
  - JS
author: Jake
date: 2018-12-13 19:43:05
description:
keywords: antd,upload,图片,缩略图,失效,'web worker',base64
comments:
original:
permalink:
---

在使用[ant-design-vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/)的upload组件时，无法显示加密图片，经过测试，凡是带参数的图片地址都无法显示缩略图。

<!--more-->

# base64

这个组件是基于[ant-design](https://github.com/ant-design/ant-design)改写的，在issues中发现了解决办法 [#10102](https://github.com/ant-design/ant-design/issues/10102#issuecomment-382748024)

```js
/**
 *  将图片转换成base64
 * @param {String} url 图片地址
 */
export const base64Url = function (url) {
  let xhr = new XMLHttpRequest()
  xhr.onload = function () {
    let reader = new FileReader()
    reader.onloadend = function () {
      self.postMessage(reader.result) //web worker 通信
    }
    reader.readAsDataURL(xhr.response)
  }
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.send()
}
```

通过`ajax`获取图片，并将图片转为`base64`。

# Web Worker

但是由于我开发的业务页面中有大量图片，如果每个图片都这样操作，页面会有些卡顿。所以需要进行优化。

我选择使用`Web Worker`，关于`Web Worker`可以查看阮一峰老师的文章： 

* [Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

创建一个生成`Web Worker`的函数：

```js
/**
 * 创建web worker
 * @param {Function} f 要在worker中执行的函数
 * @param {Strint} args 函数参数
 */
export const createWorker = (f, args) => {
  var blob = new Blob(['(' + f.toString() + ')("' + args + '")'])
  var url = window.URL.createObjectURL(blob)
  var worker = new Worker(url)
  return worker
}
```

调用

```js
let myWorker = createWorker(base64Url, url)
// 监听message事件
myWorker.onmessage = (data) => {
  console.log(data.data)  //打印转换后的base64
  myWorker.terminate()  //销毁 web worker
}
```