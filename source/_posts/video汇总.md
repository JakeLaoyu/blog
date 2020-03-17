---
title: video汇总
categories:
  - 前端
tags:
  - video
author: Jake
date: 2018-07-19 18:30:50
keywords: video,问题,倍率,倍数
comments:
original:
permalink:

---

开发中遇到的video一些问题的汇总。

![](//blogimg.jakeyu.top/video汇总/hmtl5video-thumb-1200x565.jpg)

<!--more-->

## 倍数播放

B站，或者腾讯视频等主流视频网站视频现在都支持倍速播放功能。介绍一下实现方法。

其实很简单，使用HTML5 video 原生 [`playbackrate`](http://www.w3school.com.cn/tags/av_prop_playbackrate.asp) 属性就能实现。

```js
var video = document.getElementById("video");

var speed = video.playbackRate //获取播放速度

video.playbackRate = 0.5 //设置播放速度为0.5
```

## 常用属性

```html
<video
  id="video"
  src="video.mp4"
  controls = "true"
  poster="images.jpg" /*视频封面*/
  preload="auto"
  webkit-playsinline="true" /*这个属性是ios 10中设置可以让视频在小窗内播放，也就是不是全屏播放*/
  playsinline="true"  /*IOS微信浏览器支持小窗内播放*/
  x-webkit-airplay="allow"
  x5-video-player-type="h5"  /*启用H5播放器,是wechat安卓版特性*/
  x5-video-player-fullscreen="true" /*全屏设置，设置为 true 是防止横屏*/
  x5-video-orientation="portraint" //播放器支付的方向， landscape横屏，portraint竖屏，默认值为竖屏
  style="object-fit:fill">
</video>
```

* `src`: 视频地址
* `controls`: 使用系统默认控制组件
* `poster`: 属性规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像。如果未设置该属性，则使用视频的第一帧来代替。
* `preload`: 属性规定在页面加载后载入视频。
* `webkit-playsinline、playsinline`: 视频播放时局域播放，不脱离文档流 。但是这个属性比较特别， 需要嵌入网页的APP比如WeChat中UIwebview 的allowsInlineMediaPlayback = YES webview.allowsInlineMediaPlayback = YES，才能生效。换句话说，如果APP不设置，你页面中加了这标签也无效，这也就是为什么安卓手机WeChat 播放视频总是全屏，因为APP不支持playsinline，而ISO的WeChat却支持。
* `x-webkit-airplay=”allow”`: 这个属性应该是使此视频支持ios的AirPlay功能。使用AirPlay可以直接从使用iOS的设备上的不同位置播放视频、音乐还有照片文件，也就是说通过AirPlay功能可以实现影音文件的无线播放，当然前提是播放的终端设备也要支持相应的功能
* `x5-video-player-type`: 启用同层H5播放器，就是在视频全屏的时候，div可以呈现在视频层上，也是WeChat安卓版特有的属性。同层播放别名也叫做沉浸式播放，播放的时候看似全屏，但是已经除去了control和微信的导航栏，只留下”X”和”<”两键。目前的同层播放器只在Android（包括微信）上生效，暂时不支持iOS。至于为什么同层播放只对安卓开放，是因为安卓不能像ISO一样局域播放，默认的全屏会使得一些界面操作被阻拦，如果是全屏H5还好，但是做直播的话，诸如弹幕那样的功能就无法实现了，所以这时候同层播放的概念就解决了这个问题。不过在测试的过程中发现，不同版本的IOS和安卓效果略有不同
* `x5-video-orientation`: 声明播放器支持的方向，可选值landscape 横屏, portraint竖屏。默认值portraint。无论是直播还是全屏H5一般都是竖屏播放，但是这个属性需要x5-video-player-type开启H5模式
* `x5­-video­-player­-fullscreen`: 全屏设置。它又两个属性值，ture和false，true支持全屏播放，false不支持全屏播放。其实，IOS 微信浏览器是webkit内核，相关的属性都支持，也是为什么X5同层播放不支持的原因。安卓微信浏览器是X5内核，一些属性标签比如playsinline就不支持，所以始终全屏。

## 自动播放

```js
const video = document.getElementById('video')
video.play()
// 兼容微信
document.addEventListener('WeixinJSBridgeReady', function () {
    video.play()
}, false)
```

## 参考链接

* [视频H5 video标签最佳实践](https://segmentfault.com/a/1190000009395289)
