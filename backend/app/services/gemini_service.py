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
        Parse natural language input to extract profession and hobby using LLM
        
        Args:
            user_input: Natural language like "I am a Product Manager who loves hiking"
        
        Returns:
            Parsed intent with profession, hobby, and optional name
        """
        # Simple, clear prompt for reliable JSON output
        prompt = f"""Extract profession and hobby from this text. Return JSON only.

Text: "{user_input}"

Return this exact format:
{{"profession":"lowercase-slug","professionLabel":"Display Name","hobby":"lowercase-slug","hobbyLabel":"Display Name","name":null,"confidence":0.9}}

Example inputs and outputs:
- "I am a software engineer who loves gaming" → {{"profession":"software-engineer","professionLabel":"Software Engineer","hobby":"gaming","hobbyLabel":"Gaming","name":null,"confidence":0.95}}
- "PM passionate about hiking" → {{"profession":"product-manager","professionLabel":"Product Manager","hobby":"hiking","hobbyLabel":"Hiking","name":null,"confidence":0.9}}
- "Game designer, fitness enthusiast" → {{"profession":"game-designer","professionLabel":"Game Designer","hobby":"fitness","hobbyLabel":"Fitness","name":null,"confidence":0.9}}

Your JSON (no explanation, no markdown):"""

        try:
            logger.info(f"🔍 Parsing intent: {user_input[:50]}...")
            # Gemini 2.5 uses tokens for "thinking", so we need more tokens
            response = await self.call_api(prompt, temperature=0.0, max_tokens=500)
            
            # Clean response
            parsed = self._extract_json_from_response(response)
            
            if parsed:
                logger.info(f"✅ Parsed: {parsed.get('profession')} + {parsed.get('hobby')}")
                return parsed
            else:
                logger.warning(f"⚠️ Could not extract JSON, trying regex fallback")
                return self._regex_extract(response, user_input)
            
        except Exception as e:
            logger.error(f"Intent parsing failed: {e}")
            # Final fallback: ask LLM in a simpler way
            return await self._simple_parse(user_input)
    
    def _extract_json_from_response(self, response: str) -> Optional[Dict[str, Any]]:
        """Extract and parse JSON from LLM response"""
        import re
        
        original_response = response
        response = response.strip()
        
        logger.debug(f"🔍 Raw LLM response: {response[:200]}...")
        
        # Try direct parse first
        try:
            return json.loads(response)
        except Exception as e:
            logger.debug(f"Direct parse failed: {e}")
        
        # Remove markdown code blocks
        if "```" in response:
            match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', response, re.DOTALL)
            if match:
                try:
                    return json.loads(match.group(1))
                except:
                    pass
        
        # Try to find any JSON object with profession key
        match = re.search(r'\{[^{}]*"profession"[^{}]*\}', response, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(0))
            except:
                pass
        
        # Try more aggressive JSON extraction - find first { to last }
        first_brace = response.find('{')
        last_brace = response.rfind('}')
        if first_brace != -1 and last_brace != -1 and last_brace > first_brace:
            json_str = response[first_brace:last_brace + 1]
            try:
                return json.loads(json_str)
            except:
                # Try to fix common issues
                json_str = json_str.replace("'", '"')  # Single to double quotes
                json_str = re.sub(r',\s*}', '}', json_str)  # Remove trailing comma
                try:
                    return json.loads(json_str)
                except:
                    pass
        
        logger.warning(f"⚠️ Could not extract JSON from: {original_response[:100]}...")
        return None
    
    def _regex_extract(self, response: str, original_input: str) -> Dict[str, Any]:
        """Extract profession and hobby using regex patterns from LLM response"""
        import re
        
        logger.debug(f"🔍 Full response for regex: {response}")
        
        # Try to extract values from malformed JSON
        profession_match = re.search(r'"profession"\s*:\s*"([^"]+)"', response)
        profession_label_match = re.search(r'"professionLabel"\s*:\s*"([^"]+)"', response)
        hobby_match = re.search(r'"hobby"\s*:\s*"([^"]+)"', response)
        hobby_label_match = re.search(r'"hobbyLabel"\s*:\s*"([^"]+)"', response)
        
        profession = profession_match.group(1) if profession_match else "professional"
        profession_label = profession_label_match.group(1) if profession_label_match else profession.replace("-", " ").title()
        hobby = hobby_match.group(1) if hobby_match else "general"
        hobby_label = hobby_label_match.group(1) if hobby_label_match else hobby.replace("-", " ").title()
        
        # Log what was found
        logger.info(f"🔧 Regex found - profession: {profession_match is not None}, hobby: {hobby_match is not None}")
        logger.info(f"🔧 Regex extracted: {profession} + {hobby}")
        
        return {
            "profession": profession,
            "professionLabel": profession_label,
            "hobby": hobby,
            "hobbyLabel": hobby_label,
            "name": None,
            "confidence": 0.7
        }
    
    async def _simple_parse(self, user_input: str) -> Dict[str, Any]:
        """Simpler LLM call as final fallback"""
        prompt = f"""From "{user_input}", tell me:
1. Their job/profession (one or two words)
2. Their hobby/interest (one word)

Answer in format: PROFESSION: xxx, HOBBY: xxx"""
        
        try:
            response = await self.call_api(prompt, temperature=0.0, max_tokens=50)
            
            import re
            prof_match = re.search(r'PROFESSION:\s*([^,\n]+)', response, re.IGNORECASE)
            hobby_match = re.search(r'HOBBY:\s*([^,\n]+)', response, re.IGNORECASE)
            
            profession = prof_match.group(1).strip().lower().replace(" ", "-") if prof_match else "professional"
            hobby = hobby_match.group(1).strip().lower().replace(" ", "-") if hobby_match else "general"
            
            logger.info(f"🔧 Simple parse: {profession} + {hobby}")
            
            return {
                "profession": profession,
                "professionLabel": profession.replace("-", " ").title(),
                "hobby": hobby,
                "hobbyLabel": hobby.replace("-", " ").title(),
                "name": None,
                "confidence": 0.6
            }
        except:
            # Ultimate fallback
            return {
                "profession": "professional",
                "professionLabel": "Professional",
                "hobby": "general",
                "hobbyLabel": "General",
                "name": None,
                "confidence": 0.3
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

