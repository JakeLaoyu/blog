---
title: Object.create
categories:
  - 前端
tags:
  - JS
author: Jake
date: 2018-08-23 22:47:10
description:
keywords: Object,Object.create
comments:
original:
permalink:
---

在Vue和Vuex的源码中，作者都使用了`Object.create(null)`来初始化一个新对象。为什么不用更简洁的`{}`呢？

在`SegmentFault`和`Stack Overflow`等开发者社区中也有很多人展开了讨论，在这里总结成文，温故知新。

<!--more-->

# 定义

照搬一下MDN上的定义：

```js
Object.create(proto,[propertiesObject])
```

* proto:新创建对象的原型对象
* propertiesObject:可选。要添加到新对象的可枚举（新添加的属性是其自身的属性，而不是其原型链上的属性）的属性。

# 实现类式继承

下面的例子演示了如何使用`Object.create()`来实现类式继承。这是一个所有版本`JavaScript`都支持的单继承。

```js
// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'
```

如果你希望能继承到多个对象，则可以使用混入的方式。

```js
function MyClass() {
     SuperClass.call(this);
     OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
     // do a thing
};
```

[Object.assign](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 会把`OtherSuperClass`原型上的函数拷贝到 `MyClass`原型上，使 `MyClass` 的所有实例都可用 `OtherSuperClass` 的方法。`Object.assign` 是在 ES2015 引入的，且可用 [polyfilled](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill)。要支持旧浏览器的话，可用使用 [jQuery.extend()](https://api.jquery.com/jQuery.extend/) 或者 [_.assign()](https://lodash.com/docs/#assign)。

# 使用 Object.create 的 propertyObject参数

```js
var o;

// 创建一个原型为null的空对象
o = Object.create(null);


o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);


o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: {
    writable:true,
    configurable:true,
    value: "hello"
  },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
});


function Constructor(){}
o = new Constructor();
// 上面的一句就相当于:
o = Object.create(Constructor.prototype);
// 当然,如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码


// 创建一个以另一个空对象为原型,且拥有一个属性p的对象
o = Object.create({}, { p: { value: 42 } })

// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p = 24
o.p
//42

o.q = 12
for (var prop in o) {
   console.log(prop)
}
//"q"

delete o.p
//false

//创建一个可写的,可枚举的,可配置的属性p
o2 = Object.create({}, {
  p: {
    value: 42,
    writable: true,
    enumerable: true,
    configurable: true
  }
});
```

# Object.create()、{…}的区别

先看看我们经常使用的`{}`创建的对象是什么样子的：

```js
var o = {a: 1};
console.log(o)
```

在chrome控制台打印如下：

![](/images/详解Object.create/Jietu20180823-225215@2x.png)

从上图可以看到，新创建的对象继承了`Object`自身的方法，如`hasOwnProperty`、`toString`等，在新对象上可以直接使用。

再看看使用`Object.create()`创建对象：

```js
var o = Object.create(null,{
    a:{
        writable:true,
        configurable:true,
        value:'1'
    }
})
console.log(o)
```

在chrome控制台打印如下：

![](/images/详解Object.create/Jietu20180823-225402@2x.png)

可以看到，新创建的对象除了自身属性a之外，原型链上没有任何属性，也就是没有继承`Object`的任何东西，此时如果我们调用`o.toString()`会报`Uncaught TypeError`的错误。

大家可能会注意到，第一个参数使用了`null`。也就是说将`null`设置成了新创建对象的原型，自然就不会有原型链上的属性。我们再把上面的例子改一改：

```js
var o = Object.create({},{
    a:{
        writable:true,
        configurable:true,
        value:'1'
    }
})
console.log(o)
```

将`null`改为`{}`，结果是怎样的？在chrome控制台打印如下：

![](/images/详解Object.create/Jietu20180823-225532@2x.png)

我们看到，这样创建的对象和使用`{}`创建对象已经很相近了，但是还是有一点区别：多了一层`proto`嵌套。

我们最后再来改一下：

```js
var o = Object.create(Object.prototype,{
    a:{
        writable:true,
        configurable:true,
        value:'1'
    }
})
console.log(o)
```

chrome控制台打印如下：

![](/images/详解Object.create/Jietu20180823-225725@2x.png)

这次就和使用`{}`创建的对象一模一样了。至此，我相信大家已经对两者的区别十分清楚了。

# Object.create(null)的使用场景

再回到文章开头的问题，为什么很多源码作者会使用`Object.create(null)`来初始化一个新对象呢？这是作者的习惯，还是一个最佳实践？

其实都不是，这并不是作者不经思考随便用的，也不是javascript编程中的最佳实践，而是需要因地制宜，具体问题具体分析。

我们进一步比较一下`Object.create(null)`和`{}`创建控对象的区别：

在chrome打印如下：

![](/images/详解Object.create/Jietu20180823-230002@2x.png)

从上图可以看到，使用`create`创建的对象，没有任何属性，显示`No properties`，我们可以把它当作一个非常纯净的`map`来使用，我们可以自己定义`hasOwnProperty`、`toString`方法，不管是有意还是不小心，我们完全不必担心会将原型链上的同名方法覆盖掉。举个例子：

```js
//Demo1:
var a= {...省略很多属性和方法...};
//如果想要检查a是否存在一个名为toString的属性，你必须像下面这样进行检查：
if(Object.prototype.hasOwnProperty.call(a,'toString')){
    ...
}
//为什么不能直接用a.hasOwnProperty('toString')?因为你可能给a添加了一个自定义的hasOwnProperty
//你无法使用下面这种方式来进行判断,因为原型上的toString方法是存在的：
if(a.toString){}

//Demo2:
var a = Object.create(null)
//你可以直接使用下面这种方式判断，因为存在的属性，都将定义在a上面，除非手动指定原型：
if(a.toString){}
```

另一个使用`create(null)`的理由是，在我们使用`for..in`循环的时候会遍历对象原型链上的属性，使用`create(null)`就不必再对属性进行检查了，当然，我们也可以直接使用`Object.keys[]`。

# 总结

1. 你需要一个非常干净且高度可定制的对象当作数据字典的时候；
2. 想节省`hasOwnProperty`带来的一丢丢性能损失并且可以偷懒少些一点代码的时候

用`Object.create(null)`吧！其他时候，请用`{}`。

# 参考

* [详解Object.create(null)](https://juejin.im/post/5acd8ced6fb9a028d444ee4e)
* [Object.create()--MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill)
