#!/usr/bin/env python3
"""
Seed AI Tools Database
Uses Gemini to generate real AI tool information and inserts into Supabase
"""
import os
import sys
import json
import asyncio
import httpx
from typing import List, Dict, Any
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from dotenv import load_dotenv
load_dotenv()

# Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY", "")
USE_PROXY = os.getenv("USE_PROXY", "false").lower() == "true"
HTTP_PROXY = os.getenv("HTTP_PROXY", "http://127.0.0.1:7890")

# Tool categories to generate
TOOL_CATEGORIES = [
    {
        "category": "llm",
        "professions": ["developer", "designer", "marketer", "writer", "data-scientist"],
        "count": 3,
        "examples": ["ChatGPT", "Claude", "Gemini"]
    },
    {
        "category": "code_assistant", 
        "professions": ["developer", "software-engineer", "blockchain-engineer"],
        "count": 5,
        "examples": ["GitHub Copilot", "Cursor", "Replit", "Codeium", "Tabnine"]
    },
    {
        "category": "design",
        "professions": ["designer", "product-manager"],
        "count": 5,
        "examples": ["Figma", "Canva", "Framer", "Spline", "Rive"]
    },
    {
        "category": "project_mgmt",
        "professions": ["product-manager", "developer", "designer"],
        "count": 4,
        "examples": ["Linear", "Notion", "Asana", "Monday"]
    },
    {
        "category": "marketing",
        "professions": ["marketer", "entrepreneur"],
        "count": 4,
        "examples": ["HubSpot", "Mailchimp", "Buffer", "Hootsuite"]
    },
    {
        "category": "data",
        "professions": ["data-scientist", "analyst"],
        "count": 4,
        "examples": ["Weights & Biases", "Streamlit", "Hex", "Kaggle"]
    },
    {
        "category": "writing",
        "professions": ["writer", "marketer", "student"],
        "count": 4,
        "examples": ["Grammarly", "Notion AI", "Jasper", "Copy.ai"]
    },
    {
        "category": "fitness",
        "professions": [],
        "hobbies": ["fitness", "running", "hiking"],
        "count": 4,
        "examples": ["Strava", "AllTrails", "Nike Run Club", "Peloton"]
    },
    {
        "category": "gaming",
        "professions": ["game-designer"],
        "hobbies": ["gaming"],
        "count": 4,
        "examples": ["Discord", "OBS Studio", "Medal.tv", "NVIDIA Broadcast"]
    },
    {
        "category": "lifestyle",
        "professions": [],
        "hobbies": ["cooking", "traveling", "photography"],
        "count": 4,
        "examples": ["TripIt", "Whisk", "Lightroom", "VSCO"]
    }
]

# Known logo URLs (manually verified)
KNOWN_LOGOS = {
    "chatgpt": "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    "notion": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
    "figma": "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    "linear": "https://asset.brandfetch.io/idaeNz7NsW/id-dQuXyBh.svg",
    "discord": "https://asset.brandfetch.io/idaSYDn1qQ/id5VXzVct_.svg",
    "strava": "https://asset.brandfetch.io/idLhmxXoW9/idMi_Zd03L.svg",
    "alltrails": "https://asset.brandfetch.io/idFXnIWKeB/idvL-YIW-S.svg",
    "raycast": "https://asset.brandfetch.io/idwCAv24ti/id3LDGCDoT.svg",
    "sentry": "https://asset.brandfetch.io/idJTTPJMgZ/idgdqcpBHW.svg",
    "postman": "https://asset.brandfetch.io/id49tNc6Hv/idKJzrqAZB.svg",
    "github-copilot": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
}


