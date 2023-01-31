---
title: Javascript原生base64编码解码函数btoa(atob)用法
categories:
  - 前端
tags:
  - 前端
author: 'Jake'
date: 2018-05-08 17:19:19
keywords: Javascript,base64,btoa,atob
comments:
original:
permalink:
---

`window.btoa`和`window.atob`分别编码与解码`base64 `，它们在现代浏览器中受到广泛的支持。

<!--more-->

## 兼容性

`btoa`和`atob`在除IE之外的浏览器上都能够得到良好的兼容：
```
IE：10+
Chrome：4+
Firefox：2+
Safari：3.1+
Opera：11.5+
```

## 编码base64函数btoa
提示：函数名中的b表示binary即原始的待编码数据，a表示ASCII，即编码后的结果（base64编码后，就只是纯的ASCII字符），btoa就是将binary的数据转为ASCII字符（串）。

用法：
```js
console.log(btoa('Hello world!'));//SGVsbG8gd29ybGQh
```

## 解码base64函数atob
可以将base64字符串还原成二进制格式（通常是原始的字符串，JavaScript中字符串就是一种序列化的二进制数据）

用法：
```js
console.log(atob('SGVsbG8gd29ybGQh'));//Hello world!
```

## 原始数据含非ASCII字符（例如中文）时的处理
执行下面的代码：
```js
btoa('我是中文');
```
会有如下的报错信息：
```
Uncaught DOMException: Failed to execute ‘btoa’ on ‘Window’: The string to be encoded contains characters outside of the Latin1 range.(…)
```

说明只能对ASCII字符进行编码，对于中文来说，可以通过下面的方式进行编码：
```js
console.log(btoa(unescape(encodeURIComponent('我是中文'))));//5oiR5piv5Lit5paH
```

解码方法：
```js
console.log(decodeURIComponent(escape(atob('5oiR5piv5Lit5paH'))));//我是中文
```

> 作者：lyz810
> 原文：[https://blog.lyz810.com/article/2016/07/javascript-base64-encode-and-decode/](https://blog.lyz810.com/article/2016/07/javascript-base64-encode-and-decode/)
