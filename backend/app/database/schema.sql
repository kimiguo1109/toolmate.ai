-- ============================================================================
-- MaxMate.ai Database Schema
-- Supabase PostgreSQL
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TOOL CATEGORIES
-- ============================================================================
CREATE TABLE IF NOT EXISTS tool_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories
INSERT INTO tool_categories (id, name, description) VALUES
    ('llm', 'LLM', 'General language models (limit 1-2 per toolkit)'),
    ('code_assistant', 'Code Assistant', 'AI-powered coding tools'),
    ('project_mgmt', 'Project Management', 'Task and project tracking'),
    ('design', 'Design', 'UI/UX and graphic design tools'),
    ('analytics', 'Analytics', 'Data and user analytics'),
    ('marketing', 'Marketing', 'Marketing automation and campaigns'),
    ('seo', 'SEO', 'Search engine optimization tools'),
    ('writing', 'Writing', 'Content creation and editing'),
    ('research', 'Research', 'Research and knowledge management'),
    ('data', 'Data', 'Data science and ML tools'),
    ('communication', 'Communication', 'Team communication tools'),
    ('automation', 'Automation', 'Workflow automation'),
    ('testing', 'Testing', 'Testing and QA tools'),
    ('monitoring', 'Monitoring', 'Application monitoring'),
    ('finance', 'Finance', 'Financial tools'),
    ('hr', 'HR', 'Human resources tools'),
    ('education', 'Education', 'Learning platforms'),
    ('image_gen', 'Image Generation', 'AI image generation'),
    ('video', 'Video', 'Video creation and editing'),
    ('audio', 'Audio', 'Audio and music tools'),
    ('lifestyle', 'Lifestyle', 'Personal lifestyle apps'),
    ('fitness', 'Fitness', 'Health and fitness tracking'),
    ('travel', 'Travel', 'Travel planning'),
    ('gaming', 'Gaming', 'Gaming and streaming tools')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- AI TOOLS
-- ============================================================================
CREATE TABLE IF NOT EXISTS ai_tools (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category_id TEXT REFERENCES tool_categories(id),
    
    -- Visual
    logo_color TEXT DEFAULT '#6366F1',
    logo_url TEXT,
    
    -- Links
    website_url TEXT NOT NULL,
    
    -- Pricing
    pricing_type TEXT CHECK (pricing_type IN ('free', 'freemium', 'paid')) DEFAULT 'freemium',
    price_monthly DECIMAL(10,2) DEFAULT 0,
    
    -- Ratings
    rating DECIMAL(2,1) DEFAULT 4.5 CHECK (rating >= 0 AND rating <= 5),
    
    -- Tags (for search)
    tags TEXT[] DEFAULT '{}',
    
    -- Matching
    professions TEXT[] DEFAULT '{}',
    hobbies TEXT[] DEFAULT '{}',
    
    -- UI
    cta_text TEXT DEFAULT 'Try Free',
    features TEXT[] DEFAULT '{}',
    
    -- Integration info
    integration_mode TEXT CHECK (integration_mode IN ('crawler', 'free_api', 'paid_api', 'prompt', 'iframe', 'redirect')) DEFAULT 'redirect',
    api_available BOOLEAN DEFAULT FALSE,
    has_free_tier BOOLEAN DEFAULT TRUE,
    
    -- Meta
    is_active BOOLEAN DEFAULT TRUE,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for fast querying
CREATE INDEX IF NOT EXISTS idx_ai_tools_category ON ai_tools(category_id);
CREATE INDEX IF NOT EXISTS idx_ai_tools_professions ON ai_tools USING GIN(professions);
CREATE INDEX IF NOT EXISTS idx_ai_tools_hobbies ON ai_tools USING GIN(hobbies);
CREATE INDEX IF NOT EXISTS idx_ai_tools_tags ON ai_tools USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_ai_tools_active ON ai_tools(is_active);

-- ============================================================================
-- HOBBY BACKGROUNDS
-- ============================================================================
CREATE TABLE IF NOT EXISTS hobby_backgrounds (
    id SERIAL PRIMARY KEY,
    hobby TEXT NOT NULL,
    image_url TEXT NOT NULL,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hobby_backgrounds_hobby ON hobby_backgrounds(hobby);

-- Insert default backgrounds
INSERT INTO hobby_backgrounds (hobby, image_url, priority) VALUES
    ('hiking', 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80', 0),
    ('hiking', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', 1),
    ('gaming', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80', 0),
    ('gaming', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80', 1),
    ('cooking', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', 0),
    ('cooking', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80', 1),
    ('fitness', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', 0),
    ('fitness', 'https://images.unsplash.com/photo-1534368959878-b5cd06801e27?w=800&q=80', 1),
    ('traveling', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80', 0),
    ('traveling', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', 1),
    ('photography', 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80', 0),
    ('photography', 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80', 1),
    ('music', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', 0),
    ('music', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80', 1),
    ('reading', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80', 0),
    ('reading', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80', 1),
    ('yoga', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80', 0),
    ('yoga', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80', 1),
    ('running', 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80', 0),
    ('running', 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80', 1),
    ('skateboarding', 'https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?w=800&q=80', 0),
    ('skateboarding', 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=800&q=80', 1),
    ('art', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80', 0),
    ('art', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', 1),
    ('coding', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80', 0),
    ('coding', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80', 1),
    ('writing', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80', 0),
    ('writing', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80', 1),
    ('meditation', 'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=800&q=80', 0),
    ('meditation', 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80', 1)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- USER TOOLKITS (for future personalization)
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_toolkits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    user_name TEXT NOT NULL,
    profession TEXT NOT NULL,
    hobby TEXT NOT NULL,
    work_tools JSONB DEFAULT '[]',
    life_tools JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    view_count INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_user_toolkits_slug ON user_toolkits(slug);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
-- Enable RLS
ALTER TABLE ai_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE hobby_backgrounds ENABLE ROW LEVEL SECURITY;

-- Public read access for tools
CREATE POLICY "Public read access for ai_tools" ON ai_tools
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access for tool_categories" ON tool_categories
    FOR SELECT USING (true);

CREATE POLICY "Public read access for hobby_backgrounds" ON hobby_backgrounds
    FOR SELECT USING (true);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for ai_tools
CREATE TRIGGER update_ai_tools_updated_at
    BEFORE UPDATE ON ai_tools
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_toolkits  
CREATE TRIGGER update_user_toolkits_updated_at
    BEFORE UPDATE ON user_toolkits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

