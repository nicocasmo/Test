
import { GoogleGenAI, Type } from "@google/genai";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    subtasks: {
      type: Type.ARRAY,
      description: "A list of actionable subtasks.",
      items: {
        type: Type.STRING,
        description: "A single subtask.",
      },
    },
  },
  required: ["subtasks"],
};

export const generateSubtasks = async (taskName: string): Promise<string[]> => {
  try {
    const prompt = `Based on the main task "${taskName}", generate a list of 3 to 5 short, actionable subtasks. Each subtask should start with a verb.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);

    if (result && Array.isArray(result.subtasks)) {
      return result.subtasks;
    }

    return [];

  } catch (error) {
    console.error("Error generating subtasks:", error);
    // You might want to throw a custom error or return a specific error message
    throw new Error("Failed to generate subtasks with AI. Please try again.");
  }
};