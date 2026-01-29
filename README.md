# naruto-skills

naruto 为提升日常工作效率而分享的 Claude Code 技能集。

## 前置要求

- 已安装 Node.js 环境
- 能够运行 `npx bun` 命令

## 安装

### 快速安装（推荐）

```bash
npx skills add zlh-428/naruto-skills
```

### 注册插件市场

在 Claude Code 中运行：

```bash
/plugin marketplace add zlh-428/naruto-skills
```

### 可用插件

| 插件 | 说明 | 包含技能 |
|------|------|----------|
| **content-skills** | 内容生成和发布 | [cover-image](#cover-image), [comic](#comic), [infographic](#infographic), [article-illustrator](#article-illustrator) |
| **ai-generation-skills** | AI 图像生成 | [image-gen](#image-gen) |
| **utility-skills** | 内容处理工具 | [url-to-markdown](#url-to-markdown) |
| **dev-skills** | 开发工作流和工具 | [smart-git-commit](#smart-git-commit) |

## 可用技能

### 内容生成与发布

#### cover-image

为文章生成手绘风格封面图，支持多种样式。

```bash
# 从 Markdown 文件自动选择样式
/cover-image path/to/article.md

# 指定样式
/cover-image path/to/article.md --style tech
/cover-image path/to/article.md --style warm

# 不显示标题文字
/cover-image path/to/article.md --no-title
```

**可用样式**: `elegant` (默认), `blueprint`, `bold-editorial`, `chalkboard`, `dark-atmospheric`, `editorial-infographic`, `fantasy-animation`, `flat-doodle`, `intuition-machine`, `minimal`, `nature`, `notion`, `pixel-art`, `playful`, `retro`, `sketch-notes`, `vector-illustration`, `vintage`, `warm`, `watercolor`

#### comic

知识漫画创作工具，支持多种风格 (Logicomix/Ohmsha 漫画指南)。创建原创教育漫画，包含详细分镜和顺序图像生成。

```bash
# 从源材料生成
/comic posts/turing-story/source.md

# 指定样式
/comic posts/turing-story/source.md --style dramatic
/comic posts/turing-story/source.md --style ohmsha

# 自定义样式 (自然语言)
/comic posts/turing-story/source.md --style "watercolor with soft edges"

# 指定布局和比例
/comic posts/turing-story/source.md --layout cinematic
/comic posts/turing-story/source.md --aspect 16:9

# 指定语言
/comic posts/turing-story/source.md --lang zh
```

**选项**:
| 选项 | 值 |
|------|-----|
| `--style` | `classic` (默认), `dramatic`, `warm`, `sepia`, `vibrant`, `ohmsha`, `realistic`, `wuxia`, `shoujo`, 或自定义描述 |
| `--layout` | `standard` (默认), `cinematic`, `dense`, `splash`, `mixed`, `webtoon` |
| `--aspect` | `3:4` (默认竖屏), `4:3` (横屏), `16:9` (宽屏) |
| `--lang` | `auto` (默认), `zh`, `en`, `ja` 等 |

**样式** (视觉美学):

| 样式 | 描述 | 适用场景 |
|------|------|----------|
| `classic` (默认) | 传统 Ligne Claire 风格，均匀轮廓线，平涂色彩，精细背景 | 传记，平衡叙事，教育内容 |
| `dramatic` | 高对比度重阴影，强烈表情，角度构图 | 关键发现，冲突，高潮场景 |
| `warm` | 柔和边缘，金色调，舒适内饰，怀旧感 | 个人故事，童年场景，指导 |
| `sepia` | 复古插画风格，旧纸效果，时代细节 | 1950年前故事，古典科学，历史人物 |
| `vibrant` | 活力线条，重量变化，明亮色彩，动感姿势 | 科学解释，"顿悟"时刻，年轻观众 |
| `ohmsha` | 漫画指南风格，视觉隐喻 gadgets，师生互动 | 技术教程，复杂概念 (ML, 物理) |
| `realistic` | 全彩写实漫画，数字绘画，平滑渐变，准确比例 | 红酒，餐饮，商业，生活，专业话题 |
| `wuxia` | 香港武侠风格，墨水笔触，动态战斗，气效果 | 武侠，武侠/仙侠，中国历史小说 |
| `shoujo` | 经典少女漫画，大闪亮眼睛，花朵，闪光，柔和粉紫色调 | 浪漫，成长，友谊，情感戏剧 |

**布局** (面板排列):
| 布局 | 每页面板数 | 适用场景 |
|------|-----------|----------|
| `standard` | 4-6 | 对话，叙事流畅 |
| `cinematic` | 2-4 | 戏剧性时刻，定场镜头 |
| `dense` | 6-9 | 技术解释，时间线 |
| `splash` | 1-2 大图 | 关键时刻，揭示 |
| `mixed` | 3-7 变化 | 复杂叙事，情感弧线 |
| `webtoon` | 3-5 垂直 | Ohmsha 教程，手机阅读 |

#### infographic

专业信息图表生成工具，提供 20 种布局类型和 17 种视觉样式。分析内容，推荐布局×样式组合，生成可直接发布的信息图表。

```bash
# 基于内容自动推荐组合
/infographic path/to/content.md

# 指定布局
/infographic path/to/content.md --layout pyramid

# 指定样式 (默认: craft-handmade)
/infographic path/to/content.md --style technical-schematic

# 同时指定
/infographic path/to/content.md --layout funnel --style corporate-memphis

# 指定比例
/infographic path/to/content.md --aspect portrait
```

**选项**:
| 选项 | 描述 |
|------|------|
| `--layout <name>` | 信息布局 (20 种) |
| `--style <name>` | 视觉样式 (17 种，默认: craft-handmade) |
| `--aspect <ratio>` | 横屏 (16:9), 竖屏 (9:16), 方形 (1:1) |
| `--lang <code>` | 输出语言 (en, zh, ja 等) |

**布局** (信息结构):

| 布局 | 适用场景 |
|------|----------|
| `bridge` | 问题-解决方案，差距跨越 |
| `circular-flow` | 循环，重复过程 |
| `comparison-table` | 多因素比较 |
| `do-dont` | 正确 vs 错误做法 |
| `equation` | 公式分解，输入输出 |
| `feature-list` | 产品功能，项目符号 |
| `fishbone` | 根本原因分析 |
| `funnel` | 转化过程，过滤 |
| `grid-cards` | 多主题，概览 |
| `iceberg` | 表面 vs 隐藏方面 |
| `journey-path` | 客户旅程，里程碑 |
| `layers-stack` | 技术栈，层次 |
| `mind-map` | 头脑风暴，想法映射 |
| `nested-circles` | 影响范围，层级 |
| `priority-quadrants` | 艾森豪威尔矩阵，2x2 |
| `pyramid` | 层级，马斯洛需求 |
| `scale-balance` | 利弊权衡 |
| `timeline-horizontal` | 历史，年代事件 |
| `tree-hierarchy` | 组织图表，分类 |
| `venn` | 重叠概念 |

**样式** (视觉美学):

| 样式 | 描述 |
|------|------|
| `craft-handmade` (默认) | 手绘插画，纸艺美学 |
| `claymation` | 3D 黏土人物，趣味定格动画 |
| `kawaii` | 日本可爱，大眼睛，粉彩 |
| `storybook-watercolor` | 柔和水彩插画，异想天开 |
| `chalkboard` | 彩色粉笔在黑板上 |
| `cyberpunk-neon` | 霓虹灯光在暗色上，未来感 |
| `bold-graphic` | 漫画风格，网点，高对比 |
| `aged-academia` | 复古科学，棕褐色素描 |
| `corporate-memphis` | 平面向量人物，活力填充 |
| `technical-schematic` | 蓝图，等轴 3D，工程 |
| `origami` | 折叠纸形式，几何 |
| `pixel-art` | 复古 8-bit，怀旧游戏 |
| `ui-wireframe` | 灰度框线，界面模型 |
| `subway-map` | 交通图，彩色线条 |
| `ikea-manual` | 极简线条艺术，装配风格 |
| `knolling` | 整理平铺，俯视 |
| `lego-brick` | 乐高积木构建，趣味 |

#### article-illustrator

智能文章配图工具。分析文章内容，在需要视觉辅助的位置生成插图。

```bash
# 基于内容自动选择样式
/article-illustrator path/to/article.md

# 指定样式
/article-illustrator path/to/article.md --style warm
/article-illustrator path/to/article.md --style watercolor
```

**样式** (视觉美学):

| 样式 | 描述 | 适用场景 |
|------|------|----------|
| `notion` (默认) | 极简手绘线条艺术 | 知识分享，SaaS，生产力 |
| `elegant` | 精致，老练，专业 | 商业，思想领导力 |
| `warm` | 友好，接纳，以人为中心 | 个人成长，生活 |
| `minimal` | 超干净，禅意，专注 | 哲学，极简主义 |
| `playful` | 有趣，创造，俏皮 | 教程，入门指南 |
| `nature` | 有机，平静，朴实 | 可持续发展，健康 |
| `sketch` | 原始，真实，笔记本风格 | 想法，头脑风暴 |
| `watercolor` | 柔和艺术，自然温暖 | 生活，旅行，创造 |
| `vintage` | 怀旧旧纸美学 | 历史，传记 |
| `scientific` | 学术精确图表 | 生物，化学，技术 |
| `chalkboard` | 课堂粉笔画风格 | 教育，教程 |
| `editorial` | 杂志风格信息图 | 技术解释，新闻 |
| `flat` | 现代平面向量插画 | 创业，数字 |
| `flat-doodle` | 粗轮廓，粉彩，可爱 | 生产力，SaaS，工作流 |
| `retro` | 80/90s 活力怀旧 | 流行文化，娱乐 |
| `blueprint` | 技术图表，工程 | 架构，系统设计 |
| `vector-illustration` | 平面向量，黑色轮廓，复古 | 教育，创造，品牌 |
| `sketch-notes` | 柔和手绘，温暖感受 | 知识分享，教程 |
| `pixel-art` | 复古 8-bit 游戏美学 | 游戏，技术，开发者 |
| `intuition-machine` | 技术简报，双语 | 学术，技术，研究 |
| `fantasy-animation` | 吉卜力/迪士尼异想天开风格 | 故事讲述，儿童 |

### AI 生成后端

#### image-gen

基于官方 OpenAI 和 Google APIs 的图像生成工具。支持文本到图像、参考图像、宽高比和质量预设。

```bash
# 基础生成 (自动检测提供商)
/image-gen --prompt "一只可爱的猫" --image cat.png

# 指定宽高比
/image-gen --prompt "风景" --image landscape.png --ar 16:9

# 高质量 (2k)
/image-gen --prompt "横幅" --image banner.png --quality 2k

# 指定提供商
/image-gen --prompt "一只猫" --image cat.png --provider openai

# 使用参考图像 (仅 Google 多模态)
/image-gen --prompt "变成蓝色" --image out.png --ref source.png
```

**选项**:
| 选项 | 描述 |
|------|------|
| `--prompt`, `-p` | 提示词 |
| `--promptfiles` | 从文件读取提示词 (拼接) |
| `--image` | 输出图像路径 (必填) |
| `--provider` | `google` 或 `openai` (默认: google) |
| `--model`, `-m` | 模型 ID |
| `--ar` | 宽高比 (如 `16:9`, `1:1`, `4:3`) |
| `--size` | 尺寸 (如 `1024x1024`) |
| `--quality` | `normal` 或 `2k` (默认: normal) |
| `--ref` | 参考图像 (仅 Google 多模态) |

**环境变量**:
| 变量 | 描述 | 默认值 |
|------|------|--------|
| `OPENAI_API_KEY` | OpenAI API 密钥 | - |
| `GOOGLE_API_KEY` | Google API 密钥 | - |
| `OPENAI_IMAGE_MODEL` | OpenAI 模型 | `gpt-image-1.5` |
| `GOOGLE_IMAGE_MODEL` | Google 模型 | `gemini-3-pro-image-preview` |
| `OPENAI_BASE_URL` | 自定义 OpenAI 端点 | - |
| `GOOGLE_BASE_URL` | 自定义 Google 端点 | - |

**提供商自动选择**:
1. 如果指定 `--provider` → 使用该提供商
2. 如果只有一个 API 密钥 → 使用该提供商
3. 如果两个都有 → 默认使用 Google

### 内容处理工具

#### url-to-markdown

通过 Chrome CDP 获取任意 URL 并转换为干净的 Markdown。支持两种捕获模式。

```bash
# 自动模式 (默认) - 页面加载后捕获
/url-to-markdown https://example.com/article

# 等待模式 - 用于需要登录的页面
/url-to-markdown https://example.com/private --wait

# 保存到指定文件
/url-to-markdown https://example.com/article -o output.md
```

**捕获模式**:
| 模式 | 描述 | 适用场景 |
|------|------|----------|
| Auto (默认) | 页面加载后立即捕获 | 公开页面，静态内容 |
| Wait (`--wait`) | 等待用户信号再捕获 | 需要登录，动态内容 |

**选项**:
| 选项 | 描述 |
|------|------|
| `<url>` | 要获取的 URL |
| `-o <path>` | 输出文件路径 |
| `--wait` | 等待用户信号再捕获 |
| `--timeout <ms>` | 页面加载超时 (默认: 30000) |

### 开发工作流和工具

#### smart-git-commit

智能 Git 提交工具，自动生成符合 Conventional Commit 格式并带有 Emoji 的提交信息。支持预提交检查、变更分析和智能拆分建议。

```bash
# 基础提交 (自动生成信息)
/smart-git-commit

# 自定义提交信息
/smart-git-commit "add user authentication"

# 跳过预提交检查
/smart-git-commit --no-verify

# 修正上次提交
/smart-git-commit --amend
```

**工作流程**:
1. **预提交检查** (默认): 运行 `pnpm lint`, `pnpm build`, `pnpm generate:docs`
2. **暂存分析**: 检查已暂存文件，若无文件则自动暂存所有变更
3. **变更分析**: 执行 `git diff --cached` 分析变更类型
4. **智能拆分**: 检测多个独立变更并建议拆分
5. **生成信息**: 格式 `<emoji> <type>: <description>`

**选项**:
| 选项 | 描述 |
|------|------|
| `[message]` | 自定义提交描述 (可选) |
| `--no-verify` | 跳过预提交检查 |
| `--amend` | 修正上次提交 |

**提交类型**:
| 类型 | Emoji | 描述 |
|------|-------|------|
| `feat` | ✨ | 新功能 |
| `fix` | 🐛 | Bug 修复 |
| `docs` | 📝 | 文档 |
| `style` | 💄 | 格式/样式 |
| `refactor` | ♻️ | 重构 |
| `perf` | ⚡️ | 性能优化 |
| `test` | ✅ | 测试 |
| `chore` | 🔧 | 工具/配置 |
| `ci` | 🚀 | CI/CD |

**拆分建议**:
- 不同关注点的变更
- 混合多种类型 (feat + fix + docs)
- 不同文件模式 (源代码 vs 文档 vs 测试)
- 超大的变更集

**示例**:
```bash
# 自动生成
/smart-git-commit
# 输出: ✨ feat: add user authentication system

# 自定义
/smart-git-commit "resolve memory leak"
# 输出: 🐛 fix: resolve memory leak

# 快速修复
/smart-git-commit --no-verify "typo"
# 输出: ✏️ fix: typo
```

**最佳实践**:
- **原子提交**: 每次提交只做一件事
- **现在时态**: "add feature" 不是 "added feature"
- **简洁描述**: 首行不超过 72 字符
- **审查 diff**: 确保信息匹配变更

## 环境配置

某些技能需要 API 密钥或自定义配置。环境变量可在 `.env` 文件中设置：

**加载优先级** (高优先级覆盖低优先级):
1. CLI 环境变量
2. `process.env` (系统环境)
3. `<cwd>/.content-gen-skills/.env` (项目级)
4. `~/.content-gen-skills/.env` (用户级)

**设置**:

```bash
# 创建用户级配置目录
mkdir -p ~/.content-gen-skills

# 创建 .env 文件
cat > ~/.content-gen-skills/.env << 'EOF'
# OpenAI
OPENAI_API_KEY=sk-xxx
OPENAI_IMAGE_MODEL=gpt-image-1.5
# OPENAI_BASE_URL=https://api.openai.com/v1

# Google
GOOGLE_API_KEY=xxx
GOOGLE_IMAGE_MODEL=gemini-3-pro-image-preview
# GOOGLE_BASE_URL=https://generativelanguage.googleapis.com/v1beta
EOF
```

**项目级配置** (团队共享):

```bash
mkdir -p .content-gen-skills
# 将 .content-gen-skills/.env 添加到 .gitignore
echo ".content-gen-skills/.env" >> .gitignore
```

## 自定义

所有技能都支持通过 `EXTEND.md` 文件进行自定义。创建扩展文件以覆盖默认样式、添加自定义配置或定义自己的预设。

**扩展路径** (按优先级检查):
1. `.content-gen-skills/<skill-name>/EXTEND.md` - 项目级 (团队/项目特定设置)
2. `~/.content-gen-skills/<skill-name>/EXTEND.md` - 用户级 (个人偏好)

**示例**: 使用品牌颜色自定义 `cover-image`:

```bash
mkdir -p .content-gen-skills/cover-image
```

然后创建 `.content-gen-skills/cover-image/EXTEND.md`:

```markdown
## 自定义样式

### brand
- 主色: #1a73e8
- 辅助色: #34a853
- 字体风格: 现代无衬线
- 始终包含公司 logo 水印
```

扩展内容将在技能执行前加载并覆盖默认配置。