# THOSAutomation

Automatically submit Students Health & Location Daily Report of THOS.

Based on Node.js.

让清华大学在线服务平台（THOS）的每日健康及出行情况打卡实现工业现代化的自动化。

基于 Node.js 开发。

## 特性

* 打卡
* 定时
* 多用户
* 无人值守

部分原理参考 https://tuixue.online/thos/thos.py

## 部署

本项目的自动化程序面向 Google Chrome 浏览器。若要使用其他浏览器，请手动更改代码。

在开始之前，先手动在 THOS 上执行一次成功的打卡，使 THOS 自动记忆打卡内容。

然后 clone 本项目，并在项目文件夹中执行
```
npm install
```
以补全依赖。

如果没有安装 PM2 ，则执行
```
npm install pm2 -g
```

配置 config.json：

|条目|作用|
|-|-|
|dosubmitatlaunch|（一般用于调试）在启动时进行一次打卡|
|scheduled_time|打卡时间|
|accounts|需要打卡的账户（是一个存放多账户的数组）|

打卡时间的格式如下：
```
* * * * * *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │ |
│ │ │ │ │ └─── 星期几，取值：0 - 7，其中 0 和 7 都表示是周日
│ │ │ │ └───── 月份，取值：1 - 12
│ │ │ └─────── 日期，取值：1 - 31
│ │ └───────── 时，取值：0 - 23
│ └─────────── 分，取值：0 - 59
└───────────── 秒，取值：0 - 59（可选）
使用 * 号则表示重复，例如 0 0 11 * * * 表示每天 11 点整打卡。
```

打卡账户的格式如下：
```
"accounts":
    [
        {
            "username": "账户1用户名（工作证号、学号或者网络账号）",
            "password": "账户1密码"
        },
        {
            "username": "账户2用户名（工作证号、学号或者网络账号）",
            "password": "账户2密码"
        },
        ...
    ]
```

配置完成以后，执行
```
pm2 start app.js
```
即可启动。

## For Int'l Students

Change the address of L44 in app.js to:
```
https://thos.tsinghua.edu.cn/fp/view?m=fp#from=hall&serveID=f7b71450-5cd9-47c1-8e45-5320b8bd2e18&act=fp/serveapply
```
The rest steps are the same as above.

## 声明

本程序仅供学习和研究使用，请严格遵守学校防疫规范。