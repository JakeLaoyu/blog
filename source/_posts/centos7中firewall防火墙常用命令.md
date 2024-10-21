---
title: centos7中firewall防火墙常用命令
categories:
  - 服务器
tags:
  - 服务器
author: Jake
date: 2017-02-27 20:26:34
keywords: centos,firewall,防火墙
comments:
original:
permalink:
---

![](/images/firewall/firewall%202.jpeg)

<!--more-->

最近在搭建小程序服务端的时候想远程连接服务器mongodb数据库，发现一直出错，原来是这货。

firewall是centos7的一大特性，最大的好处有两个：

* 支持动态更新
* 不用重启服务；

## 开启、关闭firewall
### 启动：

	systemctl start firewalld

### 查看状态：

	systemctl status firewalld 或者 firewall-cmd –state

### 停止：

	systemctl disable firewalld

### 禁用：

	systemctl stop firewalld


## 端口操作
### 打开一个端口：
	firewall-cmd --permanent --add-port=8080/tcp

### 关闭一个端口：
	firewall-cmd --permanent --remove-port=8080/tcp

### 打开某项服务： 
	firewall-cmd --permanent --add-service=http

### 关闭某项服务： 
	firewall-cmd --permanent --remove-service=http

### 进行端口转发： 
	firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toport=8080:toaddr=192.0.2.55

### 允许转发到其他地址：
	firewall-cmd --permanent --add-masquerade

### 重新加载防火墙：
	firewall-cmd --reload

## 配置firewall
### 查看版本：
	firewall-cmd –version

### 查看帮助：
	firewall-cmd –help

### 查看设置：
* 显示状态：$ firewall-cmd –state
* 查看区域信息: $ firewall-cmd –get-active-zones
* 查看指定接口所属区域：$ firewall-cmd –get-zone-of-interface=eth0

### 拒绝所有包：
	firewall-cmd –panic-on

### 取消拒绝状态：
	firewall-cmd –panic-off

### 查看是否拒绝：
	firewall-cmd –query-panic

