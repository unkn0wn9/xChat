## :rocket: xChat
> 快速构建你自己的chatGPT平台，以便分享给朋友一起感受AI的魅力。

## :scroll: 特性
* 用户认证
* 敏感词过滤
* 对话界面
* OpenAI 文本补全

## :hammer_and_wrench: 部署

克隆或下载本项目到服务器，根据以下指令分别启动Server和Platform服务即可。

```shell
# 获取Server依赖
cd ./server
npm install

# 初始化数据库(Sqlite3)
node ./utils/db.js

# 启动Server
node app.js
```

## :star: 鸣谢
* [chatGPT](https://chat.openai.com/chat)
* [koajs](https://github.com/koajs/koa)
