"""
AI Tools Database
A curated database of REAL AI tools with accurate information
Focus: 1-2 LLMs + vertical/niche tools for each profession

Future integration modes:
1. Crawler - scrape data from tools
2. Prompt optimization - enhance tool usage
3. Free API - integrate free tier APIs
4. Paid API - premium integrations
"""

from typing import List, Dict, Any, Optional
from dataclasses import dataclass, asdict
from enum import Enum


class ToolCategory(str, Enum):
    LLM = "LLM"  # General language models (limit 1-2 per toolkit)
    CODE_ASSISTANT = "Code Assistant"
    PROJECT_MGMT = "Project Management"
    DESIGN = "Design"
    ANALYTICS = "Analytics"
    MARKETING = "Marketing"
    SEO = "SEO"
    WRITING = "Writing"
    RESEARCH = "Research"
    DATA = "Data"
    COMMUNICATION = "Communication"
    AUTOMATION = "Automation"
    TESTING = "Testing"
    MONITORING = "Monitoring"
    FINANCE = "Finance"
    HR = "HR"
    EDUCATION = "Education"
    IMAGE_GEN = "Image Generation"
    VIDEO = "Video"
    AUDIO = "Audio"
    LIFESTYLE = "Lifestyle"
    FITNESS = "Fitness"
    TRAVEL = "Travel"


class IntegrationMode(str, Enum):
    """How we can integrate this tool into our platform"""
    CRAWLER = "crawler"          # Scrape data
    FREE_API = "free_api"        # Use free API tier
    PAID_API = "paid_api"        # Paid API integration
    PROMPT = "prompt"            # Prompt-based enhancement
    IFRAME = "iframe"            # Embed via iframe
    REDIRECT = "redirect"        # Simple redirect (basic)


@dataclass
class AITool:
    """Represents a real AI tool with verified information"""
    id: str
    name: str
    description: str
    category: ToolCategory
    logo_color: str
    logo_url: Optional[str]
    website_url: str
    pricing_type: str  # "free", "freemium", "paid"
    price_monthly: float
    rating: float
    tags: List[str]
    professions: List[str]
    hobbies: List[str]
    cta_text: str
    features: List[str]
    # Integration info for future plugin system
    integration_mode: IntegrationMode
    api_available: bool
    has_free_tier: bool
    
    def to_work_tool(self) -> Dict[str, Any]:
        """Convert to work tool format for frontend"""
        return {
            "name": self.name,
            "logo": self.logo_color,
            "logoUrl": self.logo_url,
            "rating": self.rating,
            "description": self.description,
            "ctaText": self.cta_text,
            "category": self.category.value,
            "price": self.price_monthly,
            "url": self.website_url,
            "integrationMode": self.integration_mode.value,
            "apiAvailable": self.api_available,
        }
    
    def to_life_tool(self, background_image: str = "") -> Dict[str, Any]:
        """Convert to life tool format for frontend"""
        return {
            "name": self.name,
            "description": self.description,
            "backgroundImage": background_image,
            "url": self.website_url,
        }


# =============================================================================
# REAL AI TOOLS DATABASE
# Strategy: 1-2 LLMs max, rest are VERTICAL/NICHE tools
# =============================================================================

