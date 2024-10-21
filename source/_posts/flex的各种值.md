---
title: flex的各种值
categories:
  - 前端
tags:
  - JS
author: Jake
date: 2018-12-08 17:51:26
description:
keywords:
comments:
original:
permalink:
---

![](/images/flex的各种值/bg2015071002.png)

<!--more-->

# 介绍

> 2009年，W3C 提出了一种新的方案----Flex 布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

关于详细`flex`使用，可以查看[阮一峰](http://www.ruanyifeng.com)的两篇文章:

* [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)
* [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

# 正文

首先明确一点是， `flex` 是 `flex-grow`、`flex-shrink`、`flex-basis`的缩写。故其取值可以考虑以下情况：

`flex` 的默认值是以上三个属性值的组合。假设以上三个属性同样取默认值，则 `flex` 的默认值是 `0 1 auto`。同理，如下是等同的：

```css
.item {flex: 2333 3222 234px;}
.item {
    flex-grow: 2333;
    flex-shrink: 3222;
    flex-basis: 234px;
}
```

当 `flex` 取值为 `none`，则计算值为 `0 0 auto`，如下是等同的：

```css
.item {flex: none;}
.item {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
}
```

当 `flex` 取值为 `auto`，则计算值为 `1 1 auto`，如下是等同的：

```css
.item {flex: auto;}
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
}
```

当 `flex` 取值为一个非负数字，则该数字为 `flex-grow` 值，`flex-shrink` 取 1，`flex-basis` 取 0%，如下是等同的：

```css
.item {flex: 1;}
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
```

当 `flex` 取值为一个长度或百分比，则视为 `flex-basis` 值，`flex-grow` 取 1，`flex-shrink` 取 1，有如下等同情况（注意 `0%` 是一个百分比而不是一个非负数字）：

```css
.item-1 {flex: 0%;}
.item-1 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}
.item-2 {flex: 24px;}
.item-2 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 24px;
}
```

当 `flex` 取值为两个非负数字，则分别视为 `flex-grow` 和 `flex-shrink` 的值，`flex-basis` 取 0%，如下是等同的：

```css
.item {flex: 2 3;}
.item {
    flex-grow: 2;
    flex-shrink: 3;
    flex-basis: 0%;
}
```

当 `flex` 取值为一个非负数字和一个长度或百分比，则分别视为 `flex-grow` 和 `flex-basis` 的值，`flex-shrink` 取 1，如下是等同的：

```css
.item {flex: 2333 3222px;}
.item {
    flex-grow: 2333;
    flex-shrink: 1;
    flex-basis: 3222px;
}
```

`flex-basis` 规定的是子元素的基准值。所以是否溢出的计算与此属性息息相关。`flex-basis` 规定的范围取决于 `box-sizing`。这里主要讨论以下 `flex-basis` 的取值情况：

* **auto**：首先检索该子元素的主尺寸，如果主尺寸不为 `auto`，则使用值采取主尺寸之值；如果也是 `auto`，则使用值为 `content`。
* **content**：指根据该子元素的内容自动布局。有的用户代理没有实现取 `content` 值，等效的替代方案是 `flex-basis` 和主尺寸都取 `auto`。
* **百分比**：根据其包含块（即伸缩父容器）的主尺寸计算。如果包含块的主尺寸未定义（即父容器的主尺寸取决于子元素），则计算结果和设为 `auto` 一样。

举一个不同的值之间的区别：

```html
<div class="parent">
    <div class="item-1"></div>
    <div class="item-2"></div>
    <div class="item-3"></div>
</div>
```

```css
.parent {
    display: flex;
    width: 600px;
}
.parent > div {
    height: 100px;
}
.item-1 {
    width: 140px;
    flex: 2 1 0%;
    background: blue;
}
.item-2 {
    width: 100px;
    flex: 2 1 auto;
    background: darkblue;
}
.item-3 {
    flex: 1 1 200px;
    background: lightblue;
}
```

<iframe height='265' scrolling='no' title='flex 不同的值' src='//codepen.io/JakeLaoyu/embed/OrLrZP/?height=265&theme-id=light&default-tab=css,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/JakeLaoyu/pen/OrLrZP/'>flex 不同的值</a> by Jake (<a href='https://codepen.io/JakeLaoyu'>@JakeLaoyu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

* 主轴上父容器总尺寸为 600px
* 子元素的总基准值是：0% + auto + 200px = 300px，其中
  - 0% 即 0 宽度
  - auto 对应取主尺寸即 100px
* 故剩余空间为 600px - 300px = 300px
* 伸缩放大系数之和为： 2 + 2 + 1 = 5
* 剩余空间分配如下：
  - item-1 和 item-2 各分配 2/5，各得 120px
  - item-3 分配 1/5，得 60px
* 各项目最终宽度为：
  - item-1 = 0% + 120px = 120px
  - item-2 = auto + 120px = 220px
  - item-3 = 200px + 60px = 260px
* 当 item-1 基准值取 0% 的时候，是把该项目视为零尺寸的，故即便声明其尺寸为 140px，也并没有什么用，形同虚设
* 而 item-2 基准值取 `auto` 的时候，根据规则基准值使用值是主尺寸值即 100px，故这 100px 不会纳入剩余空间

# 参考

* [https://segmentfault.com/q/1010000004080910/a-1020000004121373](https://segmentfault.com/q/1010000004080910/a-1020000004121373)
