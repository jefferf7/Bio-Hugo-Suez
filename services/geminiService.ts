
import { GoogleGenAI, Type } from "@google/genai";
import { LinkResponse } from "../types";

export const generateLinks = async (url: string): Promise<LinkResponse> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key não configurada. Por favor, adicione GEMINI_API_KEY às variáveis de ambiente.");
  }
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Analise profundamente o conteúdo do site: ${url}. 
    
    Identifique os links presentes no site e categorize-os. 
    Atenção especial:
    1. Identifique o link da "Página Oficial" ou "Home" (geralmente o próprio URL fornecido).
    2. Identifique links de "Políticas de Privacidade", "Termos de Uso" ou "Avisos Legais".
    3. Identifique Redes Sociais, Portfólio, Contato e WhatsApp.
    
    A resposta deve ser estritamente em JSON com a seguinte estrutura:
    {
      "name": "Nome da pessoa ou empresa",
      "shortDescription": "Um resumo rápido (tagline) do que se trata o site",
      "links": [
        {
          "label": "Nome amigável do Link",
          "url": "https://...",
          "category": "Social | Portfolio | Contact | Internal | Legal | Home"
        }
      ]
    }
    
    Categorize como 'Home' o link que aponta para a página inicial oficial.
    Categorize como 'Legal' links de privacidade ou termos.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            shortDescription: { type: Type.STRING },
            links: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  url: { type: Type.STRING },
                  category: { type: Type.STRING },
                },
                required: ["label", "url", "category"],
              },
            },
          },
          required: ["name", "shortDescription", "links"],
        },
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title || 'Referência',
        uri: chunk.web.uri
      }));

    return {
      ...data,
      sources: sources
    };
  } catch (error: any) {
    console.error("Error generating links:", error);
    
    // Tratamento específico para erro de cota (429)
    if (error.message?.includes("429") || error.message?.includes("RESOURCE_EXHAUSTED")) {
      throw new Error("Limite de cota excedido. Por favor, aguarde um minuto ou verifique seu plano no Google AI Studio (ai.google.dev).");
    }
    
    throw new Error("Falha ao analisar os links do site. Verifique a URL ou tente novamente mais tarde.");
  }
};
