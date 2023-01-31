---
title: 'nth-child用法'
categories:
  - 前端
tags:
  - 前端
author: 'Jake'
date: 2018-02-22 13:51:35
keywords: nth-child
comments:
original:
permalink:

---

`nth-child`是个神奇的东西，但是总会忘记一些常用的用法。

<!--more-->

## :nth-child(2)
选取第几个标签，“2可以是你想要的数字”

```css
ul li:nth-child(2){background:#090}
```

## :nth-child(n+4)
选取大于等于4标签，“n”表示从整数，下同

```css
ul li:nth-child(n+4){background:#090}
```

## :nth-child(-n+4)
选取小于等于4标签

```css
ul li:nth-child(-n+4){background:#090}
```

## :nth-child(2n)
选取偶数标签，2n也可以是even

```css
ul li:nth-child(2n){background:#090}
```

## :nth-child(2n-1)
选取奇数标签，2n-1可以是odd

```css
ul li:nth-child(2n-1){background:#090}
```

## :nth-child(3n+1)
自定义选取标签，3n+1表示“隔二取一”

```css
ul li:nth-child(3n+1){background:#090}
```

## :last-child
选取最后一个标签

```css
ul li:last-child{background:#090}
```

## :nth-last-child(3)
选取倒数第几个标签,3表示选取第3个

```css
ul li:nth-last-child(3){background:#090}
```
