# MaxMate.ai - Requirements Document

## 1. Introduction

**MaxMate.ai** 是一个 "All-in-One AI Solution Platform"（一站式 AI 解决方案平台），根据用户的画像（职业档案 + 生活档案）动态生成个性化的 AI 工具集。

### 核心价值主张
- **差异化定位**：不同于静态的 AI 工具目录，MaxMate.ai 基于用户输入（如 "我是一个喜欢徒步的产品经理"）动态策划工具推荐
- **双模式体验**：将 AI 工具集划分为 Work Mode（工作日）和 Life Mode（周末）
- **GEO Ready**：所有页面针对 AI 搜索引擎（ChatGPT/Perplexity）优化

### 产品口号
> "The AI Operating System for Your Work & Your Life."

---

## 2. User Flow & Core Stages

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Homepage     │ ──▶ │   Onboarding    │ ──▶ │   Generation    │ ──▶ │    Toolkit      │
│   (入口页面)     │     │  (画像采集)      │     │   (AI 处理)      │     │   Dashboard     │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 3. Requirements

### REQ-1: Homepage (首页入口)

**User Story:** As a visitor, I want to quickly understand the product value and start my personalization journey, so that I can get my AI toolkit efficiently.

#### Acceptance Criteria

1. **WHEN** user lands on homepage **THEN** system **SHALL** display a Google-like clean search/input bar with placeholder text "I am a Product Manager who loves hiking..."
2. **WHEN** user enters persona description and clicks "Generate" **THEN** system **SHALL** navigate to onboarding flow with pre-filled context
3. **IF** user has not entered any text **THEN** system **SHALL** show "Trending Searches" pills for internal linking (e.g., "Product Manager + Gaming", "Developer + Cooking")
4. **WHEN** page loads **THEN** system **SHALL** display feature highlights:
   - Work Mode: Curated tools for 50+ professions
   - Life Mode: Weekend hobby planners & lifestyle AI
   - GEO Ready: Pages optimized for AI Search

#### UI Reference
- 参考设计图：`uidesign/ai_操作系统首页/screen.png`
- 品牌标识：AI OS logo + "Log In" / "Sign Up" 按钮
- 社交证明：Trusted by designers at Figma, Uber, Notion

---

### REQ-2: Onboarding (画像采集)

**User Story:** As a user, I want to provide my work and life preferences through an engaging conversational flow, so that the system can understand my needs deeply.

#### Acceptance Criteria

1. **WHEN** user enters onboarding **THEN** system **SHALL** display a progress bar showing "Analyzing Persona..."
2. **WHEN** system asks about weekend activities **THEN** system **SHALL** display multi-selection tag grid with options:
   - Hiking 🥾
   - Gaming 🎮
   - Reading 📱
   - Coding 💻
   - Cooking 🍳
   - Traveling ✈️
3. **IF** user wants custom hobby **THEN** system **SHALL** provide "Or type your own..." input field
4. **WHEN** user selects hobby tags **THEN** system **SHALL** show real-time matching indicator: "Matching with 950+ coding AI tools..."
5. **WHEN** onboarding completes **THEN** system **SHALL** transition to generation engine with smooth animation

#### Onboarding Animations

6. **WHEN** hobby tag grid renders **THEN** system **SHALL** stagger-animate tags:
   - Grid layout with 3x2 arrangement
   - Each tag fades in with `stagger(0.05)` delay
   - Spring physics for natural feel
7. **WHEN** user selects a hobby tag **THEN** system **SHALL** animate:
   - Border color transition to primary (blue)
   - Scale pulse (1.0 → 1.08 → 1.0)
   - Checkmark icon fade-in
   - Background color fill animation
8. **WHEN** user deselects a hobby tag **THEN** system **SHALL** animate:
   - Scale shrink (1.0 → 0.95 → 1.0)
   - Border/background color revert
   - Checkmark icon fade-out
9. **WHEN** matching indicator updates **THEN** system **SHALL** animate:
   - Number counter animation (counting up effect)
   - Text shimmer/pulse effect
   - Subtle glow on the counter

#### UI Reference
- 参考设计图：`uidesign/画像提取页/screen.png`
- 交互模式：对话式表单流程，非静态输入框

---

### REQ-3: Generation Engine (AI 处理引擎)

**User Story:** As a user, I want the system to intelligently select the best AI tools for my persona, so that I receive a highly relevant and personalized toolkit.

#### Acceptance Criteria

