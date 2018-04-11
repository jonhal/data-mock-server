# data-mock-server  - 接口模拟处理平台
===========================
## 功能特性

#### 强大功能
1. 自建数据模拟服务器 -- 一键搭建数据模拟接口服务平台
2. 极速开发模拟 -- 直接curl或者使用postman发送post请求即可配置模拟请求
3. 项目本地数据模拟      -- 搭配data-mock-send模块，一键配置本地数据模拟文件
4. 临时调试模式         -- 提供云服务器可最直接在线调试

### 建议使用场景
1. 本地开发调试中，将mock数据文件放到项目文件中配合data-mock-send模块，实现异步请求的模拟
2. 本地开发调试中，将mock数据直接post到云服务器【还未搭建】中进行配置模拟开发

### 如何使用？
1. npm install data-mock-server
2. 安装mongodb
3. 配置config.js文件，如果服务端口号和数据库端口号没有占用的话，用默认的即可
4. 启动服务
```javascript
npm run start
```
5. 配置mock数据，服务器地址后面需要加initdataformock，标识新增数据。使用postman等其他也可以

  curl -XPOST -H "Content-type: application/json" -d '{
  "name": "lujunhao",
  "age": 11
}' 'http://127.0.0.1:3000/e0ec6057dafaaadd0ca9fa87a73d5e64ba881891e7e3d2af3a7f1ae228e5410j/initdataformock/aa/bb' 

6. 获取mock数据，根据配置的url，会返回数据，支持get和post请求
  curl -XPOST -H "Content-type: application/json" -d '{
  "name": "lujunhao",
  "age": 11
}' 'http://127.0.0.1:3000/e0ec6057dafaaadd0ca9fa87a73d5e64ba881891e7e3d2af3a7f1ae228e5410j/aa/bb' 

### config文件配置
 1. serverPort -- 服务端口号 【默认即可】
 2. dataBaseUrl -- mongodb的服务器地址【默认即可】 
 3. dataBaseName -- mock数据库名称 【默认即可】
