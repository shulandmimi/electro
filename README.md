# electro 探测电量

> 某个作业

由 umi 构建，使用react和react-redux开发项目

[项目地址](http://electro.wdbke.top)

## 功能

- [x] 查看电量
- [x] 指定某个宿舍
- [x] 邮件订阅宿舍电量
- [ ] ...

### PWA

> 目前处于停滞状态，由于https服务需要证书，所以现在暂时搁置

## 自动部署

`circleci`进行自动化部署

> 基础：服务器运行`k8s`，

1. 本地通过`git tag`进行版本发布
2. 在 `CI` 中打包项目，push镜像到私有镜像仓库中，然后通过kubectl通知`k8s`拉取新的镜像对项目进行更新
3. 部署成功

## 开始

```bash
$ yarn
$ yarn start
```
