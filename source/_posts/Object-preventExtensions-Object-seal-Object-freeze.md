---
title: 'Object 方法'
categories:
  - 前端
tags:
  - JS
author: Jake
date: 2018-12-10 09:51:48
description:
keywords: preventExtensions,isExtensible,seal,isSealed,freeze,isFrozen
comments:
original:
permalink:
---

| 方法                       | 描述                                                                                                                                                                           | 详情                                                                                                             |
| :------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Object.preventExtensions() | 让一个对象变的不可扩展，也就是永远不能再添加新的属性。                                                                                                                         | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) |
| Object.isExtensible()      | 判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。                                                                                                                   | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)      |
| Object.seal()              | 封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变。                                                                                   | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)              |
| Object.isSealed()          | 判断一个对象是否被密封。                                                                                                                                                       | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)          |
| Object.freeze()            | 冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。 | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)            |
| Object.isFrozen()          | 判断一个对象是否被冻结。                                                                                                                                                       | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)          |
