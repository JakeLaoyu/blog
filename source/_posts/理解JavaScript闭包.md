---
title: 理解JavaScript闭包
categories:
  - 前端
tags:
  - JS
date: 2016-07-07 01:09
description: 闭包是JavaScript的基础，不能理解闭包就是不会JavaScript
keywords: js,javascript,闭包,基础
author:
comments:
original:
permalink:
---
理解JavaScript闭包
<!--more-->
## 变量的作用域

要理解闭包，必须先理解JavaScript特殊变量的作用域

变量的作用域无非就是两种：**全局变量**、**局部变量**。

JavaScript语言的特殊之处，就在于函数内部可以直接读取全局变量。

~~~js
var n = 10;
function f1(){
	alert(n);
};
f1(); //10
~~~

在函数的外部无法读取函数内部的局部变量

~~~js
function f1(){
	var n = 10;
};
f1();
alert(n); //error:n is not defined
~~~

注意：在函数内部声明变量的时候，一定要用var。如果不用的话，会声明一个全局变量

~~~js
function f1(){
	n = 10;
};
f1();
alert(n); //10
~~~

## 如何从外部读取局部变量？

有时候，我们需要得到函数内部的局部变量。但是，前面已经说过了，正常情况下，这是办不到的，只有通过变通方法才能实现，那就是在函数内部定义一个函数

~~~js
function f1(){
	var n = 10;
	function f2(){
		alert(n);	//10
	}
}
~~~

在上面的代码中，函数f2就被包括在函数f1内部，这是f1内部的所有局部变量，对f2都是可见的。但是反过来就不行，f2内部的局部变量，对f1就是不可见的。这就是JavaScript语言特有的“链式作用域”结构，子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

既然f2可以读取f1中的局部变量，那么只要把f2作为返回值，我们就可以在f1外部读取它的内部变量

~~~js
function f1(){
	var n = 10;
	function f2(){
		alert(n);
	}
	return f2;
}
var result = f1();
result();	//10
~~~

## 闭包的概念

上面所讲的f2函数，就是闭包

闭包就是能够读取其它函数内部局部变量的函数。

由于在JavaScript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。

所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

## 闭包的用途

闭包可以用在许多地方。它的最大用处有两个：**一个是前面提到的可以读取函数内部的变量**，**另一个就是让这些变量的值始终保存在内存中**

什么意思呢？请看下面的例子

~~~js
function f1(){
	var n = 10;
	add = function(){n+=1;}
	function f2(){
		alert(n);
	}
	return f2;
} 

var result = f1();
result();	//10
add();
result();	//11
~~~

这段代码中，result实际上就是闭包f2函数。它一共运行两次，第一次值是10，第二次值是11。这说明**函数f1中的局部变量n并没有在f1被调用后被删除，说明n一直保存在内存中**

原因就在于f1是f2的父函数，而f2被赋予了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制回收。

这段代码中另一个值得注意的地方，就是“nAdd=function(){n+=1}”这一行，首先在nAdd前面没有使用var关键字，因此 nAdd是一个全局变量，而不是局部变量。其次，nAdd的值是一个匿名函数（anonymous function），而这个匿名函数本身也是一个闭包，所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。

## for循环中的闭包

```js
for (var i = 1; i <= 5; i++) {
    (function(i) {
        setTimeout( function timer() {
            console.log(j);
        },i*1000 ); //这一行将i*1000改为j*1000也行，并不影响
    })(i);
}
```

或者下面写法

```js
for (var i = 1; i <= 5; i++) {
    let j = i;
    setTimeout(function timer() {
        console.log(j);
    },j*1000);
}
```

## 如果你能理解下面代码的运行结果，应该就理解闭包的运行机制了

~~~js
var name = "Jake";
obj = {
    name:"laoyu",
    getName: function(){
        alert(this.name);
        return function(){
            alert(this.name);
        }
    }
}
obj.getName()();  //laoyu   jake
~~~