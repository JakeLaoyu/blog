---
title: getComputedStyle
categories:
  - 前端
tags:
  - CSS
author: Jake
date: 2018-11-29 21:55:35
description:
keywords: getComputedStyle,style,defaultView
comments:
original:
permalink:
---

引用[MND](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)的说明：

> Window.getComputedStyle()方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值。 私有的CSS属性值可以通过对象提供的API或通过简单地使用CSS属性名称进行索引来访问。

<!--more-->

# 语法

```js
let style = window.getComputedStyle(element, [pseudoElt]);
```

* **element**: 用语获取计算样式的Element
* **pseudoElt**: 指定一个要匹配的伪元素的字符串。必须对普通元素省略（或null）。

例如:

```js
var dom = document.getElementById("test")
var style = window.getComputedStyle(dom , ":after")
var style = window.getComputedStyle(dom , ":after").content
```

# getComputedStyle与style的区别

我们使用`element.style`也可以获取元素的CSS样式声明对象，但是其与`getComputedStyle`方法还有有一些差异的。

1. 只读与可写
  * 正如上面提到的`getComputedStyle`方法是只读的，只能获取样式，不能设置；而`element.style`能读能写，能屈能伸。
2. 获取的对象范围
  * `getComputedStyle`方法获取的是最终应用在元素上的所有CSS属性对象（即使没有CSS代码，也会把默认的祖宗八代都显示出来）；而`element.style`只能获取元素`style`属性中的CSS样式。因此对于一个光秃秃的元素`<p>`，`getComputedStyle`方法返回对象中`length`属性值（如果有）就是190+(据我测试FF:192, IE9:195, Chrome:253, 不同环境结果可能有差异), 而`element.style`就是`0`。

# getComputedStyle与defaultView

许多在线的演示代码中，`getComputedStyle`是通过 `document.defaultView` 对象来调用的。大部分情况下，这是不需要的，因为可以直接通过`window`对象调用。但有一种情况，你必需要使用 `defaultView`,  那是在firefox3.6上访问子框架内的样式 。

# getPropertyValue

`getPropertyValue`方法可以获取CSS样式申明对象上的属性值（直接属性名称），例如：

```js
window.getComputedStyle(element, null).getPropertyValue("float");
```

如果我们不使用`getPropertyValue`方法，直接使用键值访问，其实也是可以的。但是，比如这里的的`float`，如果使用键值访问，则不能直接使用`getComputedStyle(element, null).float`，而应该是`cssFloat`与`styleFloat`，自然需要浏览器判断了，比较折腾！

使用`getPropertyValue`方法不必可以驼峰书写形式（不支持驼峰写法），例如：`style.getPropertyValue("border-top-left-radius")`

# 获取变量

例子：

```css
:root{
  --testMargin:75px;
}
```

```js
//  读取
var root = getComputedStyle(document.documentElement);
var cssVariable = root.getPropertyValue('--testMargin').trim();

console.log(cssVariable); // '75px'

// 写入
document.documentElement.style.setProperty('--testMargin', '100px');
```

# CSSStyleDeclaration

## 概要

`CSSStyleDeclaration` 表示一个CSS属性键值对的集合。它被用于一些API中：

* `HTMLElement.style` - 用于操作单个元素的样式(<elem style="...">)；
* (TODO: reword) 作为 [declaration block](https://www.w3.org/TR/1998/REC-CSS2-19980512/syndata.html#block) 的接口，当规则为 [CSSStyleRule](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSRule) 时，由stylesheet中的 style  属性返回 。
* `CSSStyleDeclaration`也是由`window.getComputedStyle()`返回的只读接口.

## 方法

* `CSSStyleDeclaration.getPropertyPriority()`: 返回可选的优先级，”Important", 例如：
```js
priString= styleObj.getPropertyPriority('color')
```
* `CSSStyleDeclaration.getPropertyValue()`: 返回属性值。例如:
```js
valString= styleObj.getPropertyValue('color')
```
* `CSSStyleDeclaration.item()`: 返回属性名。 例如:
```js
nameString= styleObj.item(0) Alternative: nameString= styleObj[0]
```
* `CSSStyleDeclaration.removeProperty()`: 返回被删除的属性。例如:
```js
valString= styleObj.removeProperty('color')
```
* `CSSStyleDeclaration.setProperty()`: 没有返回值。例如:
```js
styleObj.setProperty('color', 'red', 'important')
```
* `CSSStyleDeclaration.getPropertyCSSValue()`: 仅支持通过getComputedStyle的方式。 在Firefox (CSSPrimitiveValue中返回  ROCSSPrimitiveValue, 在其他实现 CSSValue，或为null 速记属性。

# 兼容性

{% caniuse getcomputedstyle  %}

# 参考

* [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle)
* [获取元素CSS值之getComputedStyle方法熟悉--张鑫旭](https://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/)
* [CSSStyleDeclaration--MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration)
