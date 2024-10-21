---
title: 在相等比较中使用 Object.is()让结果更准确
categories:
  - 前端
tags:
  - ES6
author: Jake
date: 2018-08-14 21:55:28
keywords: Object.is(),ES6
comments:
original:
permalink:

---

当在`JavaScript`中比较两个值时，可能习惯于使用`==`或`===`，我更喜欢后者，因为`==`存在强制类型转换。但是`===`也不完全准确。

<!--more-->

![](/images/在相等比较中使用Object.is让结果更准确/Jietu20180814-220057.png)

比较`NaN`需要使用`isNaN()`方法才可以正确检测 NaN。

ES6中引入了`Object.is()`方法来弥补全等运算符的不准确运算。这个方法接收两个参数，如果这两个参数类型相同且具有相同的值，则返回`true`。

![](/images/在相等比较中使用Object.is让结果更准确/Jietu20180814-220601.png)

对于`Object.is()`方法来说，其运行结果大部分情况中与`===`运算符相同，唯一区别在于`+0`和`-0`被识别为不相等并且`NaN`与`NaN`等价。

放一张对比图:

![](/images/在相等比较中使用Object.is让结果更准确/pCyqkLc.png)


参考

* 深入理解ES6 -- 作者: 【美】Nicholas C. Zakas
* [为什么你应该在相等比较中使用 Object.is()](http://www.jstips.co/zh_cn/javascript/why-you-should-use-Object.is(%29-in-equality-comparison/)
