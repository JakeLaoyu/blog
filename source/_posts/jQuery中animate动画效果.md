---
title: jQuery中animate动画效果
categories:
  - 前端
tags:
  - JS
date: 2016-05-06 17:01
description:
keywords: jquery,animate
author:
comments:
original:
permalink:
---
参考:[http://www.w3school.com.cn/jquery/effect_animate.asp](http://www.w3school.com.cn/jquery/effect_animate.asp)

<!--more-->

## 定义和用法

animate() 方法执行 CSS 属性集的自定义动画。

该方法通过CSS样式将元素从一个状态改变为另一个状态。CSS属性值是逐渐改变的，这样就可以创建动画效果。

只有数字值可创建动画（比如 "margin:30px"）。字符串值无法创建动画（比如 "background-color:red"）。

注释：使用 "+=" 或 "-=" 来创建相对动画（relative animations）。

### 语法 1

> $(selector).animate(styles,speed,easing,callback)

### 参数	描述
#### styles

必需。规定产生动画效果的 CSS 样式和值。

#### 可能的 CSS 样式值（提供实例）：

~~~html
    backgroundPosition
    borderWidth
    borderBottomWidth
    borderLeftWidth
    borderRightWidth
    borderTopWidth
    borderSpacing
    margin
    marginBottom
    marginLeft
    marginRight
    marginTop
    outlineWidth
    padding
    paddingBottom
    paddingLeft
    paddingRight
    paddingTop
    height
    width
    maxHeight
    maxWidth
    minHeight
    minWidth
    font
    fontSize
    bottom
    left
    right
    top
    letterSpacing
    wordSpacing
    lineHeight
    textIndent
    注释：CSS 样式使用 DOM 名称（比如 "fontSize"）来设置，而非 CSS 名称（比如 "font-size"）。
~~~

#### speed

~~~html
可选。规定动画的速度。默认是 "normal"。
可能的值：
毫秒 （比如 1500）
"slow"
"normal"
"fast"
~~~

#### easing


~~~html
可选。规定在不同的动画点中设置动画速度的 easing 函数。
内置的 easing 函数：
swing
linear
扩展插件中提供更多 easing 函数。
~~~

#### callback

~~~html
可选。animate 函数执行完之后，要执行的函数。
如需学习更多有关 callback 的内容，请访问我们的 jQuery Callback 这一章。
~~~

### 语法 2

~~~js
$(selector).animate(styles,options)
~~~

### 参数	描述
#### styles	必需。规定产生动画效果的 CSS 样式和值（同上）。
#### options

可选。规定动画的额外选项。
可能的值：

~~~html
speed - 设置动画的速度
easing - 规定要使用的 easing 函数
callback - 规定动画完成之后要执行的函数
step - 规定动画的每一步完成之后要执行的函数
queue - 布尔值。指示是否在效果队列中放置动画。如果为 false，则动画将立即开始
specialEasing - 来自 styles 参数的一个或多个 CSS 属性的映射，以及它们的对应 easing 函数
~~~

## 示例：

~~~html
    <html>
    <head>
        <script type="text/javascript" src="/jquery/jquery.js"></script>
        <script type="text/javascript">
        $(document).ready(function(){
          $(".btn1").click(function(){
          $("p").animate({top:"100px"});
          });
          $(".btn2").click(function(){
          $("p").animate({top:"0px"});
          });
        });
        </script>
    </head>
    <body>
        <button class="btn1">Animate</button>
        <button class="btn2">Reset</button>
        <div style="position:relative">
        <p style="background-color:yellow;width:100px;position:absolute">This is a  paragraph.</p>
        </div>
    </body>
    </html>
~~~
