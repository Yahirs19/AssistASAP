import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY; // Reemplaza con tu clave API de Google Generative AI
export const genAI = new GoogleGenerativeAI(apiKey as string);
export default genAI;