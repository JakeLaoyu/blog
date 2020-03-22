---
title: 使用docker部署Hexo博客
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

经常迁移博客是件头疼的事，每次都要折腾一堆文件，所以折腾了一下，使用docker部署博客。

![](//blogimg.jakeyu.top/使用docker部署Hexo博客/vertical-logo-monochromatic-1.png)

<!--more-->

# 介绍

Docker 是一个开源的应用容器引擎，基于 Go 语言 并遵从 Apache2.0 协议开源。

Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。

# 文件

## DockerFile

创建 `DockerFile`

> 配置中的路径根据自己实际路径调整

```dokerfile
FROM centos:6
ENV container docker

# 添加环境
RUN yum -y update &&\
    yum -y install epel-release &&\
    yum -y install nginx &&\
    yum -y install vim &&\
    yum install passwd openssl openssh-server openssh-clients -y &&\
    yum install initscripts -y

# 更新源，用于安装 git 2.x，修复 --work-tree 不能和 --git-dir 同名问题
RUN yum -y install wget &&\
    wget http://opensource.wandisco.com/centos/6/git/x86_64/wandisco-git-release-6-1.noarch.rpm &&\
    rpm -ivh wandisco-git-release-6-1.noarch.rpm &&\
    yum -y install git

# 安装zsh
RUN yum install -y zsh &&\
    wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh

# 创建目录
RUN mkdir -p /home/blog
WORKDIR /home

# 添加 blog git钩子
RUN git init --bare blog.git
RUN echo -e '#!/bin/bash\ngit --work-tree=/home/blog --git-dir=/home/blog.git checkout -f' >> blog.git/hooks/post-receive
RUN chmod +x blog.git/hooks/post-receive

# 创建日志文件
RUN mkdir -p /home/log
WORKDIR /home/log
RUN touch blog.log

# 配置 nginx
WORKDIR /etc/nginx
COPY ./nginx ./conf.d
# 解决执行 nginx 报错
RUN nginx -c /etc/nginx/nginx.conf

# 导入自动执行脚本
COPY ./start.sh /root/start.sh
RUN chmod +x /root/start.sh

# 切换工作目录
WORKDIR /home

# 启动服务
CMD /root/start.sh

# 端口，使用81 端口避免和 nginx默认端口冲突
# 22 端口为 ssh 所用
EXPOSE 9022:22 9081:81
```

## nginx

```conf
server {
    listen 81;
    server_name i.jakeyu.top;
    # 处理 nginx 自动 301 加斜杠以及端口问题
    server_name_in_redirect on;
    port_in_redirect off;

    location / {
        root /home/blog;
        error_page   404 https://i.jakeyu.top/404.html;
    }

    access_log  /home/log/blog.log;
}
```

## start.sh

```sh
#!/bin/sh

# 启动 sshd 服务
service sshd start

# 启动nginx
nginx

# 防止容器退出
/bin/sh
```

# 构建

在 `DockerFile` 所在目录执行

```sh
docker build -t blog:v1 .
```

# 启动容器

```sh
docker run -ti -d -p 9081:81 -p 9022:22 blog:v1
```

# ssh配置

查看所有容器，找到想要配置的 `container id`

```sh
docker ps -a
```

进入容器

```sh
docker exec -ti [container id] /bin/zsh
```

把宿主机的 `~/.ssh/id_rsa.pub` 文件 copy 到容器 `~/.ssh/authorized_keys` 中

重启ssh服务：

```zsh
service sshd restart
```

# 部署博客
## 配置

修改 Hexo 博客的配置文件 `_config.yml`

```
deploy:
  type: git
  repo:
    ssh: ssh://root@ip:port/home/blog.git
  branch: master
```

把 `ip` 和 `port` 换成和自己相对应的，比如在这里 `port` 就是 `9022`。

## 部署

```sh
hexo d
```

## 访问

使用 `curl` 测试

```sh
curl 127.0.0.1:81
```

# 删除

## 批量删除容器

```sh
docker container rm $(docker container ls -a -q)
```

## 批量删除镜像

```sh
docker image rm $(docker  image  ls   -a  -q)
```

# 参考

* [Hexo博客部署到服务器](https://i.jakeyu.top/2016/12/06/Hexo%E5%8D%9A%E5%AE%A2%E6%90%AD%E5%BB%BA%E5%88%B0%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%B9%B6%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2/)
* [Docker学习之SSH连接docker容器](https://blog.52itstyle.vip/archives/2402/)
* [Docker 入门教程](https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)