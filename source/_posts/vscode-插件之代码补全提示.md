---
title: vscode 插件之代码补全提示
categories:
  - vscode
tags:
  - vscode
  - 前端
author: Jake
date: 2021-12-04 16:23:58
description:
keywords: vscode,extension,插件,自动补全
comments:
original:
permalink:
---

![](/images/vscode-插件之代码补全提示/v2-30670b252d59bcc15c040f783d79f5e9_720w.png)

<!--more-->

# 前言

vscode 插件提供了很强大个能力，借助插件可以帮助我们提升开发效率。

在写 node 项目时经常需要相对路径寻找引用 Service 文件等，写一个插件帮我们自动补全。

借助 [`vscode.languages.registerCompletionItemProvider`](https://code.visualstudio.com/api/references/vscode-api) 方法，我们可以注册相关补全提示。

# 注册服务

```ts
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider("typescript", {
      provideCompletionItems,
    })
  );
}
```

# provideCompletionItems

```ts
const provideCompletionItems = async (
  document: vscode.TextDocument,
  position: vscode.Position
) => {
  const serviceFiles = await vscode.workspace.findFiles("app/services/**/*.ts");

  if (!serviceFiles.length) {
    return;
  }

  return serviceFiles.map((file) => {
    // 生成相对当前编辑文件的相对路径
    const relativePath = path.relative(
      path.dirname(document.uri.path),
      path.dirname(file.path)
    );

    const basename = path.basename(file.path);
    const extname = path.extname(file.path);
    const filename = basename.replace(extname, "");
    const insertText = `import ${filename} from '${relativePath}/${filename}';\n${filename}`;

    const completionItem = new vscode.CompletionItem(
      filename,
      vscode.CompletionItemKind.Class
    );

    completionItem.detail = basename;
    completionItem.insertText = insertText;
    completionItem.documentation = `${insertText}`;

    return completionItem;
  });
};
```

# 配置

同时我们需要在 package.json 中添加相应配置

```json
{
  "activationEvents": [
    "onLanguage:typescript"
  ],
}
```

# 参考

- [VS Code API](https://code.visualstudio.com/api/references/vscode-api)
- [VS-Code-Extension-Doc-ZH](https://github.com/Liiked/VS-Code-Extension-Doc-ZH)