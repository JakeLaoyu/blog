---
title: node读写Excel
categories:
  - Node
tags:
  - Node
author: Jake
date: 2017-06-18 00:57:06
keywords: node,excel, xlsx,excel-export,后台
comments:
original:
permalink:

---

node 有很多读写excel的模块，这里我只写我所使用的模块。

* xlsx:读取excel
* excel-export: 导出excel

![](//blogimg.jakeyu.top/20170618149771883564592.png)

<!--more-->

# [xlsx](https://www.npmjs.com/package/xlsx)读取excel文件

## 库中所提及的一些概念

* workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
* worksheet 对象，指的是 Excel 文档中的表。我们知道一份 Excel 文档中可以包含很多张表，而每张表对应的就是 worksheet 对象。
* cell 对象，指的就是 worksheet 中的单元格，一个单元格就是一个 cell 对象。

## 它们的关系如下：

```js
// workbook
{
    SheetNames: ['sheet1', 'sheet2'],
    Sheets: {
        // worksheet
        'sheet1': {
            // cell
            'A1': { ... },
            // cell
            'A2': { ... },
            ...
        },
        // worksheet
        'sheet2': {
            // cell
            'A1': { ... },
            // cell
            'A2': { ... },
            ...
        }
    }
}
```

## 用法

1. 用 XLSX.read 读取获取到的 Excel 数据，返回 workbook
2. 用 XLSX.readFile 打开 Excel 文件，返回 workbook
3. 用 workbook.SheetNames 获取表名
4. 用 workbook.Sheets[xxx] 通过表名获取表格
5. 用 worksheet[address]操作单元格
6. 用XLSX.utils.sheet_to_json针对单个表获取表格数据转换为json格式
7. 用XLSX.writeFile(wb, 'output.xlsx')生成新的 Excel 文件


读取 Excel 文件

```js
XLSX.read(data, read_opts) //尝试解析数据
XLSX.readFile(filename, read_opts) //尝试读取文件名和解析。
```

获取excel中的表

```js
// 获取 Excel 中所有表名
var sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2',……]
// 根据表名获取对应某张表
var worksheet = workbook.Sheets[sheetNames[0]];
```

通过 worksheet[address] 来操作表格，以 ! 开头的 key 是特殊的字段。

```js
// 获取 A1 单元格对象
let a1 = worksheet['A1']; // 返回 { v: 'hello', t: 's', ... }
// 获取 A1 中的值
a1.v // 返回 'hello'
// 获取表的有效范围
worksheet['!ref'] // 返回 'A1:B20'
worksheet['!range'] // 返回 range 对象，{ s: { r: 0, c: 0}, e: { r: 100, c: 2 } }
// 获取合并过的单元格
worksheet['!merges'] // 返回一个包含 range 对象的列表，[ {s: { r: 0, c: 0 }, c: { r: 2, c: 1 } } ]
```

获取 Excel 文件中的表转换为json数据

```js
XLSX.utils.sheet_to_json(worksheet)  //针对单个表，返回序列化json数据
```

# excel-export导出excel

```js
var excelPort = require('excel-export');
var path = require('path')
exports.write = function(req, res, next) {
    var datas = req.datas;
    var conf = {};
    var filename = 'filename'; //只支持字母和数字命名


    conf.cols = [{
        caption: '学号',
        type: 'string',
        width: 20
    }, {
        caption: '姓名',
        type: 'string',
        width: 40
    }, {
        caption: '岗位',
        type: 'string',
        width: 200
    }, {
        caption: '工时(h)',
        type: 'string',
        width: 200
    }];


    var array = [];
    array = [
        [13084233, Jake, 图书馆, 20],
        [13084233, Jake, 图书馆, 20],
        [13084233, Jake, 图书馆, 20],
        [13084233, Jake, 图书馆, 20],
        [13084233, Jake, 图书馆, 20]
    ];


    conf.rows = array;
    var result = excelPort.execute(conf);

    var random = Math.floor(Math.random() * 10000 + 0);
	
    var uploadDir = path.join(__dirname, '../', '/public/files/')
    var filePath = uploadDir + filename + random + ".xlsx";

    fs.writeFile(filePath, result, 'binary', function(err) {
        if (err) {
            console.log(err);
        }
    });
}
```
