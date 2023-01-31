---
title: Android微信真机联调
categories:
  - 工具
tags:
  - 工具
author: Jake
date: 2018-06-05 16:48:25
keywords: 安卓,android,微信,chrome,开发,TBS Studio,x5
comments:
original:
permalink:
---

![](//blogimg.jakeyu.top/Android微信真机联调/unnamed.png)

<!--more-->

## chrome开发者工具调试

1. 使用微信打开 `http://debugx5.qq.com`
2. 在打开的网页中选择 【信息】->【TBS settings】，勾选 【是否打开 TBS 内核 Inspector 调试功能】
![](//blogimg.jakeyu.top/Android微信真机联调/WechatIMG8.png)
3. 重启微信
4. 开启安卓开发者调试工具，打开USB调试
5. 使用chrome打开 `chrome://inspect`

<div class="swiper">
![](//blogimg.jakeyu.top/Android微信真机联调/Jietu20180605-171919.png)
![](//blogimg.jakeyu.top/Android微信真机联调/Jietu20180605-172348.png)
</div>

## TBS Studio

[官方文档](http://bbs.mb.qq.com/thread-1416936-1-1.html)
