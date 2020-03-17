---
title: css响应式正方形居中
categories:
  - 前端
tags:
  - JS
author: Jake
date: 2018-11-27 21:39:47
description:
keywords:
comments:
original:
permalink:
---

`body -> div#box`，body铺满屏幕，box是一个宽度为body一半的正方形，用css使box垂直水平居中。

<!-- more -->

`padding`百分比继承自父元素宽度，然后通过绝对定位和`translate`来实现。

```HTML
<body>
  <div class="box"></div>
</body>
```

```css
body {
  width: 100vw;
  height: 100vh;
}
.box {
  position: absolute;
  padding: 25%;
  background: red;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
```
