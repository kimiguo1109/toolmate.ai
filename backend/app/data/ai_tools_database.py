"""
AI Tools Database
A curated database of real AI tools with accurate information
This serves as the knowledge base for personalized recommendations
"""

from typing import List, Dict, Any, Optional
from dataclasses import dataclass, asdict
from enum import Enum


class ToolCategory(str, Enum):
    CODE_ASSISTANT = "Code Assistant"
    WRITING = "Writing"
    DESIGN = "Design"
    PRODUCTIVITY = "Productivity"
    MARKETING = "Marketing"
    DATA_ANALYSIS = "Data Analysis"
    COMMUNICATION = "Communication"
    RESEARCH = "Research"
    IMAGE_GEN = "Image Generation"
    VIDEO_GEN = "Video Generation"
    AUDIO = "Audio"
    LIFESTYLE = "Lifestyle"
    FITNESS = "Fitness"
    TRAVEL = "Travel"
    FOOD = "Food"
    EDUCATION = "Education"


@dataclass
class AITool:
    """Represents a real AI tool with verified information"""
    id: str
    name: str
    description: str
    category: ToolCategory
    logo_color: str  # Fallback color for logo
    logo_url: Optional[str]  # Actual logo URL if available
    website_url: str
    pricing_type: str  # "free", "freemium", "paid"
    price_monthly: float  # 0 for free
    rating: float  # 1-5
    tags: List[str]  # For matching with professions/hobbies
    professions: List[str]  # Which professions benefit most
    hobbies: List[str]  # Which hobbies it can enhance
    cta_text: str
    features: List[str]
    
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
# Each tool has verified information and real URLs
# =============================================================================

