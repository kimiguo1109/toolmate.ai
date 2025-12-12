# MaxMate.ai - Technical Design Document

## 1. Overview

本文档定义 MaxMate.ai 的技术架构、数据流、API 设计和组件结构。

### 1.1 系统架构概览

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Homepage  │  │  Onboarding │  │   Loading   │  │  Dashboard  │        │
│  │   (SSG)     │  │   (CSR)     │  │   (CSR)     │  │   (SSG)     │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │                │
│         └────────────────┴────────────────┴────────────────┘                │
│                                   │                                         │
│                          Next.js 15 App Router                              │
│                          (React Server Components)                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API LAYER                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     FastAPI Backend                                  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │   │
│  │  │ /api/generate│  │ /api/toolkit │  │  /api/user   │              │   │
│  │  │   Toolkit    │  │    CRUD      │  │   Auth       │              │   │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │   │
│  │         │                 │                 │                       │   │
│  │         └─────────────────┴─────────────────┘                       │   │
│  │                           │                                         │   │
│  │                    Pydantic Validation                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AI/LLM LAYER                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     Model Gateway                                    │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │   │
│  │  │  OpenAI      │  │   Gemini     │  │   Claude     │              │   │
│  │  │  GPT-4       │  │   Pro        │  │   Sonnet     │              │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │   │
│  │         │                 │                 │                       │   │
│  │         └─────────────────┴─────────────────┘                       │   │
│  │                           │                                         │   │
│  │                    Prompt Manager                                   │   │
│  │                   (YAML Templates)                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                      │
│  │   Supabase   │  │    Redis     │  │   Pinecone   │                      │
│  │  (PostgreSQL)│  │   (Cache)    │  │  (Vectors)   │                      │
│  │              │  │              │  │              │                      │
│  │  - Users     │  │  - Sessions  │  │  - Tools DB  │                      │
│  │  - Toolkits  │  │  - Rate Limit│  │  - Embeddings│                      │
│  │  - Tools     │  │              │  │              │                      │
│  └──────────────┘  └──────────────┘  └──────────────┘                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture (Next.js 15)

### 2.1 目录结构

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Homepage (SSG)
│   ├── globals.css             # Global styles + Tailwind
│   │
│   ├── (auth)/                 # Auth route group
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   │
│   ├── onboarding/             # Onboarding flow
│   │   └── page.tsx            # Client component
│   │
│   ├── generate/               # Generation loading
│   │   └── page.tsx            # Client component with polling
│   │
│   ├── u/                      # User toolkit pages
│   │   └── [username]/
│   │       └── page.tsx        # SSG with generateStaticParams
│   │
│   ├── directory/              # HTML Sitemap
│   │   └── page.tsx            # SSG
│   │
│   ├── personas/               # Persona category hubs
│   │   └── [profession]/
│   │       └── page.tsx        # SSG
│   │
│   ├── api/                    # API Routes (Next.js)
│   │   └── og/[username]/
│   │       └── route.tsx       # Dynamic OG image generation
│   │
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # Robots.txt
│
├── components/
│   ├── ui/                     # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   │
│   ├── layout/                 # Layout components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── breadcrumb.tsx
│   │
│   ├── homepage/               # Homepage specific
│   │   ├── hero-section.tsx
│   │   ├── search-input.tsx
│   │   ├── feature-grid.tsx
│   │   ├── trending-pills.tsx
│   │   └── social-proof.tsx
│   │
│   ├── onboarding/             # Onboarding specific
│   │   ├── progress-bar.tsx
│   │   ├── hobby-grid.tsx
│   │   ├── hobby-tag.tsx
│   │   └── matching-indicator.tsx
│   │
│   ├── toolkit/                # Toolkit dashboard
│   │   ├── toolkit-header.tsx
│   │   ├── work-mode-section.tsx
│   │   ├── life-mode-section.tsx
│   │   ├── tool-card.tsx
│   │   ├── hero-tool-card.tsx
│   │   ├── kit-specs-sidebar.tsx
│   │   └── related-toolkits.tsx
│   │
│   ├── seo/                    # SEO components
│   │   ├── schema-markup.tsx
│   │   ├── geo-box.tsx
│   │   └── faq-section.tsx
│   │
│   └── animations/             # Motion components
│       ├── stagger-container.tsx
│       ├── fade-in.tsx
│       ├── hover-card.tsx
│       └── background-gradient.tsx
│
├── lib/
│   ├── api.ts                  # API client functions
│   ├── db.ts                   # Data fetching utilities
│   ├── utils.ts                # Helper functions
│   └── constants.ts            # App constants
│
├── hooks/
│   ├── use-generation.ts       # Generation polling hook
│   └── use-toolkit.ts          # Toolkit data hook
│
├── types/
│   ├── toolkit.ts              # Toolkit types
│   ├── tool.ts                 # Tool types
│   └── user.ts                 # User types
│
└── public/
    ├── icons/
    └── images/
