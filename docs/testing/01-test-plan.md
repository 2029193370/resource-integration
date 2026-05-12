# 测试计划总览

> 版本：v1.0 | 创建日期：2026-05-12 | 项目：网址收藏导航

## 1. 测试目标

验证公开首页、管理员后台、API、数据库迁移、双语言和 Vercel 部署流程满足上线要求。

## 2. 测试范围

| 范围 | 覆盖内容 |
|------|---------|
| 单元测试 | URL 校验、环境变量校验、认证工具、数据转换 |
| 集成测试 | 登录、登出、网站 CRUD API、未授权保护 |
| E2E 测试 | 访客浏览和跳转、管理员登录、新增网站、编辑网站、删除网站 |
| 手动测试 | 液态玻璃 UI 观感、响应式布局、中英文切换、Vercel 部署检查 |

## 3. 测试环境

| 环境 | 用途 | 数据库 |
|------|------|--------|
| Local | 开发自测 | Neon dev branch 或本地 PostgreSQL |
| Preview | PR 验收 | Neon preview branch |
| Production | 上线验证 | Neon production branch |

## 4. 质量门禁

- `npm run lint` 通过。
- `npm run test` 通过。
- `npm run test:e2e` 通过或记录环境限制原因。
- `npm run build` 通过。
- 后台写接口未登录访问必须返回 401。
- `.env`、数据库连接串、管理员密码不得出现在 Git diff 中。

## 5. 风险点

- Vercel serverless 环境与 Prisma/Neon 连接方式需要实测。
- 管理员初始密码 seed 后不得在响应或日志中泄露。
- 外链跳转需避免 `window.opener` 安全风险。
- 双语言文案必须覆盖公开页和后台页面。
