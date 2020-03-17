---
title: mockjs让前端开发独立于后端
date: 2016-08-19 10:36:21
categories:
  - 前端
tags:
  - JS
description: 无需后台接口，前端便可以自己调试数据
keywords: js,javascript,mockjs,前端
author: Jake
comments:
original:
permalink:
---

![](//blogimg.jakeyu.top/20170327149054604067872.png)

mock.js 可以模拟ajax数据，拦截ajax请求，返回模拟数据，无需后端返回就可以测试前端程序

[mockjs官网](http://mockjs.com/)
<!--more-->

首先要感谢凯伦[Kieran](http://go.kieran.top)大神的帮助

话不多说直接进入主题

### 引入文件

首先在head头中引入我们需要的mockjs文件

~~~js   
    <script src="http://mockjs.com/dist/mock.js"></script>
~~~

### 定义数据

在ajax请求之前，用mack定义返回数据

~~~js
    Mock.mock('http://laoyu', {
     "errorcode": 0,//0表示成功，1表示错误
     "message": "xx信息不完整", //弹出错误信息
    });
~~~

### 创建请求

在ajax中,open()的url要与mock中的相同，比如我这里是`http://laoyu`,那么

~~~js
    XHR.open（"post/get","http://laoyu",true/false）
~~~

### 测试

好了，说到这里，我们进行测试一下

~~~js
<script>

//调用mock方法模拟数据
Mock.mock('http://laoyu', {
  "errorcode": 0,//0表示成功，1表示错误
  "message": "xx信息不完整", //弹出错误信息
});

//使用ajax进行测试
var xhr = new XMLHttpRequest();
xhr.open("post","http://laoyu",true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send(null);
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4){
		if((xhr.status>=200 && xhr.status<300) || xhr.status== 304){
			var data = JSON.parse(xhr.responseText);	//因为reponseText返回的是字符串，将字符串转换成我们想要的JSON数据，这样就可以调用了

			console.log(data);  //在控制台中打印出返回的内容
		}else{
			alert("Request was unsuccessful: " + xhr.status);
		}
	}
}
</script>
~~~

![](//blogimg.jakeyu.top//mockjs%E8%AE%A9%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E7%8B%AC%E7%AB%8B%E4%BA%8E%E5%90%8E%E7%AB%AF/312896762343287.jpg)

看到没，返回了我们使用mock模拟的数据，这样就可以无需后台，直接进行自己的测试了

### xhr.readyState的五种状态

    0 － （未初始化）还没有调用open()方法
    1 － （服务器连接已经建立）已调用open()方法，正在发送请求
    2 － （请求已接收）send()方法执行完成，已经接收到全部响应内容
    3 － （请求处理中）正在解析响应内容
    4 － （请求已完成）响应内容解析完成，可以在客户端调用了
