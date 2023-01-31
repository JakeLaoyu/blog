---
title: css扩展语言通过变量声明媒体查询
categories:
  - 前端
tags:
  - CSS
author: 'Jake'
date: 2018-04-14 01:16:55
keywords: scss,less,postcss,media,变量,媒体查询
comments:
original:
permalink:
---


<!--more-->

# scss

```scss
$mobile: 'only screen and (max-device-width: 720px),
only screen and (-webkit-min-device-pixel-ratio: 1.5) and (max-width: 720px)';

@media #{$mobile}{
    font-size: (100vw/7.5);
}
```

# Less

```less
@mobile: ~"only screen and (max-device-width: 720px), only screen and (-webkit-min-device-pixel-ratio: 1.5) and (max-width: 720px)";

@media @mobile{
    font-size: (100vw/7.5);
}
```

# postcss

```postcss
@custom-media --mobile only screen and (max-device-width: 720px),
                       only screen and (-webkit-min-device-pixel-ratio: 1.5) and (max-width: 720px);

@media (--mobile){
    font-size: (100vw/7.5);
}
```
