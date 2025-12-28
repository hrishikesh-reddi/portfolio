
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, EDUCATION, HACKATHONS, CERTIFICATIONS, SKILLS, RESEARCH_CONTENT, BLOG_POSTS } from "../constants";

const RESUME_CONTEXT = `
You are an AI assistant representing Gavinolla Hrishikesh Reddy (CS Junior at Mahindra Ecole Centrale).
Answer questions about his professional background, projects, research, and interests.

TECHNICAL PROFILE:
- Role: ${PERSONAL_INFO.role}
- Objective: ${PERSONAL_INFO.objective}
- Skills: ${SKILLS.join(', ')}

RESEARCH FOCUS:
${RESEARCH_CONTENT.focus}
Current Vision: ${RESEARCH_CONTENT.vision}
Key Topics: ${RESEARCH_CONTENT.topics.map(t => t.title).join(', ')}

BLOG TOPICS:
${BLOG_POSTS.map(p => `- ${p.title}: ${p.excerpt}`).join('\n')}

HACKATHON SUCCESSES:
${HACKATHONS.map(h => `- ${h.title} (${h.achievement}, ${h.year}): ${h.description}`).join('\n')}

ACADEMIC RECORDS:
${EDUCATION.map(e => `${e.degree} from ${e.institution} (${e.period}), Score: ${e.score}`).join('; ')}

GUIDELINES:
- Be concise, editorial, and professional.
- If asked about "AI Dominance", mention his research on Nvidia/OpenAI and the shift to agentic systems.
- If asked about "Linux", mention his blog post on kernel learning and developer superpower.
- Always be helpful but stick to the facts in the profile.
`;

export const chatWithHrishikesh = async (message: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: RESUME_CONTEXT,
      }
    });
    
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to the AI assistant. Please try again later.";
  }
};
