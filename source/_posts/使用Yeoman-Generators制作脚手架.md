---
title: 使用Yeoman定制前端脚手架
categories:
  - 工具
tags:
  - 工具
author: 'Jake'
date: 2017-06-28 22:41:33
keywords: Yeoman,脚手架,教程
comments:
original:
permalink:

---

![](/images/20170628149866105196233.png)

<!--more-->

首先附上Yeoman官网：[http://yeoman.io/](http://yeoman.io/)

我制作的前端脚手架：[generator-jake-front](https://github.com/JakeLaoyu/generator-jake-front)

以及我在前端同学的分享会上的分享ppt：[yeoman.key](https://i.jakeyu.top/files/yeoman.key)

如果想快速制作一个脚手架，并且不需要实现特别复杂的定制化，看完这篇文章足够，如果想要实现复杂的功能，需要去查看[官方文档](http://yeoman.io/)。

# 环境

需要安装[Nodejs](https://nodejs.org/zh-cn/)

全局安装需要的工具

```sh
npm install -g yo
npm install -g generator-generator
```

# 初始化项目

执行下面命令，执行之前并不需要自己新建文件夹，yo generator会帮助我们建好文件夹

```sh
yo generator
```

项目名称自己设置，必须是以`generator-`开头，协议选择`MIT`，在设置了一系列问题之后


![](/images/2017062814986615489491.jpg)

自动生成如下目录

```
generator-test
├── LICENSE
├── README.md
├── __tests__
│   └── app.js
├── generators
│   └── app
│       ├── index.js
│       └── templates
│           └── dummyfile.txt
└── package.json
```

# 配置

`generators/app/templates/`是默认存放文件的目录，把所有模版文件放在这个目录下

`/generators/app/index.js`是`Yeoman`的配置文件，定义如何生成我们的脚手架

## prompting

`Prompts`是`generator`与用户交互的主要方式。`prompt`模块由 [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)提供，你可以参考它的[API](https://github.com/SBoudrias/Inquirer.js)，在可用的提示选项列表。

`prompt`方法是异步的并且返回一个 promise。在你运行下一个任务前去完成它，你需要返回 promise。

```js
module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awe-inspiring ' + chalk.red('generator-downloads') + ' generator!'
    ));

    const prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }
};
```

做一些适当的修改，实现更通用的脚手架。可以查阅[API](http://yeoman.io/generator/)

* `this.appname`: 获取当前文件夹名称
* `this.user.git.name()`: 获取全局`git`用户名
* `this.user.git.email()`: 获取全局`git`邮箱
* `this.github.username()`: 获取`github`用户名

定义对象中的`type`，管理交互方式。使用`input`实现控制台输入。

```js
type: 'input',
name: 'author',
message: 'author',
default: this.user.git.name()
```

这样便实现了让用户输入作者名称，默认为git全局配置的用户名。然后在其他配置中使用`this.props.author`实现获取用户输入。

## writing

`Generators`在`this.fs`暴露了所有的文件的方法，这是一个实例，[mem-fs editor](https://github.com/sboudrias/mem-fs-editor) - 确保为所有可获得的方法选择[模块文件](https://github.com/sboudrias/mem-fs-editor)。

值得注意的是，通过`this.fs`暴露`commit`，你不应该在你的`generator`去调用它。`Yeoman`在运行循环的冲突阶段结束后，在内部调用它。

### 复制一个模板文件

例如：`./templates/index.html`的文件内容是：

```html
<html>
  <head>
    <title><%= title %></title>
  </head>
</html>
```

然后，我们将使用[copyTpl](https://github.com/sboudrias/mem-fs-editor#copyfrom-to-options)方法去复制作为模板的处理中的文件。`copyTpl`使用的是[ejs](http://ejs.co/) 模板引擎。

```js
module.exports = class extends Generator {
  writing() {
    this.fs.copy(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      { title: 'Templating with Yeoman' }
    );
  }
};
```

一旦generator运行成功，`index.html`将会包含：

```html
<html>
  <head>
    <title>Templating with Yeoman</title>
  </head>
</html>
```

`json`也同样适用上面的语法，配置`package.json`文件可以适应不同的项目。

## install

`install`方法设置在文件copy完成之后执行的命令，例如

```js
module.exports = class extends Generator {
install() {
this.installDependencies({
      bower: true,
      npm: true,
      yarn: false,
      callback: function () {
       this.log('Everything is ready!');
      }
    });
  }
};
```

## 测试

由于我们在本地开发，并不知道用起来怎么样，所以可以使用`npm link`命令，相当于在全局安装了此脚手架，然后在新文件夹中执行`yo`，选择脚手架，便可以测试


## 发布

`generator-test/package.json`中的`name`要在[https://www.npmjs.com/](https://www.npmjs.com/)没被创建过，才可以发布。

发布需要一个`npm`的账号，如果没有使用`npm adduser`创建；

如果已有账号，运行`npm login`登陆。

在项目根目录下，运行`npm publish`就可以发布了。如果更新后重新发布，注意修改根目录下的`package.json`文件中的版本号。

使用`npm unpublish 包名`命令可以撤销发布，只有在发包的24小时内才允许撤销发布的包。
