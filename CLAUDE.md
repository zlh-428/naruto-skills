# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 提供在此仓库中工作的指导。

## 项目概述

naruto-skills v1.0.0 - Claude Code 市场插件，提供 AI 驱动的内容生成工具集。

**核心技术栈**：
- **运行时**: Bun (`npx -y bun` 执行 TypeScript，无需构建)
- **依赖**: 无外部 npm 包，纯自包含 TypeScript
- **浏览器**: Chrome CDP 用于网页抓取和自动化
- **AI API**: OpenAI (DALL-E/GPT Image) + Google (Imagen/Gemini)

## 技能架构

### 模块结构

每个技能是自包含模块，结构如下：

```
skills/<skill-name>/
├── SKILL.md           # YAML front matter + 文档
├── scripts/           # TypeScript 实现
│   └── main.ts        # 入口点
└── prompts/           # AI 提示模板 (可选)
    └── system.md
```

### 分类结构

```
skills/
├── [content-skills]           # 内容生成与发布
│   ├── cover-image/           # 文章封面生成
│   ├── comic/                 # 知识漫画创作
│   ├── infographic/           # 信息图表系列
│   └── article-illustrator/   # 智能配图
│
├── [ai-generation-skills]     # AI 生成后端
│   └── image-gen/             # 官方 API 图像生成
│
└── [utility-skills]           # 内容处理工具
    └── url-to-markdown/       # 网页转 Markdown
```

### 插件分类 (`marketplace.json`)

| 分类 | 说明 | 包含技能 |
|------|------|----------|
| `content-skills` | 内容生成与发布 | cover-image, comic, infographic, article-illustrator |
| `ai-generation-skills` | AI 生成后端 | image-gen |
| `utility-skills` | 内容处理工具 | url-to-markdown |

### 技能列表

| 技能 | 用途 |
|------|------|
| `cover-image` | 文章封面生成 (2.35:1 宽屏) |
| `comic` | 知识漫画创作 (Logicomix/Ohmsha 风格) |
| `infographic` | 信息图表系列 (20+ 布局) |
| `article-illustrator` | 智能配图 (16+ 风格) |
| `image-gen` | 官方 API 图像生成 (OpenAI/Google) |
| `url-to-markdown` | Chrome CDP 网页转 Markdown |

## 运行技能

```bash
# 基础命令
npx -y bun skills/<skill>/scripts/main.ts [选项]

# 图像生成
npx -y bun skills/image-gen/scripts/main.ts --prompt "一只猫" --image cat.png
npx -y bun skills/image-gen/scripts/main.ts --prompt "风景" --image img.png --ar 16:9 --quality 2k

# URL 转 Markdown
npx -y bun skills/url-to-markdown/scripts/main.ts <url>

# 等待模式 (需登录的页面)
npx -y bun skills/url-to-markdown/scripts/main.ts <url> --wait
```

## 脚本路径解析

**Agent 执行规则**:
1. 确定 SKILL.md 所在目录作为 `SKILL_DIR`
2. 脚本路径 = `${SKILL_DIR}/scripts/<script-name>.ts`
3. 替换文档中所有 `${SKILL_DIR}` 为实际路径

**常用脚本**:
| 技能 | 脚本 | 用途 |
|------|------|------|
| comic | `${SKILL_DIR}/scripts/merge-to-pdf.ts` | 合并漫画为 PDF |

## 图像生成规范

### 图像生成技能选择

需要生成图像的技能必须委托给 `image-gen` 技能。

**选择流程**:
1. 检查可用的图像生成技能 (`skills/image-gen/`)
2. 阅读其 SKILL.md 了解参数和特性
3. 多个技能可用时，让用户选择

### 输出路径约定

每次会话创建独立目录，相同源文件也生成新目录。

**输出目录**:
```
<skill-suffix>/<topic-slug>/
```
- `<skill-suffix>`: 技能目录名 (如 `cover-image`, `comic`, `infographic`)
- `<topic-slug>`: 从内容主题生成 (2-4 词，kebab-case)
- 示例: `comic/alan-turing-bio/`

**冲突解决**: 追加时间戳 `<topic-slug>-YYYYMMDD-HHMMSS`

**源文件命名**: `source-{slug}.{ext}` 复制到输出目录

### 图像文件命名

**格式**: `NN-{type}-[slug].png`
- `NN`: 两位序号 (01, 02, ...)
- `{type}`: 图像类型 (cover, content, page, slide, illustration)
- `[slug]`: 描述性 kebab-case

**示例**:
```
01-cover-ai-future.png
02-content-key-benefits.png
03-page-enigma-machine.png
```

## 环境变量

| 变量 | 用途 |
|------|------|
| `OPENAI_API_KEY` | OpenAI API 密钥 |
| `GOOGLE_API_KEY` | Google API 密钥 |
| `URL_CHROME_PATH` | 自定义 Chrome 路径 |
| `URL_DATA_DIR` | url-to-markdown 数据目录 |

**优先级**: CLI 参数 > `process.env` > 项目 .env > 用户 .env

## 发布流程

**重要**: 用户请求发布时，务必使用 `/release-skills` 工作流。

**必要步骤**:
1. 更新 `CHANGELOG.md` + `CHANGELOG.zh.md`
2. 升级 `marketplace.json` 版本号
3. 更新 `README.md` + `README.zh.md` (如有)
4. 所有文件一起提交再打 tag

## 新增技能指南

1. 创建 `skills/<name>/SKILL.md`
   - 包含 YAML front matter (name, description)
   - 包含 Script Directory 部分

2. 添加 TypeScript 脚本到 `skills/<name>/scripts/`

3. 注册到 `marketplace.json`:
   - `content-skills`: 生成/发布内容 (图像、幻灯片、帖子)
   - `ai-generation-skills`: AI 生成后端
   - `utility-skills`: 转换/处理工具
   - 不匹配则创建新分类

**分类选择表**:
| 如果技能... | 使用分类 |
|-------------|----------|
| 生成视觉内容 | `content-skills` |
| 发布到平台 | `content-skills` |
| 提供 AI 生成能力 | `ai-generation-skills` |
| 转换或处理内容 | `utility-skills` |
| 压缩或优化文件 | `utility-skills` |

## 代码风格

- 全程 TypeScript
- 无注释 (代码自解释)
- Async/await 模式
- 短变量名
- 类型安全接口

## 扩展支持

每个 SKILL.md 必须包含扩展支持部分:

```markdown
## 扩展支持

通过 EXTEND.md 自定义样式和配置。

**检查路径** (优先级顺序):
1. `.content-gen-skills/<skill-name>/EXTEND.md` (项目级)
2. `~/.content-gen-skills/<skill-name>/EXTEND.md` (用户级)

找到则在 Step 1 前加载，扩展内容覆盖默认配置。
```

## marketplace.json 配置

```json
{
  "name": "naruto-skills",
  "owner": { "name": "naruto", "email": "narutoku0428@gmail.com" },
  "metadata": { "version": "1.0.0" },
  "plugins": [
    { "name": "content-skills", "skills": ["./skills/cover-image", "./skills/comic", "./skills/infographic", "./skills/article-illustrator"] },
    { "name": "ai-generation-skills", "skills": ["./skills/image-gen"] },
    { "name": "utility-skills", "skills": ["./skills/url-to-markdown"] }
  ]
}
```
