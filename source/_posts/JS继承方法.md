---
title: JS继承方法
categories:
  - 前端
tags:
  - JS
date: 2016-09-09 01:19:42
description:
keywords: javascript,继承
author:
comments:
original:
permalink:
---

![](/images/20170327149054592270732.png)

<!--more-->
## 组合继承
组合继承，指将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。其背后思路使用用原型链实现对原型属性和方法的继承，而通过构造函数来实现对实例属性的继承。这样，即通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性。
### 下面来看一个例子
```js
	function SuperType(name) {
	    this.name = name;
	    this.color = ['red', 'blue', 'green'];
	};
	//
	SuperType.prototype.sayName = function() {
	    console.log(this.name);
	};
	//
	function SubType(name, age) {
	    //继承属性
	    SuperType.call(this, name);		// 第二次调用SuperType
	//
	    this.age = age;
	};
	//继承方法
	SubType.prototype = new SuperType();	// 第一次调用SuperType
	console.log(SubType.prototype.constructor); //输出SuperType函数的源码,即此时SubType.prototype.constructor指向SuperType函数
	SubType.prototype.constructor = SubType; //将SubType.prototype.constructor指针指回SubType函数
	SubType.prototype.sayAge = function() {
	    console.log(this.age);
	};
	//
	var instance1 = new SubType('Jake', 20)
	instance1.color.push('black');
	console.log(instance1.color); //'red,blue,green,black'
	instance1.sayName(); //'Jake'
	instance1.sayAge(); //20
	//
	var instance2 = new SubType('Greg', 21);
	console.log(instance2.color); //'red,blue,green'
	instance2.sayName(); //'Greg';
	instance2.sayAge(); //21
```

观察输出结果，便可以发现：两个SubType实例（`instance1`和`instance2`）既分别有自己的属性，又可以使用相同的方法。

### 优点

组合继承避免了原型链和借用构造函数的缺陷，融合了它们的优点，所以是JS中最常用的继承模式。而且，`instanceof`和`isPrototypeOf()`也能够用于识别基于组合继承创建的对象。

### 缺点

* 调用两次SuperType构造函数
* 在SubType.prototype上创建了不必要的属性

## 寄生组合继承

寄生组合继承

```js
function SuperType (name) {
  this.name = name
  this.colors = ['red', 'blue', 'yellow']
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType (name, age) {
  SuperType.call(this, name) // 通过构造函数继承实例属性
  this.age = age
}

SubType.prototype = Object.create(SuperType.prototype)	//继承父类共享方法
SubType.prototype.constructor = SubType	//将SubType.prototype.constructor指针指回SubType函数

SubType.prototype.sayAge = function () {
  console.log(this.age)
}

let obj = new SubType('jake', 22)
obj.sayName()	// jake
obj.sayAge()	// 22
console.log(obj instanceof SubType)	// true
console.log(obj instanceof SuperType)	// true
```
### 优点

* 寄生组合继承只调用了一次SuperType，所以更高效
* 避免了在SubType.prototype上创建了不必要的属性

## 下面说说原型链和构造函数的缺点
### 原型链

缺点：当原型链中包含引用类型值时，原型属性会被所有实例共享；

#### 下面看一个例子

~~~js
function SuperType() {
    this.color = ['red', 'blue', 'green'];
}
//
function SubType() {};
//
SubType.prototype = new SuperType(); //继承了SuperType
//
var instance1 = new SubType();
instance1.color.push('black');
console.log(instance1.color);   //'red,blue,green,black'
//
var instance2 = new SubType();
console.log(instance2.color);   //'red,blue,green,black'
~~~

### 借用构造函数

缺点：如果仅仅使用构造函数，方法都在构造函数中定义，因此函数就无法实现复用了。而且，在超类型的原型中定义的方法，对于子类型而言也是不可见的。
