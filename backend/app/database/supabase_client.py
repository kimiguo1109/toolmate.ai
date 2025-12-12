"""
Supabase Client for MaxMate.ai
"""
import os
from typing import Optional
from functools import lru_cache

try:
    from supabase import create_client, Client
    SUPABASE_AVAILABLE = True
except ImportError:
    SUPABASE_AVAILABLE = False
    Client = None

from app.config import settings
import logging

logger = logging.getLogger(__name__)


class SupabaseClient:
    """Singleton Supabase client wrapper"""
    
    _instance: Optional[Client] = None
    _initialized: bool = False
    
    @classmethod
    def get_client(cls) -> Optional[Client]:
        """Get or create Supabase client"""
        if not SUPABASE_AVAILABLE:
            logger.warning("Supabase package not installed. Using fallback mode.")
            return None
            
        if not cls._initialized:
            cls._initialize()
        return cls._instance
    
    @classmethod
    def _initialize(cls):
        """Initialize the Supabase client"""
        cls._initialized = True
        
        url = settings.SUPABASE_URL
        key = settings.SUPABASE_ANON_KEY
        
        if not url or not key:
            logger.warning(
                "Supabase credentials not configured. "
                "Set SUPABASE_URL and SUPABASE_ANON_KEY in .env"
            )
            return
        
        try:
            cls._instance = create_client(url, key)
            logger.info("✅ Supabase client initialized successfully")
        except Exception as e:
            logger.error(f"❌ Failed to initialize Supabase: {e}")
            cls._instance = None
    
    @classmethod
    def is_available(cls) -> bool:
        """Check if Supabase is available and configured"""
        return cls.get_client() is not None


@lru_cache()
def get_supabase() -> Optional[Client]:
    """Get Supabase client (cached)"""
    return SupabaseClient.get_client()

