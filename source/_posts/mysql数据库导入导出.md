---
title: mysql数据库导入导出
categories:
  - 服务器
tags:
  - 服务器
author: 'Jake'
date: 2017-07-12 10:00:44
keywords: mysql,数据库,备份
comments:
original:
permalink:
---


![](/images/20170712149982499685082.png)
<!--more-->

# 导出所有库
## 系统命令行
```sh
mysqldump -u username -p password --all-databases > all.sql
```

# 导入所有库
## mysql命令行
```sh
mysql>source all.sql;
```

# 导出某些库
## 系统命令行
```sh
mysqldump -u username -p password --databases db1 db2 > db1db2.sql
```

# 导入某些库
## mysql命令行
```sh
mysql>source db1db2.sql;
```

# 导入某个库
## 系统命令行
```sh
mysql -u username -p password db1 < db1.sql;
```

## mysql命令行
```sh
mysql>source db1.sql;
```

# 导出某些数据表
## 系统命令行
```sh
mysqldump -u username -p password db1 table1 table2 > tb1tb2.sql
```

# 导入某些数据表
## 系统命令行
```sh
mysql -u username -p password db1 < tb1tb2.sql
```

## mysql命令行
```sh
mysql>user db1;
mysql>source tb1tb2.sql;
```
