---
title: 'ngixn反向代理报错解决'
categories:
  - 服务器
tags:
  - Nginx
author: 'Jake'
date: 2018-03-16 15:24:19
keywords: 'nginx,Net::ERR_INCOMPLETE_CHUNKED_ENCODING,错误,日志,解决'
comments:
original:
permalink:
---
今天在写[七牛图床管理](https://github.com/FeddyTeam/qiniu-images-manager)时，使用nginx反向代理，加载文件报错<span style="color:red;">Net::ERR_INCOMPLETE_CHUNKED_ENCODING</span>

<!--more-->

查看nginx日志文件`/usr/local/var/log/nginx/error.log`发现下面这行：

```log
2018/03/16 15:22:21 [crit] 77033#0: *3361 open() "/usr/local/var/run/nginx/proxy_temp/7/12/0000000127" failed (13: Permission denied) while reading upstream, client: 127.0.0.1, server: dev.jakeyu.top, request: "GET /app.js HTTP/1.1", upstream: "http://127.0.0.1:8081/app.js", host: "dev.jakeyu.top:8080", referrer: "http://dev.jakeyu.top:8080/"
```

于是切换到`proxy_temp`所在目录，修改目录用户：

```sh
chown -R jake ./proxy-temp
```

完美解决