1. **WHEN** user profile is submitted **THEN** system **SHALL** use RAG + LLM pipeline to:
   - Query vector database of AI tools
   - Use LLM to select best 10-15 tools
   - Classify tools into "Work Mode" and "Life Mode"
2. **IF** user profession contains "Product Manager" **THEN** system **SHALL** prioritize project management & collaboration tools
3. **IF** user hobby contains "Hiking" **THEN** system **SHALL** include outdoor/fitness AI tools in Life Mode
4. **WHEN** generation completes **THEN** system **SHALL** return structured JSON with:
   - Work tools array (sorted by relevance)
   - Life tools array (sorted by relevance)
   - Kit metadata (total cost, tool count, primary goal)

#### Technical Requirements
- **Model Router Architecture**: Support dynamic model switching (GPT-4, Gemini, Claude)
- **Prompt Templates**: Externalized in YAML/Jinja2 files for A/B testing
- **Response Validation**: Pydantic schema validation for LLM outputs

---

### REQ-4: Toolkit Dashboard (工具集仪表板)

**User Story:** As a user, I want to view my personalized AI toolkit in an organized, visually appealing dashboard, so that I can easily discover and use the recommended tools.

#### Acceptance Criteria

1. **WHEN** toolkit page loads **THEN** system **SHALL** display:
   - Breadcrumb navigation: Home / Personas / [Profession] / [User]'s Kit
   - Page title: "[User]'s AI Stack: [Work Context] & [Life Context]"
   - Action buttons: Clone Kit, Share, Edit
2. **WHEN** on desktop **THEN** system **SHALL** show split-screen layout:
   - Left: Mon-Fri Workflow (Blue theme)
   - Right: Weekend Mode (Orange/warm theme)
3. **WHEN** on mobile **THEN** system **SHALL** show Tab Switcher ([Work] | [Life])
4. **FOR EACH** tool card **THEN** system **SHALL** display:
   - Tool logo + name + rating (5-star)
   - Description explaining WHY it matches user persona (2-3 lines)
   - "Try Free" / "Learn More" CTA button
5. **WHEN** page loads **THEN** system **SHALL** show "Kit Specs" sidebar with:
   - Total Tools count
   - Monthly Cost estimate
   - Primary Goal category
   - Last Updated date
   - "Why this kit?" expandable section

#### Toolkit Dashboard Animations

6. **WHEN** toolkit page loads **THEN** system **SHALL** animate content reveal:
   - Header (breadcrumb, title, actions) fades in first
   - Work Mode section slides in from left
   - Life Mode section slides in from right
   - Kit Specs sidebar fades in last
7. **WHEN** tool cards render **THEN** system **SHALL** stagger-animate:
   - Work Mode cards: stagger from top-left
   - Life Mode cards: stagger from top-right
   - Delay: 0.08s between cards
8. **WHEN** user hovers on tool card **THEN** system **SHALL** animate:
   - Card elevation increase (shadow enhancement)
   - Slight Y-axis lift (-4px)
   - "Try Free" button becomes more prominent (scale/color)
9. **WHEN** user switches between Work/Life tabs (mobile) **THEN** system **SHALL** animate:
   - Cross-fade between content panels
   - Tab indicator slide animation
   - Content slide in from appropriate direction

#### UI Reference
- 参考设计图：`uidesign/工具集生成页/screen.png`
- 工具卡片示例：Jira AI, Miro AI, Notion AI, Slack AI
- 生活模式卡片：AllTrails AI, ChefGPT（带背景图）

---

### REQ-5: SEO & GEO Optimization (搜索引擎优化)

**User Story:** As a platform, I want all public toolkit pages to be optimized for both Google and AI search engines (ChatGPT, Perplexity, Google SGE), so that users can discover us through various channels.

---

#### 5.1 渲染策略 (Rendering Strategy)

**基于 Google 文档重点**：Googlebot 虽能执行 JS，但静态 HTML (SSR/SSG) 效果更好。

| 要求 | 规范 | 验证方式 |
|------|------|----------|
| **禁止 CSR 内容** | 页面内容不得通过 `useEffect` + `fetch` 填入 | 查看网页源代码 (View Source) 必须能直接看到文本 |
| **强制 SSG** | 所有公开页面使用 `generateStaticParams` | `npm run build` 成功生成静态 HTML |
| **Server Components** | 优先使用 React Server Components | 客户端 bundle 最小化 |

**Acceptance Criteria:**
1. **WHEN** toolkit page is rendered **THEN** system **SHALL** use Static Site Generation (SSG) with `generateStaticParams`
2. **WHEN** viewing page source **THEN** all text content **SHALL** be visible in raw HTML (not injected by JS)

