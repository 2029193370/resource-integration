# 自动化测试规格

> 版本：v1.0 | 创建日期：2026-05-12 | 项目：网址收藏导航

## 1. 单元测试

### URL 校验

- 接受 `https://example.com`。
- 接受 `http://localhost:3000`。
- 拒绝空字符串。
- 拒绝 `javascript:alert(1)`。
- 拒绝 `ftp://example.com`。

### 环境变量校验

- 缺少 `DATABASE_URL` 时启动校验失败。
- `SESSION_SECRET` 少于 32 位时失败。
- `NEXT_PUBLIC_DEFAULT_LOCALE` 非 `zh-CN` 或 `en` 时失败。

### 认证工具

- 正确密码通过 bcrypt 校验。
- 错误密码失败。
- Session Cookie 参数包含 `HttpOnly`、`Secure`、`SameSite=Lax`。

## 2. 集成测试

### 认证 API

- `POST /api/auth/login` 使用正确账号密码返回成功。
- `POST /api/auth/login` 使用错误密码返回 401。
- `POST /api/auth/logout` 清理登录态。
- `GET /api/auth/me` 未登录返回 401，已登录返回管理员信息且不包含密码哈希。

### 网站 API

- `GET /api/websites` 未登录可读取。
- `POST /api/websites` 未登录返回 401。
- `POST /api/websites` 登录后可创建合法记录。
- `PUT /api/websites/:id` 登录后可更新记录。
- `DELETE /api/websites/:id` 登录后可删除记录。
- 非法 URL、空名称、超长备注返回 400。

## 3. E2E 测试

### 访客流程

1. 打开首页。
2. 看到至少一条网站记录。
3. 搜索关键词后列表过滤。
4. 点击外链，验证新页面打开。

### 管理员流程

1. 访问 `/admin/login`。
2. 输入管理员账号密码。
3. 创建一条网站记录。
4. 回到首页确认记录出现。
5. 编辑记录备注。
6. 删除记录并确认首页消失。

## 4. 覆盖率目标

| 类型 | 目标 |
|------|------|
| 单元测试 | 核心工具函数 90%+ |
| 集成测试 | API 路径 80%+ |
| E2E 测试 | P0 用户流程全覆盖 |

## 5. 命令

```bash
npm run test
npm run test:e2e
npm run build
```
