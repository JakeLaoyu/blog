---
title: css3实现文字渐变色动画
categories:
  - 前端
tags:
  - CSS
author: Jake
date: 2018-06-27 16:44:25
keywords: css,文字,渐变,动画
comments:
original:
permalink:
---

![](//blogimg.jakeyu.top/css3实现文字渐变色动画/Untitled.gif)

<!--more-->

利用css3`background-clip`属性：

background-clip: border-box || padding-box || context-box || no-clip || text

```html
<div class="title">彩蛋不只是结尾才有</div>
```

```css
.title {
  font-size: 16px;
  background-image: -webkit-linear-gradient(90deg, #4e17df, #fb6bea 25%, #4e17df 50%, #fb6bea 75%, #4e17df);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-size: 100% 600%;
  animation: title 10s linear infinite;
}

@keyframes title {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 -300%;
  }
}
```
