---
title: JavaScript产生随机数
categories:
  - 前端
tags:
  - JS
date: 2016-05-18 21:53:29
description:
keywords: 随机数
author:
comments:
original:
permalink:
---
JS产生随机数
<!--more-->
~~~js
    1.Math.random(); 结果为0-1间的一个随机数(包括0,不包括1)
    2.Math.floor(num); 参数num为一个数值，函数结果为num的整数部分。
    3.Math.round(num); 参数num为一个数值，函数结果为num四舍五入后的整数。

    Math：数学对象，提供对数据的数学计算。
    Math.random(); 返回0和1间(包括0,不包括1)的一个随机数。

    Math.ceil(n); 返回大于等于n的最小整数。
    用Math.ceil(Math.random()*10);时，主要获取1到10的随机整数，取0的几率极小。

    Math.round(n); 返回n四舍五入后整数的值。
    用Math.round(Math.random());可均衡获取0到1的随机整数。
    用Math.round(Math.random()*10);时，可基本均衡获取0到10的随机整数，其中获取最小值0和最大值10 的几率少一半。

    Math.floor(n); 返回小于等于n的最大整数。
    用Math.floor(Math.random()*10);时，可均衡获取0到9的随机整数。
~~~
### 示例：
~~~js
    function GetRandomNum(Min,Max)
	{   
		var Range = Max - Min;   
		var Rand = Math.random();   
		return(Min + Math.round(Rand * Range));   
	}   
	var num = GetRandomNum(10,100);   
	alert(num);
~~~
