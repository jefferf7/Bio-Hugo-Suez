
import { GoogleGenAI, Type } from "@google/genai";
import { LinkResponse } from "../types.ts";

export const generateLinks = async (url: string): Promise<LinkResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
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
  } catch (error) {
    console.error("Error generating links:", error);
    throw new Error("Falha ao analisar os links do site. Verifique a URL.");
  }
};
