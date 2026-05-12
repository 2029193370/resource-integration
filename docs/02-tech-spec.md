# 技术规格书

> 版本：v1.0 | 创建日期：2026-05-12 | 项目：网址收藏导航

## 1. 技术栈

| 层级 | 技术选型 | 版本 | 选型理由 |
|------|---------|------|---------|
| 项目类型 | Web 全栈 | - | 公开首页 + 管理后台 + 数据持久化 |
| 前端框架 | Next.js App Router + React + TypeScript | Next.js 15 / React 19 | Vercel 原生支持，适合前后端一体部署 |
| 样式 | Tailwind CSS + CSS Modules | 最新稳定版 | 快速实现液态玻璃和响应式界面 |
| 后端 | Next.js Route Handlers / Server Actions | Next.js 15 | 减少独立服务部署成本 |
| 数据库 | Neon PostgreSQL | PostgreSQL 16+ | Serverless PostgreSQL，适配 Vercel |
| ORM | Prisma | 最新稳定版 | 类型安全、迁移清晰、适合 PostgreSQL |
| 认证 | Cookie Session + bcrypt | - | 单管理员后台，简单可靠 |
| 测试 | Vitest + Playwright | 最新稳定版 | 单元、集成和 E2E 覆盖 |
| 部署平台 | Vercel | - | 一键部署、环境变量管理、预览环境 |
| CI/CD | GitHub Actions | - | 基于现有 CI 模板调整为 Node.js 项目检查 |

## 2. 系统架构

```text
Browser
  |
  | HTTPS
  v
Vercel CDN / Next.js App
  |-- Public Home: liquid-glass website directory
  |-- Admin UI: login-protected management console
  |-- API Routes: auth, website CRUD, health
  |
  | Prisma Client
  v
Neon PostgreSQL
```

## 3. 目录结构

```text
resource-integration/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx
│   │   └── admin/
│   │       ├── login/page.tsx
│   │       └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── websites/
│   │   └── health/route.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── public/
│   ├── admin/
│   └── ui/
├── lib/
│   ├── auth.ts
│   ├── env.ts
│   ├── i18n.ts
│   ├── prisma.ts
│   └── validators.ts
├── messages/
│   ├── zh-CN.json
│   └── en.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── scripts/
│   ├── deploy-vercel.ps1
│   ├── deploy-vercel.sh
│   └── postinstall.mjs
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
├── .env.example
├── next.config.ts
├── package.json
├── README.md
└── vercel.json
```

## 4. API 设计

### 4.1 接口规范

- **协议**：HTTPS
- **数据格式**：JSON
- **认证方式**：管理员后台使用 HttpOnly Cookie Session
- **响应格式**：成功返回 `{ "success": true, "data": ... }`，失败返回 `{ "success": false, "error": { "code": "...", "message": "..." } }`

### 4.2 接口清单

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| GET | `/api/health` | 健康检查 | 否 |
| POST | `/api/auth/login` | 管理员登录 | 否 |
| POST | `/api/auth/logout` | 管理员登出 | 是 |
| GET | `/api/auth/me` | 当前管理员信息 | 是 |
| GET | `/api/websites` | 获取网站列表 | 否 |
| POST | `/api/websites` | 创建网站 | 是 |
| PUT | `/api/websites/:id` | 更新网站 | 是 |
| DELETE | `/api/websites/:id` | 删除网站 | 是 |

## 5. 数据库设计

### 5.1 Prisma 模型

```prisma
model AdminUser {
  id           String   @id @default(cuid())
  username     String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Website {
  id        String   @id @default(cuid())
  name      String
  url       String
  note      String   @default("")
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([sortOrder, createdAt])
}
```

### 5.2 数据约束

- `Website.name`：1-80 字符。
- `Website.url`：合法 URL，协议仅允许 `http` 与 `https`。
- `Website.note`：0-500 字符。
- `Website.sortOrder`：整数，数值越小越靠前。

## 6. 认证与安全

- 管理员密码使用 bcrypt 哈希，禁止明文保存。
- Session Cookie 设置 `HttpOnly`、`Secure`、`SameSite=Lax`。
- 所有后台写接口在服务端校验登录态。
- 使用 Zod 对请求体做服务端校验，前端表单复用同一规则。
- Prisma 参数化查询避免 SQL 注入。
- 外链统一设置 `target="_blank"` 和 `rel="noopener noreferrer"`。
- 环境变量通过 `lib/env.ts` 统一读取和校验，缺失必填项时启动失败。

## 7. 环境变量

```env
# 应用
NEXT_PUBLIC_APP_NAME="网址收藏导航"
NEXT_PUBLIC_DEFAULT_LOCALE=zh-CN
SESSION_SECRET=

# 数据库
DATABASE_URL=
DIRECT_URL=

# 初始管理员
ADMIN_USERNAME=admin
ADMIN_PASSWORD=

# Vercel
VERCEL_ORG_ID=
VERCEL_PROJECT_ID=
```

## 8. UI 设计方向

公开首页采用简约浅色液态玻璃风格：

- 背景使用浅米白到冷白的柔和渐变，叠加低透明度光斑。
- 网站卡片使用半透明玻璃、细边框、柔和阴影和轻微浮动动画。
- 字体以简体中文和英文可读性为主，使用本地或 Google Font 回退策略。
- 首页重点是“轻、清晰、可快速查找”，避免复杂视觉干扰。

管理后台采用简约实用风格：

- 左侧或顶部轻量导航，主区域为表格和表单。
- 强调可维护性，保留清晰的错误提示、加载状态和删除确认。

## 9. 性能考量

| 场景 | 优化策略 |
|------|---------|
| 首页加载 | Server Component 获取初始数据，搜索在客户端过滤 |
| 数据库连接 | Prisma Accelerate 或 Neon serverless 连接方式按部署测试选择 |
| 列表增长 | API 支持分页和关键词查询 |
| 静态资源 | Next.js 图片和字体优化，CSS 动画优先 |

## 10. 变更记录

| 版本 | 日期 | 变更内容 |
|------|------|---------|
| v1.0 | 2026-05-12 | 初始技术规格 |
