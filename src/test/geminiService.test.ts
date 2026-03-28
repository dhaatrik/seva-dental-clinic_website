import { describe, it, expect, vi, beforeEach } from 'vitest';

// We need to mock the module BEFORE it's imported by geminiService
const mockGenerateContent = vi.fn();

vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(function() {
      return {
        models: {
          generateContent: mockGenerateContent,
        },
      };
    }),
  };
});

describe('geminiService', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    // Default API KEY for most tests
    vi.stubEnv('API_KEY', 'test-api-key');
  });

  it('returns fallback message when API_KEY is missing', async () => {
    // Override environment for this specific test
    vi.stubEnv('API_KEY', '');
    
    // Re-import the service to pick up the new env value
    const { getChatbotResponse, getPersonalizedTips } = await import('../../services/geminiService');
    
    const response = await getChatbotResponse([], 'Hello');
    expect(response).toContain("connection to my knowledge base is currently unavailable");

    const tips = await getPersonalizedTips('Novice Navigator' as any, 5, ['Brushing']);
    expect(tips).toContain("Personalized tips are currently unavailable");
  });

  it('returns successful AI response for chatbot', async () => {
    mockGenerateContent.mockResolvedValue({
      text: 'Hello! I am the Smile Guide. How can I help you today?',
    });

    const { getChatbotResponse } = await import('../../services/geminiService');
    
    const history = [{ role: 'user' as const, text: 'Hi' }];
    const response = await getChatbotResponse(history, 'How are you?');

    expect(response).toBe('Hello! I am the Smile Guide. How can I help you today?');
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.objectContaining({
      contents: expect.arrayContaining([
        { role: 'user', parts: [{ text: 'Hi' }] },
        { role: 'user', parts: [{ text: 'How are you?' }] }
      ])
    }));
  });

  it('returns successful personalized tips', async () => {
    mockGenerateContent.mockResolvedValue({
      text: '- Tip 1: Brush more\n- Tip 2: Floss daily',
    });

    const { getPersonalizedTips } = await import('../../services/geminiService');
    
    const tips = await getPersonalizedTips('Adept Adventurer' as any, 8, ['Flossing']);

    expect(tips).toBe('- Tip 1: Brush more\n- Tip 2: Floss daily');
    expect(mockGenerateContent).toHaveBeenCalledWith(expect.objectContaining({
      contents: expect.stringContaining('Adept Adventurer')
    }));
  });

  it('handles errors and returns fallback error message', async () => {
    mockGenerateContent.mockRejectedValue(new Error('Network Error'));

    const { getChatbotResponse, getPersonalizedTips } = await import('../../services/geminiService');
    
    const chatbotResponse = await getChatbotResponse([], 'Hello');
    expect(chatbotResponse).toBe("I'm having a little trouble connecting right now. Please try again in a moment.");

    const tipsResponse = await getPersonalizedTips('Novice Navigator' as any, 3, ['Brushing']);
    expect(tipsResponse).toContain("Error generating tips: Network Error");
  });
});
