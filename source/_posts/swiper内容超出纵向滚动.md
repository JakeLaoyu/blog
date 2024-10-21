---
title: swiper内容超出纵向滚动
categories:
  - 前端
tags:
  - 前端
author: Jake
date: 2018-05-28 22:16:05
keywords: swiper,纵向滚动,scroll,overflow,Unexpected token name (Dom7)
comments:
original:
permalink:

---

![](/images/swiper内容超出纵向滚动/big.jpg)

<!-- more -->

## 打包报错

使用`swiper 4.x`，webpack打包出错

```err
js/dist/app.js from UglifyJs
Unexpected token: name (Dom7) [./node_modules/dom7/dist/dom7.modular.js:14,0][js/dist/app.js:24688,6]
```

最后使用`swiper 3.4.2`解决

## 超出内容滚动

```js
this.swiper = new Swiper('#swiper', {
  direction: 'vertical'
})
var startScroll, touchStart, touchCurrent;
this.swiper.slides.on('touchstart', function (e) {
  startScroll = this.scrollTop;
  touchStart = e.targetTouches[0].pageY;
}, true);
this.swiper.slides.on('touchmove', function (e) {
  if (startScroll > 0 && startScroll < this.scrollHeight - this.offsetHeight) {
    e.stopPropagation();
  }
  touchCurrent = e.targetTouches[0].pageY;
  var touchesDiff = touchCurrent - touchStart;
  var slide = this;
  var onlyScrolling =
        (slide.scrollHeight > slide.offsetHeight) && // allow only when slide is scrollable
        (
            (touchesDiff < 0 && startScroll === 0) || // start from top edge to scroll bottom
            (touchesDiff > 0 && startScroll === (slide.scrollHeight - slide.offsetHeight)) || // start from bottom edge to scroll top
            (startScroll > 0 && startScroll < (slide.scrollHeight - slide.offsetHeight)) // start from the middle
        );
  if (onlyScrolling) {
    e.stopPropagation();
  }
}, true);
```

## 答案出处

[Unexpected token: name (Dom7) ](https://github.com/JeffreyWay/laravel-mix/issues/1244)
[超出内容滚动](https://github.com/nolimits4web/Swiper/issues/1467)
