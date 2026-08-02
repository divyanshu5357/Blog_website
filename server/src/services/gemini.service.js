import "dotenv/config";
import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
export const translatePost = async (post, language) => {
  const prompt = `
Translate the following blog into ${language}.

Rules:
- Return ONLY valid JSON.
- Preserve HTML tags inside content.
- Do not translate image URLs.
- Keep formatting.

JSON format:

{
"title":"",
"excerpt":"",
"content":""
}

Title:
${post.title}

Excerpt:
${post.excerpt}

Content:
${post.content}
`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  let text = response.text;

  // remove markdown if Gemini wraps JSON
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
};