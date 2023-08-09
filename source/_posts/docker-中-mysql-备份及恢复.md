---
title: docker 中 mysql 备份及恢复
categories:
  - 前端
tags:
  - JS
author: Jake
date: 2023-08-09 12:39:54
description:
keywords: docker、mysql、备份、恢复
comments:
original:
permalink:
---

<!-- 以上是摘要 -->

<!--more-->

## 备份所有数据

```sh
docker exec some-mysql sh -c 'exec mysqldump --all-databases -u root -p "$MYSQL_ROOT_PASSWORD"' > /some/path/all-databases.sql
```

## 恢复所有数据库

```sh
docker exec -i some-mysql sh -c 'exec mysql -u root -p "$MYSQL_ROOT_PASSWORD"' < /some/path/all-databases.sql
```

## 备份指定数据库

```sh
docker exec some-mysql sh -c 'exec mysqldump --databases db1 -u root -p "$MYSQL_ROOT_PASSWORD"' > /some/path/db1-backup.sql
```

## 恢复指定数据库

```sh
docker exec -i some-mysql sh -c 'exec mysql -u root -p "$MYSQL_ROOT_PASSWORD"' < /some/path/db1-backup.sql
```