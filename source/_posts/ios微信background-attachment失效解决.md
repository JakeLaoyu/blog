---
title: ios微信background-attachment失效解决
categories:
  - 前端
tags:
  - 前端
author: 'Jake'
date: 2018-03-08 15:59:11
keywords: background-attachment,ios,微信
comments:
original:
permalink:
---

```css
body:before{
    content: ' ';
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("../images/bg.png?ewrfg") center no-repeat;
    background-size: 100% 100%;
}
```
