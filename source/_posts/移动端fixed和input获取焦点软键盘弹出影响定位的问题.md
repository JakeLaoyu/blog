---
title: 移动端fixed和input获取焦点软键盘弹出影响定位的问题
categories:
  - 前端
tags:
  - 前端
author: 'Jake'
date: 2018-03-15 11:31:17
keywords:
comments:
original:
permalink:

---

在移动端使用fixed将按钮定位在底部时，当input获取焦点弹出软键盘时，在安卓系统会奖底部的按钮顶上去。效果图：

![](//blogimg.jakeyu.top/%E7%A7%BB%E5%8A%A8%E7%AB%AFfixed%E5%92%8Cinput%E8%8E%B7%E5%8F%96%E7%84%A6%E7%82%B9%E8%BD%AF%E9%94%AE%E7%9B%98%E5%BC%B9%E5%87%BA%E5%BD%B1%E5%93%8D%E5%AE%9A%E4%BD%8D%E7%9A%84%E9%97%AE%E9%A2%98/WechatIMG6.jpeg)

<!--more-->

解决办法：

```js
        var h = document.body.clientHeight;
        window.onresize = function(){
            if (document.body.clientHeight < h) {
                document.getElementsByClassName('footer')[0].style.display = "none";
            }else{
                document.getElementsByClassName('footer')[0].style.display = "block";
            }
        }
```
