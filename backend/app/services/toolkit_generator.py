"""
Toolkit Generator Service
Orchestrates the generation of personalized AI toolkits
Uses real AI tools database + LLM for personalization
"""
import logging
import uuid
from datetime import datetime
from typing import Dict, Any, Optional, List

from app.services.gemini_service import gemini_service
from app.data.ai_tools_database import ai_tools_service, HOBBY_BACKGROUNDS

logger = logging.getLogger(__name__)


class ToolkitGenerator:
    """
    Generates personalized AI toolkits using:
    1. Real AI tools database (verified information)
    2. LLM for personalization, ranking, and generating recommendations
    
    Future enhancements:
    - User can edit/save their toolkit
    - Toolkit versioning and history
    - Share/clone toolkits
    - Personalized recommendations based on usage
    """
    
    def __init__(self):
        self.gemini = gemini_service
        self.tools_db = ai_tools_service
        logger.info("✅ ToolkitGenerator initialized with AI tools database")
    
    async def generate(
        self,
        profession: str,
        hobby: str,
        name: Optional[str] = None,
        use_ai: bool = True
    ) -> Dict[str, Any]:
        """
        Generate a complete personalized toolkit
        
        Args:
            profession: User's profession slug
            hobby: User's hobby slug
            name: Optional user name
            use_ai: Whether to use LLM for enhanced personalization
        
        Returns:
            Complete toolkit data with real tools
        """
        toolkit_id = str(uuid.uuid4())
        slug = self._generate_slug(name, profession, hobby)
        
        try:
            # Get base recommendations from database
            # Strategy: 1-2 LLMs + 2-3 vertical tools = 4 work tools, 2 life tools
            base_toolkit = self.tools_db.get_personalized_recommendations(
                profession=profession,
                hobby=hobby,
                work_limit=4,  # 1-2 LLM + 2-3 vertical
                life_limit=2   # 2 lifestyle tools
            )
            
            if use_ai:
                # Enhance with LLM personalization
                logger.info(f"🤖 Enhancing toolkit with AI for {profession} + {hobby}")
                toolkit = await self._enhance_with_ai(base_toolkit, profession, hobby, name)
            else:
                toolkit = base_toolkit
            
            # Add metadata
            toolkit.update({
                "id": toolkit_id,
                "slug": slug,
                "userName": name or "User",
                "profession": self._format_profession(profession),
                "professionSlug": profession,
                "lifeContext": hobby.replace("-", " ").title(),
                "createdAt": datetime.utcnow().isoformat(),
            })
            
            # Generate specs
            work_tools = toolkit.get("workTools", [])
            life_tools = toolkit.get("lifeTools", [])
            toolkit["specs"] = {
                "totalTools": len(work_tools) + len(life_tools),
                "monthlyCost": sum(t.get("price", 0) for t in work_tools),
                "primaryGoal": "Productivity",
                "freeTools": len([t for t in work_tools if t.get("price", 0) == 0]),
                "paidTools": len([t for t in work_tools if t.get("price", 0) > 0]),
            }
            
            # Generate descriptions
            prof_label = self._format_profession(profession)
            hobby_label = hobby.replace("-", " ").title()
            toolkit["description"] = f"A personalized AI toolkit for {prof_label}s who enjoy {hobby_label.lower()}."
            toolkit["longDescription"] = await self._generate_description(profession, hobby, work_tools, life_tools)
            
            return toolkit
            
        except Exception as e:
            logger.error(f"Toolkit generation failed: {e}")
            # Fallback to basic database recommendation
            return self._fallback_generate(profession, hobby, name, toolkit_id, slug)
    
    async def _enhance_with_ai(
        self,
        base_toolkit: Dict[str, Any],
        profession: str,
        hobby: str,
        name: Optional[str]
    ) -> Dict[str, Any]:
        """Use LLM to enhance and personalize the toolkit"""
        try:
            # Ask LLM to rank and add reasoning
            work_tools = base_toolkit.get("workTools", [])
            life_tools = base_toolkit.get("lifeTools", [])
            
            # Generate personalized tool descriptions
            for tool in work_tools:
                enhanced_desc = await self._personalize_description(
                    tool["name"],
                    tool["description"],
                    profession
                )
                if enhanced_desc:
                    tool["description"] = enhanced_desc
            
            return base_toolkit
            
        except Exception as e:
            logger.warning(f"AI enhancement failed, using base toolkit: {e}")
            return base_toolkit
    
    async def _personalize_description(
        self,
        tool_name: str,
        original_desc: str,
        profession: str
    ) -> Optional[str]:
        """Generate a profession-specific tool description"""
        try:
            prompt = f"""Make this tool description specific to a {profession}'s daily workflow.
            
Tool: {tool_name}
Original: {original_desc}

Write ONE sentence (max 80 characters) that explains how a {profession} would use this tool.
Just output the description, nothing else."""

            result = await self.gemini.call_api(prompt, temperature=0.3, max_tokens=100)
            
            # Clean and validate
            result = result.strip().strip('"').strip()
            if len(result) > 20 and len(result) < 150:
                return result
            return None
            
        except Exception:
            return None
    
    async def _generate_description(
        self,
        profession: str,
        hobby: str,
        work_tools: List[Dict],
        life_tools: List[Dict]
    ) -> str:
        """Generate a long description for the toolkit"""
        prof_label = self._format_profession(profession)
        hobby_label = hobby.replace("-", " ").title()
        
        work_names = [t["name"] for t in work_tools[:3]]
        life_names = [t["name"] for t in life_tools[:2]]
        
        return (
            f"This comprehensive AI toolkit is tailored for the modern {prof_label.lower()}, "
            f"integrating powerful AI assistants like {', '.join(work_names)} to accelerate "
            f"your daily workflow. Beyond work, {'two' if len(life_names) >= 2 else 'curated'} apps "
            f"cater to the {hobby_label.lower()} hobby, helping users find new experiences "
            f"and enhance their passion, ensuring a balanced and productive lifestyle."
        )
    
    def _fallback_generate(
        self,
        profession: str,
        hobby: str,
        name: Optional[str],
        toolkit_id: str,
        slug: str
    ) -> Dict[str, Any]:
        """Fallback generation using only database"""
        base = self.tools_db.get_personalized_recommendations(profession, hobby)
        
        work_tools = base.get("workTools", [])
        life_tools = base.get("lifeTools", [])
        
        prof_label = self._format_profession(profession)
        hobby_label = hobby.replace("-", " ").title()
        
        return {
            "id": toolkit_id,
            "slug": slug,
            "userName": name or "User",
            "profession": prof_label,
            "professionSlug": profession,
            "lifeContext": hobby_label,
            "workTools": work_tools,
            "lifeTools": life_tools,
            "specs": {
                "totalTools": len(work_tools) + len(life_tools),
                "monthlyCost": sum(t.get("price", 0) for t in work_tools),
                "primaryGoal": "Productivity",
                "freeTools": len([t for t in work_tools if t.get("price", 0) == 0]),
                "paidTools": len([t for t in work_tools if t.get("price", 0) > 0]),
            },
            "description": f"A personalized AI toolkit for {prof_label}s who enjoy {hobby_label.lower()}.",
            "longDescription": f"This toolkit combines the best AI tools for {prof_label.lower()} workflows with lifestyle apps perfect for {hobby_label.lower()} enthusiasts.",
            "createdAt": datetime.utcnow().isoformat(),
        }
    
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
            "software-engineer": "Software Engineer",
            "blockchain-engineer": "Blockchain Engineer",
            "game-designer": "Game Designer",
            "designer": "UX Designer",
            "marketer": "Marketing Manager",
            "writer": "Content Writer",
            "freelance-writer": "Freelance Writer",
            "student": "Student",
            "entrepreneur": "Entrepreneur",
            "data-scientist": "Data Scientist",
            "hr-manager": "HR Manager",
            "consultant": "Consultant",
            "researcher": "Researcher",
            "teacher": "Teacher",
        }
        return mapping.get(profession, profession.replace("-", " ").title())


# Global instance
toolkit_generator = ToolkitGenerator()
