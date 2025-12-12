# MaxMate.ai - Tasks Breakdown

## Overview

本文档将技术设计分解为可执行的开发任务。每个任务包含明确的文件路径、依赖关系和验收标准。

**任务状态说明：**
- `[ ]` = Pending (待开始)
- `[-]` = In Progress (进行中)
- `[x]` = Completed (已完成)

---

## Phase 1: Project Setup & Infrastructure (项目初始化)

### Task 1.1: Initialize Frontend Project
- [ ] **创建 Next.js 15 项目**

**Files to create:**
- `frontend/package.json`
- `frontend/next.config.js`
- `frontend/tailwind.config.js`
- `frontend/tsconfig.json`
- `frontend/app/layout.tsx`
- `frontend/app/globals.css`

**Acceptance Criteria:**
- Next.js 15 with App Router
- TypeScript configured
- Tailwind CSS + Shadcn UI initialized
- Motion (Framer Motion) installed

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Senior Frontend Developer specializing in Next.js 15 and TypeScript

Task: Initialize a new Next.js 15 project with App Router for MaxMate.ai
- Create project with `npx create-next-app@latest frontend --typescript --tailwind --app`
- Initialize Shadcn UI with `npx shadcn@latest init`
- Install dependencies: framer-motion, lucide-react
- Configure Tailwind with custom theme (primary: #2b6cee, background-light: #f6f6f8)
- Set up Inter font in layout.tsx

Restrictions:
- Use App Router only (no Pages Router)
- Configure for SSG by default
- Do not add authentication yet

_Leverage:
- Reference design system from requirements.md §6
- Use Tailwind config from design.md §2.1

_Requirements: REQ-1 (Homepage structure)

Success:
- `npm run dev` starts without errors
- Homepage renders with Tailwind styling
- Shadcn Button component works

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 1.2: Initialize Backend Project
- [ ] **创建 FastAPI 后端项目**

**Files to create:**
- `backend/requirements.txt`
- `backend/app/__init__.py`
- `backend/app/main.py`
- `backend/app/config.py`
- `backend/app/api/__init__.py`
- `backend/app/api/health.py`

**Acceptance Criteria:**
- FastAPI with uvicorn
- Pydantic v2 configured
- CORS enabled for localhost:3000
- Health check endpoint working

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Senior Backend Developer specializing in FastAPI and Python

Task: Initialize FastAPI backend project for MaxMate.ai
- Create virtual environment and requirements.txt
- Set up FastAPI app with uvicorn
- Configure Pydantic v2 settings
- Add CORS middleware (allow localhost:3000)
- Create /health endpoint

Restrictions:
- Use async/await patterns
- Do not add database yet
- Do not add authentication yet

_Leverage:
- Reference backend structure from design.md §3.1

_Requirements: REQ-3 (Generation Engine backend)

Success:
- `uvicorn app.main:app --reload` starts
- GET /health returns {"status": "ok"}
- Swagger UI accessible at /docs

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 1.3: Set Up Database Schema
- [ ] **配置数据库和 Supabase 连接**

**Files to create:**
- `backend/app/db/__init__.py`
- `backend/app/db/session.py`
- `backend/app/db/base.py`
- `backend/app/models/__init__.py`
- `backend/app/models/user.py`
- `backend/app/models/toolkit.py`
- `backend/app/models/tool.py`
- `backend/migrations/` (Alembic)

**Acceptance Criteria:**
- SQLAlchemy async session configured
- All models from design.md §5.1 created
- Alembic migrations working

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Backend Developer specializing in SQLAlchemy and PostgreSQL

Task: Set up database models and migrations for MaxMate.ai
- Configure SQLAlchemy async with Supabase PostgreSQL
- Create User, Toolkit, Tool, ToolkitTools models
- Set up Alembic for migrations
- Create initial migration

Restrictions:
- Use async SQLAlchemy (asyncpg)
- Follow exact schema from design.md §5.1
- Use UUID for all primary keys

_Leverage:
- Database schema from design.md §5.1
- Pydantic schemas from design.md §3.3

_Requirements: REQ-3, REQ-6

Success:
- `alembic upgrade head` runs without errors
- All tables created in Supabase
- Models can be imported

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

## Phase 2: Core UI Components (核心 UI 组件)

### Task 2.1: Create Shadcn UI Base Components
- [ ] **安装 Shadcn 基础组件**

**Files to create:**
- `frontend/components/ui/button.tsx`
- `frontend/components/ui/card.tsx`
- `frontend/components/ui/input.tsx`
- `frontend/components/ui/badge.tsx`
- `frontend/components/ui/skeleton.tsx`
- `frontend/components/ui/tabs.tsx`

**Acceptance Criteria:**
- All required Shadcn components installed
- Custom variants matching design system

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer specializing in component libraries

Task: Install and configure Shadcn UI components for MaxMate.ai
- Install: button, card, input, badge, skeleton, tabs, avatar
- Customize button variants (primary, secondary, ghost)
- Ensure dark mode support

Restrictions:
- Use pnpm dlx shadcn@latest add [component]
- Do not modify core Shadcn files
- Follow design system colors from requirements.md §6

_Leverage:
- Design system from requirements.md §6.5

_Requirements: REQ-1, REQ-4

Success:
- All components render correctly
- Primary button uses #2b6cee
- Dark mode toggle works

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 2.2: Create Layout Components
- [ ] **创建布局组件 (Navbar, Footer)**

**Files to create:**
- `frontend/components/layout/navbar.tsx`
- `frontend/components/layout/footer.tsx`
- `frontend/components/layout/breadcrumb.tsx`
- `frontend/app/layout.tsx` (update)

**Acceptance Criteria:**
- Navbar with logo, nav links, auth buttons
- Footer with links and copyright
- Breadcrumb component for toolkit pages

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer specializing in layouts and navigation

Task: Create layout components for MaxMate.ai
- Build Navbar: AI OS logo, nav links, Log In/Sign Up buttons
- Build Footer: links, social icons, copyright
- Build Breadcrumb: Home > Personas > [Category] > [Kit]
- Update root layout to include Navbar/Footer

Restrictions:
- Match UI exactly from uidesign/ai_操作系统首页/code.html
- Use Tailwind classes only (no custom CSS)
- Must be responsive (mobile hamburger menu)

_Leverage:
- HTML reference: uidesign/ai_操作系统首页/code.html
- Design system: requirements.md §6

_Requirements: REQ-1, REQ-4, REQ-5 (breadcrumb for SEO)

Success:
- Navbar matches design exactly
- Mobile menu works
- Breadcrumb generates correct links

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 2.3: Create Animation Components
- [ ] **创建 Motion 动画组件库**

**Files to create:**
- `frontend/lib/animations.ts`
- `frontend/components/animations/stagger-container.tsx`
- `frontend/components/animations/fade-in.tsx`
- `frontend/components/animations/scroll-reveal.tsx`
- `frontend/components/animations/hover-card.tsx`
- `frontend/components/animations/background-gradient.tsx`

**Acceptance Criteria:**
- All animation variants from design.md §6.1
- Reusable animation wrapper components
- Respects prefers-reduced-motion

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer specializing in animations and motion design

Task: Create reusable animation components using Framer Motion
- Create animations.ts with all variants (stagger, fadeUp, slideIn, etc.)
- Build StaggerContainer, FadeIn, ScrollReveal components
- Build BackgroundGradient animated background
- Add prefers-reduced-motion support

Restrictions:
- Use framer-motion library only
- All animations must be GPU-accelerated (transform, opacity)
- Maximum 300ms for micro-interactions

_Leverage:
- Animation variants from design.md §6.1
- Animation requirements from requirements.md REQ-7

_Requirements: REQ-7 (Homepage Animations)

Success:
- StaggerContainer staggers children correctly
- ScrollReveal triggers on viewport entry
- BackgroundGradient animates smoothly

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

## Phase 3: Homepage Implementation (首页实现)

### Task 3.1: Create Hero Section
- [ ] **实现 Hero Section (搜索框 + 标题)**

**Files to create:**
- `frontend/components/homepage/hero-section.tsx`
- `frontend/components/homepage/search-input.tsx`
- `frontend/components/homepage/social-proof.tsx`

**Acceptance Criteria:**
- Hero title with Work/Life highlighted
- Search input with Generate button
- Social proof (avatars + trusted by text)
- All animations from REQ-7

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer specializing in landing pages and UX

Task: Build Hero Section for MaxMate.ai homepage
- Create HeroSection container with animations
- Build SearchInput with focus effects and Generate button
- Build SocialProof with avatar stack and trust text
- Implement micro-interactions (hover, focus, click)

Restrictions:
- Match UI exactly from uidesign/ai_操作系统首页/screen.png
- SearchInput must store value in sessionStorage on generate
- Use Motion for all animations

_Leverage:
- HTML reference: uidesign/ai_操作系统首页/code.html
- SearchInput code: design.md §2.3.1
- Animation requirements: requirements.md REQ-7.2

_Requirements: REQ-1, REQ-7

Success:
- Hero matches design screenshot exactly
- SearchInput animates on focus
- Generate button navigates to /onboarding

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 3.2: Create Feature Grid Section
- [ ] **实现 Feature Grid (Work/Life/GEO 卡片)**

**Files to create:**
- `frontend/components/homepage/feature-grid.tsx`
- `frontend/components/homepage/feature-card.tsx`

**Acceptance Criteria:**
- 3-column grid (responsive to 1 column on mobile)
- Staggered reveal animation
- Hover effects on cards

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer

Task: Build Feature Grid section for homepage
- Create FeatureGrid with 3 cards: Work Mode, Life Mode, GEO Ready
- Use StaggerContainer for entrance animation
- Add hover lift effect on cards
- Match icons from Material Symbols

Restrictions:
- Match UI from uidesign/ai_操作系统首页/screen.png
- Use whileInView for scroll-triggered animation
- Cards must be equal height

_Leverage:
- HTML reference: uidesign/ai_操作系统首页/code.html lines 108-146
- Animation: requirements.md REQ-7.4

_Requirements: REQ-1, REQ-7

Success:
- Grid displays correctly on all screen sizes
- Cards animate in with stagger
- Hover effect works

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 3.3: Create Trending Pills Section
- [ ] **实现 Trending Searches Pills**

**Files to create:**
- `frontend/components/homepage/trending-pills.tsx`

**Acceptance Criteria:**
- Horizontal pill list with popular searches
- Staggered fade-in animation
- Click navigates to onboarding with prefill

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer

Task: Build Trending Pills for homepage
- Create TrendingPills with example searches
- Examples: "Product Manager + Gaming", "Developer + Cooking", etc.
- Add staggered animation from left to right
- On click, navigate to /onboarding with query param

Restrictions:
- Maximum 5-6 pills visible
- Use rounded-full badges
- Animate hover with scale pulse

_Leverage:
- Animation: requirements.md REQ-7.5

_Requirements: REQ-1, REQ-5 (internal linking)

Success:
- Pills render in a row
- Click prefills onboarding
- Animation plays on page load

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 3.4: Assemble Homepage
- [ ] **组装完整首页**

**Files to modify:**
- `frontend/app/page.tsx`

**Files to create:**
- `frontend/app/opengraph-image.tsx` (OG image)

**Acceptance Criteria:**
- All sections assembled
- SEO metadata configured
- OG image generated

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Senior Frontend Developer

Task: Assemble complete homepage for MaxMate.ai
- Import and compose all homepage components
- Add page metadata (title, description, OG tags)
- Create dynamic OG image using @vercel/og
- Add BackgroundGradient animation

Restrictions:
- Page must be SSG (no "use client" at page level)
- Metadata must include canonical URL
- Follow SEO requirements from requirements.md REQ-5

_Leverage:
- All homepage components created in tasks 3.1-3.3
- SEO requirements: requirements.md REQ-5.6

_Requirements: REQ-1, REQ-5, REQ-7

Success:
- Homepage renders all sections
- Lighthouse SEO score > 90
- OG image generates correctly

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

## Phase 4: Onboarding Flow (画像采集流程)

### Task 4.1: Create Onboarding Page Structure
- [ ] **创建 Onboarding 页面结构**

**Files to create:**
- `frontend/app/onboarding/page.tsx`
- `frontend/components/onboarding/progress-bar.tsx`
- `frontend/components/onboarding/onboarding-card.tsx`

**Acceptance Criteria:**
- Multi-step form structure
- Progress bar with percentage
- Card container with animations

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer specializing in multi-step forms

Task: Create Onboarding page structure
- Build progress bar component with animation
- Create OnboardingCard container matching design
- Set up client-side state for multi-step flow
- Read prefill from sessionStorage

Restrictions:
- Must be client component ("use client")
- Match UI from uidesign/画像提取页/screen.png
- Progress bar must animate smoothly

_Leverage:
- HTML reference: uidesign/画像提取页/code.html
- Requirements: requirements.md REQ-2

_Requirements: REQ-2

Success:
- Progress bar shows correct percentage
- Card matches design
- Prefill from homepage works

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 4.2: Create Hobby Selection Grid
- [ ] **实现兴趣爱好多选网格**

**Files to create:**
- `frontend/components/onboarding/hobby-grid.tsx`
- `frontend/components/onboarding/hobby-tag.tsx`
- `frontend/components/onboarding/custom-hobby-input.tsx`

**Acceptance Criteria:**
- 3x2 grid of hobby tags
- Selection animation (scale, border, checkmark)
- Custom input for "type your own"
- Multi-select support

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer

Task: Build Hobby Selection Grid for onboarding
- Create HobbyGrid with 6 preset options
- Build HobbyTag with selection animation
- Add CustomHobbyInput for custom entries
- Implement multi-select state management

Restrictions:
- Match UI from uidesign/画像提取页/screen.png
- Maximum 3 selections allowed
- Use Material Symbols for icons

_Leverage:
- HTML reference: uidesign/画像提取页/code.html lines 60-91
- HobbyGrid code: design.md §2.3.2
- Animation: requirements.md REQ-2 (Onboarding Animations)

_Requirements: REQ-2

Success:
- Grid displays 6 hobby options
- Selection animates correctly
- Custom input works
- State updates on selection

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 4.3: Create Matching Indicator
- [ ] **实现实时匹配计数器**

**Files to create:**
- `frontend/components/onboarding/matching-indicator.tsx`

**Acceptance Criteria:**
- Animated number counter
- Updates based on hobby selection
- Shimmer/pulse effect

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer

Task: Build Matching Indicator for onboarding
- Create counter showing "Matching with X+ tools..."
- Animate number changes (counting effect)
- Add shimmer/pulse effect
- Update count based on selected hobbies

Restrictions:
- Match text from uidesign/画像提取页/screen.png
- Use requestAnimationFrame for smooth counting
- Number should vary by hobby selection

_Leverage:
- HTML reference: uidesign/画像提取页/code.html line 94
- Animation: requirements.md REQ-2 (criterion 9)

_Requirements: REQ-2

Success:
- Counter animates on hobby change
- Shows realistic tool counts
- Shimmer effect visible

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 4.4: Connect Onboarding to Generation
- [ ] **连接 Onboarding 到生成流程**

**Files to modify:**
- `frontend/app/onboarding/page.tsx`

**Files to create:**
- `frontend/lib/api.ts` (API client)
- `frontend/hooks/use-generation.ts`

**Acceptance Criteria:**
- Submit button triggers API call
- Navigate to /generate with job_id
- Handle loading and error states

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer

Task: Connect Onboarding to Generation API
- Create API client with fetch wrapper
- Build useGeneration hook for API calls
- Add submit handler to onboarding
- Navigate to /generate on success

Restrictions:
- Use environment variable for API URL
- Handle network errors gracefully
- Show loading state on submit button

_Leverage:
- API schema: design.md §3.3 (GenerationRequest)
- Hook patterns from Next.js docs

_Requirements: REQ-2, REQ-3

Success:
- API call sends correct payload
- Redirects to /generate with job_id
- Error toast on failure

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

## Phase 5: Generation & Loading (AI 生成与加载)

### Task 5.1: Create Loading Page
- [ ] **创建 AI 生成等待页面**

**Files to create:**
- `frontend/app/generate/page.tsx`
- `frontend/components/generate/generation-progress.tsx`
- `frontend/components/generate/skeleton-preview.tsx`
- `frontend/components/generate/status-steps.tsx`

**Acceptance Criteria:**
- Progress bar with percentage
- Skeleton preview of toolkit
- Status steps with typing effect
- Confetti animation on complete

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer specializing in loading states and UX

Task: Build Generation Loading page
- Create progress bar with gradient animation
- Build skeleton preview matching toolkit layout
- Create status steps with typewriter effect
- Add confetti celebration on completion
- Poll API for status updates

Restrictions:
- Poll every 2 seconds
- Redirect to /u/[slug] when complete
- Handle timeout (max 60 seconds)

_Leverage:
- Loading page spec: requirements.md §7.4
- API: design.md §3.2.1 (GET /generate/{job_id}/status)

_Requirements: REQ-7.4 (new page from design expansion)

Success:
- Progress updates from API
- Skeleton preview looks realistic
- Confetti plays on completion
- Redirects to toolkit page

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 5.2: Implement Generation API (Backend)
- [ ] **实现后端生成 API**

**Files to create:**
- `backend/app/api/v1/generate.py`
- `backend/app/schemas/generation.py`
- `backend/app/services/generation.py`

**Acceptance Criteria:**
- POST /api/v1/generate starts job
- GET /api/v1/generate/{job_id}/status returns progress
- Background task processes generation

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Backend Developer specializing in async APIs

Task: Implement Generation API endpoints
- Create POST /generate to start generation job
- Create GET /generate/{job_id}/status for polling
- Use BackgroundTasks for async processing
- Store job status in Redis

Restrictions:
- Use Pydantic for request/response validation
- Job ID must be UUID
- Status: pending, processing, completed, failed

_Leverage:
- API design: design.md §3.2.1
- Schemas: design.md §3.3

_Requirements: REQ-3

Success:
- POST returns job_id
- GET returns progress percentage
- Background task runs

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

## Phase 6: LLM Integration (LLM 集成)

### Task 6.1: Create Model Gateway
- [ ] **实现 LLM Model Gateway**

**Files to create:**
- `backend/app/llm/__init__.py`
- `backend/app/llm/gateway.py`
- `backend/app/llm/providers/__init__.py`
- `backend/app/llm/providers/openai.py`
- `backend/app/llm/providers/gemini.py`

**Acceptance Criteria:**
- Abstract LLMProvider base class
- OpenAI and Gemini implementations
- Automatic fallback on failure
- Structured JSON output support

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Backend Developer specializing in LLM integrations

Task: Implement Model Gateway for MaxMate.ai
- Create abstract LLMProvider base class
- Implement OpenAIProvider with gpt-4o
- Implement GeminiProvider as fallback
- Build ModelGateway factory with fallback logic

Restrictions:
- Use async/await for all API calls
- Support JSON structured output
- Log all LLM calls for debugging

_Leverage:
- Gateway design: design.md §4.1, §4.2

_Requirements: REQ-3 (Model Router Architecture)

Success:
- OpenAI calls work
- Fallback to Gemini on OpenAI failure
- JSON output parses correctly

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 6.2: Create Prompt Manager
- [ ] **实现 Prompt 模板管理器**

**Files to create:**
- `backend/app/llm/prompts/__init__.py`
- `backend/app/llm/prompts/manager.py`
- `backend/app/llm/prompts/templates/base_system.yaml`
- `backend/app/llm/prompts/templates/toolkit_generation.yaml`

**Acceptance Criteria:**
- YAML template loading
- Jinja2 variable injection
- Template caching

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Backend Developer

Task: Implement Prompt Manager with YAML templates
- Create PromptManager class with template loading
- Use Jinja2 for variable injection
- Create toolkit_generation.yaml template
- Add template caching

Restrictions:
- Templates must be in YAML format
- Support role, context, task, constraints, output_format
- Cache loaded templates

_Leverage:
- PromptManager design: design.md §4.3
- Template format: design.md §4.4

_Requirements: REQ-3 (Prompt Templates)

Success:
- Templates load correctly
- Variables inject properly
- Cached templates reuse

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 6.3: Implement Generation Service
- [ ] **实现完整生成服务**

**Files to create/modify:**
- `backend/app/services/generation.py` (update)

**Acceptance Criteria:**
- Uses ModelGateway and PromptManager
- Saves generated toolkit to database
- Updates job status throughout process

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Backend Developer

Task: Complete Generation Service implementation
- Integrate ModelGateway and PromptManager
- Parse LLM response into Toolkit model
- Save toolkit to database
- Update job status at each step

Restrictions:
- Handle LLM errors gracefully
- Validate LLM output against schema
- Maximum 3 retry attempts

_Leverage:
- ModelGateway from task 6.1
- PromptManager from task 6.2
- Toolkit schema from design.md §5.1

_Requirements: REQ-3

Success:
- Full generation flow works
- Toolkit saved to database
- Job status updates correctly

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

## Phase 7: Toolkit Dashboard (工具集仪表板)

### Task 7.1: Create Toolkit Page Structure
- [ ] **创建 Toolkit Dashboard 页面结构**

**Files to create:**
- `frontend/app/u/[username]/page.tsx`
- `frontend/components/toolkit/toolkit-header.tsx`
- `frontend/components/toolkit/action-buttons.tsx`

**Acceptance Criteria:**
- Dynamic route with generateStaticParams
- Header with breadcrumb, title, action buttons
- SSG for SEO

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Senior Frontend Developer

Task: Create Toolkit Dashboard page structure
- Set up dynamic route /u/[username]
- Implement generateStaticParams for SSG
- Create ToolkitHeader with breadcrumb and title
- Add ActionButtons (Clone, Share, Edit)

Restrictions:
- Must be SSG (generateStaticParams)
- Follow SEO requirements from requirements.md REQ-5
- Match UI from uidesign/工具集生成页/screen.png

_Leverage:
- HTML reference: uidesign/工具集生成页/code.html
- SEO: requirements.md REQ-5

_Requirements: REQ-4, REQ-5

Success:
- Page renders for valid username
- 404 for invalid username
- Header matches design

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 7.2: Create Work Mode Section
- [ ] **实现 Work Mode 工具卡片区域**

**Files to create:**
- `frontend/components/toolkit/work-mode-section.tsx`
- `frontend/components/toolkit/tool-card.tsx`

**Acceptance Criteria:**
- Blue theme header
- 2-column tool card grid
- Staggered entrance animation
- Hover effects on cards

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer

Task: Build Work Mode section for Toolkit Dashboard
- Create WorkModeSection with blue theme
- Build ToolCard component (logo, name, rating, description, CTA)
- Add stagger animation for cards
- Implement hover lift effect

Restrictions:
- Match UI from uidesign/工具集生成页/screen.png
- Use primary (#2b6cee) for Work Mode accent
- 2 columns on desktop, 1 on mobile

_Leverage:
- HTML reference: uidesign/工具集生成页/code.html lines 73-118
- ToolCard code: design.md §2.3.3
- Animation: requirements.md REQ-4 (Toolkit Dashboard Animations)

_Requirements: REQ-4

Success:
- Section matches design
- Cards animate on scroll
- Hover effect works

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 7.3: Create Life Mode Section
- [ ] **实现 Life Mode 工具卡片区域**

**Files to create:**
- `frontend/components/toolkit/life-mode-section.tsx`
- `frontend/components/toolkit/hero-tool-card.tsx`

**Acceptance Criteria:**
- Orange theme header
- Hero-style cards with background images
- Parallax hover effect

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer

Task: Build Life Mode section for Toolkit Dashboard
- Create LifeModeSection with orange theme
- Build HeroToolCard with background image and overlay
- Add parallax hover effect (background scale)
- Stack cards vertically

Restrictions:
- Match UI from uidesign/工具集生成页/screen.png
- Use orange-500 for Life Mode accent
- Background images must lazy load

_Leverage:
- HTML reference: uidesign/工具集生成页/code.html lines 119-141
- Animation: requirements.md REQ-4

_Requirements: REQ-4

Success:
- Section matches design
- Background images load correctly
- Hover parallax works

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 7.4: Create Kit Specs Sidebar
- [ ] **实现 Kit Specs 侧边栏**

**Files to create:**
- `frontend/components/toolkit/kit-specs-sidebar.tsx`

**Acceptance Criteria:**
- Sticky sidebar on desktop
- Stats: Total Tools, Monthly Cost, Primary Goal, Updated
- Expandable "Why this kit?" section
- Table format for GEO scraping

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer

Task: Build Kit Specs sidebar for Toolkit Dashboard
- Create sticky sidebar with stats
- Add expandable "Why this kit?" details element
- Use <table> for stats (SEO/GEO requirement)
- Animate expand/collapse

Restrictions:
- Match UI from uidesign/工具集生成页/screen.png
- Must use semantic <table> for stats (REQ-5.4)
- Sidebar sticky on lg+ screens only

_Leverage:
- HTML reference: uidesign/工具集生成页/code.html lines 145-178
- SEO: requirements.md REQ-5.4

_Requirements: REQ-4, REQ-5

Success:
- Sidebar matches design
- Sticky behavior works
- Table renders for SEO

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 7.5: Create SEO Components
- [ ] **实现 SEO/GEO 组件**

**Files to create:**
- `frontend/components/seo/schema-markup.tsx`
- `frontend/components/seo/geo-box.tsx`
- `frontend/components/seo/faq-section.tsx`

**Acceptance Criteria:**
- JSON-LD injection (CollectionPage, FAQPage, BreadcrumbList)
- GEO Direct Answer Box
- FAQ section with microdata

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer specializing in SEO

Task: Build SEO components for Toolkit Dashboard
- Create SchemaMarkup with JSON-LD injection
- Build GeoBox for direct answer (inverted pyramid)
- Create FAQSection with Schema.org microdata

Restrictions:
- JSON-LD must include all schemas from REQ-5.5
- GeoBox must appear immediately after H1
- FAQ must use itemscope/itemprop attributes

_Leverage:
- SchemaMarkup code: design.md §2.3.4
- GEO requirements: requirements.md REQ-5.8

_Requirements: REQ-5

Success:
- Rich Results Test passes
- JSON-LD includes all required schemas
- FAQ displays with correct markup

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 7.6: Assemble Toolkit Dashboard
- [ ] **组装完整 Toolkit Dashboard**

**Files to modify:**
- `frontend/app/u/[username]/page.tsx`

**Acceptance Criteria:**
- All sections assembled with correct layout
- Dynamic metadata generation
- Mobile responsive (tab switcher)

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Senior Frontend Developer

Task: Assemble complete Toolkit Dashboard page
- Compose all toolkit components
- Add generateMetadata for dynamic SEO
- Implement mobile tab switcher for Work/Life
- Add entrance animations

Restrictions:
- Desktop: 70/30 split layout
- Mobile: Tab switcher instead of split
- All content must be SSG

_Leverage:
- All toolkit components from tasks 7.1-7.5
- Metadata: design.md §3.2 (generateMetadata)
- Layout: requirements.md REQ-4

_Requirements: REQ-4, REQ-5

Success:
- Desktop layout matches design
- Mobile tabs work
- SEO score > 90

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

## Phase 8: Backend APIs & Integration (后端 API 完善)

### Task 8.1: Implement Toolkit CRUD API
- [ ] **实现 Toolkit CRUD API**

**Files to create:**
- `backend/app/api/v1/toolkit.py`
- `backend/app/schemas/toolkit.py`
- `backend/app/services/toolkit.py`

**Acceptance Criteria:**
- GET /toolkit/{username} - Get public toolkit
- POST /toolkit/clone/{id} - Clone toolkit
- PUT /toolkit/{id} - Update toolkit (auth required)

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Backend Developer

Task: Implement Toolkit CRUD API
- Create GET endpoint for public toolkit by username
- Create POST endpoint for cloning
- Create PUT endpoint for updating (requires auth)
- Add proper error handling

Restrictions:
- Use Pydantic for validation
- Clone creates new record linked to user
- Update only allowed by owner

_Leverage:
- API design: design.md §3.2.2
- Schemas: design.md §3.3

_Requirements: REQ-6

Success:
- GET returns toolkit data
- Clone creates new toolkit
- Update modifies toolkit

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 8.2: Implement Tools API
- [ ] **实现工具目录 API**

**Files to create:**
- `backend/app/api/v1/tools.py`
- `backend/app/schemas/tool.py`
- `backend/app/services/tool.py`

**Acceptance Criteria:**
- GET /tools - List all tools with filtering
- GET /tools/{slug} - Get single tool
- Search by category, pricing

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Backend Developer

Task: Implement Tools API
- Create GET /tools with pagination and filtering
- Create GET /tools/{slug} for single tool
- Add filters: category, pricing_model, search query
- Include tool count in response

Restrictions:
- Maximum 50 tools per page
- Filter by category enum
- Sort by rating or name

_Leverage:
- Tool schema: design.md §5.1

_Requirements: REQ-3 (tool database)

Success:
- List returns paginated tools
- Filters work correctly
- Single tool returns full data

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

## Phase 9: SEO Infrastructure (SEO 基础设施)

### Task 9.1: Create Sitemap & Robots
- [ ] **实现动态 Sitemap 和 Robots.txt**

**Files to create:**
- `frontend/app/sitemap.ts`
- `frontend/app/robots.ts`

**Acceptance Criteria:**
- Dynamic sitemap with all toolkit URLs
- Robots.txt with AI bot rules
- Sitemap updates on new toolkit creation

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer specializing in SEO

Task: Create Sitemap and Robots.txt
- Implement dynamic sitemap.ts
- Implement robots.ts with AI bot rules
- Include all public toolkit URLs
- Add priority and changeFrequency

Restrictions:
- Follow format from requirements.md REQ-5.7
- Include GPTBot, PerplexityBot rules
- Sitemap must be valid XML

_Leverage:
- Sitemap code: design.md (from dev-guidance.md reference)
- Robots format: requirements.md REQ-5.7

_Requirements: REQ-5

Success:
- /sitemap.xml returns valid XML
- /robots.txt includes AI bot rules
- All toolkit URLs in sitemap

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 9.2: Create Directory Page
- [ ] **实现 HTML Sitemap (Directory)**

**Files to create:**
- `frontend/app/directory/page.tsx`

**Acceptance Criteria:**
- Lists all public toolkits alphabetically
- Grouped by profession category
- Internal links for crawl depth

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer

Task: Create Directory page (HTML Sitemap)
- List all public toolkits
- Group by profession category
- Add alphabet navigation
- Include link count per category

Restrictions:
- Must be SSG
- Follow internal linking from REQ-5.3
- Responsive grid layout

_Leverage:
- Internal linking: requirements.md REQ-5.3

_Requirements: REQ-5

Success:
- Page lists all toolkits
- Grouped by category
- Links work correctly

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

## Phase 10: Polish & Testing (完善与测试)

### Task 10.1: Add Error Pages
- [ ] **添加错误页面**

**Files to create:**
- `frontend/app/not-found.tsx`
- `frontend/app/error.tsx`

**Acceptance Criteria:**
- Custom 404 page with navigation
- Error boundary with retry option
- Match design system

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Frontend Developer

Task: Create error pages
- Build custom 404 page
- Build error boundary page
- Add "Return to Home" button
- Match design system

Restrictions:
- Follow design system from requirements.md §6
- Include search suggestion
- Friendly, helpful messaging

_Requirements: REQ (from 7.2 page list - 404/Error P3)

Success:
- 404 shows for invalid routes
- Error page catches runtime errors
- Navigation works from error pages

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

### Task 10.2: Performance Optimization
- [ ] **性能优化**

**Files to modify:**
- Various components for optimization

**Acceptance Criteria:**
- Lighthouse Performance > 90
- LCP < 2.5s
- CLS < 0.1

**_Prompt:**
```
Implement the task for spec maxmate-ai, first run spec-workflow-guide to get the workflow guide then implement the task:

Role: Performance Engineer

Task: Optimize MaxMate.ai performance
- Audit with Lighthouse
- Optimize images (next/image, WebP)
- Add loading="lazy" to below-fold content
- Minimize JavaScript bundle

Restrictions:
- Do not break functionality
- Prioritize Core Web Vitals
- Test on slow 3G connection

_Requirements: REQ-5 (Performance > 90)

Success:
- Lighthouse Performance > 90
- LCP < 2.5 seconds
- No layout shifts

After completion:
1. Mark this task as [-] in-progress before starting
2. Use log-implementation tool to record what was created
3. Mark task as [x] completed
```

---

## Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| Phase 1: Setup | 1.1, 1.2, 1.3 | [ ] |
| Phase 2: UI Components | 2.1, 2.2, 2.3 | [ ] |
| Phase 3: Homepage | 3.1, 3.2, 3.3, 3.4 | [ ] |
| Phase 4: Onboarding | 4.1, 4.2, 4.3, 4.4 | [ ] |
| Phase 5: Generation | 5.1, 5.2 | [ ] |
| Phase 6: LLM | 6.1, 6.2, 6.3 | [ ] |
| Phase 7: Dashboard | 7.1-7.6 | [ ] |
| Phase 8: Backend | 8.1, 8.2 | [ ] |
| Phase 9: SEO | 9.1, 9.2 | [ ] |
| Phase 10: Polish | 10.1, 10.2 | [ ] |

**Total Tasks: 27**
**Estimated Time: 40-60 hours**

