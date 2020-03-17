---
title: JavaScript实现继承的几种方式
categories:
  - 前端
tags:
  - JS
date: 2016-06-20 16:26
description:
keywords: javascript,继承
author:
comments:
original:
permalink:
---

![](//blogimg.jakeyu.top/20170327149054592270732.png)

<!--more-->
# 原型链继承：
```js
    var Base = function() {
        this.level = 1;  
        this.name = "base";  
        this.toString = function() {  
            return "base";  
        };  
    };  
    Base.CONSTANT = "constant";  

    var Sub = function() {};
    Sub.prototype = new Base();  
    Sub.prototype.name = "sub";  
```
优点：从`instanceof`关键字来看，实例既是父类的实例，又是子类的实例，看起来似乎是最纯粹的继承。
缺点：子类区别于父类的属性和方法，必须在`Sub.prototype = new Base()`这样的语句之后分别执行，无法被包装到`Sub`这个构造器里面去。例如：`Sub.prototype.name = "sub"`无法实现多重继承。


# 构造继承：
```js
    var Base = function() {
        this.level = 1;  
        this.name = "base";  
        this.toString = function() {  
            return "base";  
        };  
    };  
    Base.CONSTANT = "constant";  

    var Sub = function() {
        Base.call(this);  
        this.name = "sub";  
    };
```
优点：可以实现多重继承，可以把子类特有的属性设置放在构造器内部。
缺点：使用`instanceof`发现，对象不是父类的实例。


# 实例继承：
```js
    var Base = function() {
        this.level = 1;  
        this.name = "base";  
        this.toString = function() {  
            return "base";  
        };  
    };  
    Base.CONSTANT = "constant";  

    var Sub = function() {
        var instance = new Base();  
        instance.name = "sub";  
        return instance;  
    };
```
优点：是父类的对象，并且使用new构造对象和不使用`new`构造对象，都可以获得相同的效果。
缺点：生成的对象实质仅仅是父类的实例，并非子类的对象；不支持多继承。


# 拷贝继承：
```js
    var Base = function() {
        this.level = 1;  
        this.name = "base";  
        this.toString = function() {  
            return "base";  
        };  
    };  
    Base.CONSTANT = "constant";  

    var Sub = function() {
        var base = new Base();  
        for(var i in base)  
            Sub.prototype[i] = base[i];  
        Sub.prototype["name"] = "sub";  
    };  
```
优点：支持多继承。
缺点：效率较低；无法获取父类不可枚举的方法。


```js
 var Scope = function() {
	this.$clone = function() {
		var f = function() {}; //创建一个新的构造函数
		f.prototype = this; //将它的原型指向 当前的这个Scope 实例
		return new f(); //返回 新创建的这个对象的实例
	}
};

var scopeA = new Scope();
scopeA.title = 'My title';

var scopeB = scopeA.$clone();
//实例有$clone方法用创建一个对象克隆，表现如下
console.log(scopeB.title === 'My title'); //输出true
scopeA.title = 'Home title';
console.log(scopeB.title === 'Home title'); //输出true
//但是一旦scopeB主动修改它的属性，scopeA并不受影响
scopeB.title = 'scopeB title';
console.log(scopeA.title === 'Home title') //输出true
console.log(scopeB.title) //输出 scopeB title
```

这几种形式各有特点，仅就我提供的代码而言，满足下面的表格：

|            | instanceof父类 | instanceof子类 | 子类constructor | 不可枚举方法的继承 | 多继承可实现 |
|:---------- |:-------------- | -------------- | --------------- | ------------------ | ------------ |
| 原型链继承 | TRUE           | TRUE           | FALSE           | TRUE               | FALSE        |
| 构造继承   | FALSE          | TRUE           | TRUE            | TRUE               | TRUE         |
| 实例继承   | TRUE           | FALSE          | FALSE           | TRUE               | FALSE        |
| 拷贝继承   | FALSE          | TRUE           | TRUE            | FALSE              | TRUE         |


---------------------------------------------------------------------------------------------------------------------------

##### 补充，如果我们不需要类继承，只需要对象继承，对于支持 ECMAScript 5 的浏览器来说，还可以用Object.create方法来实现：
```js
    var Base = function() {
        this.level = 1;  
        this.name = "base";  
        this.toString = function() {
            return "base";  
        };  
    };  
    Base.CONSTANT = "constant";  

    var sub = Object.create(new Base());  
    sub.name = "sub";  
```

转载自：<http://raychase.iteye.com/blog/1337415>
