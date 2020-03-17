---
title: canvas多指触控[转]
categories:
  - 前端
tags:
  - 前端
author: 'Jake'
date: 2017-09-18 17:03:21
keywords: canvas,HTML5,多指触控
comments:
original:
permalink:
---


![](//blogimg.jakeyu.top/2017091815057255674792.png)
<!--more-->


> **原文：**[触摸事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events)

为了给触摸界面提供有力支持, 触摸事件提供了响应用户对触摸屏或者触摸板上操作的能力.

# 定义

## 平面

对触摸敏感的平面

## 触摸点

平面上的一个接触点. 有可能是手指 (或者 肘部, 耳朵, 鼻子, 或任何东西, 不过大多数情况下是手指) 或者触摸笔.

# 接口

## [TouchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent)

代表当触摸行为在平面上变化的时候发生的事件.

## [Touch](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch)

代表用户与触摸平面间的一个接触点.

## [TouchList](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchList)


代表一系列的Touch; 一般在用户多个手指同时接触触控平面时使用这个接口.

## [DocumentTouch](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentTouch)

包含了一些创建[Touch](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch)对象与[TouchList](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchList)对象的便捷方法.

# 例子

这个例子可跟踪多点同时触控,允许用户用多指触摸的方式在`<canvas>`元素上画图. 这个例子只会在支持触摸事件的浏览器下生效.

> **注意**: 我们用“手指”表示用户与触摸平面进行交互,除此以外也可以是触摸笔或者其他方式.

## 创建 canvas

```html
<canvas id="canvas" width="600" height="600" style="border:solid black 1px;">
  Your browser does not support canvas element.
</canvas>
<br>
<button onclick="startup()">Initialize</button>
<br>
Log: <pre id="log" style="border: 1px solid #ccc;"></pre>
```

## 设置事件处理器

当页面加载时，下面的`startup()`函数本应通过我们在`<body>`元素上设置的`onload` 属性而被*触发，但是由于MND在线案例系统限制，我们在这里通过一个按钮的点击事件触发。*

```js
function startup() {
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchmove", handleMove, false);
  log("initialized.")
}
```

这里给我们的`<canvas>`元素设置了所有触摸相关的事件监听器，因此当事件触发时我们就可以处理它们.

## 跟踪新的触摸行为

我们将检测正在进行的触摸事件

```js
var ongoingTouches = new Array();
```

当一个 `touchstart` 事件被触发, 代表在触摸板上一个发生了一个新的触摸行为,下面的 `handleStart()`函数会被调用.

```js
function handleStart(evt) {
  evt.preventDefault();
  var el = document.getElementsByTagName("canvas")[0];
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  for (var i=0; i<touches.length; i++) {
    ongoingTouches.push(touches[i]);
    var color = colorForTouch(touches[i]);
    ctx.fillStyle = color;
    ctx.fillRect(touches[i].pageX-2, touches[i].pageY-2, 4, 4);
  }
}
```

 [event.preventDefault()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)阻止了浏览器继续处理触摸事件 (这同样也阻止了鼠标事件的传递). 而后我们拿到事件上下文，从事件的[TouchEvent.changedTouches](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent/changedTouches) 属性中拿到改变中的触摸点列表.

 我们遍历上述的点列表[Touch](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch) 并把这些点压入一个代表当前活动的触摸点组成的数组中，以这些点为起点画矩形; 我们设置线条宽度为四像素，所以最终我们画出来的是一个四乘四的正方形。

##  当触摸移动时绘制

每当一根或者几根手指在触摸平面上移动时, `touchmove` 事件被触发, 随之`handleMove()`函数被调用.此例子中，这个函数更新了上面保存过的触摸点信息，之后，从触摸点之前的位置到现在的位置之间绘制直线，且对每个点都进行这样的操作.

```js
function handleMove(evt) {
  evt.preventDefault();
  var el = document.getElementsByTagName("canvas")[0];  
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  ctx.lineWidth = 4;

  for (var i=0; i<touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
    ctx.lineTo(touches[i].pageX, touches[i].pageY);
    ctx.closePath();
    ctx.stroke();
    ongoingTouches.splice(idx, 1, touches[i]);  // swap in the new touch record
  }
}
```

这里同样遍历了所有被改变的触摸点,但为了决定每次新触摸要绘制的线段的起点，它也查询了我们先前缓存的触摸信息数组。这是通过查找每个触摸的  [Touch.identifier](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch/identifier) 属性来做到的.这个属性是个整数，每次触摸都不同，在触摸事件期间手指一直接触表面，这个属性保持不变。

这样我们就可以拿到先前每个触摸的坐标点，之后以适当的上下文方法将两点连接起来，并绘制线段。

当这条线绘制完毕后我们调用 [Array.splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice),把`ongoingTouches`数组中之前的触摸点信息用现在的信息来代替.

## 对触摸行为的结束进行处理

当用户从触摸表面抬起手指时，`touchend` 事件被触发. 类似的当手指移除`canvas`区域外，我们会得到`touchleave` 事件. 我们利用相同的方式来处理这两种情况，即调用下面的`handleEnd()`函数.这个函数的作用是给每个已经结束的触摸绘制最后一段线段，同时把这个触摸点从进行中的触摸列表数组中移除.

```js
function handleEnd(evt) {
  evt.preventDefault();
  var el = document.getElementsByTagName("canvas")[0];  
  var ctx = el.getContext("2d");
  var touches = evt.changedTouches;

  ctx.lineWidth = 4;

  for (var i=0; i<touches.length; i++) {
    var color = colorForTouch(touches[i]);
    var idx = ongoingTouchIndexById(touches[i].identifier);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(ongoingTouches[i].pageX, ongoingTouches[i].pageY);
    ctx.lineTo(touches[i].pageX, touches[i].pageY);
    ongoingTouches.splice(i, 1);  // remove it; we're done
  }
}
```

这个函数跟之前的函数很类似，唯一的区别是我们调用[Array.splice()](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice)时, 在正在进行的触摸列表中，我们仅仅将一个触摸的标识移除，而不再添加这个触摸新的信息。结果就是我们停止跟踪这个触摸点。

## 处理取消触摸事件

如果用户的手指滑出触摸区域，滑入浏览器界面时，或者触摸需要取消时，`touchcancel` 事件会被传递,下面的 `handleCancel()` 函数会被触发.

```js
function handleCancel(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;

  for (var i=0; i<touches.length; i++) {
    ongoingTouches.splice(i, 1);  // remove it; we're done
  }
}
```

因为我们的目的是立刻结束触摸，所以我们直接从正在进行的触摸列表中删除，不会绘制最后一部分线段。

## 便捷函数

这个例子使用了两个很方便的函数，有必要简单了解下这两个函数，会有助于更加清楚的理解代码剩余的部分。

## 为每次触摸选择一个颜色

为了让每次触摸绘制的内容看起来不相同，colorForTouch()函数用来根据每一次触摸所独有的标识来取颜色 . 这个标识的范围通常是0到所有活动触摸对象的数量-1. 而基本不可能会有人用多于16根手指去使用这个demo,我们直接把这种情况转为灰色。

```js
function colorForTouch(touch) {
  var id = touch.identifier;
  id = id.toString(16); // make it a hex digit
  return "#" + id + id + id;
}
```

这个函数返回一个字符串，可以用在 `<canvas>` 函数中用来设置绘制颜色. 举例来说，若触摸的标识符`Touch.identifier`为10, 转换后的字符串为 "#aaa".

## 查询正在进行的触摸行为

下面的`ongoingTouchIndexById()` 函数通过遍历查找数组 `ongoingTouches` 来找到与给定标识相匹配的触摸行为，之后返回这个触摸行为在数组中的下标。

```js
function ongoingTouchIndexById(idToFind) {
  for (var i=0; i<ongoingTouches.length; i++) {
    var id = ongoingTouches[i].identifier;

    if (id == idToFind) {
      return i;
    }
  }
  return -1;    // not found
}
```
