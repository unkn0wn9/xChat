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
cd ./server

# 填写配置信息
cp ./utils/config.js.template ./utils/config.js
vim ./utils/config.js # 按情况填写

# 获取Server依赖
npm install

# 初始化数据库
node ./utils/db_tool.js init

# 启动Server
node app.js # 开发环境
pm2 start app.js # 生产环境

# 启动WebUI
cd ../webui
npm install
npm run dev # 开发环境

# 生产环境
npm run build
```

### 配置Nginx

Server端配置文件参考(请完整填写[]的内容)

```
upstream my_nodejs_upstream {
    server 127.0.0.1:3001;
    keepalive 64;
}

server {
    listen 80;

    server_name [server_name];

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_pass http://my_nodejs_upstream/;
        proxy_redirect off;
        proxy_read_timeout 240s;
    }
}
```

WebUI端配置文件参考

```
server {
    listen       80;
    listen  [::]:80;
    server_name  [server_name];
    location / {
        root [root_path]/xChat/webui/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

## :star: 鸣谢
* [chatGPT](https://chat.openai.com/chat)
* [koajs](https://github.com/koajs/koa)
