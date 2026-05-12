# 部署指南

> 版本：v1.0 | 创建日期：2026-05-12 | 项目：网址收藏导航

## 1. 环境概览

| 环境 | 用途 | 域名 | 分支 |
|------|------|------|------|
| 本地开发 | 开发调试 | `http://localhost:3000` | feature/* |
| Preview | PR / 分支预览 | Vercel Preview URL | 任意分支 |
| Production | 线上生产 | 自定义域名或 Vercel 域名 | main |

## 2. 本地开发

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

访问 `http://localhost:3000`。

本地推荐使用 Neon 的开发数据库分支，也可以使用本地 PostgreSQL。真实连接串只写入 `.env`，不得提交到 Git。

## 3. Neon PostgreSQL 配置

1. 在 Neon 创建项目。
2. 创建 `main` 生产分支和可选 `dev` 开发分支。
3. 复制连接串到环境变量：

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

4. 首次部署前执行 Prisma 迁移：

```bash
npm run db:migrate
npm run db:seed
```

生产环境推荐通过 Vercel 构建流程或部署脚本执行迁移，避免手动遗漏。

## 4. Vercel 一键部署

### 4.1 首次准备

```bash
npm install -g vercel
vercel login
vercel link
```

在 Vercel 项目中配置环境变量：

```env
NEXT_PUBLIC_APP_NAME="网址收藏导航"
NEXT_PUBLIC_DEFAULT_LOCALE=zh-CN
SESSION_SECRET="至少 32 位随机字符串"
DATABASE_URL="Neon pooled connection string"
DIRECT_URL="Neon direct connection string"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="强密码，仅首次 seed 使用"
```

### 4.2 部署脚本

项目将提供两个脚本：

```bash
./scripts/deploy-vercel.sh
```

```powershell
.\scripts\deploy-vercel.ps1
```

脚本职责：

- 检查必需环境变量。
- 执行 `npm ci`。
- 执行 `npm run lint`、`npm run test`、`npm run build`。
- 执行 `npx prisma migrate deploy`。
- 调用 `vercel deploy --prod`。

## 5. Vercel 构建配置

`package.json` 计划提供脚本：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "db:migrate": "prisma migrate deploy",
    "db:dev": "prisma migrate dev",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

`vercel.json` 计划配置：

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm ci",
  "framework": "nextjs"
}
```

## 6. 环境变量说明

| 变量 | 必填 | 说明 |
|------|------|------|
| `NEXT_PUBLIC_APP_NAME` | 是 | 浏览器可见应用名称 |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | 是 | 默认语言，`zh-CN` 或 `en` |
| `SESSION_SECRET` | 是 | Session 签名密钥，至少 32 位 |
| `DATABASE_URL` | 是 | Neon pooled 连接串，应用运行使用 |
| `DIRECT_URL` | 是 | Neon direct 连接串，Prisma migration 使用 |
| `ADMIN_USERNAME` | 是 | 初始管理员用户名 |
| `ADMIN_PASSWORD` | 是 | 初始管理员密码，仅 seed 使用 |
| `VERCEL_ORG_ID` | 否 | CI 自动部署时使用 |
| `VERCEL_PROJECT_ID` | 否 | CI 自动部署时使用 |

## 7. CI/CD

现有 CI 模板将调整为 Node.js 项目流水线：

- 安装依赖。
- 运行 lint。
- 运行单元和集成测试。
- 执行 Next.js build。
- 执行安全扫描和密钥扫描。

自动部署可在后续接入 Vercel Token：

```env
VERCEL_TOKEN=
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
```

## 8. 上线前 Checklist

### 安全

- [ ] `.env` 和 `.env.production` 未提交到 Git。
- [ ] `SESSION_SECRET` 使用强随机值。
- [ ] `ADMIN_PASSWORD` 使用强密码，首次登录后可按需要更新。
- [ ] Neon 数据库连接串配置在 Vercel 环境变量中。
- [ ] 后台写接口已验证未登录返回 401。

### 功能

- [ ] 首页可展示网站列表。
- [ ] 网站链接可新标签页跳转。
- [ ] 管理员可登录、创建、编辑、删除网站。
- [ ] 中英文切换正常。

### 验证

- [ ] `npm run lint` 通过。
- [ ] `npm run test` 通过。
- [ ] `npm run build` 通过。
- [ ] Vercel Production 部署健康检查通过。

## 9. 回滚

Vercel 支持在 Dashboard 中将生产环境回滚到上一成功部署。数据库迁移需要保持向后兼容；破坏性 schema 变更必须先备份 Neon 分支。

## 10. 变更记录

| 版本 | 日期 | 变更内容 |
|------|------|---------|
| v1.0 | 2026-05-12 | 初始部署指南 |
