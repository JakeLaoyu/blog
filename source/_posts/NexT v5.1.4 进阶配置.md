---
title: NexT v5.1.4 进阶配置
categories:
  - Hexo
tags:
  - Hexo
author: Jake
date: 2018-06-04 15:27:04
keywords: hexo,next,swiper,运行时间
comments:
original:
permalink:
---

![](/images/swiper内容超出纵向滚动/big.jpg)

<!--more-->

## 添加swiper

### demo

[https://i.jakeyu.top/2018/06/03/mac%E5%A5%BD%E7%94%A8%E7%9A%84%E8%BD%AF%E4%BB%B6%E6%95%B4%E7%90%86/#%E6%88%AA%E5%9B%BE](https://i.jakeyu.top/2018/06/03/mac%E5%A5%BD%E7%94%A8%E7%9A%84%E8%BD%AF%E4%BB%B6%E6%95%B4%E7%90%86/#%E6%88%AA%E5%9B%BE)

### 配置

编辑主题配置文件`/themes/next/_config.ylm`，在vendors下面添加：

```yml
# swiper version 4.3.2
# http://www.swiper.com.cn/
swiper_css: //cdnjs.loli.net/ajax/libs/Swiper/4.3.2/css/swiper.min.css
swiper_js: //cdnjs.loli.net/ajax/libs/Swiper/4.3.2/js/swiper.min.js
```

编辑`/themes/next/layout/_partials/head.swig`，添加：

```html
<link rel="stylesheet" href="{{ theme.vendors.swiper_css }}">
```

新建`/themes/next/layout/_third-party/swiper/swiper.swig`

```swig
<script type="text/javascript" src="{{ theme.vendors.swiper_js }}"></script>
```

编辑`/themes/next/layout/_layout.swig`，添加：

```swig
.......
{% include '_scripts/boostrap.swig' %}
{% include '_third-party/swiper/swiper.swig' %}
{% include '_third-party/comments/index.swig' %}
{% include '_third-party/search/index.swig' %}
.......
```

新建`/themes/next/source/css/_common/components/third-party/swiper.styl`

```styl
.swiper{
  position: relative;
  overflow: hidden;
}
```

编辑`/themes/next/source/css/_common/components/third-party/third-party.styl`，添加：

```styl
.......
@import "busuanzi-counter";
@import "swiper";
@import "algolia-search" if hexo-config('algolia_search.enable');
.......
```

编辑`/themes/next/source/js/src/util.js`，添加：

```js
NexT.utils = NexT.$u = {
  swiper: function() {
    $('.swiper').each(function(index,item){
      var _ = $(item)
      var wapper = $('<div class="swiper-wrapper"></div>')
      _.addClass('swiper-' + (index+1))
      _.append('<div class="swiper-pagination"></div><div class="swiper-button-prev"></div><div class="swiper-button-next"></div>')
      _.find('img').each(function (index,item) {
        wapper.append($('<div class="swiper-slide"></div>').append(item))
      })
      _.prepend(wapper)
      _.find('br').remove()

      new Swiper('.swiper-' + (index + 1), {
      	autoHeight: true,
        preloadImages: true,
        loop : true,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        mousewheel: true,
      })
    })
  },
  /**
   * Wrap images with fancybox support.
   */
  wrapImageWithFancyBox: function () {
  .......
```

编辑`/themes/next/source/js/src/bootstrap.js`，添加：

```js
......
NexT.utils.swiper()
CONFIG.fancybox && NexT.utils.wrapImageWithFancyBox();
......
```

注意：一定要在`CONFIG.fancybox && NexT.utils.wrapImageWithFancyBox();`前面添加

### 写作

```markdown
<div class="swiper">
![](/images/mac好用的软件整理/Jietu20180604-141733.png)
![](/images/mac好用的软件整理/Jietu20180604-141841.png)
</div>
```

## 添加运行时间

### 配置

编辑`/themes/next/source/css/_mixins/base.styl`，添加

```css
@media (max-width: 767px) {
  .since-line {
    display: none;
  }
  #since {
    display: block;
  }
}
```

编辑`/themes/next/layout/_layout.swig`，添加：

```swig
<footer id="footer" class="footer">
  <div class="footer-inner">
    {% include '_partials/footer.swig' %}
    {% include '_third-party/analytics/analytics-with-widget.swig' %}
    {% block footer %}{% endblock %}
    <span class="post-meta-divider since-line">|</span>
    <span id="since"></span>
  </div>
</footer>
```

在`_layout.swig`文件最后添加:

```js
  <script type="text/javascript">
    function show_date_time () {
      window.setTimeout(function () {
        show_date_time();
      }, 1000);
      var BirthDay = new Date(2016,8,25);
      var today = new Date();
      var timeold = (today.getTime() - BirthDay.getTime());
      var msPerDay = 24 * 60 * 60 * 1000;
      var e_daysold = timeold / msPerDay;
      var daysold = Math.floor(e_daysold);
      var e_hrsold = (e_daysold - daysold) * 24;
      var hrsold = Math.floor(e_hrsold);
      var e_minsold = (e_hrsold - hrsold) * 60;
      var minsold = Math.floor((e_hrsold - hrsold) * 60);
      var seconds = Math.floor((e_minsold - minsold) * 60);
      $('#since').html(daysold + "天" + hrsold + "小时" + minsold + "分" + seconds + "秒");
    }
    show_date_time();
  </script>
```
