---
title: img加载图片失败时，使用默认图片
description: 默认情况下，当图片加载失败时会显示一个小图标，这是非常影响页面效果和用户体验的，所以为图片设置如果加载失败显示图片非常有必要
categories:
  - 前端
tags:
  - 方案
author: Jake
date: 2016-11-26 18:07:52
keywords: img,html,css,js,jquery,图片,加载,失败,默认
comments:
original:
permalink:
---

### onError属性

`img`标签自带`onError`属性，当图片加载失败时，触发`error`事件：

```html
<img src="image.png" onError='this.src="http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg"' />
```

### jQuery的error事件

```js
$('img').error(function(){
    $(this).attr('src',"http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg");
});
```

### jQuery的one绑定

使用onerror或者jQuery的error事件时，如果默认图片也发生加载失败，则会形成死循环，最好的办法是使用one绑定事件，只执行一次

```js
$("img").one("error", function(e){
     $(this).attr("src", "http://ww4.sinaimg.cn/large/006y8mN6gw1fa5obmqrmvj305k05k3yh.jpg");
});
```

### 注：

* 另外error事件，不支持冒泡，jquery.delegate函数捕捉不到error事件。
