---
title: nodejs使用redis数据库缓存数据
categories:
  - Node
tags:
  - 数据库
author: Jake
date: 2017-02-27 09:34:11
keywords: node,js,redis,数据库,缓存
comments:
original:
permalink:
---

![](//blogimg.jakeyu.top/redis/redis.jpg)

<!--more-->

## 运行redis

Redis服务器默认使用6379端口

> redis-server

自定义端口

> redis-server --port 6390

客户端

> redis-cli

指定ip和端口连接

> redis-cli -h 127.0.0.1 -p 6390

测试客户端和服务器是否连通

> ping

![](//blogimg.jakeyu.top/nodejs%E4%BD%BF%E7%94%A8redis/Jietu20170227-102308.jpg)

## Nodejs连接redis

通过`redis.createClient(port,host,options)`来连接redis服务器

```js
var redis = require("redis")
var client = redis.createClient();
```

```js
/*client.HMSET 保存哈希键值*/
client.HMSET(key,val,function(err,result){
    if(err){
        return callback({code:0,msg:err});
    }
    callback({code:1,msg:result});
    /*设置过期时间为1天*/
    client.EXPIRE(bottleId,86400);
});
```

```js
/*随机返回当前数据库的一个键*/
client.RANDOMKEY(function(err,key){
    if(!key){
        return callback({code:0,msg:'没有数据'});
    }
    /*根据key返回哈希对象*/
    client.HGETALL(key,function(err,val){
        if(err){
            return callback({code:0,msg:err});
        }
        callback({code:1,msg:val});
        /*根据key删除键值*/
        client.DEL(key);
    });
});
```

## Redis常用命令

[Redis命令参考手册](http://redisdoc.com/index.html)

### 清空数据库
> FLUSHALL

### 删除key
> DEL key

### 检查key是否存在。
> EXISTS key //字符串
> HEXISTS key field 	//查看哈希表 key 中，指定的字段是否存在。

### 返回key所储存的值的类型。
> TYPE key 

### 获取key所存储的值
#### 字符串
> GET key 

#### 哈希
> HGETALL key 	//获取在哈希表中指定 key 的所有字段和值




