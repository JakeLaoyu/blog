---
title: 理解this
description: JavaScript中this很重要，对this的理解也是学好JavaScript的基础
categories:
  - 前端
tags:
  - JS
author: Jake
date: 2016-11-21 22:15:57
keywords: js,this,前端,基础
comments:
original:
permalink:
---

JavaScript中this和其它语言中的不同。在下面这些情况中，分别有不同的指向

## 函数调用

```js
function foo() {
    console.log(this);  //window
}

foo();
```

这里this指向全局对象，浏览器中的全局对象为window

## 方法调用

```js
        var foo = {
            method: function() {
                console.log(this);
            }
        }

        foo.method(); //返回foo
```

假如我们把这个方法负值给一个变量再调用会怎么样，我们试试：

```js
 var foo = {
    method: function() {
        console.log(this);
    }
}

foo.method(); //返回foo
var abc = foo.method;
abc();	//window
```

是不是很神奇，一会我会说一个简便的理解方法。

## 构造函数

```js
new foo(); 
```

这种形式我们称之为构造函数，这时this指向新创建的对象

## 主动设置this

```js
function foo(name) {
    console.log(this);
};

function obj() {};

foo.call(this, 'jake'); //window
foo.call(obj, 'Jake'); //obj
```

当时我们使用call或者apply时，传入的第一个参数即位this

## 简便理解

我们可以将函数调用转化为call的形式，call中第一个参数即位调用的函数前面的部分。

### 直接调用

我们可以将

```js
foo();
```
转化为

```js
foo.call();
```

此时foo前面没有对象，没有给call传入this参数，此时默认为全局对象，即window

### 方法调用

方法调用时，我们可以将

```js
foo.method();
```

转化为

```js
foo.method.call(foo);
```

method前面的对象为foo，则此时前面的this指向foo对象。

