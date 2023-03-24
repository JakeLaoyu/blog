---
title: centos 使用 Clash 梯子
categories:
  - 服务器
tags:
  - 服务器
author: Jake
date: 2021-11-27 21:56:23
description:
keywords: centos翻墙、梯子、翻墙、centos、v2ray、ss、shadowsocket、clash、linux
comments:
original:
permalink:
---

服务器访问 npm、github 等真让人捉急，折腾一下配个 clash。

![](//blogimg.jakeyu.top/centos-使用-Clash-梯子/logo.png)

<!--more-->

## 下载 clash

去 [github](https://github.com/Dreamacro/clash/releases) 下载最新 linux 版本，一般使用 `linux-amd64`。

```shell
gunzip clash-linux-amd64-v1.8.0.gz
mv clash-linux-amd64-v1.8.0 ~/clash
chmod +x ~/clash
./clash
```

一套执行完后会生成默认配置文件 `~/.config/clash`

```shell
l ~/.config/clash
-rw-r--r-- 1 root root 190K 11月 24 16:38 config.yaml
-rw-r--r-- 1 root root 5.7M 11月 24 16:02 Country.mmdb
```

## 配置

我是用的是 [V2Club](https://join.v2club.cc/#/register?code=C5EnE7vC)。

### 复制订阅地址

![](http://blogimg.jakeyu.top/centos-%E4%BD%BF%E7%94%A8-Clash-%E6%A2%AF%E5%AD%90/iShot2021-11-27%2023.29.16.png)

这个配置我们不能直接使用，需要使用 [https://acl4ssr-sub.github.io/](https://acl4ssr-sub.github.io/) 服务生成订阅地址，然后打开订阅地址就可以看到明文配置。

使用这份配置覆盖 `~/.config/clash/config.yaml`。

### 启动代理

然后启动 clash

```shell
./clash
```

设置终端使用 clash 代理

```shell
export ALL_PROXY=socks5://127.0.0.1:7891
```

可以使用 `curl` 测试是否连接成功。

```shell
curl https://www.google.com
```

## 远程管理

修改配置文件

```shell
vim ~/.config/clash/config.yaml
```

```yaml
external-controller: 0.0.0.0:9090
# 一定要配置 secret，用来远程访问安全
secret: xxxx
```

重启 clash 服务。

打开官方 [http://clash.razord.top/](http://clash.razord.top/)，在设置中填写相应的端口，secret 配置。配置完成就即可远程管理

![](http://blogimg.jakeyu.top/centos-%E4%BD%BF%E7%94%A8-Clash-%E6%A2%AF%E5%AD%90/iShot2021-11-27%2023.50.06.png)

## 推荐

{% linkgrid %}
订阅 ChatGPT Plus | /2023/03/21/%E4%BD%BF%E7%94%A8%20Depay%20%E5%92%8C%E6%AC%A7%E6%98%93%20(OKX)%20%E8%AE%A2%E9%98%85%20ChatGPT%20Plus | 使用 Depay 和欧易 (OKX) 订阅 ChatGPT Plus | https://blogimg.jakeyu.top/%E5%85%85%E5%80%BC-chatgpt/ChatGPT-preview.jpg
注册ChatGPT | /2022/12/09/%E6%B3%A8%E5%86%8CChatGPT%E8%AF%A6%E7%BB%86%E6%8C%87%E5%8D%97 | 注册ChatGPT | https://blogimg.jakeyu.top/%E6%B3%A8%E5%86%8CChatGPT%E8%AF%A6%E7%BB%86%E6%8C%87%E5%8D%97/cbsn-fusion-promise-fear-of-artificial-intelligence-bot-chatgpt-thumbnail-1528537-640x360.jpeg
{% endlinkgrid %}