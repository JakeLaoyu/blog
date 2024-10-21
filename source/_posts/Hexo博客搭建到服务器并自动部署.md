---
title: Hexo博客部署到服务器
description: 前几天把这个博客使用git hooks搬到服务器了，现在把自己随便写心情的博客也搬到服务器
categories:
  - Hexo
tags:
  - Hexo
author: Jake
date: 2016-12-06 19:09:00
keywords: hexo,服务器,webhooks,git hooks
comments:
original:
permalink:
---

# 服务器环境配置

我使用的是`root`执行，因为服务器只有我一个人用，不会出什么问题

## 安装git和nginx

请查看[CentOS7 + nodejs + nginx + MySQL搭建服务器](http://i.jakeyu.top/2016/10/17/centos+nodejs+nginx+mysql%E6%90%AD%E5%BB%BA%E6%9C%8D%E5%8A%A1%E5%99%A8)

## 配置ssh

执行：

	cat ~/.ssh/id_rsa.pub

把拿到的公钥添加到`~/.ssh/authorized_keys`中

如果你之前没有生成过公钥，则可能就没有 id_rsa.pub 文件,[查看这里](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

## 初始化仓库

	cd /home/jake
	sudo git init --bare m.git

使用 `--bare` 参数，`Git` 就会创建一个裸仓库，裸仓库没有工作区，我们不会在裸仓库上进行操作，它只为共享而存在。

## 配置git hooks

我们这里要使用的是 `post-receive` 的 hook，这个 hook 会在整个 git 操作过程完结以后被运行。

在 `m.git/hooks` 目录下新建一个 `post-receive` 文件：

	cd /home/jake/m.git/hooks
	vim post-receive

在 `post-receive` 文件中写入如下内容：

	#!/bin/sh
	git --work-tree=/home/jake/m --git-dir=/home/jake/m.git checkout -f

`/home/jake/m` 要换成你自己的部署目录。上面那句 git 命令可以在我们每次 push 完之后，把部署目录更新到博客的最新生成状态。这样便可以完成达到自动部署的目的了。

设置这个文件的可执行权限：

	chmod +x post-receive

## Nginx配置

我用的是lnmp(如果是直接安装的Nginx，配置文件为`/etc/nginx/nginx.conf`)

	cd /usr/local/nginx/conf/vhost
	vim m.conf

输入下面配置

```sh
server
{
    listen 80;
    #listen [::]:80;
    server_name i.jakeyu.top;
    index index.html index.htm index.php default.html default.htm default.php;
    #这里要改成网站的根目录
    root  /home/jake/m;  
    
    #error_page   404   /404.html;
    location ~ .*\.(ico|gif|jpg|jpeg|png|bmp|swf)$
    {
        access_log   off;
        expires      1d;
    }

    location ~ .*\.(js|css|txt|xml)?$
    {
        access_log   off;
        expires      12h;
    }

    location / {
        try_files $uri $uri/ =404;
    }

    access_log  /home/jake/m.log;
}

```

测试nginx配置是否可以用

	nginx -t

如果返回`successful`，就表示成功了。重启`Nginx`

	service nginx restart

# 本地配置

修改博客根目录下`_config.yml`文件

```
 deploy:
   type: git
   repo: 
     vps: root@115.159.2.254:/home/jake/m.git
```

然后执行:

	hexo new 测试.md
	hexo d -g

访问刚刚的配置的域名就可以访问自己的网站了

![](/images/Hexo博客部署到服务器/m.jpg)

