import { DevolutivaData } from '@/types';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-flash';
const getGeminiApiUrl = () => `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

// Parse JSON from Gemini response with fallback
const parseGeminiResponse = (text: string) => {
  try {
    // Try to extract JSON from response (Gemini might wrap it in markdown)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return null;
  } catch (error) {
    console.error('Error parsing Gemini response:', error);
    return null;
  }
};

// Generate structured prompt for DISC analysis
const createAnalysisPrompt = (subjectName: string): string => {
  return `Você é um especialista em análise DISC comportamental.

Analise a pessoa chamada "${subjectName}" e crie uma devolutiva de identidade estruturada em JSON com a seguinte estrutura:

{
  "discProfile": { "d": <0-100>, "i": <0-100>, "s": <0-100>, "c": <0-100> },
  "dominantProfile": "<D|I|S|C>",
  "healthIndexes": [
    { "name": "string", "value": "string", "diagnosis": "string", "impact": "string", "isAlert": boolean }
  ],
  "towerData": [
    { "profile": "<D|I|S|C>", "selfPerception": <0-100>, "environmentDemand": <0-100> }
  ],
  "skills": [
    { "name": "string", "type": "<expansion|retraction>" }
  ],
  "pyramid": {
    "base": ["string", "string"],
    "middle": ["string", "string"],
    "top": "string"
  },
  "burnoutRisk": boolean,
  "generatedContent": {
    "rapport": "string",
    "pizzaChartAnalysis": "string",
    "towerChartAnalysis": "string",
    "skillsAnalysis": "string",
    "healthIndexAnalysis": "string",
    "pyramidAnalysis": "string",
    "internalWarDiagnosis": "string",
    "smartTaskSuggestion": "string",
    "finalImpactQuestion": "string",
    "questions": {
      "decrease": [
        { "profile": "<D|I|S|C>", "question": "string" }
      ],
      "increase": [
        { "profile": "<D|I|S|C>", "question": "string" }
      ],
      "expandSkill": [
        { "skill": "string", "question": "string" }
      ],
      "retractSkill": [
        { "skill": "string", "question": "string" }
      ]
    }
  }
}

Retorne APENAS o JSON, sem explicações adicionais.`;
};

export const generateDevolutiva = async (subjectName: string): Promise<DevolutivaData> => {
  // Validate input
  if (!subjectName || typeof subjectName !== 'string') {
    return Promise.reject(new Error('Invalid subject name'));
  }

  // Validate API Key
  if (!API_KEY) {
    console.error('VITE_GOOGLE_API_KEY is not configured');
    return Promise.reject(new Error('API Key not configured. Please add VITE_GOOGLE_API_KEY to environment variables.'));
  }

  try {
    console.log('Calling Gemini API for:', subjectName);

    const response = await fetch(getGeminiApiUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: createAnalysisPrompt(subjectName),
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096,
        },
      }),
    } as RequestInit & { headers: Record<string, string> });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data: GeminiResponse = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      throw new Error('No response from Gemini API');
    }

    console.log('Gemini response received, parsing...');
    const parsedContent = parseGeminiResponse(responseText);

    if (!parsedContent) {
      throw new Error('Failed to parse Gemini response');
    }

    // Construct complete DevolutivaData
    const devolutiva: DevolutivaData = {
      id: `devolutiva-${Date.now()}`,
      subjectName,
      date: new Date().toLocaleDateString('pt-BR'),
      discProfile: parsedContent.discProfile || { d: 0, i: 0, s: 0, c: 0 },
      dominantProfile: parsedContent.dominantProfile || 'D',
      healthIndexes: parsedContent.healthIndexes || [],
      towerData: parsedContent.towerData || [],
      skills: parsedContent.skills || [],
      pyramid: parsedContent.pyramid || { base: [], middle: [], top: '' },
      burnoutRisk: parsedContent.burnoutRisk || false,
      generatedContent: {
        rapport: parsedContent.generatedContent?.rapport || '',
        pizzaChartAnalysis: parsedContent.generatedContent?.pizzaChartAnalysis || '',
        towerChartAnalysis: parsedContent.generatedContent?.towerChartAnalysis || '',
        skillsAnalysis: parsedContent.generatedContent?.skillsAnalysis || '',
        healthIndexAnalysis: parsedContent.generatedContent?.healthIndexAnalysis || '',
        pyramidAnalysis: parsedContent.generatedContent?.pyramidAnalysis || '',
        internalWarDiagnosis: parsedContent.generatedContent?.internalWarDiagnosis || '',
        smartTaskSuggestion: parsedContent.generatedContent?.smartTaskSuggestion || '',
        finalImpactQuestion: parsedContent.generatedContent?.finalImpactQuestion || '',
        questions: parsedContent.generatedContent?.questions || {
          decrease: [],
          increase: [],
          expandSkill: [],
          retractSkill: [],
        },
      },
    };

    console.log('Devolutiva generated successfully for:', subjectName);
    return devolutiva;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to generate devolutiva';
    console.error('generateDevolutiva error:', error);
    throw new Error(message);
  }
};