```

### 2.2 关键页面渲染策略

| 页面 | 路由 | 渲染方式 | 原因 |
|------|------|----------|------|
| Homepage | `/` | SSG | SEO 关键，内容静态 |
| Login/Register | `/login`, `/register` | CSR | 无 SEO 需求 |
| Onboarding | `/onboarding` | CSR | 交互密集，无 SEO 需求 |
| Generation | `/generate` | CSR | 实时轮询，无 SEO 需求 |
| Toolkit Dashboard | `/u/[username]` | SSG | SEO 关键，`generateStaticParams` |
| Directory | `/directory` | SSG | SEO 内链 |
| Persona Hub | `/personas/[profession]` | SSG | SEO 分类页 |

### 2.3 核心组件设计

#### 2.3.1 SearchInput (Hero Section)

```tsx
// components/homepage/search-input.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
}

export function SearchInput({ placeholder = "I am a Product Manager who loves hiking..." }: SearchInputProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleGenerate = () => {
    if (value.trim()) {
      // Store in sessionStorage for onboarding
      sessionStorage.setItem("persona_input", value);
      router.push("/onboarding");
    }
  };

  return (
    <motion.div
      className="w-full max-w-[560px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.label
        className="flex h-16 rounded-full shadow-lg shadow-primary/20 overflow-hidden"
        animate={{
          boxShadow: isFocused
            ? "0 10px 40px rgba(43, 108, 238, 0.3)"
            : "0 10px 40px rgba(43, 108, 238, 0.1)",
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center pl-6 bg-white dark:bg-slate-900">
          <Search className="w-5 h-5 text-slate-500" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          placeholder={placeholder}
          className="flex-1 px-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none"
        />
        <div className="flex items-center pr-2 bg-white dark:bg-slate-900">
          <motion.button
            onClick={handleGenerate}
            className="h-12 px-6 rounded-full bg-primary text-white font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Generate
          </motion.button>
        </div>
      </motion.label>
    </motion.div>
  );
}
```

#### 2.3.2 HobbyGrid (Onboarding)

```tsx
// components/onboarding/hobby-grid.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HobbyTag } from "./hobby-tag";

const HOBBIES = [
  { id: "hiking", icon: "hiking", label: "Hiking" },
  { id: "gaming", icon: "stadia_controller", label: "Gaming" },
  { id: "reading", icon: "book", label: "Reading" },
  { id: "coding", icon: "code_blocks", label: "Coding" },
  { id: "cooking", icon: "restaurant_menu", label: "Cooking" },
  { id: "traveling", icon: "flight_takeoff", label: "Traveling" },
];

interface HobbyGridProps {
  onSelectionChange: (selected: string[]) => void;
}

export function HobbyGrid({ onSelectionChange }: HobbyGridProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleHobby = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    setSelected(newSelected);
    onSelectionChange(newSelected);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 p-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {HOBBIES.map((hobby) => (
        <motion.div key={hobby.id} variants={item}>
          <HobbyTag
            icon={hobby.icon}
            label={hobby.label}
            isSelected={selected.includes(hobby.id)}
            onClick={() => toggleHobby(hobby.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

#### 2.3.3 ToolCard (Toolkit Dashboard)

```tsx
// components/toolkit/tool-card.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

interface ToolCardProps {
  tool: {
    name: string;
    logo: string;
    rating: number;
    description: string;
    ctaText: string;
    ctaUrl: string;
  };
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <motion.article
      className="flex flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/30 p-5"
      whileHover={{
        y: -4,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image
          src={tool.logo}
          alt={`${tool.name} logo`}
          width={48}
          height={48}
          className="rounded-lg"
        />
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {tool.name}
          </h3>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < tool.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
        {tool.description}
      </p>

      {/* CTA */}
      <motion.a
        href={tool.ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full text-center rounded-full bg-primary/20 text-primary font-semibold py-2 text-sm"
        whileHover={{ backgroundColor: "rgba(43, 108, 238, 0.3)" }}
      >
        {tool.ctaText}
      </motion.a>
    </motion.article>
  );
}
```

#### 2.3.4 SchemaMarkup (SEO)

```tsx
// components/seo/schema-markup.tsx
import { Toolkit, Tool } from "@/types";

interface SchemaMarkupProps {
  toolkit: Toolkit;
  tools: Tool[];
}

export function SchemaMarkup({ toolkit, tools }: SchemaMarkupProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // CollectionPage
      {
        "@type": "CollectionPage",
        "name": `${toolkit.userName}'s AI Stack: ${toolkit.workContext} & ${toolkit.lifeContext}`,
        "description": toolkit.description,
        "url": `https://maxmate.ai/u/${toolkit.slug}`,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": tools.length,
          "itemListElement": tools.map((tool, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "SoftwareApplication",
              "name": tool.name,
              "applicationCategory": tool.category,
              "description": tool.description,
              "offers": {
                "@type": "Offer",
                "price": tool.price || "0",
                "priceCurrency": "USD",
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": tool.rating,
                "ratingCount": tool.reviewCount || 100,
              },
            },
          })),
        },
      },
      // FAQPage
      {
        "@type": "FAQPage",
        "mainEntity": toolkit.faq?.map((f) => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer,
          },
        })) || [],
      },
      // BreadcrumbList
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://maxmate.ai",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Personas",
            "item": "https://maxmate.ai/personas",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": toolkit.profession,
            "item": `https://maxmate.ai/personas/${toolkit.professionSlug}`,
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": `${toolkit.userName}'s Kit`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

---

## 3. Backend Architecture (FastAPI)

### 3.1 目录结构

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry
│   ├── config.py               # Environment config
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py             # Dependencies (auth, db)
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── router.py       # API router aggregator
│   │   │   ├── generate.py     # /api/v1/generate
│   │   │   ├── toolkit.py      # /api/v1/toolkit
│   │   │   ├── user.py         # /api/v1/user
│   │   │   └── tools.py        # /api/v1/tools
│   │   └── health.py           # Health check endpoint
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py             # User SQLAlchemy model
│   │   ├── toolkit.py          # Toolkit model
│   │   └── tool.py             # Tool model
│   │
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py             # User Pydantic schemas
│   │   ├── toolkit.py          # Toolkit schemas
│   │   ├── tool.py             # Tool schemas
│   │   └── generation.py       # Generation request/response
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── generation.py       # Toolkit generation logic
│   │   ├── toolkit.py          # Toolkit CRUD
│   │   └── user.py             # User service
│   │
│   ├── llm/
│   │   ├── __init__.py
│   │   ├── gateway.py          # Model Gateway (factory)
│   │   ├── providers/
│   │   │   ├── __init__.py
│   │   │   ├── openai.py       # OpenAI provider
│   │   │   ├── gemini.py       # Google Gemini provider
│   │   │   └── anthropic.py    # Anthropic Claude provider
│   │   └── prompts/
│   │       ├── __init__.py
│   │       ├── manager.py      # Prompt template manager
│   │       └── templates/
│   │           ├── base_system.yaml
│   │           ├── toolkit_generation.yaml
│   │           └── tool_matching.yaml
│   │
│   ├── db/
│   │   ├── __init__.py
│   │   ├── session.py          # Database session
│   │   └── base.py             # SQLAlchemy base
│   │
│   └── core/
│       ├── __init__.py
│       ├── security.py         # JWT, password hashing
│       └── exceptions.py       # Custom exceptions
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_generate.py
│   └── test_toolkit.py
│
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

### 3.2 API 端点设计

#### 3.2.1 Generation API

```python
# app/api/v1/generate.py
from fastapi import APIRouter, Depends, BackgroundTasks
from app.schemas.generation import GenerationRequest, GenerationResponse, GenerationStatus
from app.services.generation import GenerationService
from app.api.deps import get_current_user_optional

router = APIRouter(prefix="/generate", tags=["generation"])

@router.post("/", response_model=GenerationResponse)
async def create_generation(
    request: GenerationRequest,
    background_tasks: BackgroundTasks,
    user = Depends(get_current_user_optional),
):
    """
    Start toolkit generation process.
    Returns a job_id for polling status.
    """
    service = GenerationService()
    job_id = await service.start_generation(
        profession=request.profession,
        hobbies=request.hobbies,
        pain_points=request.pain_points,
        user_id=user.id if user else None,
    )
    
    # Start background generation
    background_tasks.add_task(service.run_generation, job_id)
    
    return GenerationResponse(
        job_id=job_id,
        status="processing",
        message="Toolkit generation started",
    )


@router.get("/{job_id}/status", response_model=GenerationStatus)
async def get_generation_status(job_id: str):
    """
    Poll generation status.
    Returns progress percentage and toolkit when complete.
    """
    service = GenerationService()
    return await service.get_status(job_id)
```

#### 3.2.2 Toolkit API

```python
# app/api/v1/toolkit.py
from fastapi import APIRouter, Depends, HTTPException
from app.schemas.toolkit import ToolkitResponse, ToolkitCreate, ToolkitUpdate
from app.services.toolkit import ToolkitService
from app.api.deps import get_current_user

router = APIRouter(prefix="/toolkit", tags=["toolkit"])

@router.get("/{username}", response_model=ToolkitResponse)
async def get_toolkit_by_username(username: str):
    """Get public toolkit by username slug."""
    service = ToolkitService()
    toolkit = await service.get_by_username(username)
    if not toolkit:
        raise HTTPException(status_code=404, detail="Toolkit not found")
    return toolkit


@router.post("/clone/{toolkit_id}", response_model=ToolkitResponse)
async def clone_toolkit(
    toolkit_id: str,
    user = Depends(get_current_user),
):
    """Clone an existing toolkit to user's account."""
    service = ToolkitService()
    return await service.clone(toolkit_id, user.id)


@router.put("/{toolkit_id}", response_model=ToolkitResponse)
async def update_toolkit(
    toolkit_id: str,
    data: ToolkitUpdate,
    user = Depends(get_current_user),
):
    """Update user's toolkit (add/remove tools)."""
    service = ToolkitService()
    return await service.update(toolkit_id, user.id, data)
```

### 3.3 Pydantic Schemas

```python
# app/schemas/generation.py
from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

class GenerationRequest(BaseModel):
    profession: str = Field(..., min_length=2, max_length=100, examples=["Product Manager"])
    hobbies: List[str] = Field(..., min_items=1, max_items=5, examples=[["hiking", "coding"]])
    pain_points: Optional[str] = Field(None, max_length=500)
    
    class Config:
        json_schema_extra = {
            "example": {
                "profession": "Product Manager",
                "hobbies": ["hiking", "coding"],
                "pain_points": "Need help with sprint planning and documentation"
            }
        }


class GenerationStatus(BaseModel):
    job_id: str
    status: str  # "processing" | "completed" | "failed"
    progress: int = Field(ge=0, le=100)
    message: Optional[str] = None
    toolkit_id: Optional[str] = None  # Set when completed
    toolkit_slug: Optional[str] = None


# app/schemas/toolkit.py
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ToolInToolkit(BaseModel):
    id: str
    name: str
    logo: str
    rating: float
    description: str
    category: str  # "work" | "life"
    price: Optional[float] = 0
    cta_text: str
    cta_url: str


class ToolkitResponse(BaseModel):
    id: str
    slug: str
    user_name: str
    profession: str
    profession_slug: str
    hobbies: List[str]
    work_context: str
    life_context: str
    description: str
    
    work_tools: List[ToolInToolkit]
    life_tools: List[ToolInToolkit]
    
    total_tools: int
    monthly_cost: float
    primary_goal: str
    
    faq: List[dict]
    
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
```

---

## 4. LLM Integration Architecture

### 4.1 Model Gateway (策略模式)

```python
# app/llm/gateway.py
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from app.llm.providers.openai import OpenAIProvider
from app.llm.providers.gemini import GeminiProvider
from app.llm.providers.anthropic import AnthropicProvider
from app.config import settings

class LLMProvider(ABC):
    """Abstract base class for LLM providers."""
    
    @abstractmethod
    async def generate(self, prompt: str, schema: Optional[Dict] = None) -> Dict[str, Any]:
        """Generate response from LLM."""
        pass


class ModelGateway:
    """
    Factory class for LLM provider selection.
    Supports dynamic model switching and fallback.
    """
    
    PROVIDERS = {
        "openai": OpenAIProvider,
        "gemini": GeminiProvider,
        "anthropic": AnthropicProvider,
    }
    
    def __init__(
        self,
        provider: str = "openai",
        model: str = "gpt-4o",
        fallback_provider: Optional[str] = "gemini",
    ):
        self.provider = provider
        self.model = model
        self.fallback_provider = fallback_provider
        self._client = self._create_client(provider, model)
    
    def _create_client(self, provider: str, model: str) -> LLMProvider:
        provider_class = self.PROVIDERS.get(provider)
        if not provider_class:
            raise ValueError(f"Unknown provider: {provider}")
        return provider_class(model=model)
    
    async def generate(self, prompt: str, schema: Optional[Dict] = None) -> Dict[str, Any]:
        """
        Generate response with automatic fallback.
        """
        try:
            return await self._client.generate(prompt, schema)
        except Exception as e:
            if self.fallback_provider:
                fallback_client = self._create_client(
                    self.fallback_provider,
                    settings.FALLBACK_MODEL,
                )
                return await fallback_client.generate(prompt, schema)
            raise e
```

### 4.2 OpenAI Provider

```python
# app/llm/providers/openai.py
from openai import AsyncOpenAI
from typing import Dict, Any, Optional
from app.llm.gateway import LLMProvider
from app.config import settings

class OpenAIProvider(LLMProvider):
    def __init__(self, model: str = "gpt-4o"):
        self.model = model
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    
    async def generate(self, prompt: str, schema: Optional[Dict] = None) -> Dict[str, Any]:
        messages = [
            {"role": "system", "content": "You are a helpful AI assistant."},
            {"role": "user", "content": prompt},
        ]
        
        kwargs = {
            "model": self.model,
            "messages": messages,
            "temperature": 0.7,
        }
        
        # Use structured output if schema provided
        if schema:
            kwargs["response_format"] = {"type": "json_object"}
        
        response = await self.client.chat.completions.create(**kwargs)
        
        content = response.choices[0].message.content
        
        if schema:
            import json
            return json.loads(content)
        
        return {"content": content}
```

### 4.3 Prompt Manager (模板化)

```python
# app/llm/prompts/manager.py
import yaml
from pathlib import Path
from typing import Dict, Any
from jinja2 import Template

class PromptManager:
    """
    Manages prompt templates stored in YAML files.
    Supports variable injection via Jinja2.
    """
    
    TEMPLATES_DIR = Path(__file__).parent / "templates"
    
    def __init__(self):
        self._cache: Dict[str, Dict] = {}
    
    def load_template(self, name: str) -> Dict[str, Any]:
        """Load prompt template from YAML file."""
        if name in self._cache:
            return self._cache[name]
        
        file_path = self.TEMPLATES_DIR / f"{name}.yaml"
        with open(file_path, "r", encoding="utf-8") as f:
            template = yaml.safe_load(f)
        
        self._cache[name] = template
        return template
    
    def render(self, name: str, variables: Dict[str, Any]) -> str:
        """
        Render prompt template with variables.
        """
        template_data = self.load_template(name)
        
        # Build prompt from template sections
        parts = []
        
        if "role" in template_data:
            parts.append(f"Role: {template_data['role']}")
        
        if "context" in template_data:
            context = Template(template_data["context"]).render(**variables)
            parts.append(f"Context: {context}")
        
        if "task" in template_data:
            task = Template(template_data["task"]).render(**variables)
            parts.append(f"Task: {task}")
        
        if "constraints" in template_data:
            constraints = "\n".join(f"- {c}" for c in template_data["constraints"])
            parts.append(f"Constraints:\n{constraints}")
        
        if "output_format" in template_data:
            parts.append(f"Output Format: {template_data['output_format']}")
        
        return "\n\n".join(parts)
```

### 4.4 Prompt Templates (YAML)

```yaml
# app/llm/prompts/templates/toolkit_generation.yaml
role: |
  You are MaxMate's Persona Engine™, an expert AI tool curator specializing in 
  matching AI tools to user profiles. You understand both professional workflows 
  and personal lifestyle optimization.

context: |
  User Profile:
  - Profession: {{ profession }}
  - Weekend Hobbies: {{ hobbies | join(', ') }}
  - Pain Points: {{ pain_points or 'Not specified' }}

task: |
  Select 10-15 AI tools that best match this user's profile.
  Classify each tool into either "Work Mode" (Mon-Fri professional tasks) or 
  "Life Mode" (Weekend personal activities).
  
  For each tool, provide:
  1. Why it matches the user's profession
  2. How it addresses their pain points
  3. Estimated time/cost savings

constraints:
  - Include at least 2 free tools in each mode
  - Work Mode tools must relate to {{ profession }} workflows
  - Life Mode tools must relate to {{ hobbies | join(' or ') }}
  - Descriptions must be 2-3 sentences explaining WHY this tool fits the user
  - Total monthly cost should not exceed $100 for all tools combined

output_format: |
  Return a valid JSON object with this structure:
  {
    "work_tools": [
      {
        "name": "Tool Name",
        "category": "work",
        "description": "Why this tool is perfect for {{ profession }}s...",
        "price": 0,
        "rating": 4.5
      }
    ],
    "life_tools": [...],
    "kit_summary": {
      "work_context": "SaaS Management & Team Collaboration",
      "life_context": "Outdoor Adventure & Fitness",
      "primary_goal": "Productivity",
      "monthly_cost": 45
    },
    "faq": [
      {
        "question": "Why these specific tools for {{ profession }}s?",
        "answer": "..."
      }
    ]
  }

recommended_model: gpt-4o
```

---

## 5. Data Models

### 5.1 Database Schema (PostgreSQL)

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Toolkits table
CREATE TABLE toolkits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    slug VARCHAR(100) UNIQUE NOT NULL,
    
    -- Profile data
    profession VARCHAR(100) NOT NULL,
    profession_slug VARCHAR(100) NOT NULL,
    hobbies TEXT[] NOT NULL,
    pain_points TEXT,
    
    -- Generated metadata
    work_context VARCHAR(200),
    life_context VARCHAR(200),
    description TEXT,
    primary_goal VARCHAR(50),
    monthly_cost DECIMAL(10, 2) DEFAULT 0,
    
    -- SEO data
    faq JSONB DEFAULT '[]',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Indexes
    INDEX idx_toolkits_profession_slug (profession_slug),
    INDEX idx_toolkits_user_id (user_id)
);

