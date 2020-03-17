---
title: 异步编程之async
description:
categories:
  - Node
tags:
  - JS
author: 'Jake'
date: 2017-03-15 13:49:05
keywords: async,nodejs,异步
comments:
original:
permalink:
---

![](//blogimg.jakeyu.top/async/async.png)

<!--more-->

[async官方DOC](http://caolan.github.io/async/index.html)

## 介绍

### node安装

	npm install async --save

使用

	var async = require('async')

### js文件

[https://github.com/caolan/async/tree/master/dist](https://github.com/caolan/async/tree/master/dist)

async提供了很多函数用于异步流程控制，下面是async核心的几个函数，完整的函数请看[async官方DOC](http://caolan.github.io/async/index.html)

```js
	async.map(['file1','file2','file3'], fs.stat, function(err, results) {
    // results is now an array of stats for each file
	});

	async.filter(['file1','file2','file3'], function(filePath, callback) {
	  fs.access(filePath, function(err) {
	    callback(null, !err)
	  });
	}, function(err, results) {
	    // results now equals an array of the existing files
	});

	async.parallel([
	    function(callback) { ... },
	    function(callback) { ... }
	], function(err, results) {
	    // optional callback
	});

	async.series([
	    function(callback) { ... },
	    function(callback) { ... }
	]);
```

## series串行

`series`的作用就是按照顺序一次执行。

```js
async.series([
  function(callback) {
    setTimeout(function() {
      callback(null, 1)
        }, 2000);
    },
  function(callback) {
    callback(null, 2);
  }],
  function(err, results) {
    console.log(results);
  });
```

输出结果为

	[ 1, 2 ]

`series`函数的第一个参数可以是一个数组也可以是一个JSON对象，参数类型不同，影响的是返回数据的格式。

```js
async.series({
	one: function(callback){
		callback(null, 1);
	},
	two: function(callback){
		callback(null, 2);
	}
},function(err, results) {
	console.log(results);
});
```

输出为

	{one: 1, two: 2}

## waterfall瀑布流

`waterfall`和`series`函数都是按照顺序执行，不同之处是`waterfall`每个函数产生的值都可以传递给下一个函数，`series`不可以。

```js
async.waterfall([
	function(callback) {
		callback(null, 'one', 'two');
	},
	function(arg1, arg2, callback) {
		// arg1 now equals 'one' and arg2 now equals 'two'
		console.log('function 2')
		console.log('arg1: ' + arg1)
		console.log('arg2: ' + arg2)
		callback(null, 'three');
	},
	function(arg1, callback) {
		console.log('function 3')
		console.log('arg1: ' + arg1)
			// arg1 now equals 'three'
		callback(null, 'done');
	}
], function(err, result) {
	// result now equals 'done'
	console.log(result);
});
```

输出

```js
function 2
arg1: one
arg2: two
function 3
arg1: three
done
```

`waterfall`第一个参数只能为数组。当中途有函数出错，其err直接传给最终callback，结果被丢弃，后面的函数不再执行。

## parallel(tasks, [callback])

`paraller`函数是并行执行多个函数，每个函数都是立即执行，不需要等待其它函数先执行。
传给最终callback的数组中的数据按照tasks中声明的顺序，而不是执行完成的顺序。

```js
async.parallel([
    function(callback){
        callback(null, 'one');
    },
    function(callback){
        callback(null, 'two');
    }
],
function(err, results){

});
```

tasks参数可以是一个数组或是json对象，和`series`函数一样，tasks参数类型不同，返回的results格式会不一样。

将示例中tasks的回调函数用setTimeout在1000毫秒后调用，然后在`parallel`的回调函数中输出results，看一看整个过程花费了1s还是2s。

```js
var async=require("async");
async.parallel([
    function(callback){
        setTimeout(function(){
            callback(null, 'one')
        },1000);
    },
    function(callback){
        setTimeout(function(){
            callback(null, 'two')
        },1000);
    }
],
function(err, results){
    console.log(results);
});
```

## parallelLimit(tasks, limit, [callback])

`parallelLimit`函数和`parallel`类似，但是它多了一个参数limit。 limit参数限制任务只能同时并发一定数量，而不是无限制并发，示例如下：

```js
async.parallelLimit([
    function(callback){
        callback(null, 'one');
    },
    function(callback){
        callback(null, 'two');
    }
],
2,
function(err, results){

});
```

将示例中tasks的回调函数用setTimeout在1000毫秒后调用，limit参数设置为1，然后在parallelLimit的回调函数中输出results，看一看整个过程花费了1s还是2s。

```js
var async=require("async");
async.parallelLimit([
    function(callback){
        setTimeout(function(){
            callback(null, 'one');
        }, 1000);
    },
    function(callback){
        setTimeout(function(){
            callback(null, 'two');
        }, 1000);
    }
],
1,
function(err, results){
    console.log(results);
});
```

## map(coll, iteratee, callbackopt)

`map`函数遍历传入的数组，并执行同样的操作，最终返回结果

* cool:数组
* iteratee:对数组每一项要执行的函数
* callbackopt:回调函数

```js
async.map([1, 2, 3, 4, 5],
	function(item, callback) {
		callback(null, item + 5)
	},
	function(err, result) {
		console.log(result)
	})
```

	[ 6, 7, 8, 9, 10 ]
