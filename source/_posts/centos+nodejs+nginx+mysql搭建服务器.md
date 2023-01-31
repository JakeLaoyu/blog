---
title: CentOS7 + nodejs + nginx + MySQL搭建服务器
categories:
  - 服务器
tags:
  - 服务器
date: 2016-10-17 19:30:42
description: CentOS7环境下使用nodejs+Nginx+MySQL搭建服务器
author: Jake
keywords: centos,nodejs,nginx,mysql,服务器,vps
comments:
original:
permalink:
---
最近项目要求，需要一台服务器，阿里和腾讯都不错，我选择了腾讯云，系统为CentOS 7（linux）。记录搭建服务器的过程，方便以后再次搭建是借鉴和给第一次搭建服务器的朋友借鉴之用。

![](//blogimg.jakeyu.top/20170327149054583559344.png)

<!--more-->

# 安装git
执行：
> sudo yum install git

# 安装nodejs
## 使用EPEL安装
EPEL（Extra Packages for Enterprise Linux）企业版Linux的额外软件包，是Fedora小组维护的一个软件仓库项目，为RHEL/CentOS提供他们默认不提供的软件包。
先安装epel-release包：

> sudo yum install epel-release

安装完后，就可以使用yum命令安装nodejs了，安装的一般会是较新的版本，并且会将npm作为依赖包一起安装

> sudo yum install nodejs

安装完成后，验证是否正确的安装

> node -v
> v6.9.4

## 源码安装
[官网](https://nodejs.org/zh-cn/)查看最新版本

### 下载
先进入/usr/src文件夹，这个文件夹通常用来存放软件源代码:

> cd /usr/local/src/
> wget https://nodejs.org/dist/v4.6.0/node-v4.6.0.tar.gz

版本自己替换

### 解压

> tar zxvf node-v4.6.0.tar.gz

### 编译安装

> cd node-v4.6.0/
> ./configure    // 执行 Node.js 安装包自带的脚本，修改相关的系统配置文件

发现报错了，提示系统中没有安装C编译器，接下来先安装C编译器

安装gcc
> yum install gcc

安装g++
> yum install gcc-c++

安装gfortran
> yum install gcc-gfortran

重新执行：

```sh
cd node-v4.6.0/
./configure    // 执行 Node.js 安装包自带的脚本，修改相关的系统配置文件
make          //编译 C源代码为 可执行的 Linux程序
```

好慢啊。。。。。。难道是我买的最低配置的原因么。。。。。。

终于跑完了😂，全程大约十几分钟，所以大家要耐心等待哦。。。。。。

```sh
sudo make install			//	安装文件
node --version				//查看安装node的版本
npm -v						//查看npm的版本
```

现在已经安装了Node.js, 可以开始部署应用程序, 首先要使用Node.js的模块管理器npm安装Express middleware 和forever（一个用来确保应用程序启动并且在需要时重启的非常有用的模块）,其中g参数是把express安装到NodeJS的lib目录，d参数表示同时安装依赖模块包：

```sh
npm install -gd express-generator forever
```

## 建立测试项目并执行

在`/home`文件夹下执行：

```sh
express testapp
cd testapp
npm install
npm start
```

上面，第一条命令是创建express框架通用项目，第三条命令是安装依赖包，第四条是执行。
执行：

```sh
cat package.json
```

![](//blogimg.jakeyu.top//nodejs+MySQL%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%90%AD%E5%BB%BA/%E6%88%AA%E5%9B%BE%202016-10-17.jpg)

第四条命令就相当于执行了`node ./bin/www`。

![](//blogimg.jakeyu.top//nodejs+MySQL%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%90%AD%E5%BB%BA/QQ20161017-1.png)

这样就运行成功了。
但是当我们关闭终端之后，进程就将结束，现在刚安装的`forever`就派上用场了,`forever`可以让进程在终端关闭之后继续运行：

```sh
forever start ./bin/www
```

我们可以使用下面命令查看`forever`运行的程序：

```sh
forever list
```

![](//blogimg.jakeyu.top//nodejs+MySQL%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%90%AD%E5%BB%BA/QQ20161017-2.png)

现在我们就可以在浏览器中输入：公网IP + :3000，来访问我们的程序。
如果要修改`3000`端口，我们可以修改`./bin/www`文件中关于监听3000端口的字段。

停止运行：

```sh
forever stop 0		//0代表前面[0],这是当前进程的ID
```

停止所有:

```sh
forever stopall
```

# 安装Nginx

HTTP请求是80端口，但是在Linux上非root权限是无法使用1024以下端口的，并且因为安全原因，最好不要使用root权限登录服务器，所以无法直接用node.js程序监听80端口。因此我们需要使用Nginx给node.js做反向代理，将80端口指向应用程序监听的端口(如node.js默认的3000端口)。

## 添加Nginx仓库

```sh
yum install epel-release
```

## 下载Nginx

```sh
yum install nginx
```


## 启用nginx服务

```sh
service nginx start
```

## 添加开机启动

```sh
systemctl enable nginx
```

## 修改Nginx配置文件

```sh
vim /etc/nginx/nginx.conf	//使用lnpm意见安装，Nginx 目录: /usr/local/nginx/
```

添加：
~~~sh
server {
    listen       80;
    server_name jakexin.top,www.jakexin.top;             #绑定的域名
	# 开启gzip
	gzip on;
	# 启用gzip压缩的最小文件，小于设置值的文件将不会压缩
	gzip_min_length 1k;
	# gzip 压缩级别，1-10，数字越大压缩的越好，也越占用CPU时间，后面会有详细说明
	gzip_comp_level 2;
	# 进行压缩的文件类型。javascript有多种形式。其中的值可以在 mime.types 文件中找到。
	gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
	# 是否在http header中添加Vary: Accept-Encoding，建议开启
	gzip_vary on;
	# 禁用IE 6 gzip
	gzip_disable "MSIE [1-6]\.";
	
	#配置缓存
	location ~* ^.+\.(ico|gif|jpg|jpeg|png)$ { 
        access_log   off; 
        expires      30d;
	}
	location ~* ^.+\.(css|js|txt|xml|swf|wav)$ {
	    access_log   off;
	    expires      24h;
	}
	location ~* ^.+\.(html|htm)$ {
	        expires      1h;
	}
	
	
    location /
    {
      proxy_set_header   X-Real-IP            $remote_addr;
      proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
      proxy_set_header   Host                   $http_host;
      proxy_set_header   X-NginX-Proxy    true;
      proxy_set_header   Connection "";
      proxy_http_version 1.1;
      proxy_pass http://127.0.0.1:3000;              #对应该的Nodejs程序端口
    }
    access_log  /mnt/log/www/jakexin_access.log;    #网站访问日志
}
~~~

## 测试配置文件是否能够正确运行

```sh
nginx -t
```

![](//blogimg.jakeyu.top//nodejs+MySQL%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%90%AD%E5%BB%BA/QQ20161017-0.png)

这样就是配置成功
## 重启nginx

```sh
service nginx restart
```

现在直接在浏览器中输入我们配置的域名就可以访问我们的项目了。

# 安装MySQL
查看可用版本

```sh
yum list | grep mysql
```

![](//blogimg.jakeyu.top//nodejs+MySQL%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%90%AD%E5%BB%BA/QQ20161014-0.png)

在centOS 7中不能使用`yum -y install mysql mysql-server mysql-devel`安装，这样会默认安装mysql的分支mariadb。
> MariaDB数据库管理系统是MySQL的一个分支，主要由开源社区在维护，采用GPL授权许可 MariaDB的
> 的是完全兼容MySQL，包括API和命令行，使之能轻松成为MySQL的代替品。

## 正确的安装方法
众所周知，Linux系统自带的repo是不会自动更新每个软件的最新版本（基本都是比较靠后的稳定版），所以无法通过yum方式安装MySQL的高级版本。所以我们需要先安装带有当前可用的mysql5系列社区版资源的rpm包。

```sh
rpm -Uvh http://dev.mysql.com/get/mysql-community-release-el7-5.noarch.rpm
yum repolist enabled | grep "mysql.*-community.*"   //查看当前可用资源
```
 
![](//blogimg.jakeyu.top//nodejs+MySQL%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%90%AD%E5%BB%BA/QQ20161014-2.png)
从上面的列表可以看出， mysql56-community/x86_64 和 MySQL 5.6 Community Server 可以使用。

因此，我们就可以直接用yum方式安装了MySQL5.6版本了。

```sh
yum -y install mysql-community-server
```

## MySQL基础配置

```sh
systemctl enable mysqld		//添加到开机启动
systemctl start mysqld		//启用进程
mysql_secure_installation
```

~~~sh
NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MySQL
      SERVERS IN PRODUCTION USE!  PLEASE READ EACH STEP CAREFULLY!
In order to log into MySQL to secure it, we'll need the current
password for the root user.  If you've just installed MySQL, and
you haven't set the root password yet, the password will be blank,
so you should just press enter here.
Enter current password for root (enter for none): 
OK, successfully used password, moving on...
Setting the root password ensures that nobody can log into the MySQL
root user without the proper authorisation.
Set root password? [Y/n] y                  [设置root用户密码]
New password: 
Re-enter new password: 
Password updated successfully!
Reloading privilege tables..
 ... Success!
By default, a MySQL installation has an anonymous user, allowing anyone
to log into MySQL without having to have a user account created for
them.  This is intended only for testing, and to make the installation
go a bit smoother.  You should remove them before moving into a
production environment.
Remove anonymous users? [Y/n] y                 [删除匿名用户]
 ... Success!
Normally, root should only be allowed to connect from 'localhost'.  This
ensures that someone cannot guess at the root password from the network.
Disallow root login remotely? [Y/n] y       [禁止root远程登录]
 ... Success!
By default, MySQL comes with a database named 'test' that anyone can
access.  This is also intended only for testing, and should be removed
before moving into a production environment.
Remove test database and access to it? [Y/n] y          [删除test数据库]
 - Dropping test database...
ERROR 1008 (HY000) at line 1: Can't drop database 'test'; database doesn't exist
 ... Failed!  Not critical, keep moving...
 - Removing privileges on test database...
 ... Success!
Reloading the privilege tables will ensure that all changes made so far
will take effect immediately.
Reload privilege tables now? [Y/n] y            [刷新权限]
 ... Success!
 
All done!  If you've completed all of the above steps, your MySQL
installation should now be secure.

Thanks for using MySQL! 

Cleaning up...
~~~

# 操作MySQL

## 配置远程连接

```sh
grant all privileges on *.* to 'root'@'%' identified by '123456' with grant option;		
##添加授权的用户 
##root是用户名，%代表任意主机，'123456'指定的登录密码（这个和本地的root密码可以设置不同的，互不影响）
flush privileges;	//刷新数据库
```

## 检测是否开启3306端口

> netstat -tunlp

![](//blogimg.jakeyu.top//nodejs+MySQL%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%90%AD%E5%BB%BA/QQ20161015-0.png)

看到3306端口被开启之后，我们就可以使用本地客户端远程访问数据库了

![](//blogimg.jakeyu.top//nodejs+MySQL%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%90%AD%E5%BB%BA/%E6%88%AA%E5%9B%BE%202016-10-15%2011%E6%97%B638%E5%88%8609%E7%A7%92.jpg)

## 数据库备份与还原
### 备份

连接数据库

```sh
mysql -u root -p
```

查看数据库

```sh
show databases; 
```

![](//blogimg.jakeyu.top/20170628149862866369896.jpg)

退出数据库进行备份

```sh
mysqldump -u root -p rap_db > rap.sql
```
备份完成

### 还原数据库

```sh
mysqldump -u root -p rap_db < rap.sql
```