---

#### 5.2 URL 规范化与去重 (Canonicalization)

**基于 Google 文档重点**：Google 讨厌重复内容，pSEO 网站容易产生相似页面。

**Acceptance Criteria:**
3. **FOR EACH** dynamic page **THEN** system **SHALL** include self-referencing `canonical` tag:
```tsx
// app/u/[username]/page.tsx
export async function generateMetadata({ params }) {
  return {
    alternates: {
      canonical: `https://maxmate.ai/u/${params.username}`,
    },
  }
}
```

4. **WHEN** URL contains query parameters (e.g., `?ref=`, `?utm_`) **THEN** canonical **SHALL** point to clean URL without parameters

---

#### 5.3 内部链接策略 (Internal Linking / Crawl Depth)

**基于 Google 文档重点**：孤岛页面 (Orphan Pages) 无法被索引。

**Acceptance Criteria:**
5. **WHEN** system generates toolkit pages **THEN** system **SHALL** create HTML Directory page (`/directory`) listing all public toolkits alphabetically
6. **FOR EACH** toolkit page **THEN** system **SHALL** display "Related Toolkits" section with 3-5 links to similar persona toolkits
7. **WHEN** user views toolkit **THEN** breadcrumb navigation **SHALL** provide upward links:
   ```
   Home → Personas → [Profession Category] → [User]'s Kit
   ```

**Internal Link Structure:**
```
Homepage (/)
├── /directory (HTML Sitemap - lists all toolkits)
├── /personas/[profession] (Category hubs)
│   └── /u/[username] (Individual toolkit pages)
└── /tools/[tool-slug] (Tool detail pages)
```

---

#### 5.4 语义化 HTML 结构 (Semantic HTML)

**Acceptance Criteria:**
8. **WHEN** page generates **THEN** system **SHALL** use semantic HTML tags:

```html
<main>
  <article itemscope itemtype="https://schema.org/CollectionPage">
    <h1>[User]'s AI Stack: [Work Context] & [Life Context]</h1>
    
    <section aria-labelledby="work-mode">
      <h2 id="work-mode">Mon-Fri Workflow</h2>
      <!-- Tool cards -->
    </section>
    
    <section aria-labelledby="life-mode">
      <h2 id="life-mode">Weekend Mode</h2>
      <!-- Tool cards -->
    </section>
  </article>
  
  <aside aria-labelledby="kit-specs">
    <h3 id="kit-specs">Kit Specs</h3>
    <table>
      <tr><th>Total Tools</th><td>12</td></tr>
      <tr><th>Monthly Cost</th><td>$45</td></tr>
      <tr><th>Primary Goal</th><td>Productivity</td></tr>
      <tr><th>Last Updated</th><td>Dec 2025</td></tr>
    </table>
  </aside>
</main>
```

---

#### 5.5 结构化数据 / Schema.org (Structured Data)

**基于 Google 文档重点**：帮助机器理解内容，占据搜索结果版面。

**Acceptance Criteria:**
9. **FOR EACH** toolkit page **THEN** system **SHALL** inject combined JSON-LD:

```tsx
// components/seo/schema.tsx
export function SchemaMarkup({ toolkit, tools }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. CollectionPage - 工具集合
      {
        "@type": "CollectionPage",
        "name": `${toolkit.userName}'s AI Stack`,
        "description": toolkit.description,
        "url": `https://maxmate.ai/u/${toolkit.slug}`,
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": tools.map((tool, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "SoftwareApplication",
              "name": tool.name,
              "applicationCategory": tool.category,
              "offers": {
                "@type": "Offer",
                "price": tool.price || "0",
                "priceCurrency": "USD"
              }
            }
          }))
        }
      },
      // 2. FAQPage - 常见问题 (占据搜索结果版面)
      {
        "@type": "FAQPage",
        "mainEntity": toolkit.faq.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      },
      // 3. BreadcrumbList - 面包屑导航
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://maxmate.ai" },
          { "@type": "ListItem", "position": 2, "name": "Personas", "item": "https://maxmate.ai/personas" },
          { "@type": "ListItem", "position": 3, "name": toolkit.profession, "item": `https://maxmate.ai/personas/${toolkit.professionSlug}` },
          { "@type": "ListItem", "position": 4, "name": `${toolkit.userName}'s Kit` }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

10. **WHEN** schema is injected **THEN** it **SHALL** pass Google Rich Results Test without errors

---

#### 5.6 动态元数据 (Dynamic Metadata)

