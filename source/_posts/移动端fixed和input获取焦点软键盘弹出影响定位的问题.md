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

![](/images/移动端fixed和input获取焦点软键盘弹出影响定位的问题/WechatIMG6.jpeg)

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