AI_TOOLS_DATABASE: List[AITool] = [
    
    # =========================================================================
    # GENERAL LLMs (Limit 1-2 per toolkit)
    # =========================================================================
    AITool(
        id="chatgpt",
        name="ChatGPT",
        description="OpenAI's versatile AI assistant for writing, coding, and analysis.",
        category=ToolCategory.LLM,
        logo_color="#10A37F",
        logo_url="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
        website_url="https://chat.openai.com",
        pricing_type="freemium",
        price_monthly=20,
        rating=4.9,
        tags=["general", "writing", "coding"],
        professions=["product-manager", "developer", "designer", "marketer", "writer", "data-scientist", "consultant"],
        hobbies=["writing", "coding"],
        cta_text="Try Free",
        features=["GPT-4", "Code interpreter", "Plugins"],
        integration_mode=IntegrationMode.PAID_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="claude",
        name="Claude",
        description="Anthropic's AI for nuanced analysis and long-form content.",
        category=ToolCategory.LLM,
        logo_color="#D4A574",
        logo_url=None,
        website_url="https://claude.ai",
        pricing_type="freemium",
        price_monthly=20,
        rating=4.8,
        tags=["analysis", "writing", "research"],
        professions=["writer", "researcher", "consultant", "product-manager"],
        hobbies=["writing", "reading"],
        cta_text="Try Free",
        features=["200K context", "Artifacts"],
        integration_mode=IntegrationMode.PAID_API,
        api_available=True,
        has_free_tier=True,
    ),
    
    # =========================================================================
    # PRODUCT MANAGER VERTICAL TOOLS
    # =========================================================================
    AITool(
        id="linear",
        name="Linear",
        description="Streamlined issue tracking built for modern product teams.",
        category=ToolCategory.PROJECT_MGMT,
        logo_color="#5E6AD2",
        logo_url=None,
        website_url="https://linear.app",
        pricing_type="freemium",
        price_monthly=8,
        rating=4.9,
        tags=["project", "issues", "agile", "roadmap"],
        professions=["product-manager", "developer", "designer"],
        hobbies=[],
        cta_text="Start Free",
        features=["Cycles", "Roadmaps", "GitHub sync", "Keyboard-first"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="productboard",
        name="Productboard",
        description="AI-powered product management to prioritize features based on customer feedback.",
        category=ToolCategory.PROJECT_MGMT,
        logo_color="#FF6B35",
        logo_url=None,
        website_url="https://productboard.com",
        pricing_type="paid",
        price_monthly=25,
        rating=4.6,
        tags=["roadmap", "feedback", "prioritization"],
        professions=["product-manager"],
        hobbies=[],
        cta_text="Request Demo",
        features=["AI insights", "Customer portal", "Roadmap views"],
        integration_mode=IntegrationMode.PAID_API,
        api_available=True,
        has_free_tier=False,
    ),
    AITool(
        id="amplitude",
        name="Amplitude",
        description="Product analytics to understand user behavior and drive growth.",
        category=ToolCategory.ANALYTICS,
        logo_color="#1E61B4",
        logo_url=None,
        website_url="https://amplitude.com",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.7,
        tags=["analytics", "user-behavior", "funnel"],
        professions=["product-manager", "data-scientist", "marketer"],
        hobbies=[],
        cta_text="Start Free",
        features=["Cohort analysis", "Funnel reports", "AI insights"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="hotjar",
        name="Hotjar",
        description="Heatmaps and session recordings to see exactly how users interact.",
        category=ToolCategory.ANALYTICS,
        logo_color="#FF3C00",
        logo_url=None,
        website_url="https://hotjar.com",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.6,
        tags=["heatmaps", "recordings", "surveys", "feedback"],
        professions=["product-manager", "designer", "marketer"],
        hobbies=[],
        cta_text="Start Free",
        features=["Heatmaps", "Session replay", "Surveys", "Feedback"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="loom",
        name="Loom",
        description="Async video messaging for quick demos, updates, and feedback.",
        category=ToolCategory.COMMUNICATION,
        logo_color="#625DF5",
        logo_url=None,
        website_url="https://loom.com",
        pricing_type="freemium",
        price_monthly=15,
        rating=4.7,
        tags=["video", "async", "communication", "demos"],
        professions=["product-manager", "designer", "marketer", "consultant"],
        hobbies=[],
        cta_text="Record Free",
        features=["Screen recording", "AI summaries", "Comments", "CTA buttons"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    
    # =========================================================================
    # DEVELOPER VERTICAL TOOLS
    # =========================================================================
    AITool(
        id="github-copilot",
        name="GitHub Copilot",
        description="AI pair programmer that suggests code in real-time.",
        category=ToolCategory.CODE_ASSISTANT,
        logo_color="#000000",
        logo_url="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        website_url="https://github.com/features/copilot",
        pricing_type="paid",
        price_monthly=10,
        rating=4.9,
        tags=["coding", "autocomplete", "ai"],
        professions=["developer", "software-engineer", "data-scientist", "blockchain-engineer"],
        hobbies=["coding"],
        cta_text="Try Free",
        features=["Code suggestions", "Multi-language", "IDE integration"],
        integration_mode=IntegrationMode.PAID_API,
        api_available=False,
        has_free_tier=False,
    ),
    AITool(
        id="raycast",
        name="Raycast",
        description="Productivity launcher with AI commands, snippets, and integrations.",
        category=ToolCategory.AUTOMATION,
        logo_color="#FF6363",
        logo_url=None,
        website_url="https://raycast.com",
        pricing_type="freemium",
        price_monthly=8,
        rating=4.9,
        tags=["productivity", "launcher", "automation", "shortcuts"],
        professions=["developer", "designer", "product-manager"],
        hobbies=["coding"],
        cta_text="Download Free",
        features=["AI commands", "Snippets", "Extensions", "Clipboard history"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="sentry",
        name="Sentry",
        description="Application monitoring and error tracking with AI-powered insights.",
        category=ToolCategory.MONITORING,
        logo_color="#362D59",
        logo_url=None,
        website_url="https://sentry.io",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.8,
        tags=["errors", "monitoring", "debugging", "performance"],
        professions=["developer", "software-engineer"],
        hobbies=[],
        cta_text="Start Free",
        features=["Error tracking", "Performance", "Session replay", "AI suggestions"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="postman",
        name="Postman",
        description="API platform for building, testing, and documenting APIs.",
        category=ToolCategory.TESTING,
        logo_color="#FF6C37",
        logo_url=None,
        website_url="https://postman.com",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.7,
        tags=["api", "testing", "documentation", "collaboration"],
        professions=["developer", "software-engineer", "blockchain-engineer"],
        hobbies=["coding"],
        cta_text="Start Free",
        features=["API testing", "Mock servers", "Documentation", "Workspaces"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="vercel",
        name="Vercel",
        description="Deploy and scale web applications with AI-powered features.",
        category=ToolCategory.AUTOMATION,
        logo_color="#000000",
        logo_url=None,
        website_url="https://vercel.com",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.8,
        tags=["deployment", "hosting", "serverless", "edge"],
        professions=["developer", "software-engineer"],
        hobbies=["coding"],
        cta_text="Deploy Free",
        features=["Edge functions", "Analytics", "AI SDK", "Preview deploys"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    
    # =========================================================================
    # DESIGNER VERTICAL TOOLS
    # =========================================================================
    AITool(
        id="figma",
        name="Figma",
        description="Collaborative design tool for UI/UX with AI-powered features.",
        category=ToolCategory.DESIGN,
        logo_color="#F24E1E",
        logo_url="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
        website_url="https://figma.com",
        pricing_type="freemium",
        price_monthly=15,
        rating=4.9,
        tags=["design", "ui", "prototyping", "collaboration"],
        professions=["designer", "product-manager"],
        hobbies=["art"],
        cta_text="Try Free",
        features=["Dev mode", "Prototyping", "Components", "Plugins"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="maze",
        name="Maze",
        description="Rapid testing platform to validate designs with real users.",
        category=ToolCategory.TESTING,
        logo_color="#00D280",
        logo_url=None,
        website_url="https://maze.co",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.6,
        tags=["usability", "testing", "research", "prototypes"],
        professions=["designer", "product-manager", "researcher"],
        hobbies=[],
        cta_text="Test Free",
        features=["Usability tests", "Prototype testing", "Reports", "Figma integration"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="spline",
        name="Spline",
        description="3D design tool for creating interactive experiences in the browser.",
        category=ToolCategory.DESIGN,
        logo_color="#0000FF",
        logo_url=None,
        website_url="https://spline.design",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.7,
        tags=["3d", "interactive", "web", "animation"],
        professions=["designer", "game-designer"],
        hobbies=["art"],
        cta_text="Create Free",
        features=["3D modeling", "Animations", "Interactions", "Web export"],
        integration_mode=IntegrationMode.IFRAME,
        api_available=False,
        has_free_tier=True,
    ),
    AITool(
        id="rive",
        name="Rive",
        description="Create and ship interactive animations for apps and games.",
        category=ToolCategory.DESIGN,
        logo_color="#1D1D1D",
        logo_url=None,
        website_url="https://rive.app",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.8,
        tags=["animation", "interactive", "runtime", "lightweight"],
        professions=["designer", "developer", "game-designer"],
        hobbies=["art"],
        cta_text="Animate Free",
        features=["State machines", "Lightweight runtime", "iOS/Android/Web"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="coolors",
        name="Coolors",
        description="Super fast color palette generator for designers.",
        category=ToolCategory.DESIGN,
        logo_color="#00CCCC",
        logo_url=None,
        website_url="https://coolors.co",
        pricing_type="freemium",
        price_monthly=3,
        rating=4.8,
        tags=["colors", "palette", "generator", "accessibility"],
        professions=["designer", "marketer"],
        hobbies=["art", "photography"],
        cta_text="Generate Free",
        features=["AI palette", "Contrast checker", "Export", "Collections"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    
    # =========================================================================
    # MARKETER VERTICAL TOOLS
    # =========================================================================
    AITool(
        id="semrush",
        name="Semrush",
        description="All-in-one SEO toolkit for keyword research and competitor analysis.",
        category=ToolCategory.SEO,
        logo_color="#FF642D",
        logo_url=None,
        website_url="https://semrush.com",
        pricing_type="paid",
        price_monthly=130,
        rating=4.7,
        tags=["seo", "keywords", "competitors", "backlinks"],
        professions=["marketer", "writer"],
        hobbies=[],
        cta_text="Try Free",
        features=["Keyword magic", "Site audit", "Position tracking", "AI writer"],
        integration_mode=IntegrationMode.PAID_API,
        api_available=True,
        has_free_tier=False,
    ),
    AITool(
        id="ahrefs",
        name="Ahrefs",
        description="SEO toolset for backlink analysis, keyword research, and content.",
        category=ToolCategory.SEO,
        logo_color="#FF8C00",
        logo_url=None,
        website_url="https://ahrefs.com",
        pricing_type="paid",
        price_monthly=99,
        rating=4.8,
        tags=["seo", "backlinks", "keywords", "content"],
        professions=["marketer", "writer"],
        hobbies=[],
        cta_text="Start Trial",
        features=["Site explorer", "Keywords explorer", "Content explorer", "Rank tracker"],
        integration_mode=IntegrationMode.PAID_API,
        api_available=True,
        has_free_tier=False,
    ),
    AITool(
        id="buffer",
        name="Buffer",
        description="Social media management with AI-powered scheduling and analytics.",
        category=ToolCategory.MARKETING,
        logo_color="#2C4BFF",
        logo_url=None,
        website_url="https://buffer.com",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.5,
        tags=["social", "scheduling", "analytics", "content"],
        professions=["marketer", "entrepreneur"],
        hobbies=[],
        cta_text="Start Free",
        features=["Scheduling", "Analytics", "AI assistant", "Link in bio"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="mailchimp",
        name="Mailchimp",
        description="Email marketing platform with AI content suggestions and automation.",
        category=ToolCategory.MARKETING,
        logo_color="#FFE01B",
        logo_url=None,
        website_url="https://mailchimp.com",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.5,
        tags=["email", "automation", "campaigns", "crm"],
        professions=["marketer", "entrepreneur"],
        hobbies=[],
        cta_text="Start Free",
        features=["Email builder", "Automation", "AI content", "Analytics"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="beehiiv",
        name="Beehiiv",
        description="Newsletter platform built for growth with monetization features.",
        category=ToolCategory.MARKETING,
        logo_color="#FFC107",
        logo_url=None,
        website_url="https://beehiiv.com",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.7,
        tags=["newsletter", "growth", "monetization", "analytics"],
        professions=["marketer", "writer", "entrepreneur"],
        hobbies=["writing"],
        cta_text="Launch Free",
        features=["Recommendations", "Paid subscriptions", "Ad network", "Analytics"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    
    # =========================================================================
    # DATA SCIENTIST VERTICAL TOOLS
    # =========================================================================
    AITool(
        id="weights-biases",
        name="Weights & Biases",
        description="ML experiment tracking, model registry, and collaboration.",
        category=ToolCategory.DATA,
        logo_color="#FFBE00",
        logo_url=None,
        website_url="https://wandb.ai",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.8,
        tags=["ml", "experiments", "tracking", "models"],
        professions=["data-scientist", "developer"],
        hobbies=["coding"],
        cta_text="Start Free",
        features=["Experiment tracking", "Model registry", "Sweeps", "Reports"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="streamlit",
        name="Streamlit",
        description="Turn Python scripts into shareable web apps in minutes.",
        category=ToolCategory.DATA,
        logo_color="#FF4B4B",
        logo_url=None,
        website_url="https://streamlit.io",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.7,
        tags=["python", "dashboard", "data-viz", "apps"],
        professions=["data-scientist", "developer"],
        hobbies=["coding"],
        cta_text="Build Free",
        features=["Python only", "Hot reload", "Widgets", "Community cloud"],
        integration_mode=IntegrationMode.IFRAME,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="hex",
        name="Hex",
        description="Collaborative data workspace for SQL, Python, and visualization.",
        category=ToolCategory.DATA,
        logo_color="#5E42D2",
        logo_url=None,
        website_url="https://hex.tech",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.6,
        tags=["sql", "python", "notebooks", "visualization"],
        professions=["data-scientist", "analyst"],
        hobbies=[],
        cta_text="Start Free",
        features=["SQL + Python", "Drag-drop viz", "Sharing", "Scheduling"],
        integration_mode=IntegrationMode.IFRAME,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="kaggle",
        name="Kaggle",
        description="Data science community with competitions, datasets, and notebooks.",
        category=ToolCategory.DATA,
        logo_color="#20BEFF",
        logo_url=None,
        website_url="https://kaggle.com",
        pricing_type="free",
        price_monthly=0,
        rating=4.8,
        tags=["competitions", "datasets", "notebooks", "community"],
        professions=["data-scientist", "student"],
        hobbies=["coding"],
        cta_text="Join Free",
        features=["Free GPUs", "Datasets", "Competitions", "Learn"],
        integration_mode=IntegrationMode.IFRAME,
        api_available=True,
        has_free_tier=True,
    ),
    
    # =========================================================================
    # WRITER VERTICAL TOOLS
    # =========================================================================
    AITool(
        id="grammarly",
        name="Grammarly",
        description="AI writing assistant for grammar, clarity, and tone.",
        category=ToolCategory.WRITING,
        logo_color="#15C39A",
        logo_url=None,
        website_url="https://grammarly.com",
        pricing_type="freemium",
        price_monthly=12,
        rating=4.6,
        tags=["grammar", "writing", "clarity", "tone"],
        professions=["writer", "marketer", "student"],
        hobbies=["writing"],
        cta_text="Write Free",
        features=["Grammar", "Tone", "Plagiarism", "Rewrite"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=False,
        has_free_tier=True,
    ),
    AITool(
        id="hemingway",
        name="Hemingway Editor",
        description="Makes your writing bold and clear by highlighting complex sentences.",
        category=ToolCategory.WRITING,
        logo_color="#54B5E0",
        logo_url=None,
        website_url="https://hemingwayapp.com",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.5,
        tags=["clarity", "readability", "editing"],
        professions=["writer", "marketer", "student"],
        hobbies=["writing"],
        cta_text="Edit Free",
        features=["Readability score", "Sentence highlights", "Desktop app"],
        integration_mode=IntegrationMode.IFRAME,
        api_available=False,
        has_free_tier=True,
    ),
    AITool(
        id="otter",
        name="Otter.ai",
        description="AI meeting notes with real-time transcription and summaries.",
        category=ToolCategory.COMMUNICATION,
        logo_color="#1B66E9",
        logo_url=None,
        website_url="https://otter.ai",
        pricing_type="freemium",
        price_monthly=0,
        rating=4.6,
        tags=["transcription", "meetings", "notes", "summaries"],
        professions=["consultant", "product-manager", "writer"],
        hobbies=[],
        cta_text="Transcribe Free",
        features=["Real-time", "Speaker ID", "Summaries", "Search"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="notion",
        name="Notion",
        description="All-in-one workspace for notes, docs, and project management.",
        category=ToolCategory.WRITING,
        logo_color="#000000",
        logo_url="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
        website_url="https://notion.so",
        pricing_type="freemium",
        price_monthly=10,
        rating=4.8,
        tags=["notes", "docs", "wiki", "projects"],
        professions=["product-manager", "developer", "designer", "writer", "student"],
        hobbies=["writing"],
        cta_text="Start Free",
        features=["AI writing", "Databases", "Templates", "API"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    
    # =========================================================================
    # HR VERTICAL TOOLS
    # =========================================================================
    AITool(
        id="lever",
        name="Lever",
        description="ATS and CRM for recruiting with AI-powered candidate sourcing.",
        category=ToolCategory.HR,
        logo_color="#34C759",
        logo_url=None,
        website_url="https://lever.co",
        pricing_type="paid",
        price_monthly=0,
        rating=4.5,
        tags=["ats", "recruiting", "hiring", "crm"],
        professions=["hr-manager"],
        hobbies=[],
        cta_text="Request Demo",
        features=["Pipeline", "Scheduling", "Analytics", "Integrations"],
        integration_mode=IntegrationMode.PAID_API,
        api_available=True,
        has_free_tier=False,
    ),
    AITool(
        id="lattice",
        name="Lattice",
        description="People management platform for performance, engagement, and growth.",
        category=ToolCategory.HR,
        logo_color="#7C3AED",
        logo_url=None,
        website_url="https://lattice.com",
        pricing_type="paid",
        price_monthly=11,
        rating=4.6,
        tags=["performance", "engagement", "goals", "reviews"],
        professions=["hr-manager"],
        hobbies=[],
        cta_text="Request Demo",
        features=["1:1s", "Reviews", "Goals", "Engagement surveys"],
        integration_mode=IntegrationMode.PAID_API,
        api_available=True,
        has_free_tier=False,
    ),
    AITool(
        id="textio",
        name="Textio",
        description="AI that improves job posts to attract diverse candidates.",
        category=ToolCategory.HR,
        logo_color="#00BFA5",
        logo_url=None,
        website_url="https://textio.com",
        pricing_type="paid",
        price_monthly=0,
        rating=4.4,
        tags=["job-posts", "dei", "writing", "recruiting"],
        professions=["hr-manager"],
        hobbies=[],
        cta_text="Request Demo",
        features=["Bias detection", "Score", "Suggestions", "Benchmarks"],
        integration_mode=IntegrationMode.PAID_API,
        api_available=False,
        has_free_tier=False,
    ),
    
    # =========================================================================
    # LIFESTYLE & HOBBY TOOLS
    # =========================================================================
    AITool(
        id="alltrails",
        name="AllTrails",
        description="Discover hiking trails with AI-powered recommendations and offline maps.",
        category=ToolCategory.LIFESTYLE,
        logo_color="#428813",
        logo_url=None,
        website_url="https://alltrails.com",
        pricing_type="freemium",
        price_monthly=3,
        rating=4.8,
        tags=["hiking", "trails", "maps", "outdoors"],
        professions=[],
        hobbies=["hiking", "running", "fitness"],
        cta_text="Explore Free",
        features=["Trail maps", "Reviews", "Offline", "Weather"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="strava",
        name="Strava",
        description="Track runs and rides with AI performance insights and social features.",
        category=ToolCategory.FITNESS,
        logo_color="#FC4C02",
        logo_url=None,
        website_url="https://strava.com",
        pricing_type="freemium",
        price_monthly=12,
        rating=4.7,
        tags=["running", "cycling", "tracking", "social"],
        professions=[],
        hobbies=["running", "fitness", "hiking"],
        cta_text="Join Free",
        features=["GPS tracking", "Segments", "Clubs", "Training"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="headspace",
        name="Headspace",
        description="Meditation and mindfulness with AI-personalized sessions.",
        category=ToolCategory.LIFESTYLE,
        logo_color="#F47D31",
        logo_url=None,
        website_url="https://headspace.com",
        pricing_type="paid",
        price_monthly=13,
        rating=4.8,
        tags=["meditation", "mindfulness", "sleep", "focus"],
        professions=[],
        hobbies=["meditation", "yoga"],
        cta_text="Try Free",
        features=["Guided", "Sleep", "Focus", "Personalized"],
        integration_mode=IntegrationMode.PAID_API,
        api_available=False,
        has_free_tier=False,
    ),
    AITool(
        id="tripit",
        name="TripIt",
        description="Travel organizer that creates itineraries from confirmation emails.",
        category=ToolCategory.TRAVEL,
        logo_color="#1A73E8",
        logo_url=None,
        website_url="https://tripit.com",
        pricing_type="freemium",
        price_monthly=6,
        rating=4.5,
        tags=["travel", "itinerary", "flights", "organization"],
        professions=["consultant"],
        hobbies=["traveling"],
        cta_text="Plan Free",
        features=["Auto-import", "Real-time alerts", "Maps", "Sharing"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
    AITool(
        id="whisk",
        name="Whisk",
        description="AI recipe assistant that plans meals and creates shopping lists.",
        category=ToolCategory.LIFESTYLE,
        logo_color="#4CAF50",
        logo_url=None,
        website_url="https://whisk.com",
        pricing_type="free",
        price_monthly=0,
        rating=4.4,
        tags=["recipes", "meal-planning", "shopping", "cooking"],
        professions=[],
        hobbies=["cooking"],
        cta_text="Cook Free",
        features=["Recipe scaling", "Shopping lists", "Meal plans", "AI suggestions"],
        integration_mode=IntegrationMode.FREE_API,
        api_available=True,
        has_free_tier=True,
    ),
]


# =============================================================================
# HOBBY BACKGROUND IMAGES
# =============================================================================

HOBBY_BACKGROUNDS: Dict[str, List[str]] = {
    "hiking": [
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
    "gaming": [
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
    ],
    "cooking": [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    ],
    "reading": [
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
    ],
    "fitness": [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        "https://images.unsplash.com/photo-1534368959878-b5cd06801e27?w=800&q=80",
    ],
    "traveling": [
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    ],
    "coding": [
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    ],
    "skateboarding": [
        "https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?w=800&q=80",
        "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=800&q=80",
    ],
    "photography": [
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
        "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80",
    ],
    "music": [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    ],
    "art": [
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    ],
    "yoga": [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    ],
    "meditation": [
        "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=800&q=80",
        "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80",
    ],
    "running": [
        "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80",
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
    ],
    "writing": [
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
    ],
}


class AIToolsService:
    """
    Service for querying and filtering AI tools
    Strategy: 1 LLM + 3-4 vertical tools per profession
    """
    
    def __init__(self):
        self.tools = AI_TOOLS_DATABASE
        self._index_by_id = {tool.id: tool for tool in self.tools}
        self._llms = [t for t in self.tools if t.category == ToolCategory.LLM]
        self._vertical_tools = [t for t in self.tools if t.category != ToolCategory.LLM]
    
    def get_tools_for_profession(self, profession: str, limit: int = 5) -> List[AITool]:
        """
        Get tools relevant to a specific profession
        Strategy: 1 LLM + rest are vertical tools
        """
        # Get 1 LLM
        llm = self._get_best_llm_for(profession)
        
        # Get vertical tools
        vertical = [
            tool for tool in self._vertical_tools
            if profession in tool.professions or 
               any(p in profession for p in tool.professions)
        ]
        vertical.sort(key=lambda t: (-t.rating, t.price_monthly))
        
        # Combine: 1 LLM + top vertical tools
        result = [llm] if llm else []
        result.extend(vertical[:limit - len(result)])
        
        return result
    
    def _get_best_llm_for(self, profession: str) -> Optional[AITool]:
        """Get the best LLM for a profession"""
        for llm in self._llms:
            if profession in llm.professions:
                return llm
        return self._llms[0] if self._llms else None
    
    def get_tools_for_hobby(self, hobby: str, limit: int = 2) -> List[AITool]:
        """Get tools relevant to a specific hobby (no LLMs)"""
        relevant = [
            tool for tool in self._vertical_tools
            if hobby in tool.hobbies or any(h in hobby for h in tool.hobbies)
        ]
        relevant.sort(key=lambda t: t.rating, reverse=True)
        return relevant[:limit]
    
    def get_background_for_hobby(self, hobby: str, index: int = 0) -> str:
        """Get a background image for a hobby"""
        backgrounds = HOBBY_BACKGROUNDS.get(hobby, HOBBY_BACKGROUNDS.get("fitness", []))
        if not backgrounds:
            return "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
        return backgrounds[index % len(backgrounds)]
    
    def get_personalized_recommendations(
        self,
        profession: str,
        hobby: str,
        work_limit: int = 5,
        life_limit: int = 2
    ) -> Dict[str, Any]:
        """Get personalized tool recommendations"""
        work_tools = self.get_tools_for_profession(profession, work_limit)
        life_tools = self.get_tools_for_hobby(hobby, life_limit)
        
        # Convert to frontend format
        work_tool_dicts = [tool.to_work_tool() for tool in work_tools]
        life_tool_dicts = []
        
        for i, tool in enumerate(life_tools):
            bg = self.get_background_for_hobby(hobby, i)
            life_tool_dicts.append(tool.to_life_tool(bg))
        
        # If no life tools, create generic ones
        if not life_tool_dicts:
            life_tool_dicts = self._create_generic_hobby_tools(hobby)
        
        return {
            "workTools": work_tool_dicts,
            "lifeTools": life_tool_dicts,
        }
    
    def _create_generic_hobby_tools(self, hobby: str) -> List[Dict[str, Any]]:
        """Create generic hobby tools when no specific tools match"""
        hobby_title = hobby.replace("-", " ").title()
        backgrounds = HOBBY_BACKGROUNDS.get(hobby, HOBBY_BACKGROUNDS.get("fitness", []))
        
        return [
            {
                "name": f"{hobby_title} Companion",
                "description": f"AI-powered app to enhance your {hobby} experience.",
                "backgroundImage": backgrounds[0] if backgrounds else "",
            },
            {
                "name": f"{hobby_title} Tracker",
                "description": f"Track your progress and discover new {hobby} activities.",
                "backgroundImage": backgrounds[1] if len(backgrounds) > 1 else "",
            },
        ]
    
    def get_tools_by_integration_mode(self, mode: IntegrationMode) -> List[AITool]:
        """Get tools that can be integrated in a specific way"""
        return [t for t in self.tools if t.integration_mode == mode]
    
    def get_free_api_tools(self) -> List[AITool]:
        """Get tools with free API access (for plugin development)"""
        return [t for t in self.tools if t.has_free_tier and t.api_available]


# Global instance
ai_tools_service = AIToolsService()