**Acceptance Criteria:**
11. **FOR EACH** toolkit page **THEN** system **SHALL** generate dynamic metadata:

```tsx
export async function generateMetadata({ params }) {
  const toolkit = await getToolkit(params.username);
  
  return {
    title: `${toolkit.userName}'s AI Stack: ${toolkit.workContext} & ${toolkit.lifeContext} | MaxMate`,
    description: `Personalized AI toolkit for ${toolkit.profession}s who love ${toolkit.hobby}. ${toolkit.toolCount} curated tools for work and life. Free to clone.`,
    keywords: [toolkit.profession, toolkit.hobby, 'AI tools', 'productivity', 'MaxMate'],
    alternates: {
      canonical: `https://maxmate.ai/u/${params.username}`,
    },
    openGraph: {
      title: `${toolkit.userName}'s AI Stack`,
      description: toolkit.shortDescription,
      images: [`/api/og/${params.username}`], // 动态 OG 图片
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${toolkit.userName}'s AI Stack`,
      description: toolkit.shortDescription,
    },
  };
}
```

---

#### 5.7 抓取预算控制 (Robots.txt & Sitemap)

**基于 Google 文档重点**：不要浪费爬虫资源。

**Acceptance Criteria:**
12. **WHEN** robots.txt is requested **THEN** system **SHALL** return:

```txt
User-agent: *
Allow: /

