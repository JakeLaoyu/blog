---
title: CentOS Stream 8 安装 ClamAV
categories:
  - 服务器
tags:
  - 服务器
author: Jake
date: 2024-10-26 12:45:33
description:
keywords: CentOS, ClamAV, 服务器, 病毒扫描, 安全, 防护
comments:
original:
permalink:
---

![](/images/CentOS-Stream-8-安装-ClamAV/ClamAV-An-open-source-anti-virus-for-your-linux-server-min.webp)

> ClamAV 是一个开源（GPLv2许可）的反病毒工具包，专为邮件网关上的电子邮件扫描而设计。它提供了多种实用工具，包括灵活且可扩展的多线程守护进程、命令行扫描器以及用于自动更新数据库的高级工具。该工具包的核心是一个作为共享库形式提供的反病毒引擎。

<!--more-->

## 环境要求

{% note info %}
ClamAV 的最低建议配置为：
- 3 GiB 以上的 RAM
- 2.0 GHz 以上的单核 CPU
- 至少 5 GiB 的可用硬盘空间。
{% endnote %}

## 安装

### 安装 EPEL 源

```bash
yum install -y epel-release
```

### 安装 ClamAV

```bash
yum install clamav clamd clamav-update -y
```

### 修改 ClamAV 配置文件

```bash
/etc/clamd.d/scan.conf 取消下面行注释
LogFile /var/log/clamd.scan
LogFileMaxSize 2M
PidFile /run/clamd.scan/clamd.pid
DatabaseDirectory /var/lib/clamav
LocalSocket /run/clamd.scan/clamd.sock
```

### 修改病毒库刷新配置文件

```bash
/etc/freshclam.conf 取消下面行注释
DatabaseDirectory /var/lib/clamav
UpdateLogFile  /var/log/freshclam.log
PidFile  /var/run/freshclam.pid
DatabaseMirror database.clamav.net
Checks 12
```

## 启动 ClamAV 服务

```bash
systemctl start clamd@scan.service
systemctl start clamav-freshclam.service
```

## 开机自启动

```bash
systemctl enable clamd@scan.service
systemctl enable clamav-freshclam.service
```

## 查看 ClamAV 服务状态。

```bash
systemctl status clamd@scan.service
systemctl status clamav-freshclam.service
```

## 故障排除

{% note info %}
- 如果 clamav 服务无法启动，请检查配置信息以及日志;
- 检查病毒库数据是否正常，在配置文件中会指定 `DatabaseDirectory` ，即病毒库存放位置，检查是否存在，不存在的话，手动执行一下 `freshclam` 命令。
  - 如果出现 `Failed to open log file /var/log/freshclam.log: Permission denied`。
    - 可以先执行 `chmod a+w /var/log/freshclam.log`。
    - 然后执行 `freshclam` 更新病毒库。
- 如果手动执行 freshclam 也无法正常下载的话，可以从以下地址下载后传到该目录下。
  - [https://database.clamav.net/daily.cvd](https://database.clamav.net/daily.cvd)
  - [https://database.clamav.net/bytecode.cvd](https://database.clamav.net/bytecode.cvd)
  - [https://database.clamav.net/main.cvd](https://database.clamav.net/main.cvd)
{% endnote %}

## 参考

- [ClamAV 官方文档](https://docs.clamav.net/)
- [1Panel](https://1panel.cn/docs/user_manual/toolbox/clam/)
- [Ask Different](https://apple.stackexchange.com/questions/475478/clamav-configuration-failed-to-open-log-file-var-log-freshclam-log)