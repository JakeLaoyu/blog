---
title: nginx proxy cloudflare worker 421/403
categories:
  - 服务器
tags:
  - 服务器
author: Jake
date: 2023-11-02 17:35:39
description:
keywords: nginx, proxy, proxy_pass, cloudflare, worker, 403, 421, 502
comments:
original:
permalink:
---

记一次使用 nginx 反代 cloudflare worker 时，访问 502/403/421 的问题。

<!--more-->

我使用的是 [1panel](https://1panel.cn/) 面板，它的网站管理使用的是 [OpenResty](https://openresty.org/cn/)。

当使用 OpenResty 默认配置，设置网站反向代理到 Cloudflare Worker 时，出现 502。

解决办法，移除所有默认 proxy 配置

```shell
#proxy_set_header Host $host; 
#proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
#proxy_set_header X-Forwarded-Host $server_name; 
#proxy_set_header X-Real-IP $remote_addr; 
#proxy_http_version 1.1; 
#proxy_set_header Upgrade $http_upgrade; 
#proxy_set_header Connection "upgrade"; 
```

移除后出现 403/421 错误。

找到社区里有出现过相关问题: [https://community.cloudflare.com/t/access-cloudflare-workers-with-nginx-proxy/478073](https://community.cloudflare.com/t/access-cloudflare-workers-with-nginx-proxy/478073)

解决办法，添加以下配置

```shell
proxy_ssl_server_name on;
```