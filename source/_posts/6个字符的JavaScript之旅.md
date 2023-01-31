---
title: 6个字符的JavaScript之旅
description: 6个字符的JavaScript之旅
categories:
  - 前端
tags:
  - JS
author: Jake
date: 2016-10-27 14:59:39
keywords: js,javascript,字符
comments:
original:
permalink:
---

# 探秘JavaScript中的六个字符

> 本文转载自：[众成翻译](http://www.zcfy.cc)
> 译者：[小青年](http://www.zcfy.cc/@zhaomenghuan)
> 链接：[http://www.zcfy.cc/article/1370](http://www.zcfy.cc/article/1370)
> 原文：[http://jazcash.com/a-javascript-journey-with-only-six-characters/](http://jazcash.com/a-javascript-journey-with-only-six-characters/)

JavaScript 是一个奇怪而有趣的语言，我们可以写一些疯狂却仍然有效的代码。它试图帮助我们把事情转换到基于我们如何对待他们的特定类型。

如果我们添加一个字符串,JavaScript会假定我们希望为文本形式表示,所以将它转换为一个字符串。如果我们添加一个正负前缀符号,JavaScript会假定我们希望为数值形式表示,如果可能的话,对我们来说并将字符串转换为一个数字。如果我们添加一个否定符号，JavaScript会将将字符串转换为一个布尔值。

我们可以使用Javascript中`[`,`]`,`(`,`)`,`!` and `+`这六个符号写一些神奇的代码。如果你现在不是在手机，你可以打开浏览器的控制台，你可以将任何代码示例粘贴到控制台，并且代码值为true。

让我们从最基本的开始，要记住一些黄金规则:

`!`后面跟的字符会被转换成布尔值

`+`后面跟的字符会被转换成数值

`[]`后面跟的字符会被转换成字符串

来看下面的例子：

```js
![] === false
+[] === 0
[]+[] === "" 
```

另一件事你应该知道的是,它可以从字符串使用方括号检索特定的字母，像这样：

```js
"hello"[0] === "h"
```

还记得可以使多个数字号码通过添加字符串表示在一起,然后把整个表达式转换成一个数字：

```js
+("1" + "1") === 11 
```

我们们继续把一些东西结合在一起得到字母`a`

```js
![] === false
![]+[] === "false"
+!![] === 1
------------------------
(![]+[])[+!![]] === "a"  // same as "false"[1] 
```

举一反三！

我们可以通过`true` 和 `false`得到相似的字母`a`,`e`,`f`,`l`,`r`,`s`,`t`,`u`，那么我们可以从其他地方得到的字母吗？

我们可以通过一些特别的式子如`[][[]]`得到`undefined`，利用我们上面讲到的黄金法则得到另外的字母`d`,`i` 和 `n`。

```js
`[][[]] + [] === "undefined"` 
```

到目前为止，利用我们已经获得的所有字母,我们可以拼`fill`, `filter` 和 `find`。当然也有一些其他的单词，我们也可以拼写，但这些单词最重要的是,他们都是[数组的方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Mutator_methods)。这意味着他们是数组对象的一部分,可以直接调用数组实例，如：`[2,1].sort()`。

现在，了解JavaScript的另一件重要的特性是一个对象的属性可以通过[点符号`.`或方括号`[]`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Property_accessors)访问。上述数组方法是数组对象本身的属性，我们可以使用方括号代替点符号调用这些方法。

所以`[2,1]["sort"]()` 等效于 `[2,1].sort()`.

我们继续看看,当我们试图使用一个数组的方法会发生什么,我们可以使用到目前为止我们拼写的但没有调用的字母。

```js
[]["fill"]
```

这会得到`function fill() { [native code] }`，我们可以把这个方法头作为一个字符串再次使用我们的黄金法则：

```js
[]["fill"]+[] === "function fill() { [native code] }"
```

所以现在我们又得到其他的字符：`c`,`o`,`v`,`(`,`)`,`{`,`[`,`]`,`}`。

随着我们新得到的`c`和`o`，我们现在可以形成`constructor`这个单词。构造函数是一个方法,所有JS对象仅返回自己的构造函数。

到目前为止我们已经处理的对象，我们可以得到它用字符串表示的构造器函数：

```js
true["constructor"] + [] === "function Boolean() { [native code] }"  
0["constructor"] + []    === "function Number() { [native code] }"  
""["constructor"] + []   === "function String() { [native code] }"
[]["constructor"] + []   === "function Array() { [native code] }"
({})["constructor"] + [] === "function Object() { [native code] }" 
```

通过这些式子，我们可以将下面的字符加入到我们的库中：
`B`,`N`,`S`,`A`,`O`,`m`,`b`,`g`,`y`,`j`。

现在我们可以构造一个我们可以使用方括号的函数"toString"`,我们可以这样调用：

```js
(10)["toString"]() === "10"
```

使用我们的黄金法则，我们已经可以将任何我们想要转换成一个字符串，但是上面这个式子怎么用呢？

好吧，我告诉你，`Number`类型的`toString`方法有一个称为`radix`(“基数”)的[秘密的论点](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)。它可以将数值在转换为一个字符串之前先经过基数换算，像这样：

```js
(12)["toString"](10) === "12"  // 十进制
(12)["toString"](2) === "1100" // 二进制
(12)["toString"](8) === "14"   // 八进制
(12)["toString"](16) === "c"   // 十六进制 
```

但是为什么基数只写到16？最大值是36，包括所有的字符`0`-`9` 和 `a`-`z`，所以现在我们可以得到任何我们想要的字母数字：

```js
(10)["toString"](36) === "a"
(35)["toString"](36) === "z" 
```

太棒了!但是其它符号如标点符号和大写字母呢？我们接着深入探索。

这取决于你的JS执行时，它可能会或可能不会访问特定的预定义的对象或数据。如果你在浏览器中运行它,那么你可以访问一些存在的[HTML包装器方法](https://developer.mozilla.org/en-US/docs/tag/HTML%20wrapper%20methods)。

例如，`bold`是一个包装在`<>`标签中的字符串方法。

```js
"test"["bold"]() === "<b>test</b>" 
```

通过这个我们得到`<>`和`/`两个字符。

你可能听说过`escape`方法，它主要将字符串转换为一个URI友好的格式，可以让简单的浏览器解释。如果我们传递一个空格字符，我们得到的"%20"。

这里有一个工具可以自动将每个字符自动转换。
工具地址：http://www.jsfuck.com/
源代码地址：https://raw.githubusercontent.com/aemkei/jsfuck/master/jsfuck.js

## 为什么这几个字符有用？

它不是易趣网做的一些不好的事情,不久前允许卖家将执行JS在页面中使用只能使用这些字符，但它是一个相当罕见的攻击向量。有些人说混淆，但事实上，有更好的方法混淆。

最后，希望你会喜欢本次探秘之旅。

* * *

资源：

*   [https://en.wikipedia.org/wiki/JSFuck](https://en.wikipedia.org/wiki/JSFuck)

*   [https://esolangs.org/wiki/JSFuck](https://esolangs.org/wiki/JSFuck)

*   [http://patriciopalladino.com/blog/2012/08/09/non-alphanumeric-javascript.html](http://patriciopalladino.com/blog/2012/08/09/non-alphanumeric-javascript.html)

*   [https://raw.githubusercontent.com/aemkei/jsfuck/master/jsfuck.js](https://raw.githubusercontent.com/aemkei/jsfuck/master/jsfuck.js)