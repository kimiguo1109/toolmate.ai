/**
 * MaxMate API Service
 * Connects frontend to FastAPI backend for AI toolkit generation
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:18512";

export interface WorkTool {
  name: string;
  logo: string;
  rating: number;
  description: string;
  ctaText: string;
  category: string;
  price: number;
  url?: string;
}

export interface LifeTool {
  name: string;
  description: string;
  backgroundImage: string;
  url?: string;
}

export interface ToolkitSpecs {
  totalTools: number;
  monthlyCost: number;
  primaryGoal: string;
  freeTools: number;
  paidTools: number;
  updatedAt?: string;
}

export interface ToolkitResponse {
  id: string;
  slug: string;
  userName: string;
  profession: string;
  professionSlug: string;
  lifeContext: string;
  workTools: WorkTool[];
  lifeTools: LifeTool[];
  specs: ToolkitSpecs;
  description: string;
  longDescription: string;
  createdAt: string;
}

export interface GenerateRequest {
  profession: string;
  hobby: string;
  name: string;
  use_ai?: boolean;
}

export interface Profession {
  id: string;
  label: string;
  icon: string;
}

export interface Hobby {
  id: string;
  label: string;
  icon: string;
}

/**
 * Generate AI toolkit via backend API
 */
export async function generateToolkit(
  request: GenerateRequest
): Promise<ToolkitResponse> {
  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...request,
      use_ai: true, // Always try AI first
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Get search suggestions
 */
export async function getSuggestions(query: string): Promise<string[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/suggest?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  return data.suggestions || [];
}

/**
 * Get available professions
 */
export async function getProfessions(): Promise<Profession[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/professions`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.professions || [];
  } catch {
    return [];
  }
}

/**
 * Get available hobbies
 */
export async function getHobbies(): Promise<Hobby[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/hobbies`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.hobbies || [];
  } catch {
    return [];
  }
}

/**
 * Health check
 */
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

export interface ParsedIntent {
  profession: string;
  professionLabel: string;
  hobby: string;
  hobbyLabel: string;
  name: string | null;
  confidence: number;
}

/**
 * Parse natural language input to extract profession and hobby
 */
export async function parseInput(input: string): Promise<ParsedIntent> {
  const response = await fetch(`${API_BASE_URL}/api/parse`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Parse failed" }));
    throw new Error(error.detail || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Smart generate: Parse input + Generate toolkit in one step
 */
export async function smartGenerate(input: string): Promise<ToolkitResponse> {
  const response = await fetch(`${API_BASE_URL}/api/smart-generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Generation failed" }));
    throw new Error(error.detail || `API error: ${response.status}`);
  }

  return response.json();
}