-- Tools master table (reference data)
CREATE TABLE tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo_url TEXT,
    description TEXT,
    category VARCHAR(50), -- e.g., "productivity", "fitness", "cooking"
    pricing_model VARCHAR(20), -- "free", "freemium", "paid"
    price_monthly DECIMAL(10, 2),
    rating DECIMAL(2, 1) DEFAULT 4.0,
    review_count INTEGER DEFAULT 0,
    website_url TEXT,
    
    -- Vector embedding for RAG
    embedding VECTOR(1536),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Toolkit-Tools junction table
CREATE TABLE toolkit_tools (
    toolkit_id UUID REFERENCES toolkits(id) ON DELETE CASCADE,
    tool_id UUID REFERENCES tools(id) ON DELETE CASCADE,
    mode VARCHAR(10) NOT NULL CHECK (mode IN ('work', 'life')),
    position INTEGER NOT NULL,
    custom_description TEXT, -- User-customized or AI-generated description
    
    PRIMARY KEY (toolkit_id, tool_id)
);

-- Generation jobs table (for async processing)
CREATE TABLE generation_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, processing, completed, failed
    progress INTEGER DEFAULT 0,
    
    -- Input data
    input_data JSONB NOT NULL,
    
    -- Output data
    toolkit_id UUID REFERENCES toolkits(id),
    error_message TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);
