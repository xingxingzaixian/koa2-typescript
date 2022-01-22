> **master分支为无 API 文档的分支**
> 
> **swagger分支为有 API 文档的分支，采用 koa-swagger-decorator 实现**

# 简介
使用 koa2、typeorm、typescript、mysql 实现的简单 Web 框架，附带说明文档，以供学习使用。


# 文档资料
- [项目初始化](https://www.toutiao.com/item/7053989186281456165)
- [项目结构调整](https://www.toutiao.com/item/7053994032938091044/)
- [添加日志模块](https://www.toutiao.com/item/7053995944894792200/)
- [请求参数与数据校验](https://www.toutiao.com/item/7053996715770380837/)
- [路由动态加载](https://www.toutiao.com/item/7053998418536006155/)
- [文件上传](https://www.toutiao.com/item/7054001970259952131/)
- [配置 MySQL 数据库](https://www.toutiao.com/item/7054002667953193511/)
- [跨域认证处理](https://www.toutiao.com/item/7054002828590809612/)
- [密码加密处理](https://www.toutiao.com/item/7054061987600335396/)
- [登录认证处理](https://www.toutiao.com/item/7054445172838400544/)
- [其他请求参数处理](https://www.toutiao.com/item/7055897400015094275/)
- [API文档生成（番外）](https://www.toutiao.com/item/7055284084603650599/)


# 开发环境搭建
## 安装依赖
```shell
yarn
```

## 配置服务器
ormconfig.json
```json
{
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "123456",
    "database": "node-test",
}
```

## 启动服务器
```shell
yarn start
```

# 发布环境