AI_TOOLS_DATABASE: List[AITool] = [
    # =========================================================================
    # CODE ASSISTANTS
    # =========================================================================
    AITool(
        id="github-copilot",
        name="GitHub Copilot",
        description="AI pair programmer that suggests code and entire functions in real-time, right from your editor.",
        category=ToolCategory.CODE_ASSISTANT,
        logo_color="#000000",
        logo_url="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        website_url="https://github.com/features/copilot",
        pricing_type="paid",
        price_monthly=10,
        rating=4.9,
        tags=["coding", "autocomplete", "pair-programming", "productivity"],
        professions=["developer", "software-engineer", "data-scientist", "blockchain-engineer", "game-designer"],
        hobbies=["coding"],
        cta_text="Try Free Trial",
        features=["Code suggestions", "Multi-language support", "IDE integration", "Context-aware"],
    ),
    AITool(
        id="cursor",
        name="Cursor",
        description="The AI-first code editor. Build software faster with AI that understands your codebase.",
        category=ToolCategory.CODE_ASSISTANT,
        logo_color="#7C3AED",
        logo_url=None,
        website_url="https://cursor.sh",
        pricing_type="freemium",
        price_monthly=20,
        rating=4.8,
        tags=["coding", "ide", "ai-native", "chat"],
        professions=["developer", "software-engineer", "data-scientist", "blockchain-engineer"],
        hobbies=["coding"],
        cta_text="Download Free",
        features=["AI chat", "Codebase understanding", "Multi-file editing", "Terminal integration"],
    ),
    AITool(
        id="tabnine",
        name="Tabnine",
        description="AI code assistant that accelerates development with whole-line and full-function code completions.",
        category=ToolCategory.CODE_ASSISTANT,
        logo_color="#6366F1",
        logo_url=None,
        website_url="https://www.tabnine.com",
        pricing_type="freemium",
        price_monthly=12,
        rating=4.5,
        tags=["coding", "autocomplete", "privacy-focused"],
        professions=["developer", "software-engineer", "data-scientist"],
        hobbies=["coding"],
        cta_text="Start Free",
        features=["Local models available", "Team training", "Privacy-focused", "IDE plugins"],
    ),
    
    # =========================================================================
    # AI ASSISTANTS (General)
    # =========================================================================
    AITool(
        id="chatgpt",
        name="ChatGPT",
        description="OpenAI's conversational AI that can help with writing, coding, analysis, and creative tasks.",
        category=ToolCategory.PRODUCTIVITY,
        logo_color="#10A37F",
        logo_url="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
        website_url="https://chat.openai.com",
        pricing_type="freemium",
        price_monthly=20,
        rating=4.9,
        tags=["general", "writing", "coding", "research", "creative"],
        professions=["product-manager", "developer", "designer", "marketer", "writer", "student", "entrepreneur", "data-scientist", "consultant", "researcher"],
        hobbies=["writing", "coding", "reading", "art"],
        cta_text="Try Free",
        features=["GPT-4 access", "Code interpreter", "Image generation", "Web browsing"],
    ),
    AITool(
        id="claude",
        name="Claude",
        description="Anthropic's AI assistant known for nuanced understanding, long context, and careful reasoning.",
        category=ToolCategory.PRODUCTIVITY,
        logo_color="#D4A574",
        logo_url=None,
        website_url="https://claude.ai",
        pricing_type="freemium",
        price_monthly=20,
        rating=4.8,
        tags=["general", "writing", "analysis", "research", "long-form"],
        professions=["writer", "researcher", "consultant", "product-manager", "developer"],
        hobbies=["writing", "reading"],
        cta_text="Try Free",
        features=["200K context", "Document analysis", "Careful reasoning", "Artifacts"],
    ),
    AITool(
        id="perplexity",
        name="Perplexity AI",
        description="AI-powered search engine that provides answers with citations from across the web.",
        category=ToolCategory.RESEARCH,
        logo_color="#8B5CF6",
        logo_url=None,
        website_url="https://perplexity.ai",
        pricing_type="freemium",
        price_monthly=20,
        rating=4.7,
        tags=["search", "research", "citations", "real-time"],
        professions=["researcher", "student", "consultant", "writer", "marketer"],
        hobbies=["reading", "traveling"],
        cta_text="Search Free",
        features=["Web search", "Academic sources", "Real-time info", "Copilot mode"],
    ),
    
    # =========================================================================
    # WRITING & CONTENT
    # =========================================================================
    AITool(
        id="notion-ai",
        name="Notion AI",
        description="AI writing assistant built into Notion to help you write, edit, summarize, and brainstorm.",
        category=ToolCategory.WRITING,
        logo_color="#000000",
        logo_url="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
        website_url="https://notion.so/product/ai",
        pricing_type="paid",
        price_monthly=10,
        rating=4.7,
        tags=["writing", "notes", "organization", "summarization"],
        professions=["product-manager", "developer", "designer", "marketer", "writer", "student", "entrepreneur", "hr-manager", "consultant"],
        hobbies=["writing", "reading"],
        cta_text="Try Free",
        features=["Document AI", "Meeting notes", "Brainstorming", "Translation"],
    ),
    AITool(
        id="grammarly",
        name="Grammarly",
        description="AI writing assistant that helps you write clear, mistake-free, and impactful content.",
        category=ToolCategory.WRITING,
        logo_color="#15C39A",
        logo_url=None,
        website_url="https://grammarly.com",
        pricing_type="freemium",
        price_monthly=12,
        rating=4.6,
        tags=["writing", "grammar", "clarity", "tone"],
        professions=["writer", "marketer", "student", "consultant", "hr-manager"],
        hobbies=["writing"],
        cta_text="Add to Browser",
        features=["Grammar check", "Tone detection", "Plagiarism check", "Style suggestions"],
    ),
    AITool(
        id="jasper",
        name="Jasper AI",
        description="AI content platform that helps marketing teams create high-quality content at scale.",
        category=ToolCategory.MARKETING,
        logo_color="#FF6B6B",
        logo_url=None,
        website_url="https://jasper.ai",
        pricing_type="paid",
        price_monthly=49,
        rating=4.5,
        tags=["marketing", "copywriting", "content", "brand-voice"],
        professions=["marketer", "writer", "entrepreneur"],
        hobbies=["writing"],
        cta_text="Start Free Trial",
        features=["Brand voice", "Templates", "Team collaboration", "SEO mode"],
    ),
    
    # =========================================================================
    # DESIGN & IMAGE
    # =========================================================================
    AITool(
        id="midjourney",
        name="Midjourney",
        description="AI image generation tool that creates stunning visuals from text descriptions.",
        category=ToolCategory.IMAGE_GEN,
        logo_color="#000000",
        logo_url=None,
        website_url="https://midjourney.com",
        pricing_type="paid",
        price_monthly=10,
        rating=4.9,
        tags=["image", "art", "creative", "design"],
        professions=["designer", "marketer", "game-designer", "writer"],
        hobbies=["art", "photography"],
        cta_text="Join Discord",
        features=["High quality", "Style control", "Upscaling", "Variations"],
    ),
    AITool(
        id="figma-ai",
        name="Figma AI",
        description="AI-powered design features built into Figma to speed up your design workflow.",
        category=ToolCategory.DESIGN,
        logo_color="#F24E1E",
        logo_url="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
        website_url="https://figma.com",
        pricing_type="freemium",
        price_monthly=15,
        rating=4.8,
        tags=["design", "ui", "prototyping", "collaboration"],
        professions=["designer", "product-manager", "developer"],
        hobbies=["art"],
        cta_text="Try Free",
        features=["Auto-layout", "AI suggestions", "Component generation", "Prototyping"],
    ),
    AITool(
        id="canva-ai",
        name="Canva AI",
        description="AI-powered design platform for creating graphics, presentations, and marketing materials.",
        category=ToolCategory.DESIGN,
        logo_color="#00C4CC",
        logo_url=None,
        website_url="https://canva.com",
        pricing_type="freemium",
        price_monthly=13,
        rating=4.7,
        tags=["design", "graphics", "templates", "easy"],
        professions=["marketer", "entrepreneur", "teacher", "student"],
        hobbies=["art", "photography"],
        cta_text="Design Free",
        features=["Magic Design", "Background remover", "Templates", "Brand kit"],
    ),
    
    # =========================================================================
    # PRODUCTIVITY & PROJECT MANAGEMENT
    # =========================================================================
    AITool(
        id="slack-ai",
        name="Slack AI",
        description="AI features in Slack to summarize channels, catch up on conversations, and search smarter.",
        category=ToolCategory.COMMUNICATION,
        logo_color="#4A154B",
        logo_url="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
        website_url="https://slack.com/features/ai",
        pricing_type="paid",
        price_monthly=0,  # Included in Slack plans
        rating=4.5,
        tags=["communication", "team", "summaries", "search"],
        professions=["product-manager", "developer", "designer", "marketer", "hr-manager"],
        hobbies=[],
        cta_text="Try Free",
        features=["Channel summaries", "Thread recaps", "Smart search", "Huddle notes"],
    ),
    AITool(
        id="miro-ai",
        name="Miro AI",
        description="AI-powered features in Miro to generate diagrams, summarize boards, and brainstorm ideas.",
        category=ToolCategory.PRODUCTIVITY,
        logo_color="#FFD02F",
        logo_url=None,
        website_url="https://miro.com/ai",
        pricing_type="freemium",
        price_monthly=8,
        rating=4.6,
        tags=["whiteboard", "collaboration", "diagrams", "brainstorming"],
        professions=["product-manager", "designer", "consultant", "entrepreneur"],
        hobbies=[],
        cta_text="Try Free",
        features=["Mind maps", "Diagram generation", "Clustering", "Summaries"],
    ),
    
    # =========================================================================
    # LIFESTYLE & HOBBIES
    # =========================================================================
    AITool(
        id="alltrails",
        name="AllTrails",
        description="Find hiking and outdoor trails with AI-powered recommendations based on your preferences.",
        category=ToolCategory.LIFESTYLE,
        logo_color="#428813",
        logo_url=None,
        website_url="https://alltrails.com",
        pricing_type="freemium",
        price_monthly=3,
        rating=4.8,
        tags=["hiking", "outdoors", "trails", "maps"],
        professions=[],
        hobbies=["hiking", "running", "fitness"],
        cta_text="Explore Free",
        features=["Trail maps", "Reviews", "Offline maps", "Weather info"],
    ),
    AITool(
        id="strava",
        name="Strava",
        description="Track your runs, rides, and workouts with AI-powered performance insights and training plans.",
        category=ToolCategory.FITNESS,
        logo_color="#FC4C02",
        logo_url=None,
        website_url="https://strava.com",
        pricing_type="freemium",
        price_monthly=12,
        rating=4.7,
        tags=["fitness", "running", "cycling", "tracking"],
        professions=[],
        hobbies=["running", "fitness", "hiking"],
        cta_text="Join Free",
        features=["GPS tracking", "Segments", "Training plans", "Social features"],
    ),
    AITool(
        id="headspace",
        name="Headspace",
        description="AI-personalized meditation and mindfulness app for stress relief and better sleep.",
        category=ToolCategory.LIFESTYLE,
        logo_color="#F47D31",
        logo_url=None,
        website_url="https://headspace.com",
        pricing_type="paid",
        price_monthly=13,
        rating=4.8,
        tags=["meditation", "mindfulness", "sleep", "stress"],
        professions=[],
        hobbies=["meditation", "yoga"],
        cta_text="Try Free",
        features=["Guided meditation", "Sleep content", "Focus music", "Personalized"],
    ),
    AITool(
        id="spotify-ai-dj",
        name="Spotify AI DJ",
        description="Your personal AI DJ that creates playlists based on your music taste and mood.",
        category=ToolCategory.AUDIO,
        logo_color="#1DB954",
        logo_url=None,
        website_url="https://spotify.com",
        pricing_type="freemium",
        price_monthly=11,
        rating=4.6,
        tags=["music", "playlists", "discovery", "mood"],
        professions=[],
        hobbies=["music"],
        cta_text="Listen Free",
        features=["AI DJ", "Discover Weekly", "Mood playlists", "Podcasts"],
    ),
    AITool(
        id="tripit",
        name="TripIt",
        description="AI travel organizer that creates a master itinerary from your confirmation emails.",
        category=ToolCategory.TRAVEL,
        logo_color="#1A73E8",
        logo_url=None,
        website_url="https://tripit.com",
        pricing_type="freemium",
        price_monthly=6,
        rating=4.5,
        tags=["travel", "itinerary", "organization", "alerts"],
        professions=["consultant"],
        hobbies=["traveling"],
        cta_text="Plan Free",
        features=["Auto-import", "Real-time alerts", "Maps", "Sharing"],
    ),
]


