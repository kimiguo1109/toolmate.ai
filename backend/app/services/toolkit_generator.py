"""
Toolkit Generator Service
Orchestrates the generation of personalized AI toolkits
"""
import logging
import uuid
from datetime import datetime
from typing import Dict, Any, Optional, List

from app.services.gemini_service import gemini_service

logger = logging.getLogger(__name__)


# Predefined tool database for fallback/enhancement
TOOL_DATABASE = {
    "product-manager": [
        {"name": "Jira AI", "logo": "#0052CC", "rating": 4.5, "description": "AI-powered sprint planning and backlog management", "ctaText": "Try Free", "category": "Project Management", "price": 0},
        {"name": "Notion AI", "logo": "#000000", "rating": 5.0, "description": "AI writing and document summarization in your workspace", "ctaText": "Try Free", "category": "Documentation", "price": 10},
        {"name": "Miro AI", "logo": "#FFD02F", "rating": 4.8, "description": "AI-generated diagrams and mind maps", "ctaText": "Try Free", "category": "Collaboration", "price": 0},
        {"name": "Slack AI", "logo": "#4A154B", "rating": 4.5, "description": "Channel recaps and conversation summaries", "ctaText": "Try Free", "category": "Communication", "price": 0},
    ],
    "developer": [
        {"name": "GitHub Copilot", "logo": "#000000", "rating": 5.0, "description": "AI pair programmer for code suggestions", "ctaText": "Try Free", "category": "Code Assistant", "price": 10},
        {"name": "Cursor", "logo": "#7C3AED", "rating": 5.0, "description": "AI-first code editor with chat and edit", "ctaText": "Try Free", "category": "IDE", "price": 20},
        {"name": "ChatGPT", "logo": "#10A37F", "rating": 5.0, "description": "General AI for coding, debugging, explanations", "ctaText": "Try Free", "category": "AI Assistant", "price": 0},
        {"name": "Tabnine", "logo": "#6366F1", "rating": 4.5, "description": "AI code completion for any IDE", "ctaText": "Try Free", "category": "Code Assistant", "price": 0},
    ],
    "designer": [
        {"name": "Figma AI", "logo": "#F24E1E", "rating": 5.0, "description": "AI-powered design features in Figma", "ctaText": "Try Free", "category": "Design Tool", "price": 15},
        {"name": "Midjourney", "logo": "#000000", "rating": 5.0, "description": "AI image generation for design inspiration", "ctaText": "Try Free", "category": "Image Gen", "price": 10},
        {"name": "Framer AI", "logo": "#0055FF", "rating": 4.5, "description": "AI-generated websites and prototypes", "ctaText": "Try Free", "category": "Web Design", "price": 0},
        {"name": "Uizard", "logo": "#7C3AED", "rating": 4.5, "description": "Transform sketches to designs with AI", "ctaText": "Try Free", "category": "Prototyping", "price": 0},
    ],
    "marketer": [
        {"name": "Jasper AI", "logo": "#FF6B6B", "rating": 5.0, "description": "AI writing for marketing copy", "ctaText": "Try Free", "category": "Content", "price": 49},
        {"name": "Copy.ai", "logo": "#7C3AED", "rating": 4.5, "description": "Generate marketing copy and emails", "ctaText": "Try Free", "category": "Copywriting", "price": 0},
        {"name": "Surfer SEO", "logo": "#10B981", "rating": 4.5, "description": "AI-powered SEO content optimization", "ctaText": "Try Free", "category": "SEO", "price": 89},
        {"name": "Canva AI", "logo": "#00C4CC", "rating": 5.0, "description": "AI design tools for marketing graphics", "ctaText": "Try Free", "category": "Design", "price": 0},
    ],
}

