---
title: 使用docker部署静态博客
categories:
  - 前端
tags:
  - JS
author: Jake
date: 2020-03-18 00:25:47
description:
keywords:
comments:
original:
permalink:
---

对于喜欢买便宜服务器的我来说经常迁移博客是件头疼的事，所以折腾了一天使用docker部署。

> 还未完成，待补充

<!--more-->

# DockerFile

## 构建

```zsh
docker build -t blog:v1 .
```

## ssh

使用`passwd`命令配置密码

```zsh
passwd
```

重启ssh服务，并设置开机启动：

```zsh
service sshd restart
chkconfig sshd on
```

# 启动服务

```zsh
docker run -ti -d -p 9443:443 9080:80 -p 9022:22 blog:v1 /bin/zsh
```