```

### 5.2 TypeScript Types (Frontend)

```typescript
// types/toolkit.ts
export interface Toolkit {
  id: string;
  slug: string;
  userName: string;
  profession: string;
  professionSlug: string;
  hobbies: string[];
  workContext: string;
  lifeContext: string;
  description: string;
  
  workTools: Tool[];
  lifeTools: Tool[];
  
  totalTools: number;
  monthlyCost: number;
  primaryGoal: string;
  
  faq: FAQ[];
  
  createdAt: string;
  updatedAt: string;
}

// types/tool.ts
export interface Tool {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  category: string;
  pricingModel: "free" | "freemium" | "paid";
  priceMonthly: number;
  rating: number;
  reviewCount: number;
  websiteUrl: string;
  
  // Context-specific
  customDescription?: string; // Why this tool matches the user
  mode: "work" | "life";
  position: number;
}

// types/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  toolkits: ToolkitSummary[];
}

export interface ToolkitSummary {
  id: string;
  slug: string;
  workContext: string;
  lifeContext: string;
  toolCount: number;
  updatedAt: string;
}

// types/api.ts
export interface GenerationRequest {
  profession: string;
  hobbies: string[];
  painPoints?: string;
}

export interface GenerationResponse {
  jobId: string;
  status: "processing" | "completed" | "failed";
  message?: string;
}

