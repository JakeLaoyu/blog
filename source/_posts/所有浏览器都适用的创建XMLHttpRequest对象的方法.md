---
title: 所有浏览器都适用的创建XMLHttpRequest对象的方法
categories:
  - 前端
tags:
  - JS
date: 2016-04-18 21:57:54
description: 通用创建ajax请求的方法
keywords: ajax,js,javascript,异步
author:
comments:
original:
permalink:
---
由于IE7之前的版本不支持使用var xhr ＝ XMLHttpRequest();方法创建ajax对象，所以如果需要支持所有浏览器需要使用下面的方法
<!--more-->
~~~js
    function createXHR(){
		if(typeof XMLHttpRequest != "undefined"){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject != "undefined"){
			if(typeof arguments.callee.activeXString != "string"){
				var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.                       3.0","MSXML2.XMLHttp"],i,len;
				for(i = 0,len=versions.length;i<len;i++){
					try{
						new ActiveXObject(versions[i]);
						arguments.callee.activeXString = versions[i];
						break;
					}catch(ex){
						//跳过
					}
				}
			}
			return new ActiveXObject(arguments.callee.activeXString);
		}else{
			throw new Error("No XHR object available.");
		}
	}
	var xhr = createXHR();
~~~
##### 请求ajax
~~~js
	var xhr = createXHR();
	xhr.open("post","check.php",true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(null);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status>=200 && xhr.status<300) || xhr.status== 304){
				alert(xhr.responseText);
			}else{
				alert("Request was unsuccessful: " + xhr.status);
			}
		}
	}
~~~
##### xhr.readyState的五种状态
~~~html
    0 － （未初始化）还没有调用open()方法 
    1 － （服务器连接已经建立）已调用open()方法，正在发送请求 
    2 － （请求已接收）send()方法执行完成，已经接收到全部响应内容 
    3 － （请求处理中）正在解析响应内容 
    4 － （请求已完成）响应内容解析完成，可以在客户端调用了
~~~