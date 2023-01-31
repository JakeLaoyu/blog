---
title: mongoose中使用populate处理嵌套
categories:
  - Node
tags:
  - mongoose
author: 'Jake'
date: 2017-03-21 14:03:01
keywords: node,mongoose,mongdb,嵌套,数据库
comments:
original:
permalink:
---

nodejs在使用mongdb数据库中经常会使用到嵌套，比如一个多级分类等。这里我使用`学校-->学院-->学生`来展示使用populate处理嵌套。

<!--more-->

# 定义modal

在模式中，我们需要使用`Schema.ObjectId`来表示要指向数据在mongodb数据库中的`_id`。

## 学校

在学校的Schema中，colleges属性是要包含的学院的`_id`属性数组。

```js
var SchoolSchema = new Schema({
	name: String,
	colleges: [{
		type: Schema.ObjectId,
		ref: 'College'
	}],
	createTime: {
		type: Date,
		default: Date.now()
	}
});

var School  = mongoose.model('School', SchoolSchema);
```

## 学院

```js
var CollegeSchema = new Schema({
	name: String,
	students: [{
		type: Schema.ObjectId,
		ref: 'Student'
	}],
	createTime: {
		type: Date,
		default: Date.now()
	}
});

var College  = mongoose.model('College', CollegeSchema);
```

## 学生

```js
var StudentSchema = new Schema({
	name: String,
	sex: String,
	age: Number,
	createTime: {
		type: Date,
		default: Date.now()
	}
});

var Student  = mongoose.model('Student', StudentSchema);
```

# 查找
## 直接查找

查找学校并找到指向的学院

```js
School
	.find()
	.populate('colleges', ['_id','name'])
	.exec((err, schools) => {
		if (err) {
			console.log(err)
		}
		console.log(schools)
	})
```

`populate`的第一个参数是学校表中需要指向学院表的属性，即`colleges`；第二个参数为要在学院中查找的属性。如果不填写第二个参数，则默认全都查出。

这样查找出的结果中，学院的学生属性是该学院包含的学生的`_id`属性。如果需要都查找出来需要使用嵌套`populate`。

## 嵌套

```js
School
	.find()
	.populate({
		path: 'colleges',
		select: ['_id', 'name'],
		// model: 'College',
		populate: {
			path: 'students',
			select: ['_id', 'name']
				// model: 'Student'
		}
	})
	.sort({
		createTime: -1
	}).exec(function(err, schools) {
		if (err) {
			console.log(err)
		}
	});
```