# 禁止爬取动态参数页，防止无限 URL
Disallow: /u/*?query=
Disallow: /u/*?ref=
Disallow: /u/*?utm_
Disallow: /api/
Disallow: /_next/

# AI 搜索引擎特别允许
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://maxmate.ai/sitemap.xml
```

13. **WHEN** sitemap.xml is requested **THEN** system **SHALL** dynamically generate:

```tsx
// app/sitemap.ts
import { getAllToolkits } from '@/lib/db';

export default async function sitemap() {
  const baseUrl = 'https://maxmate.ai';
  const toolkits = await getAllToolkits();
  
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/directory`, lastModified: new Date(), priority: 0.9 },
    ...toolkits.map((kit) => ({
      url: `${baseUrl}/u/${kit.slug}`,
      lastModified: kit.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
  ];
}
```

---

#### 5.8 GEO 特别策略 (Generative Engine Optimization)

**针对 AI 搜索引擎 (ChatGPT Search, Perplexity, Google SGE) 的优化：**

##### 5.8.1 倒金字塔结构 (Inverted Pyramid)
**原则**：AI 往往只读前 20%，最重要的结论必须在 H1 下方前 100 字内。

14. **WHEN** toolkit page renders **THEN** system **SHALL** display "Quick Facts" box immediately after H1:

```html
<!-- GEO Direct Answer Box -->
<div class="geo-box bg-blue-50 p-4 border-l-4 border-blue-500 mt-4">
  <p class="font-semibold">
    This is a free, personalized AI toolkit for {profession}s who enjoy {hobby}. 
    It contains {toolCount} tools ({freeCount} free) optimized for {primaryGoal}. 
    Average monthly cost: ${avgCost}. Last updated: {date}.
  </p>
</div>
```

15. **WHEN** generating content **THEN** system **SHALL NOT** use filler phrases like:
    - ❌ "In today's digital age..."
    - ❌ "As we all know..."
    - ❌ "It goes without saying..."

##### 5.8.2 引用与数据源 (Citations & Data)
**原则**：AI 喜欢有据可查的内容。

16. **FOR EACH** toolkit page **THEN** system **SHALL** include at least one data point:
    - 工具处理量统计："Processed over 1M+ tasks by MaxMate users"
    - 用户满意度："94% of users found relevant tools in their first kit"
    - 时间节省估算："Average time saved: 5 hours/week"

##### 5.8.3 品牌专有名词 (Branded Terms)
**原则**：创造属于产品的专有名词，绑定品牌与技术。

17. **WHEN** describing MaxMate features **THEN** system **SHALL** use branded terminology:

| 通用术语 | MaxMate 品牌术语 |
|----------|------------------|
| AI tool matching | MaxMate SmartMatch™ |
| Personalized toolkit | MaxMate AI Stack™ |
| Work/Life categorization | Dual-Mode Intelligence™ |
| AI generation | MaxMate Persona Engine™ |

##### 5.8.4 GEO 内容模块
18. **FOR EACH** toolkit page **THEN** system **SHALL** include these GEO-optimized sections:

```html
<!-- What is this? (GEO Definition) -->
<section id="what-is">
  <h2>What is a Personalized AI Toolkit for {Profession}s?</h2>
  <p>A personalized AI toolkit is a curated collection of artificial intelligence 
  tools specifically selected to match your professional role ({profession}) and 
  personal interests ({hobby}). Unlike generic tool directories, MaxMate's 
  SmartMatch™ technology analyzes your unique profile to recommend tools that 
  will actually improve your workflow and lifestyle.</p>
</section>

<!-- Why do you need this? (Pain Points) -->
<section id="why-need">
  <h2>Why {Profession}s Need an AI Toolkit</h2>
  <ul>
    <li><strong>Pain Point 1:</strong> {specific problem} → <strong>Solution:</strong> {tool recommendation}</li>
    <li><strong>Pain Point 2:</strong> {specific problem} → <strong>Solution:</strong> {tool recommendation}</li>
  </ul>
</section>

<!-- Comparison (vs Traditional) -->
<section id="comparison">
  <h2>MaxMate vs. Manual Tool Discovery</h2>
  <table>
    <thead><tr><th>Aspect</th><th>Traditional</th><th>MaxMate</th></tr></thead>
    <tbody>
      <tr><td>Discovery Time</td><td>Hours of research</td><td>30 seconds</td></tr>
      <tr><td>Personalization</td><td>Generic lists</td><td>Tailored to your profile</td></tr>
      <tr><td>Cost Visibility</td><td>Hidden</td><td>Transparent pricing</td></tr>
    </tbody>
  </table>
</section>

<!-- FAQ (Schema.org FAQPage) -->
<section id="faq" itemscope itemtype="https://schema.org/FAQPage">
  <h2>Frequently Asked Questions</h2>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Is MaxMate free to use?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">Yes, generating your personalized AI toolkit is completely free. Individual tools may have their own pricing.</p>
    </div>
  </div>
  <!-- More FAQs... -->
</section>
```

---

#### 5.9 SEO/GEO 验证清单

| 检查项 | 工具 | 通过标准 |
|--------|------|----------|
| Schema 验证 | [Google Rich Results Test](https://search.google.com/test/rich-results) | 无错误，FAQ 预览正确 |
| 移动端适配 | [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) | "Page is mobile-friendly" |
| 页面速度 | [PageSpeed Insights](https://pagespeed.web.dev/) | Performance > 90 |
| HTML 可见性 | View Page Source (Ctrl+U) | 所有文本内容可见 |
| Canonical 验证 | 检查 `<link rel="canonical">` | 指向正确 URL |
| Sitemap 有效性 | [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html) | 无错误 |
| AI 爬虫测试 | 使用 Perplexity/ChatGPT 搜索页面 | 内容被正确引用 |

---

### REQ-6: User Actions (用户操作)

**User Story:** As a user, I want to interact with my toolkit through various actions, so that I can customize and share my AI stack.

#### Acceptance Criteria

1. **WHEN** user clicks "Clone Kit" **THEN** system **SHALL** create a copy of the toolkit linked to user account
2. **WHEN** user clicks "Edit" **THEN** system **SHALL** allow:
   - Swap tools within same category
   - Remove tools from kit
   - Add new tools from catalog
3. **WHEN** user clicks "Share" **THEN** system **SHALL** provide:
   - Public URL for the toolkit
   - Social sharing options (Twitter, LinkedIn)
   - Embed code option

---

### REQ-7: Homepage Animations & Visual Effects (首页动画与视觉效果)

**User Story:** As a visitor, I want to experience engaging animations and visual effects on the homepage, so that I feel the product is modern, professional, and delightful to use.

#### Acceptance Criteria

##### 7.1 Hero Section 产品演示
1. **WHEN** homepage loads **THEN** system **SHALL** display either:
   - **Option A**: Auto-playing short video demo (15-30 seconds) showing the user journey
   - **Option B**: Animated mockup sequence demonstrating "Input → Generate → Toolkit" flow
2. **WHEN** demo video/animation is present **THEN** system **SHALL** include:
   - Mute by default with audio toggle
   - Play/pause controls
   - Lazy loading to maintain performance

##### 7.2 微交互动画 (Micro-interactions)
3. **WHEN** user focuses on search input **THEN** system **SHALL** animate:
   - Border color transition (gray → primary blue)
   - Subtle scale increase (1.0 → 1.02)
   - Placeholder text fade-in typing effect
4. **WHEN** user hovers over "Generate" button **THEN** system **SHALL** animate:
   - Background gradient shift
   - Scale up (1.0 → 1.05) with spring physics
   - Icon rotation or pulse effect
5. **WHEN** user clicks "Generate" button **THEN** system **SHALL** show:
   - Ripple effect from click origin
   - Loading spinner transition
   - Button morph into progress indicator

##### 7.3 背景动画 (Background Effects)
6. **WHEN** homepage renders **THEN** system **SHALL** display subtle background animation:
   - **Option A**: Animated gradient mesh (CSS/Canvas)
   - **Option B**: Floating geometric particles (low-density, 60fps)
   - **Option C**: Subtle noise texture with slow drift
7. **IF** user prefers reduced motion (via `prefers-reduced-motion`) **THEN** system **SHALL** disable or minimize background animations
8. **WHEN** background animation runs **THEN** system **SHALL** ensure:
   - GPU-accelerated rendering
   - No impact on LCP/FID metrics
   - Battery-efficient on mobile devices

##### 7.4 Feature Grid 动画
9. **WHEN** page loads **THEN** system **SHALL** stagger-animate feature cards:
   - Initial state: `opacity: 0, y: 20px`
   - Final state: `opacity: 1, y: 0`
   - Stagger delay: 0.1s between each card
   - Use `whileInView` for scroll-triggered reveal
10. **WHEN** user hovers on feature card **THEN** system **SHALL** animate:
    - Card lift effect (`translateY: -4px`, `shadow: xl`)
    - Icon scale/color change
    - Optional: content swap or expand animation
11. **WHEN** user clicks feature card **THEN** system **SHALL** show:
    - Card expand animation revealing more details
    - Smooth height transition
    - Close button with fade-in

##### 7.5 Trending Searches Pills 动画
12. **WHEN** trending pills render **THEN** system **SHALL** animate with staggered fade-in from left to right
13. **WHEN** user hovers on pill **THEN** system **SHALL** animate:
    - Background color shift
    - Scale pulse (1.0 → 1.08 → 1.05)
    - Cursor change to pointer

##### 7.6 Page Transition 动画
14. **WHEN** user navigates from homepage to onboarding **THEN** system **SHALL** play:
    - Fade-out current content
    - Slide-up incoming content
    - Shared element transition for search input (morphs into onboarding header)

#### Animation Technical Specifications

| Animation Type | Library | Technique | Performance Target |
|---------------|---------|-----------|-------------------|
| Micro-interactions | Motion (Framer) | `whileHover`, `whileTap`, spring physics | < 16ms per frame |
| Stagger reveals | Motion (Framer) | `stagger()`, `delayChildren` | 60fps continuous |
| Background effects | CSS/Canvas | `transform`, `opacity`, GPU layers | < 5% CPU usage |
| Page transitions | Motion (Framer) | `AnimatePresence`, layout animations | < 300ms total |

#### Code Examples (Motion Library)

**Staggered Feature Cards:**
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

<motion.div variants={container} initial="hidden" animate="show">
  {features.map(f => <motion.div key={f.id} variants={item} />)}
</motion.div>
```

**Hover Card Effect:**
```tsx
<motion.button
  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
/>
```

**Background Gradient Animation:**
```tsx
<motion.div
  animate={{
    background: [
      "linear-gradient(45deg, #f3f4f6, #e5e7eb)",
      "linear-gradient(90deg, #e5e7eb, #f3f4f6)",
      "linear-gradient(135deg, #f3f4f6, #e5e7eb)"
    ]
  }}
  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
/>
```

---

## 4. Non-Functional Requirements

### Code Architecture and Modularity

- **Single Responsibility Principle**: Each component/service should have a single, well-defined purpose
- **Modular Design**: Frontend components, backend services, and LLM utilities should be isolated and reusable
- **Dependency Management**: Use dependency injection for LLM providers to enable easy switching
- **Clear Interfaces**: Define clean API contracts between frontend and backend

### Performance

- **Homepage Load Time**: < 2 seconds (LCP)
- **Toolkit Generation Time**: < 8 seconds end-to-end
- **Time to Interactive (TTI)**: < 3 seconds
- **Core Web Vitals**: All metrics in "Good" range

### Security

- **API Rate Limiting**: Prevent abuse of LLM endpoints
- **Input Sanitization**: Validate all user inputs before LLM processing
- **Authentication**: JWT-based session management for user accounts

### Reliability

- **LLM Fallback**: If primary model fails, fallback to secondary model
- **Error Handling**: Graceful degradation with user-friendly error messages
- **Caching**: Cache tool database queries for improved response times

### Usability

- **Responsive Design**: Full functionality on desktop, tablet, and mobile
- **Accessibility**: WCAG 2.1 AA compliance
- **Internationalization**: Support for English (primary), Chinese (future)

---

## 5. Technical Dependencies Summary

### Frontend (Next.js 15+ App Router)
| Dependency | Purpose | Context7 ID |
|------------|---------|-------------|
| Next.js 15 | SSR/SSG, App Router, SEO | `/websites/nextjs_15` |
| Shadcn UI | Component library, Bento Grid | `/llmstxt/ui_shadcn_llms_txt` |
| Framer Motion | Animations, scroll interactions | `/websites/motion-dev-docs` |
| Tailwind CSS | Utility-first styling | Built-in |

### Backend (FastAPI)
| Dependency | Purpose | Context7 ID |
|------------|---------|-------------|
| FastAPI | REST API, async endpoints | `/fastapi/fastapi` |
| Pydantic v2 | Request/response validation | Built into FastAPI |
| LangChain | LLM orchestration, RAG | `/websites/langchain_oss_python_langchain` |

### LLM Providers (via Model Router)
| Provider | Use Case | Priority |
|----------|----------|----------|
| OpenAI GPT-4 | Complex persona analysis | Primary |
| Google Gemini | Cost-effective generation | Secondary |
| Anthropic Claude | Fallback, safety | Tertiary |

---

## 6. UI Design System (设计系统规范)

基于现有 UI 设计文件 (`uidesign/`) 提取的设计语言，后续所有新页面必须遵循此规范。

### 6.1 色彩系统

| 色彩名称 | Light Mode | Dark Mode | 用途 |
|----------|------------|-----------|------|
| Primary | `#2b6cee` | `#2b6cee` | 主色调、CTA按钮、链接 |
| Background | `#f6f6f8` | `#101622` | 页面背景 |
| Surface | `#ffffff` | `#1a1f2e` | 卡片、模态框背景 |
| Text Primary | `#111827` | `#ffffff` | 主文本 |
| Text Secondary | `#6b7280` | `#9ca3af` | 次要文本、描述 |
| Border | `#e5e7eb` | `#374151` | 边框、分割线 |
| Work Mode Accent | `#2b6cee` (Blue) | - | 工作模式主题色 |
| Life Mode Accent | `#f97316` (Orange) | - | 生活模式主题色 |

### 6.2 字体系统

```css
font-family: "Inter", sans-serif;

/* 字重层级 */
--font-normal: 400;    /* 正文 */
--font-medium: 500;    /* 次标题 */
--font-semibold: 600;  /* 按钮文字 */
--font-bold: 700;      /* 标题 */
--font-extrabold: 800; /* Hero 标题 */
--font-black: 900;     /* 大标题强调 */