# =============================================================================
# HOBBY BACKGROUND IMAGES
# High-quality Unsplash images for lifestyle tools
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
    """Service for querying and filtering AI tools"""
    
    def __init__(self):
        self.tools = AI_TOOLS_DATABASE
        self._index_by_id = {tool.id: tool for tool in self.tools}
    
    def get_all_tools(self) -> List[AITool]:
        """Get all tools in the database"""
        return self.tools
    
    def get_tool_by_id(self, tool_id: str) -> Optional[AITool]:
        """Get a specific tool by ID"""
        return self._index_by_id.get(tool_id)
    
    def get_tools_for_profession(self, profession: str, limit: int = 6) -> List[AITool]:
        """Get tools relevant to a specific profession"""
        relevant = [
            tool for tool in self.tools
            if profession in tool.professions or any(p in profession for p in tool.professions)
        ]
        # Sort by rating
        relevant.sort(key=lambda t: t.rating, reverse=True)
        return relevant[:limit]
    
    def get_tools_for_hobby(self, hobby: str, limit: int = 3) -> List[AITool]:
        """Get tools relevant to a specific hobby"""
        relevant = [
            tool for tool in self.tools
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
    
    def search_tools(self, query: str, limit: int = 10) -> List[AITool]:
        """Search tools by name, description, or tags"""
        query_lower = query.lower()
        results = []
        
        for tool in self.tools:
            score = 0
            if query_lower in tool.name.lower():
                score += 3
            if query_lower in tool.description.lower():
                score += 2
            if any(query_lower in tag for tag in tool.tags):
                score += 1
            
            if score > 0:
                results.append((tool, score))
        
        results.sort(key=lambda x: (-x[1], -x[0].rating))
        return [tool for tool, _ in results[:limit]]
    
    def get_personalized_recommendations(
        self,
        profession: str,
        hobby: str,
        work_limit: int = 4,
        life_limit: int = 2
    ) -> Dict[str, Any]:
        """Get personalized tool recommendations for work and life"""
        work_tools = self.get_tools_for_profession(profession, work_limit)
        life_tools = self.get_tools_for_hobby(hobby, life_limit)
        
        # Convert to frontend format
        work_tool_dicts = [tool.to_work_tool() for tool in work_tools]
        life_tool_dicts = []
        
        for i, tool in enumerate(life_tools):
            bg = self.get_background_for_hobby(hobby, i)
            life_tool_dicts.append(tool.to_life_tool(bg))
        
        # If no life tools found, create generic ones for the hobby
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
                "description": f"AI-powered app to enhance your {hobby} experience with personalized recommendations.",
                "backgroundImage": backgrounds[0] if backgrounds else "",
            },
            {
                "name": f"{hobby_title} Tracker",
                "description": f"Track your progress and discover new {hobby} activities with smart suggestions.",
                "backgroundImage": backgrounds[1] if len(backgrounds) > 1 else (backgrounds[0] if backgrounds else ""),
            },
        ]


# Global instance
ai_tools_service = AIToolsService()

