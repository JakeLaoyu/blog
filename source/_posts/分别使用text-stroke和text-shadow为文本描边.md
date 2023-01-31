---
title: 分别使用text-stroke和text-shadow为文本描边
categories:
  - 前端
tags:
  - CSS
date: 2016-04-26 21:03
description:
keywords: text-stroke,text-shadow,文本描边
author:
comments:
original:
permalink:
---
文本描边
<!--more-->
## 使用text-stroke属性
目前text-stroke仅支持webkit内核的浏览器，所以格式为
~~~css
    -webkit-text-stroke:1px black; //描边宽度 描边颜色
    -webkit-text-fill-color:white;    //为文本填充颜色
~~~
代码：
~~~html    
    <h1>测试text-stroke属性</h1>
    <style type="text/css">
     h1{
      -webkit-text-stroke: 1px black;
      -webkit-text-fill-color: white;
     }
    </style>
~~~

结果

## 使用text-shadow属性
代码：
~~~html   
    <h1>测试text-stroke属性</h1>
    <style type="text/css">
     h1{
      color:white;
      text-shadow:-2px -2px 1px black,  
                  2px -2px 1px black,
                  -2px  2px 1px black,
                  2px  2px 1px black;
     }
    </style>
~~~
