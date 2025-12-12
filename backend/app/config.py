"""
MaxMate.ai Backend Configuration
"""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings with environment variable support"""
    
    # App Info
    APP_NAME: str = "MaxMate.ai API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 18512
    
    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://maxmate.ai",
    ]
    
    # Gemini API (load from environment variable)
    GEMINI_API_KEY: str = ""  # Set in .env file
    GEMINI_MODEL: str = "gemini-2.5-flash"  # Gemini 2.5 Flash
    GEMINI_API_BASE_URL: str = "https://generativelanguage.googleapis.com/v1beta/models"
    
    # API Settings
    API_TIMEOUT: int = 60  # Increased timeout for AI generation
    MAX_RETRIES: int = 3
    
    # Rate Limiting
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_WINDOW: int = 60  # seconds
    
    # Proxy (optional, for users behind firewall)
    USE_PROXY: bool = False  # Set to True in .env if needed
    HTTP_PROXY: str = "http://127.0.0.1:7890"  # Configure in .env if needed
    
    # Database Configuration
    DATABASE_URL: str = ""  # PostgreSQL connection string
    
    # Supabase Configuration
    SUPABASE_URL: str = ""  # Set in .env file
    SUPABASE_ANON_KEY: str = ""  # Set in .env file
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        extra = "ignore"  # Allow extra env vars without error


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()


settings = get_settings()

