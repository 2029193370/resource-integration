# 开发阶段拆解

> 版本：v1.0 | 创建日期：2026-05-12 | 项目：网址收藏导航 | 类型：Web 全栈

## 阶段总览

| 阶段 | 名称 | 预估工期 | 状态 |
|------|------|---------|------|
| Phase 0 | 项目初始化与环境搭建 | 0.5 天 | [x] |
| Phase 1 | 核心基础设施 | 1 天 | [x] |
| Phase 2 | 核心业务功能 | 1.5 天 | [x] |
| Phase 3 | UI、双语与体验优化 | 1 天 | [x] |
| Phase 4 | 测试与上线准备 | 0.5 天 | [x] |

## Phase 0：项目初始化与环境搭建

**目标**：把现有 CI 模板仓库改造为可运行的 Next.js 项目。

### 任务清单

- [x] 初始化 `package.json`、Next.js、TypeScript、Tailwind CSS。
- [x] 配置 `.env.example`，抽离数据库、认证和 Vercel 配置。
- [x] 配置 Prisma、Neon PostgreSQL 连接和初始迁移。
- [x] 保留并调整现有 GitHub Actions，让 CI 检查 Node.js 项目。
- [x] 删除或归档不再适用于本项目的模板文档内容。
- [x] 验证生产构建可通过。

### 验收标准

- 根目录存在可运行的 Next.js 项目。
- `.env.example` 覆盖全部必需配置。
- `npm run lint`、`npm run build` 可以执行到项目检查阶段。

## Phase 1：核心基础设施

**目标**：完成数据库、认证、校验和基础布局。

### 1.1 数据库与配置

- [x] 编写 Prisma schema：`AdminUser`、`Website`。
- [x] 编写数据库迁移和 seed 脚本。
- [x] 实现 `lib/env.ts` 环境变量校验。
- [x] 实现 `lib/prisma.ts` 数据库客户端单例。

### 1.2 认证

- [x] 编写管理员登录 API。
- [x] 编写管理员登出 API。
- [x] 编写后台鉴权工具和路由保护。
- [x] 编写登录页和登录表单。

### 1.3 基础 UI

- [x] 搭建全局 layout、字体、主题变量。
- [x] 编写 Button、Input、Textarea 基础样式。
- [x] 建立中英文文案文件和语言切换工具。

### 验收标准

- 初始管理员可登录后台。
- 未登录访问后台会跳转登录页。
- 环境变量缺失时有明确错误。

## Phase 2：核心业务功能

**目标**：实现网站记录的公开展示和后台维护。

### 2.1 公开首页

- [x] 首页查询并展示网站列表。
- [x] 网站链接可点击并新标签页跳转。
- [x] 空状态完整。
- [x] 支持按名称、URL、备注搜索。

### 2.2 管理后台

- [x] 后台网站列表表格。
- [x] 新增网站表单。
- [x] 编辑网站表单。
- [x] 删除网站确认弹窗。
- [x] 支持排序值维护。

### 2.3 API

- [x] `GET /api/websites` 公开读取。
- [x] `POST /api/websites` 创建。
- [x] `PUT /api/websites/:id` 更新。
- [x] `DELETE /api/websites/:id` 删除。
- [x] 前后端复用 Zod 校验规则。

### 验收标准

- 管理员可完成网站记录 CRUD。
- 首页能展示后台新增的数据。
- 非法 URL、空名称、超长备注都会被阻止。

## Phase 3：UI、双语与体验优化

**目标**：完成液态玻璃视觉、简体中文/英文双语言和流畅交互。

### 任务清单

- [x] 实现公开首页液态玻璃卡片、背景光斑和细腻 hover 动效。
- [x] 优化移动端布局。
- [x] 管理后台保持简约清晰，表单错误可读。
- [x] 完成 `zh-CN` 和 `en` 全量文案。
- [x] README 重写为本项目说明。
- [x] 增加 metadata 基础信息。

### 验收标准

- 公开首页在桌面和移动端都具备良好观感。
- 所有用户可见文案支持中英文切换。
- README 不再描述旧 CI 模板项目。

## Phase 4：测试与上线准备

**目标**：确保项目可部署、可维护、可回归。

### 任务清单

- [x] 编写单元测试：URL 校验、环境变量校验、认证工具。
- [ ] 编写集成测试：登录、网站 CRUD API。
- [ ] 编写 E2E 测试：访客浏览、管理员登录和新增网站。
- [x] 配置 `vercel.json` 和 Vercel 构建脚本。
- [x] 编写 `scripts/deploy-vercel.sh` 和 `scripts/deploy-vercel.ps1`。
- [x] 更新 GitHub Actions，执行 lint、test、build。
- [x] 编写部署指南和手动测试清单。

### 验收标准

- `npm run lint`、`npm run test`、`npm run build` 通过。
- Vercel 部署命令和环境变量说明完整。
- Neon 数据库迁移流程可重复执行。

## 开发规范

### 分支策略

```text
main
  └── feature/website-directory
```

### Commit 规范

```text
feat: add website directory app
fix: validate website url protocol
docs: rewrite readme for website directory
test: add website api tests
chore: configure vercel deployment
```

## 变更记录

| 版本 | 日期 | 变更内容 |
|------|------|---------|
| v1.0 | 2026-05-12 | 初始开发阶段拆解 |
