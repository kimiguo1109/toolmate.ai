"""
Gemini AI Service - LLM Gateway for MaxMate.ai
Uses Gemini 2.0 Flash for fast, intelligent toolkit generation
"""
import asyncio
import json
import logging
from typing import Optional, Dict, Any, List
import aiohttp
import google.generativeai as genai

from app.config import settings

logger = logging.getLogger(__name__)


class GeminiService:
    """
    Gemini API Service for AI-powered toolkit generation
    """
    
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.model = settings.GEMINI_MODEL
        self.api_base_url = settings.GEMINI_API_BASE_URL
        self.timeout = settings.API_TIMEOUT
        
        # Configure Gemini SDK
        genai.configure(api_key=self.api_key)
        
        logger.info(f"✅ GeminiService initialized with model: {self.model}")
    
    async def call_api(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 4096,
        response_format: str = "json"
    ) -> str:
        """
        Call Gemini API with the given prompt (same logic as class_recorder_demo)
        
        Args:
            prompt: The prompt to send
            temperature: Creativity level (0.0 - 1.0)
            max_tokens: Maximum response tokens
            response_format: Expected response format ("json" or "text")
        
        Returns:
            API response text
        """
        # Use streamGenerateContent endpoint (same as class_recorder_demo)
        url = f"{self.api_base_url}/{self.model}:streamGenerateContent?key={self.api_key}"
        
        # Build payload
        payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [{"text": prompt}]
                }
            ],
            "generationConfig": {
                "temperature": temperature,
                "maxOutputTokens": max_tokens,
            }
        }
        
        try:
            connector = None
            if settings.USE_PROXY:
                connector = aiohttp.TCPConnector()
            
            async with aiohttp.ClientSession(connector=connector) as session:
                proxy = settings.HTTP_PROXY if settings.USE_PROXY else None
                
                async with session.post(
                    url,
                    json=payload,
                    headers={"Content-Type": "application/json"},
                    timeout=aiohttp.ClientTimeout(total=self.timeout),
                    proxy=proxy
                ) as response:
                    if response.status != 200:
                        error_text = await response.text()
                        logger.error(f"Gemini API error: {response.status} - {error_text}")
                        raise Exception(f"API error: {response.status} - {error_text}")
                    
                    data = await response.json()
                    
                    # Handle streaming response format (list of chunks)
                    full_text = ""
                    if isinstance(data, list):
                        for chunk in data:
                            if "candidates" in chunk and len(chunk["candidates"]) > 0:
                                content = chunk["candidates"][0].get("content", {})
                                parts = content.get("parts", [])
                                if parts and len(parts) > 0:
                                    full_text += parts[0].get("text", "")
                    else:
                        # Single response format
                        if "candidates" in data and len(data["candidates"]) > 0:
                            content = data["candidates"][0].get("content", {})
                            parts = content.get("parts", [])
                            if parts:
                                full_text = parts[0].get("text", "")
                    
                    if not full_text:
                        raise Exception("Empty response from API")
                    
                    return full_text.strip()
        
        except asyncio.TimeoutError:
            logger.error(f"Gemini API timeout after {self.timeout}s")
            raise Exception("API call timeout")
        except Exception as e:
            logger.error(f"Gemini API call failed: {e}")
            raise
    
    async def generate_toolkit(
        self,
        profession: str,
        hobby: str,
        name: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Generate a personalized AI toolkit based on profession and hobby
        
        Args:
            profession: User's profession (e.g., "product-manager")
            hobby: User's hobby (e.g., "hiking")
            name: Optional user name for personalization
        
        Returns:
            Generated toolkit data with work and life tools
        """
        prompt = self._build_toolkit_prompt(profession, hobby, name)
        
        try:
            logger.info(f"🤖 Generating toolkit for {profession} + {hobby}")
            response = await self.call_api(prompt, temperature=0.3)
            
            # Parse JSON response
            toolkit_data = json.loads(response)
            logger.info(f"✅ Toolkit generated successfully")
            
            return toolkit_data
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse toolkit JSON: {e}")
            logger.error(f"Raw response: {response[:500]}")
            raise Exception("Invalid toolkit format from AI")
        except Exception as e:
            logger.error(f"Toolkit generation failed: {e}")
            raise
    
    def _build_toolkit_prompt(
        self,
        profession: str,
        hobby: str,
        name: Optional[str] = None
    ) -> str:
        """Build the prompt for toolkit generation"""
        
        prompt = f"""Generate a JSON object for an AI toolkit. Profession: {profession}, Hobby: {hobby}.

Output ONLY this JSON structure (no markdown, no explanation):
{{"workTools":[{{"name":"string","logo":"#hexcolor","rating":4.5,"description":"string","ctaText":"Try Free","category":"string","price":0}}],"lifeTools":[{{"name":"string","description":"string","backgroundImage":"https://images.unsplash.com/photo-xxx"}}],"specs":{{"totalTools":6,"monthlyCost":10,"primaryGoal":"Productivity","freeTools":4,"paidTools":2}},"description":"string","longDescription":"string"}}

Rules:
- 4 workTools for {profession} (real AI tools like ChatGPT, Notion AI, GitHub Copilot)
- 2 lifeTools for {hobby} (real apps)
- Valid Unsplash URLs for backgroundImage
- price: 0 for free, actual $ for paid
- rating: 4.0-5.0

JSON:"""

        return prompt
    
    async def parse_intent(
        self,
        user_input: str
    ) -> Dict[str, Any]:
        """
        Parse natural language input to extract profession and hobby
        
        Args:
            user_input: Natural language like "I am a Product Manager who loves hiking"
        
        Returns:
            Parsed intent with profession, hobby, and optional name
        """
        prompt = f"""Parse this user input and extract their profession and hobby/interest.

User input: "{user_input}"

Output ONLY this JSON (no markdown, no explanation):
{{"profession":"slug-format","professionLabel":"Human Readable","hobby":"slug-format","hobbyLabel":"Human Readable","name":"extracted name or null","confidence":0.95}}

Rules:
- profession slug: lowercase, hyphenated (e.g., "product-manager", "software-developer")
- hobby slug: lowercase, single word preferred (e.g., "hiking", "gaming", "cooking")
- name: extract if mentioned, otherwise null
- confidence: 0.0-1.0 based on how clear the input is

Common professions: product-manager, developer, designer, marketer, writer, student, entrepreneur, data-scientist, sales, hr-manager, finance, customer-support, consultant, researcher, teacher

Common hobbies: hiking, gaming, cooking, reading, fitness, traveling, coding, photography, music, art

If unclear, make reasonable assumptions. Always return valid JSON.

JSON:"""

        try:
            logger.info(f"🔍 Parsing intent: {user_input[:50]}...")
            response = await self.call_api(prompt, temperature=0.1, max_tokens=256)
            
            # Clean response (remove markdown if any)
            response = response.strip()
            if response.startswith("```"):
                response = response.split("```")[1]
                if response.startswith("json"):
                    response = response[4:]
            
            parsed = json.loads(response)
            logger.info(f"✅ Parsed: {parsed.get('profession')} + {parsed.get('hobby')}")
            
            return parsed
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse intent JSON: {e}")
            # Fallback: try to extract manually
            return self._fallback_parse(user_input)
        except Exception as e:
            logger.error(f"Intent parsing failed: {e}")
            return self._fallback_parse(user_input)
    
    def _fallback_parse(self, user_input: str) -> Dict[str, Any]:
        """Fallback parser when AI fails"""
        user_input_lower = user_input.lower()
        
        # Simple keyword matching
        professions = {
            "product manager": "product-manager",
            "pm": "product-manager",
            "developer": "developer",
            "software engineer": "developer",
            "programmer": "developer",
            "designer": "designer",
            "ux designer": "designer",
            "marketer": "marketer",
            "marketing": "marketer",
            "writer": "writer",
            "content": "writer",
            "student": "student",
            "entrepreneur": "entrepreneur",
            "founder": "entrepreneur",
            "data scientist": "data-scientist",
            "sales": "sales",
            "hr": "hr-manager",
            "finance": "finance",
            "support": "customer-support",
        }
        
        hobbies = {
            "hiking": "hiking",
            "hike": "hiking",
            "gaming": "gaming",
            "game": "gaming",
            "cook": "cooking",
            "cooking": "cooking",
            "read": "reading",
            "reading": "reading",
            "fitness": "fitness",
            "gym": "fitness",
            "workout": "fitness",
            "travel": "traveling",
            "traveling": "traveling",
            "code": "coding",
            "coding": "coding",
            "photo": "photography",
            "photography": "photography",
            "music": "music",
            "art": "art",
        }
        
        detected_profession = "product-manager"  # default
        detected_hobby = "general"  # default
        
        for keyword, slug in professions.items():
            if keyword in user_input_lower:
                detected_profession = slug
                break
        
        for keyword, slug in hobbies.items():
            if keyword in user_input_lower:
                detected_hobby = slug
                break
        
        return {
            "profession": detected_profession,
            "professionLabel": detected_profession.replace("-", " ").title(),
            "hobby": detected_hobby,
            "hobbyLabel": detected_hobby.replace("-", " ").title(),
            "name": None,
            "confidence": 0.5
        }

    async def suggest_tools(
        self,
        query: str,
        category: Optional[str] = None,
        limit: int = 5
    ) -> List[Dict[str, Any]]:
        """
        Suggest AI tools based on a query
        
        Args:
            query: Search query or use case description
            category: Optional category filter
            limit: Maximum number of suggestions
        
        Returns:
            List of tool suggestions
        """
        prompt = f"""Suggest {limit} AI tools for the following use case:

Query: {query}
{f"Category: {category}" if category else ""}

Return a JSON array of tools:
[
  {{
    "name": "Tool Name",
    "description": "Brief description",
    "category": "Category",
    "url": "https://tool-url.com",
    "pricing": "Free / Freemium / Paid",
    "relevanceScore": 0.95
  }}
]

Only include real, existing AI tools. Respond with valid JSON only."""

        try:
            response = await self.call_api(prompt, temperature=0.2)
            suggestions = json.loads(response)
            return suggestions[:limit]
        except Exception as e:
            logger.error(f"Tool suggestion failed: {e}")
            return []


# Global instance
gemini_service = GeminiService()