/* 字号层级 */
--text-sm: 14px;       /* 辅助文字 */
--text-base: 16px;     /* 正文 */
--text-lg: 18px;       /* 小标题 */
--text-xl: 20px;       /* 卡片标题 */
--text-2xl: 24px;      /* 区块标题 */
--text-3xl: 30px;      /* 页面标题 */
--text-4xl: 36px;      /* Hero 副标题 */
--text-5xl: 48px;      /* Hero 主标题 (Mobile) */
--text-6xl: 60px;      /* Hero 主标题 (Desktop) */
```

### 6.3 圆角系统

| 元素类型 | 圆角值 | Tailwind Class |
|----------|--------|----------------|
| 按钮 | `9999px` | `rounded-full` |
| 输入框 | `9999px` | `rounded-full` |
| 标签/Pills | `9999px` | `rounded-full` |
| 卡片 | `1rem` | `rounded` |
| 大卡片 | `1.5rem` | `rounded-lg` |
| 模态框 | `2rem` | `rounded-xl` |

### 6.4 阴影系统

```css
/* 输入框聚焦 */
--shadow-input: 0 10px 40px rgba(43, 108, 238, 0.2);

/* 卡片悬停 */
--shadow-card-hover: 0 10px 30px rgba(0, 0, 0, 0.1);

