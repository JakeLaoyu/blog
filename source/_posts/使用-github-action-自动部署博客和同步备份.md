---
title: 使用 github action 自动部署博客和同步备份
categories:
  - 前端
  - 服务器
  - CI/CD
tags:
  - 前端
  - 服务器
  - CI/CD
author: Jake
date: 2023-02-04 00:14:33
description:
keywords: github,github action,hexo,部署,备份,同步
comments:
original:
permalink:
---

![](//blogimg.jakeyu.top/使用-github-action-自动部署博客和同步备份/44036562.png)

<!--more-->

## 前言

使用 github action 自动化可以让我们发布博客更加简单，只需要把代码提交到 github 仓库即可。

## 准备

关于如何使用 git 上传博客到自己的服务器可以查看我之前写的[Hexo博客部署到服务器](/2016/12/06/Hexo%E5%8D%9A%E5%AE%A2%E6%90%AD%E5%BB%BA%E5%88%B0%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%B9%B6%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2/)。

## 部署到 github page
### action 配置

在项目根目录下创建 `.github/workflows` 文件夹，然后在该文件夹下创建 `deploy-gh-page.yml` 文件，内容如下：

```yml
name: Deploy to gh-page

# 根据实际情况调整分支
on:
  push:
    branches:
      - master

jobs:
  deploy-gh-page:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          ref: master
          fetch-depth: 0
      - uses: pnpm/action-setup@v2
        with:
          version: 7
          run_install: false
      - uses: actions/setup-node@v3
        with:
          node-version: "16"
          cache: "pnpm"
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Build
        run: npm run build
      - name: Deploy to gh-page
        uses: peaceiris/actions-gh-pages@v3
        with:
          # github 自带变量，无需配置
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## 部署到服务器
### SSH key

添加 SSH Private Key 到 `github repo -> settings -> Secrets and variables -> Actions`。

![](//blogimg.jakeyu.top/使用-github-action-自动部署博客和同步备份/SCR-20230204-mh.png)

### action 配置

在[上文的配置](#action-配置)基础上，增加如下配置:

```yml
deploy-to-server:
  runs-on: ubuntu-latest
  # 依赖 deploy-gh-page job
  needs: [deploy-gh-page]
  steps:
    - name: Deploy to server
      uses: wei/git-sync@v3
      with:
        source_repo: JakeLaoyu/blog
        source_branch: refs/remotes/source/gh-pages
        destination_repo: root@110.40.198.64:/www/wwwroot/blog.git
        destination_branch: refs/heads/master
        destination_ssh_private_key: ${{ secrets.SERVER_PRIVATE_KEY }}
```

## 效果

![](//blogimg.jakeyu.top/使用-github-action-自动部署博客和同步备份/SCR-20230204-s2.png)

## 同步至 gitee 等

依赖 [wearerequired/git-mirror-action](https://github.com/wearerequired/git-mirror-action) 我们可以很方便实现。

在项目根目录下创建 `.github/workflows` 文件夹，然后在该文件夹下创建 `sync-to-gitee.yml` 文件，内容如下：

```yml
name: Sync to Gitee

on:
  push:
    branches: [master]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          # 需要事先在 gitee 上创建 ssh key 并添加到仓库
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_RSA_PRIVATE_KEY }}
        with:
          # GitHub 源仓库地址
          source-repo: git@github.com:JakeLaoyu/blog.git
          # Gitee 目标仓库地址
          destination-repo: git@gitee.com:jakelaoyu/HexoBlogBackup.git
```