---
title: css实现三角形
categories:
  - 前端
tags:
  - CSS
date: 2016-05-19 13:43
description:
keywords: css,三角形
author:
comments:
original:
permalink:
---
css实现三角形
<!--more-->
##### 创建一个`<div>`标签
~~~html
    <div class="triangle"></div>
    //把div的width，height都设置为0，然后使用border属性
~~~
##### 下面是针对这个div创建的css
###### 向上的箭头
~~~css
    .triangle{
    	width: 0;
    	height: 0;
    	border-left: 50px solid transparent;
    	border-right: 50px solid transparent;
    	border-bottom: 100px solid red;
    }
~~~


###### 向下的箭头
~~~css
    .triangle{
    	width: 0;
    	height: 0;
    	border-left: 50px solid transparent;
    	border-right: 50px solid transparent;
    	border-top: 100px solid red;
    }
~~~


###### 向左的箭头
~~~css
    .triangle{
    	width: 0;
    	height: 0;
    	border-top: 50px solid transparent;
    	border-bottom: 50px solid transparent;
    	border-right: 100px solid red;
    }
~~~



###### 向右的箭头    
~~~css
    .triangle{
    	width: 0;
    	height: 0;
    	border-top: 50px solid transparent;
    	border-bottom: 50px solid transparent;
    	border-left: 100px solid red;
    }
~~~


###### 平分一个正方形
~~~css
    .triangle{
    	width: 0;
    	height: 0;
    	border-right: 50px solid blue;
    	border-left: 50px solid yellow;
    	border-top: 50px solid green;
    	border-bottom: 50px solid red;
    }
~~~