async def generate_tools_with_gemini(category_info: Dict) -> List[Dict]:
    """Use Gemini to generate tool information"""
    
    prompt = f"""Generate detailed information for {category_info['count']} REAL AI tools in the "{category_info['category']}" category.

Examples to include: {', '.join(category_info['examples'])}

For EACH tool, provide a JSON object with:
- id: lowercase-hyphen-case (e.g., "github-copilot")
- name: Official product name
- description: 1 sentence describing what it does (max 80 chars)
- logo_color: Primary brand hex color (e.g., "#10A37F")
- website_url: Official website URL
- pricing_type: "free", "freemium", or "paid"
- price_monthly: Monthly price in USD (0 for free)
- rating: Rating out of 5 (4.0-5.0)
- tags: Array of 3-5 relevant tags
- professions: Array of professions that use this tool (from: developer, designer, marketer, writer, data-scientist, product-manager, entrepreneur, hr-manager, student, consultant, game-designer, software-engineer, blockchain-engineer)
- hobbies: Array of hobbies this tool helps with (from: gaming, fitness, hiking, running, cooking, traveling, photography, music, reading, coding, writing, art, yoga, meditation, skateboarding)
- cta_text: Call-to-action button text (e.g., "Try Free", "Start Free", "Download")
- features: Array of 3-4 key features
- integration_mode: One of: "free_api", "paid_api", "crawler", "iframe", "redirect"
- api_available: true/false
- has_free_tier: true/false

Return ONLY a valid JSON array, no markdown, no explanation.
"""

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
    
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 4000,
        }
    }
    
    transport = None
    if USE_PROXY:
        transport = httpx.AsyncHTTPTransport(proxy=HTTP_PROXY)
    
    async with httpx.AsyncClient(transport=transport, timeout=60) as client:
        try:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            
            data = response.json()
            text = data["candidates"][0]["content"]["parts"][0]["text"]
            
            # Clean up response
            text = text.strip()
            if text.startswith("```"):
                text = text.split("\n", 1)[1] if "\n" in text else text[3:]
            if text.endswith("```"):
                text = text[:-3]
            text = text.strip()
            
            tools = json.loads(text)
            
            # Add category and enrich with known logos
            for tool in tools:
                tool["category_id"] = category_info["category"]
                
                # Add known logo URLs
                tool_id = tool.get("id", "").lower()
                if tool_id in KNOWN_LOGOS:
                    tool["logo_url"] = KNOWN_LOGOS[tool_id]
                else:
                    tool["logo_url"] = None
                
                # Merge professions/hobbies from category
                if "professions" in category_info:
                    existing = set(tool.get("professions", []))
                    existing.update(category_info.get("professions", []))
                    tool["professions"] = list(existing)
                
                if "hobbies" in category_info:
                    existing = set(tool.get("hobbies", []))
                    existing.update(category_info.get("hobbies", []))
                    tool["hobbies"] = list(existing)
            
            return tools
            
        except Exception as e:
            print(f"❌ Error generating tools for {category_info['category']}: {e}")
            return []


async def insert_to_supabase(tools: List[Dict]):
    """Insert tools into Supabase"""
    
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("⚠️ Supabase not configured, saving to JSON file instead")
        with open("generated_tools.json", "w") as f:
            json.dump(tools, f, indent=2)
        print(f"✅ Saved {len(tools)} tools to generated_tools.json")
        return
    
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    
    async with httpx.AsyncClient(timeout=30) as client:
        # Insert in batches of 10
        for i in range(0, len(tools), 10):
            batch = tools[i:i+10]
            
            try:
                response = await client.post(
                    f"{SUPABASE_URL}/rest/v1/ai_tools",
                    headers=headers,
                    json=batch
                )
                
                if response.status_code in [200, 201]:
                    print(f"✅ Inserted batch {i//10 + 1}: {len(batch)} tools")
                else:
                    print(f"❌ Error inserting batch: {response.status_code} - {response.text}")
                    
            except Exception as e:
                print(f"❌ Error: {e}")


async def main():
    """Main function to seed the database"""
    print("🚀 Starting AI Tools Database Seeding...")
    print(f"📊 Categories to process: {len(TOOL_CATEGORIES)}")
    print()
    
    all_tools = []
    
    for category_info in TOOL_CATEGORIES:
        print(f"🔄 Generating {category_info['count']} tools for: {category_info['category']}")
        
        tools = await generate_tools_with_gemini(category_info)
        
        if tools:
            print(f"   ✅ Generated {len(tools)} tools")
            all_tools.extend(tools)
        else:
            print(f"   ⚠️ No tools generated")
        
        # Small delay to avoid rate limiting
        await asyncio.sleep(1)
    
    print()
    print(f"📦 Total tools generated: {len(all_tools)}")
    print()
    
    # Remove duplicates by id
    seen_ids = set()
    unique_tools = []
    for tool in all_tools:
        if tool["id"] not in seen_ids:
            seen_ids.add(tool["id"])
            unique_tools.append(tool)
    
    print(f"📦 Unique tools: {len(unique_tools)}")
    
    # Insert to Supabase
    await insert_to_supabase(unique_tools)
    
    print()
    print("✨ Done!")


if __name__ == "__main__":
    asyncio.run(main())