/* 按钮悬停 */
--shadow-button: 0 4px 14px rgba(43, 108, 238, 0.4);
```

### 6.5 组件规范

#### 按钮样式
```jsx
// Primary Button
<button className="rounded-full h-10 px-4 bg-primary text-white text-sm font-bold hover:opacity-90 transition-opacity">
  Button Text
</button>

// Secondary Button
<button className="rounded-full h-10 px-4 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold">
  Button Text
</button>

// Ghost Button (Tool Card CTA)
<button className="rounded-full bg-primary/20 text-primary text-sm font-semibold py-2 hover:bg-primary/30">
  Try Free
</button>
```

#### 卡片样式
```jsx
// Feature Card
<div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 hover:shadow-lg transition-shadow">
  {/* Content */}
</div>

// Tool Card (Work Mode)
<div className="rounded-lg border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/30 p-5 hover:shadow-lg">
  {/* Logo + Title + Description + CTA */}
</div>

// Hero Card (Life Mode)
<div className="relative rounded-lg overflow-hidden min-h-[200px] hover:scale-[1.02] transition-transform">
  <div className="absolute inset-0 bg-cover" style={{backgroundImage: "url(...)"}} />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
  <div className="relative z-10 p-6 text-white">
    {/* Content */}
  </div>
</div>
```

#### 图标系统
- **库**: Google Material Symbols Outlined
- **默认尺寸**: 24px
- **风格**: `'FILL' 0, 'wght' 400`

---

## 7. UI Design References (页面设计)

### 7.1 已有设计（可直接使用）

| Page | Design File | Key Elements |
|------|-------------|--------------|
| Homepage | `uidesign/ai_操作系统首页/` | Search bar, feature cards, social proof |
| Onboarding | `uidesign/画像提取页/` | Progress bar, multi-select tags, real-time matching |
| Toolkit Dashboard | `uidesign/工具集生成页/` | Split view, tool cards, Kit Specs sidebar |

### 7.2 需要扩充的页面（基于现有设计风格创建）

| 页面名称 | 用途 | 关键组件 | 优先级 |
|----------|------|----------|--------|
| **Loading/Generation** | AI 生成工具集时的等待页面 | 进度指示器、动画、预览骨架屏 | P0 |
| **Login/Register** | 用户认证页面 | 表单、OAuth 按钮、品牌展示 | P1 |
| **User Profile** | 用户个人主页 | 用户信息、已保存的 Kit 列表、设置入口 | P1 |
| **Tool Catalog** | 所有 AI 工具浏览页 | 搜索、筛选器、分类导航、工具网格 | P1 |
| **Tool Detail** | 单个工具详情页 | 工具介绍、评分、用户评论、相关工具 | P2 |
| **Kit Editor** | 编辑/定制工具集页面 | 拖拽重排、添加/移除工具、保存按钮 | P2 |
| **Share Preview** | 分享预览/嵌入页面 | 精简版 Toolkit 展示、社交分享卡片 | P2 |
| **404/Error** | 错误页面 | 友好的错误提示、返回首页按钮 | P3 |
| **Settings** | 用户设置页面 | 账户设置、通知偏好、主题切换 | P3 |

### 7.3 扩充页面设计要求

所有新页面必须遵循以下原则：

1. **一致性**：使用 §6 定义的设计系统（颜色、字体、圆角、阴影）
2. **响应式**：支持 Mobile (< 640px) / Tablet (640-1024px) / Desktop (> 1024px)
3. **深色模式**：所有组件必须支持 Light/Dark 主题切换
4. **动画**：遵循 REQ-7 定义的动画规范
5. **无障碍**：WCAG 2.1 AA 标准（对比度、键盘导航、屏幕阅读器）

### 7.4 Loading/Generation 页面详细规范

**User Story:** As a user waiting for AI generation, I want to see engaging progress feedback, so that I feel the system is working and stay engaged.

#### 页面布局
```
┌────────────────────────────────────────┐
│              AI OS Logo                │
├────────────────────────────────────────┤
│                                        │
│   🔄 Generating Your Personalized Kit  │
│                                        │
│   ████████████░░░░░░░░░░  45%          │
│                                        │
│   ┌─────────────────────────────────┐  │
│   │   [Skeleton]  [Skeleton]        │  │
│   │   [Skeleton]  [Skeleton]        │  │
│   │   Preview of your toolkit...    │  │
│   └─────────────────────────────────┘  │
│                                        │
│   📝 Analyzing: "Product Manager"      │
│   🎯 Matching: Productivity tools      │
│   🏃 Finding: Hiking companions        │
│                                        │
└────────────────────────────────────────┘
```

#### 动画要求
- 进度条流动动画（渐变移动）
- 骨架屏闪烁效果（shimmer）
- 状态文字打字机效果
- 完成时的庆祝动画（confetti / check mark）

---

## 8. Out of Scope (MVP)

以下功能在 MVP 阶段不纳入：
- 用户付费订阅系统
- 工具真实 API 集成（仅展示）
- 多语言支持
- 原生移动应用
- 协作/团队功能