HOBBY_TOOLS = {
    "hiking": [
        {"name": "AllTrails AI", "description": "Find perfect hiking routes based on conditions", "backgroundImage": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"},
        {"name": "Mountain Project", "description": "AI route recommendations for outdoor adventures", "backgroundImage": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"},
    ],
    "gaming": [
        {"name": "Discord AI", "description": "Smart moderation for gaming communities", "backgroundImage": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"},
        {"name": "Parsec", "description": "Low-latency game streaming with AI optimization", "backgroundImage": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80"},
    ],
    "cooking": [
        {"name": "ChefGPT", "description": "Generate recipes from your ingredients", "backgroundImage": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"},
        {"name": "Whisk", "description": "AI meal planning and grocery lists", "backgroundImage": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"},
    ],
    "reading": [
        {"name": "Blinkist AI", "description": "AI book summaries and recommendations", "backgroundImage": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80"},
        {"name": "Readwise", "description": "AI highlights and spaced repetition", "backgroundImage": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"},
    ],
    "fitness": [
        {"name": "FitGPT", "description": "AI workout planner and nutrition guide", "backgroundImage": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"},
        {"name": "Strava AI", "description": "Performance analysis and training plans", "backgroundImage": "https://images.unsplash.com/photo-1534368959878-b5cd06801e27?w=800&q=80"},
    ],
    "traveling": [
        {"name": "TripIt AI", "description": "Smart travel itinerary planning", "backgroundImage": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"},
        {"name": "Hopper", "description": "AI flight and hotel price predictions", "backgroundImage": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"},
    ],
    "coding": [
        {"name": "LeetCode AI", "description": "AI-powered coding practice", "backgroundImage": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80"},
        {"name": "Exercism", "description": "Learn programming with AI mentorship", "backgroundImage": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80"},
    ],
}


class ToolkitGenerator:
    """
    Generates personalized AI toolkits using Gemini AI
    with fallback to predefined tool database
    """
    
    def __init__(self):
        self.gemini = gemini_service
        logger.info("✅ ToolkitGenerator initialized")
    
    async def generate(
        self,
        profession: str,
        hobby: str,
        name: Optional[str] = None,
        use_ai: bool = True
    ) -> Dict[str, Any]:
        """
        Generate a complete toolkit
        
        Args:
            profession: User's profession slug
            hobby: User's hobby slug
            name: Optional user name
            use_ai: Whether to use Gemini AI (falls back to database if False)
        
        Returns:
            Complete toolkit data
        """
        toolkit_id = str(uuid.uuid4())
        slug = self._generate_slug(name, profession, hobby)
        
        try:
            if use_ai:
                # Try AI generation first
                logger.info(f"🤖 Generating AI toolkit for {profession} + {hobby}")
                ai_toolkit = await self.gemini.generate_toolkit(profession, hobby, name)
                
                # Merge with database tools for reliability
                toolkit = self._merge_with_database(ai_toolkit, profession, hobby)
            else:
                # Use database only
                toolkit = self._generate_from_database(profession, hobby, name)
            
            # Add metadata
            toolkit["id"] = toolkit_id
            toolkit["slug"] = slug
            toolkit["userName"] = name or "User"
            toolkit["profession"] = self._format_profession(profession)
            toolkit["professionSlug"] = profession
            toolkit["lifeContext"] = hobby.capitalize()
            toolkit["createdAt"] = datetime.utcnow().isoformat()
            
            return toolkit
            
        except Exception as e:
            logger.error(f"AI generation failed, using fallback: {e}")
            # Fallback to database with metadata
            toolkit = self._generate_from_database(profession, hobby, name)
            toolkit["id"] = toolkit_id
            toolkit["slug"] = slug
            toolkit["userName"] = name or "User"
            toolkit["profession"] = self._format_profession(profession)
            toolkit["professionSlug"] = profession
            toolkit["lifeContext"] = hobby.capitalize()
            toolkit["createdAt"] = datetime.utcnow().isoformat()
            return toolkit
    
    def _generate_from_database(
        self,
        profession: str,
        hobby: str,
        name: Optional[str] = None
    ) -> Dict[str, Any]:
        """Generate toolkit from predefined database"""
        
        work_tools = TOOL_DATABASE.get(profession, TOOL_DATABASE["developer"])
        life_tools = HOBBY_TOOLS.get(hobby, HOBBY_TOOLS["gaming"])
        
        total_tools = len(work_tools) + len(life_tools)
        monthly_cost = sum(t.get("price", 0) for t in work_tools)
        
        return {
            "workTools": work_tools,
            "lifeTools": life_tools,
            "specs": {
                "totalTools": total_tools,
                "monthlyCost": monthly_cost,
                "primaryGoal": "Productivity",
                "updatedAt": "Dec 2025",
                "freeTools": len([t for t in work_tools if t.get("price", 0) == 0]),
                "paidTools": len([t for t in work_tools if t.get("price", 0) > 0]),
            },
            "description": f"A personalized AI toolkit for {self._format_profession(profession)}s who enjoy {hobby}.",
            "longDescription": f"This toolkit combines the best AI tools for {self._format_profession(profession)} workflows with lifestyle apps perfect for {hobby} enthusiasts."
        }
    
    def _merge_with_database(
        self,
        ai_toolkit: Dict[str, Any],
        profession: str,
        hobby: str
    ) -> Dict[str, Any]:
        """Merge AI-generated toolkit with database tools for reliability"""
        
        # Ensure we have work tools
        work_tools = ai_toolkit.get("workTools", [])
        if len(work_tools) < 3:
            db_tools = TOOL_DATABASE.get(profession, [])
            work_tools.extend(db_tools[:4 - len(work_tools)])
        
        # Ensure we have life tools
        life_tools = ai_toolkit.get("lifeTools", [])
        if len(life_tools) < 2:
            db_life = HOBBY_TOOLS.get(hobby, [])
            life_tools.extend(db_life[:2 - len(life_tools)])
        
        ai_toolkit["workTools"] = work_tools
        ai_toolkit["lifeTools"] = life_tools
        
        return ai_toolkit
    
    def _generate_slug(
        self,
        name: Optional[str],
        profession: str,
        hobby: str
    ) -> str:
        """Generate a URL-friendly slug"""
        parts = []
        if name:
            parts.append(name.lower().replace(" ", "-"))
        parts.append(profession.lower())
        parts.append(hobby.lower())
        return "-".join(parts)
    
    def _format_profession(self, profession: str) -> str:
        """Format profession slug to display name"""
        mapping = {
            "product-manager": "Product Manager",
            "developer": "Software Developer",
            "designer": "UX Designer",
            "marketer": "Marketing Manager",
            "writer": "Content Writer",
            "student": "Student",
            "entrepreneur": "Entrepreneur",
            "data-scientist": "Data Scientist",
        }
        return mapping.get(profession, profession.replace("-", " ").title())


# Global instance
toolkit_generator = ToolkitGenerator()

