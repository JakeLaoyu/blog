---
title: 跨域名存取localStorage
categories:
  - 前端
tags:
  - JS
author: Jake
date: 2020-09-20 19:15:11
description:
keywords:
comments:
original:
permalink:
---

![](//blogimg.jakeyu.top/跨域名读取localStorage/de1cd54ffb.png)

<!--more-->

> 无论数据存储在 localStorage 还是 sessionStorage ，**它们都特定于页面的协议。**

由于`localStorage`是基于当前访问源(origin)的本地存储空间，所以当我们在 `a.jakeyu.top` 中存储一段数据，并想要在 `b.jakeyu.top` 中读取数据的时候是无法取到的。

最近遇到这样的需求，考虑过 cookie 方案，但是可能存储大量的数据，cookie 不可行。最终我们使用`iframe`来实现，我觉得这是一个很有趣的方法。

# 思路

`a.jakeyu.top` 和 `b.jakeyu.top` 通过 `iframe` 加载同一个域名的页面，并使用 [postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage) 和 `iframe` 中的页面进行通信，这样就可以实现跨域名存取 localStorage。

缺点是 `postMessage`  是基于回调的，所以所有 api 都是异步的。不过我们有 `promise`，所以可以忽略。

![](//blogimg.jakeyu.top/跨域名读取localStorage/Jietu20200924-095241@2x.png)

# 实现
## 父级页面

### 创建 iframe

```ts
function createIframe() {
  const iframeInBody = document.querySelector('#iframe') as HTMLIFrameElement;

  if (iframeInBody) {
    return iframeInBody;
  }

  const iframe = document.createElement('iframe');
  iframe.setAttribute('id', '#iframe');
  iframe.src = 'https://jakeyu.top/localstorage';
  iframe.style.display = 'none';

  document.body.insertAdjacentElement('beforeend', iframe);

  return iframe;
}
```

### 核心 Class

```typescript
class localStorage {
  iframe: HTMLIFrameElement;

  // iframe 是否加载完成
  isReady: Boolean;

  // 同时调用方法时，需要在 iframe 回调之后执行 reslove
  waitMap: Map<string, Function>;

  // 在 iframe ready之前调用方法，需要保存一下，ready后执行
  beforeReady: [Function?];

  constructor() {
    this.listenMessage();

    this.isReady = false;

    this.beforeReady = [];

    this.iframe = createIframe();

    this.waitMap = new Map();
  }

  /**
   * 设置数据
   * @param key
   * @param value
   */
  setItem(key: string, value: any) {
    const eventType = 'set';
    const randomKey = this.getRandomString(eventType);

    return new Promise((resolve) => {
      this.waitMap.set(randomKey, resolve);

      this.postMessage({
        eventType,
        key,
        value,
        randomKey
      });
    });
  }

  /**
   * 监听消息
   */
  listenMessage() {
    // 接收 iframe 消息
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  /**
   * 处理接收消息
   * @param event
   */
  receiveMessage(event: MessageEvent) {
    const { data = {} } = event;
    if (typeof data === 'string') return;

    const { eventType, randomKey, value } = data;

    if (eventType === 'return') {
      const handler = this.waitMap.get(randomKey);

      if (handler) {
        handler(value);
        this.waitMap.delete(randomKey);
      }
    } else if (eventType === 'ready') {
      this.isReady = true;

      while (this.beforeReady.length) {
        const fun = this.beforeReady.shift() as Function;
        fun();
      }
    }
  }

  /**
   * 获取随机字符串
   * @param eventKey
   */
  getRandomString(eventKey: string) {
    let randomString = '';
    let eventKeyRandom = '';

    do {
      randomString = makeRandomString(5);
      eventKeyRandom = `${eventKey}_${randomString}`;
    } while (this.waitMap.has(eventKeyRandom));

    return eventKeyRandom;
  }

  /**
   * 向iframe中发送消息
   * @param params
   */
  postMessage(params: Record<string, string>) {
    if (this.isReady) {
      (this.iframe.contentWindow as Window).postMessage(params, '*');
    } else {
      this.beforeReady.push(() => {
        (this.iframe.contentWindow as Window).postMessage(params, '*');
      });
    }
  }
}
```

## iframe 页面

iframe 页面只需要通过 postMessage 和父级页面进行通信，所以并不需要 ui。

### ready

页面加载完成时，需要通知父页面，并执行 before 栈中的函数。
```js
window.parent.postMessage(
  {
    eventType: 'ready',
  },
  '*'
);
```

### 监听消息

```js
function receiveMessage(event) {
  // 用来标记当前事件是 读/取 或者其他
  const eventType = get(event, 'data.eventType', '');
  // 数据 key
  const key = get(event, 'data.key', '');
  // 数据
  const value = get(event, 'data.value', '');
  // 当前事件标识，用于父级页面区分当前消息来自哪次调用
  const randomKey = get(event, 'data.randomKey', '');

  // 只以存数据为例
  if(eventType === 'set') {
    localStorage.setItem(key, value);

    // 通知父级页面存储成功
    window.parent.postMessage(
      {
        eventType: 'return',
        value,
        randomKey,
        error,
      },
      '*'
    );
  }
}

window.addEventListener('message', receiveMessage, false);
```

# 使用

在 `a.jekeyu.top` 中存储数据

```js
new localStorage().setItem('name', 'jake')
```

在 `b.jekeyu.top` 中存储数据

```js
const name = await new localStorage().getItem('name')
```