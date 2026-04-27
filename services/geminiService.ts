
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { QuizResult, SmileExplorerRank } from '../types';
import { CLINIC_NAME, SERVICES_DATA, CLINIC_ADDRESS, PHONE_NUMBER, OPENING_HOURS, CLINIC_EMAIL } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. Personalized tips will be disabled.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const getPersonalizedTips = async (rank: SmileExplorerRank, score: number, answersSummary: string[]): Promise<string | null> => {
  if (!ai) {
    return "Personalized tips are currently unavailable. Please ensure your API key is configured.";
  }

  const prompt = `
    You are a gentle, empathetic, and expert dental health guide. 
    **Context:** A user just completed a dental health quiz. 
    - Rank: "${rank}" 
    - Score: ${score} out of 15 
    - Areas for improvement: ${answersSummary.join(', ') || 'None! Excellent work.'}

    **Task:** Provide 2-3 actionable, personalized tips based strictly on their specific "Areas for improvement". If their areas for improvement are "None!", provide tips on maintaining their excellent oral hygiene. Frame these tips as the next steps in their "Smile Adventure."

    **Tone:** Positive, friendly, and reassuring. Keep it suitable for someone who might be anxious about visiting the dentist.

    **Constraints:** - Do not provide generic dental advice; focus only on the specific areas listed above.
    - Output ONLY the tips formatted as a Markdown bulleted list. 
    - Do not include any introductory fluff (e.g., "Here are your tips:") or concluding remarks.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching personalized tips from Gemini:", error);
    if (error instanceof Error) {
        return `Error generating tips: ${error.message}. Please try again later.`;
    }
    return "Could not generate personalized tips at this time.";
  }
};

export const getChatbotResponse = async (history: { role: 'user' | 'model'; text: string }[], newMessage: string): Promise<string> => {
  if (!ai) {
    return "I'm sorry, my connection to my knowledge base is currently unavailable. Please try again later.";
  }

  const servicesList = SERVICES_DATA.map(s => `- ${s.name}: ${s.shortDescription}`).join('\n');

  const systemInstruction = `You are the "Smile Guide," a friendly and helpful AI assistant for the ${CLINIC_NAME}.
Your purpose is to answer user questions about the clinic, its services, and general dental health topics.
Be concise, friendly, and reassuring. Always maintain a positive and encouraging tone.
Use the following information to answer questions accurately. Do not invent information. If you don't know the answer, politely say you don't have that information, but YOU MUST include the exact string "[NOT_FOUND]" anywhere in your response.

**Clinic Information:**
- Name: ${CLINIC_NAME}
- Address: ${CLINIC_ADDRESS}
- Phone: ${PHONE_NUMBER}
- Email: ${CLINIC_EMAIL}
- Opening Hours: ${OPENING_HOURS.join(', ')}

**Services Offered:**
${servicesList}

**General Instructions:**
- For questions about booking appointments, direct them to the Contact & Book page or suggest they call ${PHONE_NUMBER}.
- For questions about specific dental problems, provide general information but always recommend consulting with the dentist for a proper diagnosis.
- Keep answers relatively short and easy to understand.
- Frame responses as if you are guiding them on their "Smile Adventure".`;

  const contents = [
    ...history.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] })),
    { role: 'user', parts: [{ text: newMessage }] }
  ];

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching chatbot response from Gemini:", error);
    return "I'm having a little trouble connecting right now. Please try again in a moment.";
  }
};