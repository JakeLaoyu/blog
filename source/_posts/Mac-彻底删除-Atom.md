---
title: Mac 彻底删除 Atom
categories:
  - Mac
author: 'Jake'
date: 2018-05-17 14:59:08
keywords: Mac,彻底,删除,Atom
comments:
original:
permalink:
---

![](//blogimg.jakeyu.top/Mac 彻底删除 Atom/1_JSK29tJmY2hyGS9xDOGkzg.png)

<!--more-->

自从更新到`1.25.0`后，经常崩溃，查到原因[ISSUES](https://github.com/atom/atom/issues/17020)，但是官方还没有解决，所以需要删除Atom，重新安装`1.24.1`。

## 删除所有Package

```sh
rm -rf ~/.atom/packages
```

## 彻底卸载Atom

参考: [How to Completely Uninstall Atom for Mac?](https://discuss.atom.io/t/how-to-completely-uninstall-atom-for-mac/9084/34)

```sh
rm -rf ~/.atom
rm -rf /usr/local/bin/atom
rm -rf /usr/local/bin/apm
rm -rf /Applications/Atom.app
rm -rf ~/Library/Preferences/com.github.atom.plist
rm -rf "~/Library/Application Support/com.github.atom.ShipIt"
rm -rf "~/Library/Application Support/Atom"
rm -rf "~/Library/Saved Application State/com.github.atom.savedState"
rm -rf ~/Library/Caches/com.github.atom
rm -rf ~/Library/Caches/Atom
```
