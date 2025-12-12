"""
AI Tools Repository
Handles all database operations for AI tools
Falls back to local data if Supabase is not available
"""
import logging
from typing import List, Dict, Any, Optional
from functools import lru_cache

from app.database.supabase_client import get_supabase, SupabaseClient

logger = logging.getLogger(__name__)


class AIToolsRepository:
    """Repository for AI tools database operations"""
    
    def __init__(self):
        self._client = None
        self._cache = {}
        self._use_fallback = False
    
    @property
    def client(self):
        if self._client is None:
            self._client = get_supabase()
            if self._client is None:
                self._use_fallback = True
                logger.info("Using fallback local data (Supabase not available)")
        return self._client
    
    async def get_all_tools(self, active_only: bool = True) -> List[Dict[str, Any]]:
        """Get all AI tools from database"""
        if self._use_fallback or not self.client:
            return self._get_fallback_tools()
        
        try:
            query = self.client.table("ai_tools").select("*")
            if active_only:
                query = query.eq("is_active", True)
            
            response = query.execute()
            return response.data or []
        except Exception as e:
            logger.error(f"Error fetching tools: {e}")
            return self._get_fallback_tools()
    
    async def get_tools_by_profession(
        self, 
        profession: str, 
        limit: int = 5
    ) -> List[Dict[str, Any]]:
        """Get tools matching a profession"""
        if self._use_fallback or not self.client:
            return self._filter_fallback_by_profession(profession, limit)
        
        try:
            # Query tools where profession is in the professions array
            response = self.client.table("ai_tools")\
                .select("*")\
                .eq("is_active", True)\
                .contains("professions", [profession])\
                .order("rating", desc=True)\
                .limit(limit)\
                .execute()
            
            tools = response.data or []
            
            # If not enough tools, get LLMs
            if len(tools) < limit:
                llm_response = self.client.table("ai_tools")\
                    .select("*")\
                    .eq("category_id", "llm")\
                    .eq("is_active", True)\
                    .order("rating", desc=True)\
                    .limit(2)\
                    .execute()
                
                llms = llm_response.data or []
                tools = llms + [t for t in tools if t.get("category_id") != "llm"]
            
            return tools[:limit]
            
        except Exception as e:
            logger.error(f"Error fetching tools for profession {profession}: {e}")
            return self._filter_fallback_by_profession(profession, limit)
    
    async def get_tools_by_hobby(
        self, 
        hobby: str, 
        limit: int = 2
    ) -> List[Dict[str, Any]]:
        """Get tools matching a hobby"""
        if self._use_fallback or not self.client:
            return self._filter_fallback_by_hobby(hobby, limit)
        
        try:
            response = self.client.table("ai_tools")\
                .select("*")\
                .eq("is_active", True)\
                .contains("hobbies", [hobby])\
                .order("rating", desc=True)\
                .limit(limit)\
                .execute()
            
            return response.data or []
            
        except Exception as e:
            logger.error(f"Error fetching tools for hobby {hobby}: {e}")
            return self._filter_fallback_by_hobby(hobby, limit)
    
    async def get_hobby_backgrounds(self, hobby: str) -> List[str]:
        """Get background images for a hobby"""
        if self._use_fallback or not self.client:
            return self._get_fallback_backgrounds(hobby)
        
        try:
            response = self.client.table("hobby_backgrounds")\
                .select("image_url")\
                .eq("hobby", hobby)\
                .order("priority")\
                .execute()
            
            if response.data:
                return [r["image_url"] for r in response.data]
            return self._get_fallback_backgrounds(hobby)
            
        except Exception as e:
            logger.error(f"Error fetching backgrounds for {hobby}: {e}")
            return self._get_fallback_backgrounds(hobby)
    
    async def search_tools(
        self, 
        query: str, 
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """Search tools by name or tags"""
        if self._use_fallback or not self.client:
            return self._search_fallback(query, limit)
        
        try:
            # Search in name and tags
            response = self.client.table("ai_tools")\
                .select("*")\
                .eq("is_active", True)\
                .ilike("name", f"%{query}%")\
                .limit(limit)\
                .execute()
            
            return response.data or []
            
        except Exception as e:
            logger.error(f"Error searching tools: {e}")
            return self._search_fallback(query, limit)
    
    # =========================================================================
    # FALLBACK DATA (minimal set for when DB is not available)
    # =========================================================================
    
    def _get_fallback_tools(self) -> List[Dict[str, Any]]:
        """Return fallback tools when database is not available"""
        return [
            # LLMs
            {
                "id": "chatgpt",
                "name": "ChatGPT",
                "description": "OpenAI's versatile AI assistant for writing, coding, and analysis.",
                "category_id": "llm",
                "logo_color": "#10A37F",
                "logo_url": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
                "website_url": "https://chat.openai.com",
                "pricing_type": "freemium",
                "price_monthly": 20,
                "rating": 4.9,
                "tags": ["ai", "writing", "coding"],
                "professions": ["developer", "designer", "marketer", "writer", "data-scientist", "product-manager"],
                "hobbies": ["coding", "writing"],
                "cta_text": "Try Free",
                "features": ["GPT-4", "Code interpreter", "Plugins"],
                "integration_mode": "paid_api",
                "api_available": True,
                "has_free_tier": True,
            },
            {
                "id": "claude",
                "name": "Claude",
                "description": "Anthropic's AI for nuanced analysis and long-form content.",
                "category_id": "llm",
                "logo_color": "#D4A574",
                "logo_url": None,
                "website_url": "https://claude.ai",
                "pricing_type": "freemium",
                "price_monthly": 20,
                "rating": 4.8,
                "tags": ["ai", "analysis", "writing"],
                "professions": ["developer", "writer", "researcher", "consultant"],
                "hobbies": ["writing", "reading"],
                "cta_text": "Try Free",
                "features": ["200K context", "Artifacts"],
                "integration_mode": "paid_api",
                "api_available": True,
                "has_free_tier": True,
            },
            # Code tools
            {
                "id": "github-copilot",
                "name": "GitHub Copilot",
                "description": "AI pair programmer that suggests code in real-time.",
                "category_id": "code_assistant",
                "logo_color": "#000000",
                "logo_url": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
                "website_url": "https://github.com/features/copilot",
                "pricing_type": "paid",
                "price_monthly": 10,
                "rating": 4.9,
                "tags": ["coding", "ai", "autocomplete"],
                "professions": ["developer", "software-engineer", "blockchain-engineer"],
                "hobbies": ["coding"],
                "cta_text": "Try Free",
                "features": ["Code suggestions", "Multi-language", "IDE integration"],
                "integration_mode": "paid_api",
                "api_available": False,
                "has_free_tier": False,
            },
            {
                "id": "linear",
                "name": "Linear",
                "description": "Streamlined issue tracking built for modern product teams.",
                "category_id": "project_mgmt",
                "logo_color": "#5E6AD2",
                "logo_url": "https://asset.brandfetch.io/idaeNz7NsW/id-dQuXyBh.svg",
                "website_url": "https://linear.app",
                "pricing_type": "freemium",
                "price_monthly": 8,
                "rating": 4.9,
                "tags": ["project", "issues", "agile"],
                "professions": ["product-manager", "developer", "designer"],
                "hobbies": [],
                "cta_text": "Start Free",
                "features": ["Cycles", "Roadmaps", "GitHub sync"],
                "integration_mode": "free_api",
                "api_available": True,
                "has_free_tier": True,
            },
            {
                "id": "raycast",
                "name": "Raycast",
                "description": "Productivity launcher with AI commands, snippets, and integrations.",
                "category_id": "automation",
                "logo_color": "#FF6363",
                "logo_url": "https://asset.brandfetch.io/idwCAv24ti/id3LDGCDoT.svg",
                "website_url": "https://raycast.com",
                "pricing_type": "freemium",
                "price_monthly": 8,
                "rating": 4.9,
                "tags": ["productivity", "launcher", "automation"],
                "professions": ["developer", "designer", "product-manager"],
                "hobbies": ["coding"],
                "cta_text": "Download Free",
                "features": ["AI commands", "Snippets", "Extensions"],
                "integration_mode": "free_api",
                "api_available": True,
                "has_free_tier": True,
            },
            {
                "id": "figma",
                "name": "Figma",
                "description": "Collaborative design tool for UI/UX with AI-powered features.",
                "category_id": "design",
                "logo_color": "#F24E1E",
                "logo_url": "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
                "website_url": "https://figma.com",
                "pricing_type": "freemium",
                "price_monthly": 15,
                "rating": 4.9,
                "tags": ["design", "ui", "prototyping"],
                "professions": ["designer", "product-manager"],
                "hobbies": ["art"],
                "cta_text": "Try Free",
                "features": ["Dev mode", "Prototyping", "Components"],
                "integration_mode": "free_api",
                "api_available": True,
                "has_free_tier": True,
            },
            # Gaming tools
            {
                "id": "discord",
                "name": "Discord",
                "description": "Voice, video, and text chat platform for gamers and communities.",
                "category_id": "communication",
                "logo_color": "#5865F2",
                "logo_url": "https://asset.brandfetch.io/idaSYDn1qQ/id5VXzVct_.svg",
                "website_url": "https://discord.com",
                "pricing_type": "freemium",
                "price_monthly": 0,
                "rating": 4.8,
                "tags": ["gaming", "voice", "community"],
                "professions": ["game-designer"],
                "hobbies": ["gaming"],
                "cta_text": "Join Free",
                "features": ["Voice channels", "Screen share", "Bots"],
                "integration_mode": "free_api",
                "api_available": True,
                "has_free_tier": True,
            },
            {
                "id": "obs-studio",
                "name": "OBS Studio",
                "description": "Free streaming and recording software for gamers and creators.",
                "category_id": "video",
                "logo_color": "#302E31",
                "logo_url": None,
                "website_url": "https://obsproject.com",
                "pricing_type": "free",
                "price_monthly": 0,
                "rating": 4.9,
                "tags": ["streaming", "recording", "gaming"],
                "professions": ["game-designer"],
                "hobbies": ["gaming"],
                "cta_text": "Download Free",
                "features": ["Live streaming", "Recording", "Scenes"],
                "integration_mode": "redirect",
                "api_available": False,
                "has_free_tier": True,
            },
            # Fitness/Lifestyle tools
            {
                "id": "strava",
                "name": "Strava",
                "description": "Track runs and rides with AI performance insights.",
                "category_id": "fitness",
                "logo_color": "#FC4C02",
                "logo_url": "https://asset.brandfetch.io/idLhmxXoW9/idMi_Zd03L.svg",
                "website_url": "https://strava.com",
                "pricing_type": "freemium",
                "price_monthly": 12,
                "rating": 4.7,
                "tags": ["running", "cycling", "fitness"],
                "professions": [],
                "hobbies": ["running", "fitness", "hiking"],
                "cta_text": "Join Free",
                "features": ["GPS tracking", "Segments", "Clubs"],
                "integration_mode": "free_api",
                "api_available": True,
                "has_free_tier": True,
            },
            {
                "id": "alltrails",
                "name": "AllTrails",
                "description": "Discover hiking trails with AI recommendations and offline maps.",
                "category_id": "lifestyle",
                "logo_color": "#428813",
                "logo_url": "https://asset.brandfetch.io/idFXnIWKeB/idvL-YIW-S.svg",
                "website_url": "https://alltrails.com",
                "pricing_type": "freemium",
                "price_monthly": 3,
                "rating": 4.8,
                "tags": ["hiking", "trails", "outdoors"],
                "professions": [],
                "hobbies": ["hiking", "running", "fitness"],
                "cta_text": "Explore Free",
                "features": ["Trail maps", "Reviews", "Offline"],
                "integration_mode": "free_api",
                "api_available": True,
                "has_free_tier": True,
            },
        ]
    
    def _filter_fallback_by_profession(self, profession: str, limit: int) -> List[Dict]:
        """Filter fallback tools by profession"""
        tools = self._get_fallback_tools()
        profession = profession.lower().replace(" ", "-")
        
        # Get LLMs first
        llms = [t for t in tools if t["category_id"] == "llm"][:2]
        
        # Get matching vertical tools
        vertical = [
            t for t in tools 
            if t["category_id"] != "llm" and (
                profession in t.get("professions", []) or
                any(p in profession for p in t.get("professions", []))
            )
        ]
        
        # If no matches, get high-rated tools
        if not vertical:
            vertical = sorted(
                [t for t in tools if t["category_id"] != "llm"],
                key=lambda x: -x.get("rating", 0)
            )
        
        result = llms + vertical
        return result[:limit]
    
    def _filter_fallback_by_hobby(self, hobby: str, limit: int) -> List[Dict]:
        """Filter fallback tools by hobby"""
        tools = self._get_fallback_tools()
        hobby = hobby.lower()
        
        matching = [
            t for t in tools
            if hobby in t.get("hobbies", []) or
               any(h in hobby for h in t.get("hobbies", []))
        ]
        
        return matching[:limit]
    
    def _get_fallback_backgrounds(self, hobby: str) -> List[str]:
        """Get fallback background images"""
        backgrounds = {
            "hiking": [
                "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
            ],
            "gaming": [
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
                "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80",
            ],
            "fitness": [
                "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
                "https://images.unsplash.com/photo-1534368959878-b5cd06801e27?w=800&q=80",
            ],
            "running": [
                "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80",
                "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80",
            ],
            "traveling": [
                "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
                "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
            ],
            "cooking": [
                "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
                "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
            ],
            "photography": [
                "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
                "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80",
            ],
        }
        return backgrounds.get(hobby, backgrounds.get("fitness", []))
    
    def _search_fallback(self, query: str, limit: int) -> List[Dict]:
        """Search fallback tools"""
        tools = self._get_fallback_tools()
        query = query.lower()
        
        matching = [
            t for t in tools
            if query in t["name"].lower() or
               query in t["description"].lower() or
               any(query in tag for tag in t.get("tags", []))
        ]
        
        return matching[:limit]


# Global instance
tools_repository = AIToolsRepository()

