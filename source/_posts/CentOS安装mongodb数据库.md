---
title: CentOS安装mongodb数据库
description: CentOS安装mongodb数据库,linux安装数据库
keywords: centos,mongodb,数据库
categories:
  - 服务器
tags:
  - 服务器
author: Jake
date: 2016-10-21 18:40:26
comments:
original:
permalink:
---
mongodb是非关系数据库，存储json格式，所以特别适合使用js操作数据库。

![](//blogimg.jakeyu.top/20170327149054574361411.png)

<!--more-->

### 安装 mongodb

#### yum 仓库配置
> vi /etc/yum.repos.d/mongodb.repo

内容为：

> [mongodb-org-3.2]
> name=MongoDB Repository
> baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.2/x86_64/
> gpgcheck=0
> enabled=1

#### 安装mongodb:

> yum install -y mongodb-org

#### 使用mongodb:

启动:
> service mongod start

停止:

> service mongod stop

重启：

> service mongod restart

客户端:

> mongo

### 配置远程连接

#### 添加用户

执行
> mongo
> use admin

接着我们创建一个用户，Mongodb在3.0版本时候去除了addUser这个方法，我们需要这样来创建用户

~~~js
db.createUser(
   {
     user: "<username>",
     pwd: "<password>",
     roles: [ "readWrite", "dbAdmin" ]
   }
)
//<username> 用户名
//<password> 密码
~~~

#### 配置mongodb.conf

> vim /etc/mongod.conf

修改下面配置

> #bindIp = 127.0.0.1   //注释此行

重启mongodb

> service mongod restart

#### 测试连接
打开本地命令

> mongo 你的服务器ip地址:27017/admin -u <用户> -p <密码>


### 卸载

#### 停止服务

> service mongod stop

#### 移除包

> yum erase $(rpm -qa | grep mongodb-org)

#### 移除数据和日志文件

> rm -r /var/log/mongodb   
> rm -r /var/lib/mongo

### 关于更多mongodb操作，请查看
[菜鸟教程](http://www.runoob.com/mongodb/mongodb-tutorial.html)
