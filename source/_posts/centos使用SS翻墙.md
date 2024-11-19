---
title: centos使用SS翻墙
categories:
  - 服务器
tags:
  - 服务器
author: 'Jake'
date: 2017-03-16 21:40:46
keywords: 梯子、翻墙、centos、v2ray、ss、shadowsocket
comments:
original:
permalink:
---

![](/images/shadowsocks.png)

<!--more-->

{% note danger %} 
梯子服务商推荐 [Arisaka](https://arisaka.io/#/register?code=VqANATND)，支持全平台，安全、稳定。
{% endnote %}

## socks5 全局代理
### 安装 sslocal

```sh
pip install shadowsocks # pip安装ss客户端
如果提示 -bash: pip: command not found
运行 yum -y install python-pip
```

### shadowsocks.json

~~~sh
vim /etc/shadowsocks.json
--- shadowsocks.json ---
{
    "server":"SERVER-IP",   # 你的服务器ip
    "server_port":PORT,    # 服务器端口
    "local_address": "127.0.0.1",
    "local_port":1080,
    "password":"PASSWORD",    # 密码
    "timeout":300,
    "method":"aes-128-cfb", # 加密方式
    "fast_open": false,
    "workers": 1
}
--- shadowsocks.json ---
~~~

### 运行 sslocal

```sh
nohup sslocal -c /etc/shadowsocks.json &>> /var/log/sslocal.log &
```


## privoxy篇
### 安装 privoxy

```sh
yum -y install privoxy
```

### 配置 socks5 全局代理

```sh
echo 'forward-socks5 / 127.0.0.1:1080 .' >> /etc/privoxy/config
```

### 设置 http/https 代理

```sh
export http_proxy=http://127.0.0.1:8118 # privoxy默认监听端口为8118
export https_proxy=http://127.0.0.1:8118
```

### 运行 privoxy

	service privoxy start

### 测试 socks5 全局代理

```sh
curl www.google.com
## 如果出现下面这段输出则代理成功！
------------------------------------------------------------------------------
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>302 Moved</TITLE></HEAD><BODY>
<H1>302 Moved</H1>
The document has moved
<A HREF="http://www.google.com.hk/url?sa=p&amp;hl=zh-CN&amp;pref=hkredirect&amp;pval=yes&amp;q=http://www.google.com.hk/%3Fgws_rd%3Dcr&amp;ust=1480320257875871&amp;usg=AFQjCNHg9F5zMg83aD2KKHHHf-yecq0nfQ">here</A>.
</BODY></HTML>
------------------------------------------------------------------------------
```

## 简化使用

进过上面的步骤我们的确代理成功了。。但是每次都要输入这么多命令太麻烦
这时我们可以利用 命令别名 来简化我们的操作

```sh
alias ssinit='nohup sslocal -c /etc/shadowsocks.json &>> /var/log/sslocal.log &'
alias sson='export http_proxy=http://127.0.0.1:8118 && export https_proxy=http://127.0.0.1:8118 && systemctl start privoxy'
alias ssoff='unset http_proxy && unset https_proxy && systemctl stop privoxy && pkill sslocal'
```

### 使用方法

	### 开启ss代理
	ssinit
	sson
	## 关闭ss代理
	ssoff

## 推荐

{% linkgrid %}
临时邮箱 | https://email-once.com/ | 完全基于 CloudFlare 实现的临时邮箱，所有服务和数据均在 CloudFlare 中 | /images/临时邮箱/banner.png
开发工具箱 | https://devtool.club/ | 开发者的便利工具 | /images/devtool/unnamed.png
{% endlinkgrid %}