export interface GenerationStatus {
  jobId: string;
  status: "processing" | "completed" | "failed";
  progress: number;
  message?: string;
  toolkitId?: string;
  toolkitSlug?: string;
}
```

---

## 6. Animation System

### 6.1 Motion Variants Library

```typescript
// lib/animations.ts
import { Variants } from "framer-motion";

// Container variants for staggered children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Fade up animation for cards
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// Fade in from left (Work Mode section)
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// Fade in from right (Life Mode section)
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// Scale on hover for interactive elements
export const hoverScale = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 17 },
};

// Tap feedback
export const tapScale = {
  scale: 0.98,
};

// Card hover with shadow
export const cardHover = {
  y: -4,
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

// Background gradient animation
export const gradientAnimation = {
  background: [
    "linear-gradient(135deg, #f6f6f8 0%, #e8ebf0 100%)",
    "linear-gradient(135deg, #e8ebf0 0%, #f6f6f8 100%)",
    "linear-gradient(135deg, #f6f6f8 0%, #e8ebf0 100%)",
  ],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "linear",
  },
};
```

### 6.2 Reusable Animation Components

```tsx
// components/animations/stagger-container.tsx
"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import { ReactNode } from "react";

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export function StaggerContainer({ children, className, ...props }: StaggerContainerProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}


