---
title: express处理views中HTML和ejs共存
categories:
  - Node
tags:
  - Node
author: 'Jake'
date: 2017-08-11 10:08:27
keywords: express,ejs,html,模版引擎
comments:
original:
permalink:
---

<!--more-->

配置模版渲染

```js
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');
```

之后可以再`html`文件中使用`ejs`语法渲染变量

```js
res.render('index.html', {
    title: '哦'
  })
```
