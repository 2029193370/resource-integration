# 网址收藏导航

一个部署在 Vercel 上的双语言网址收藏网站。公开页面用于展示网站名称、网址和备注，后台用于管理员维护数据。数据库使用 Neon PostgreSQL，配置通过 `.env` 抽离。

## 功能

- 公开首页：浅色液态玻璃风格，支持搜索、空状态和外链新标签页跳转。
- 管理后台：管理员登录后可新增、编辑、删除网站记录。
- 双语言：简体中文和 English。
- 数据库：Prisma + Neon PostgreSQL。
- 部署：Vercel 配置和一键部署脚本。

## 技术栈

- Next.js App Router
- React + TypeScript
- Prisma ORM
- Neon PostgreSQL
- Vitest + Playwright
- Vercel

## 本地开发

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

访问 `http://localhost:3000`。

## 环境变量

```env
NEXT_PUBLIC_APP_NAME="网址收藏导航"
NEXT_PUBLIC_DEFAULT_LOCALE=zh-CN
SESSION_SECRET="至少 32 位随机字符串"
DATABASE_URL="Neon PostgreSQL pooled connection string"
DIRECT_URL="Neon PostgreSQL direct connection string"
ADMIN_USERNAME=admin
ADMIN_PASSWORD="初始管理员密码"
```

真实密钥只写入 `.env` 或 Vercel Environment Variables，不提交到 Git。

## 数据库

```bash
npm run db:dev      # 本地开发生成迁移
npm run db:migrate  # 部署环境执行迁移
npm run db:seed     # 创建初始管理员和示例网站
```

## 部署到 Vercel

首次部署前安装并登录 Vercel CLI：

```bash
npm install -g vercel
vercel login
vercel link
```

配置 Vercel 环境变量后执行：

```bash
./scripts/deploy-vercel.sh
```

Windows PowerShell：

```powershell
.\scripts\deploy-vercel.ps1
```

## 验证

```bash
npm run lint
npm run test
npm run build
```

更多设计、开发和部署细节见 `docs/`。