// components/animations/fade-in.tsx
"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { ReactNode } from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0, ...props }: FadeInProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}


// components/animations/scroll-reveal.tsx
"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { ReactNode } from "react";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export function ScrollReveal({ children, className, ...props }: ScrollRevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

---

## 7. Environment Configuration

### 7.1 Frontend (.env.local)

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=https://maxmate.ai

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature flags
NEXT_PUBLIC_ENABLE_AUTH=true
```

### 7.2 Backend (.env)

```env
# App
APP_ENV=development
DEBUG=true

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/maxmate

# Redis
REDIS_URL=redis://localhost:6379

# LLM Providers
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=...
ANTHROPIC_API_KEY=...

# Default model settings
DEFAULT_PROVIDER=openai
DEFAULT_MODEL=gpt-4o
FALLBACK_PROVIDER=gemini
FALLBACK_MODEL=gemini-1.5-pro

# JWT
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# Pinecone (Vector DB)
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=us-east-1
PINECONE_INDEX=maxmate-tools
```

---

## 8. Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PRODUCTION                                      │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                           Vercel                                     │   │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐           │   │
│  │  │   Next.js     │  │   Edge        │  │   ISR/SSG     │           │   │
│  │  │   Frontend    │  │   Functions   │  │   Pages       │           │   │
│  │  └───────────────┘  └───────────────┘  └───────────────┘           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         Railway / Render                             │   │
│  │  ┌───────────────┐  ┌───────────────┐                              │   │
│  │  │   FastAPI     │  │   Celery      │                              │   │
│  │  │   Backend     │  │   Workers     │                              │   │
│  │  └───────────────┘  └───────────────┘                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         Managed Services                             │   │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐           │   │
│  │  │   Supabase    │  │   Upstash     │  │   Pinecone    │           │   │
│  │  │   PostgreSQL  │  │   Redis       │  │   Vectors     │           │   │
│  │  └───────────────┘  └───────────────┘  └───────────────┘           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 9. Testing Strategy

| 层级 | 工具 | 覆盖范围 |
|------|------|----------|
| Unit Tests | Jest / Vitest | Components, hooks, utils |
| API Tests | pytest | FastAPI endpoints |
| Integration | Playwright | User flows (E2E) |
| Visual | Chromatic | Component regression |
| Performance | Lighthouse CI | Core Web Vitals |

---

## 10. Security Considerations

- **Input Validation**: All user inputs validated via Pydantic before LLM processing
- **Rate Limiting**: 10 generations/hour for anonymous, 50 for authenticated
- **API Keys**: All secrets in environment variables, never committed
- **CORS**: Whitelist only production domains
- **XSS Prevention**: React's default escaping + CSP headers
- **SQL Injection**: SQLAlchemy ORM with parameterized queries

