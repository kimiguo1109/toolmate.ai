"""
Toolkit Generation API
"""
import logging
from typing import Optional, List
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

from app.services.toolkit_generator import toolkit_generator
from app.services.gemini_service import gemini_service

logger = logging.getLogger(__name__)
router = APIRouter()


# Request/Response Models
class GenerateRequest(BaseModel):
    """Toolkit generation request"""
    profession: str = Field(..., description="User's profession slug", example="product-manager")
    hobby: str = Field(..., description="User's hobby slug", example="hiking")
    name: Optional[str] = Field(None, description="User's name for personalization", example="Kimi")
    use_ai: bool = Field(True, description="Whether to use AI generation")


class WorkTool(BaseModel):
    """Work mode tool"""
    name: str
    logo: str
    rating: float
    description: str
    ctaText: str
    category: str
    price: float


class LifeTool(BaseModel):
    """Life mode tool"""
    name: str
    description: str
    backgroundImage: str


class ToolkitSpecs(BaseModel):
    """Toolkit specifications"""
    totalTools: int
    monthlyCost: float
    primaryGoal: str
    freeTools: int
    paidTools: int


class ToolkitResponse(BaseModel):
    """Complete toolkit response"""
    id: str
    slug: str
    userName: str
    profession: str
    professionSlug: str
    lifeContext: str
    workTools: List[WorkTool]
    lifeTools: List[LifeTool]
    specs: ToolkitSpecs
    description: str
    longDescription: str
    createdAt: str


class ToolSuggestion(BaseModel):
    """Tool suggestion"""
    name: str
    description: str
    category: str
    url: Optional[str] = None
    pricing: str
    relevanceScore: float


# API Endpoints
@router.post("/generate", response_model=ToolkitResponse)
async def generate_toolkit(request: GenerateRequest):
    """
    Generate a personalized AI toolkit based on profession and hobby
    
    - **profession**: User's profession (e.g., "product-manager", "developer")
    - **hobby**: User's hobby (e.g., "hiking", "gaming")
    - **name**: Optional user name for personalization
    - **use_ai**: Whether to use Gemini AI for generation (default: True)
    """
    try:
        logger.info(f"📥 Generate request: {request.profession} + {request.hobby}")
        
        toolkit = await toolkit_generator.generate(
            profession=request.profession,
            hobby=request.hobby,
            name=request.name,
            use_ai=request.use_ai
        )
        
        logger.info(f"✅ Toolkit generated: {toolkit.get('slug')}")
        return toolkit
        
    except Exception as e:
        logger.error(f"❌ Generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/suggest")
async def suggest_tools(
    query: str = Query(..., description="Search query or use case"),
    category: Optional[str] = Query(None, description="Category filter"),
    limit: int = Query(5, ge=1, le=20, description="Max results")
):
    """
    Get AI tool suggestions based on a query
    
    - **query**: Description of what you need (e.g., "AI for writing blog posts")
    - **category**: Optional category filter
    - **limit**: Maximum number of suggestions (1-20)
    """
    try:
        suggestions = await gemini_service.suggest_tools(
            query=query,
            category=category,
            limit=limit
        )
        return {"suggestions": suggestions}
        
    except Exception as e:
        logger.error(f"❌ Suggestion failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/professions")
async def list_professions():
    """
    Get list of supported professions
    """
    professions = [
        {"id": "product-manager", "label": "Product Manager", "icon": "inventory_2", "toolCount": 24},
        {"id": "developer", "label": "Software Developer", "icon": "code", "toolCount": 32},
        {"id": "designer", "label": "UX Designer", "icon": "palette", "toolCount": 28},
        {"id": "marketer", "label": "Marketing Manager", "icon": "campaign", "toolCount": 26},
        {"id": "writer", "label": "Content Writer", "icon": "edit_note", "toolCount": 22},
        {"id": "student", "label": "Student", "icon": "school", "toolCount": 24},
        {"id": "entrepreneur", "label": "Entrepreneur", "icon": "rocket_launch", "toolCount": 30},
        {"id": "data-scientist", "label": "Data Scientist", "icon": "analytics", "toolCount": 18},
        {"id": "sales", "label": "Sales Representative", "icon": "handshake", "toolCount": 20},
        {"id": "hr-manager", "label": "HR Manager", "icon": "groups", "toolCount": 16},
        {"id": "finance", "label": "Financial Analyst", "icon": "trending_up", "toolCount": 12},
        {"id": "customer-support", "label": "Customer Support", "icon": "support_agent", "toolCount": 14},
    ]
    return {"professions": professions}


@router.get("/hobbies")
async def list_hobbies():
    """
    Get list of supported hobbies
    """
    hobbies = [
        {"id": "hiking", "label": "Hiking", "emoji": "🥾"},
        {"id": "gaming", "label": "Gaming", "emoji": "🎮"},
        {"id": "cooking", "label": "Cooking", "emoji": "🍳"},
        {"id": "reading", "label": "Reading", "emoji": "📚"},
        {"id": "fitness", "label": "Fitness", "emoji": "💪"},
        {"id": "traveling", "label": "Traveling", "emoji": "✈️"},
        {"id": "coding", "label": "Coding", "emoji": "💻"},
        {"id": "photography", "label": "Photography", "emoji": "📸"},
        {"id": "music", "label": "Music", "emoji": "🎵"},
        {"id": "art", "label": "Art & Design", "emoji": "🎨"},
    ]
    return {"hobbies": hobbies}

