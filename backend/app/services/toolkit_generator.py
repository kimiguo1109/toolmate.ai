"""
Toolkit Generator Service
Orchestrates the generation of personalized AI toolkits
Uses database-backed AI tools + LLM for personalization
"""
import logging
import uuid
from datetime import datetime
from typing import Dict, Any, Optional, List

from app.services.gemini_service import gemini_service
from app.database.tools_repository import tools_repository

logger = logging.getLogger(__name__)


class ToolkitGenerator:
    """
    Generates personalized AI toolkits using:
    1. Supabase database (with fallback to local data)
    2. LLM for personalization and ranking
    """
    
    def __init__(self):
        self.gemini = gemini_service
        self.repo = tools_repository
        logger.info("✅ ToolkitGenerator initialized")
    
    async def generate(
        self,
        profession: str,
        hobby: str,
        name: Optional[str] = None,
        use_ai: bool = True
    ) -> Dict[str, Any]:
        """
        Generate a complete personalized toolkit
        
        Returns:
            Complete toolkit data with real tools
        """
        toolkit_id = str(uuid.uuid4())
        slug = self._generate_slug(name, profession, hobby)
        
        try:
            # Get work tools (4 tools: 1-2 LLMs + 2-3 vertical)
            work_tools_raw = await self.repo.get_tools_by_profession(profession, limit=4)
            
            # Get life tools (2 lifestyle tools)
            life_tools_raw = await self.repo.get_tools_by_hobby(hobby, limit=2)
            
            # Get backgrounds for hobby
            backgrounds = await self.repo.get_hobby_backgrounds(hobby)
            
            # Format for frontend
            work_tools = [self._format_work_tool(t) for t in work_tools_raw]
            life_tools = [
                self._format_life_tool(t, backgrounds[i] if i < len(backgrounds) else None)
                for i, t in enumerate(life_tools_raw)
            ]
            
            # If no life tools, create generic ones
            if not life_tools:
                life_tools = self._create_generic_life_tools(hobby, backgrounds)
            
            # Ensure we have enough work tools
            if len(work_tools) < 4:
                work_tools = self._ensure_minimum_work_tools(work_tools, profession)
            
            toolkit = {
                "workTools": work_tools[:4],
                "lifeTools": life_tools[:2],
            }
            
            # Add metadata
            profession_display = self._format_profession(profession)
            hobby_display = self._format_hobby(hobby)
            user_name = name or "User"
            
            toolkit.update({
                "id": toolkit_id,
                "slug": slug,
                "userName": user_name,
                "profession": profession_display,
                "professionSlug": profession,
                "lifeContext": hobby_display,
                "createdAt": datetime.now().isoformat(),
                # Required fields for API response
                "specs": {
                    "totalTools": len(work_tools) + len(life_tools),
                    "freeTools": len([t for t in work_tools if t.get("price", 0) == 0]),
                    "paidTools": len([t for t in work_tools if t.get("price", 0) > 0]),
                    "monthlyCost": sum(t.get("price", 0) for t in work_tools),
                    "primaryGoal": f"Boost {profession_display} productivity",
                    "lastUpdated": datetime.now().strftime("%B %Y"),
                },
                "description": f"AI-powered toolkit for {profession_display}s who love {hobby_display}",
                "longDescription": f"This personalized AI toolkit combines the best productivity tools for {profession_display}s with lifestyle apps perfect for {hobby_display} enthusiasts. Curated specifically for {user_name}.",
            })
            
            logger.info(f"✅ Generated toolkit: {len(work_tools)} work + {len(life_tools)} life tools")
            return toolkit
            
        except Exception as e:
            logger.error(f"❌ Toolkit generation error: {e}")
            return self._create_fallback_toolkit(profession, hobby, name)
    
    def _format_work_tool(self, tool: Dict) -> Dict[str, Any]:
        """Format database tool for frontend (work mode)"""
        return {
            "name": tool.get("name", "Unknown Tool"),
            "logo": tool.get("logo_color", "#6366F1"),
            "logoUrl": tool.get("logo_url"),
            "rating": tool.get("rating", 4.5),
            "description": tool.get("description", ""),
            "ctaText": tool.get("cta_text", "Try Free"),
            "category": tool.get("category_id", "").replace("_", " ").title(),
            "price": tool.get("price_monthly", 0),
            "url": tool.get("website_url", "#"),
            "integrationMode": tool.get("integration_mode", "redirect"),
            "apiAvailable": tool.get("api_available", False),
        }
    
    def _format_life_tool(self, tool: Dict, background: Optional[str] = None) -> Dict[str, Any]:
        """Format database tool for frontend (life mode)"""
        return {
            "name": tool.get("name", "Unknown Tool"),
            "description": tool.get("description", ""),
            "backgroundImage": background or "",
            "url": tool.get("website_url", "#"),
        }
    
    def _create_generic_life_tools(self, hobby: str, backgrounds: List[str]) -> List[Dict]:
        """Create generic life tools when no specific tools match"""
        hobby_title = hobby.replace("-", " ").title()
        return [
            {
                "name": f"{hobby_title} Companion",
                "description": f"AI-powered app to enhance your {hobby} experience.",
                "backgroundImage": backgrounds[0] if backgrounds else "",
                "url": "#",
            },
            {
                "name": f"{hobby_title} Tracker",
                "description": f"Track your progress and discover new {hobby} activities.",
                "backgroundImage": backgrounds[1] if len(backgrounds) > 1 else "",
                "url": "#",
            },
        ]
    
    def _ensure_minimum_work_tools(self, tools: List[Dict], profession: str) -> List[Dict]:
        """Ensure we have at least 4 work tools"""
        if len(tools) >= 4:
            return tools
        
        # Default tools to fill in
        defaults = [
            {
                "name": "ChatGPT",
                "logo": "#10A37F",
                "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
                "rating": 4.9,
                "description": "OpenAI's versatile AI assistant for writing, coding, and analysis.",
                "ctaText": "Try Free",
                "category": "LLM",
                "price": 20,
                "url": "https://chat.openai.com",
                "integrationMode": "paid_api",
                "apiAvailable": True,
            },
            {
                "name": "Linear",
                "logo": "#5E6AD2",
                "logoUrl": "https://asset.brandfetch.io/idaeNz7NsW/id-dQuXyBh.svg",
                "rating": 4.9,
                "description": "Streamlined issue tracking built for modern product teams.",
                "ctaText": "Start Free",
                "category": "Project Management",
                "price": 8,
                "url": "https://linear.app",
                "integrationMode": "free_api",
                "apiAvailable": True,
            },
            {
                "name": "Raycast",
                "logo": "#FF6363",
                "logoUrl": "https://asset.brandfetch.io/idwCAv24ti/id3LDGCDoT.svg",
                "rating": 4.9,
                "description": "Productivity launcher with AI commands and integrations.",
                "ctaText": "Download Free",
                "category": "Automation",
                "price": 8,
                "url": "https://raycast.com",
                "integrationMode": "free_api",
                "apiAvailable": True,
            },
            {
                "name": "Notion",
                "logo": "#000000",
                "logoUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
                "rating": 4.8,
                "description": "All-in-one workspace for notes, docs, and project management.",
                "ctaText": "Start Free",
                "category": "Writing",
                "price": 10,
                "url": "https://notion.so",
                "integrationMode": "free_api",
                "apiAvailable": True,
            },
        ]
        
        # Add defaults that aren't already in the list
        existing_names = {t["name"].lower() for t in tools}
        for default in defaults:
            if default["name"].lower() not in existing_names:
                tools.append(default)
            if len(tools) >= 4:
                break
        
        return tools
    
    def _generate_slug(self, name: Optional[str], profession: str, hobby: str) -> str:
        """Generate URL slug"""
        name_part = (name or "user").lower().replace(" ", "-")
        return f"{name_part}-{profession}-{hobby}"
    
    def _format_profession(self, profession: str) -> str:
        """Format profession for display"""
        professions = {
            "product-manager": "Product Manager",
            "developer": "Developer",
            "designer": "Designer",
            "marketer": "Marketer",
            "data-scientist": "Data Scientist",
            "writer": "Writer",
            "entrepreneur": "Entrepreneur",
            "hr-manager": "HR Manager",
            "consultant": "Consultant",
            "student": "Student",
            "game-designer": "Game Designer",
            "software-engineer": "Software Engineer",
            "blockchain-engineer": "Blockchain Engineer",
            "agent-engineer": "AI Agent Engineer",
        }
        return professions.get(profession.lower(), profession.replace("-", " ").title())
    
    def _format_hobby(self, hobby: str) -> str:
        """Format hobby for display"""
        return hobby.replace("-", " ").title()
    
    def _create_fallback_toolkit(
        self,
        profession: str,
        hobby: str,
        name: Optional[str] = None
    ) -> Dict[str, Any]:
        """Create fallback toolkit when generation fails"""
        logger.warning("Using fallback toolkit generation")
        
        backgrounds = [
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
        ]
        
        profession_display = self._format_profession(profession)
        hobby_display = self._format_hobby(hobby)
        user_name = name or "User"
        work_tools = self._ensure_minimum_work_tools([], profession)[:4]
        life_tools = self._create_generic_life_tools(hobby, backgrounds)
        
        return {
            "id": str(uuid.uuid4()),
            "slug": self._generate_slug(name, profession, hobby),
            "userName": user_name,
            "profession": profession_display,
            "professionSlug": profession,
            "lifeContext": hobby_display,
            "createdAt": datetime.now().isoformat(),
            "workTools": work_tools,
            "lifeTools": life_tools,
            "specs": {
                "totalTools": len(work_tools) + len(life_tools),
                "freeTools": len([t for t in work_tools if t.get("price", 0) == 0]),
                "paidTools": len([t for t in work_tools if t.get("price", 0) > 0]),
                "monthlyCost": sum(t.get("price", 0) for t in work_tools),
                "primaryGoal": f"Boost {profession_display} productivity",
                "lastUpdated": datetime.now().strftime("%B %Y"),
            },
            "description": f"AI-powered toolkit for {profession_display}s who love {hobby_display}",
            "longDescription": f"This personalized AI toolkit combines the best productivity tools for {profession_display}s with lifestyle apps perfect for {hobby_display} enthusiasts. Curated specifically for {user_name}.",
        }


# Global instance
toolkit_generator = ToolkitGenerator()
