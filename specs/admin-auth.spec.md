## 管理员登录

**用户价值**：作为管理员，我希望通过账号密码登录后台，以便安全维护网站记录。

**验收标准**：

- Given 管理员输入正确用户名和密码，When 提交登录表单，Then 系统写入 HttpOnly 会话 Cookie 并跳转后台。
- Given 管理员输入错误密码，When 提交登录表单，Then 系统返回统一错误提示且不暴露账号是否存在。
- Given 访客未登录，When 访问后台页面或调用后台写接口，Then 系统返回登录页或 401。

**安全关卡**：

- 需要认证：后台页面和写接口需要登录。
- 输入校验：登录请求使用 Zod 校验。
- 数据库操作：使用 Prisma，不拼接 SQL。
- 敏感数据：响应不返回 `passwordHash`，密码使用 bcrypt 哈希。
- Cookie：使用 HttpOnly、Secure、SameSite=Lax。

**不在范围内**：多管理员注册、找回密码、第三方 OAuth。
