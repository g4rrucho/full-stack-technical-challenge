import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";

dotenv.config();

export type AiResponse = {
  title: string;
  content: string;
};

const TOPICS = [
  "artificial intelligence and machine learning",
  "web development trends in 2025",
  "software architecture patterns",
  "mobile application development",
  "frontend development",
  "backend development",
  "data science and analytics",
  "cloud computing",
  "cybersecurity",
  "latest cybersecurity exploits from exploits-db.com", // HACK THE PLANET
];

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTE_API_KEY || "",
});

const getPrompt = () => {
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  return (
    `Write a detailed article about ${topic}.` +
    `The article should have a catchy title and at least 300 words of content.` +
    `Return ONLY valid JSON with double quotes, no code blocks, no backticks.` +
    `Format: {"title": "your title", "content": "your content"}`
  );
};

const parseResponse = (response: string): AiResponse => {
  try {
    const cleaned = response.trim();
    const parsed = JSON.parse(cleaned);

    if (parsed.title && parsed.content)
      return { title: parsed.title, content: parsed.content };

    throw new Error("Invalid response format - missing title or content");
  } catch (error) {
    console.error("Parse error:", error);
    console.error("Response was:", response);
    throw error;
  }
};

export async function generateArticle(): Promise<AiResponse> {
  if (!process.env.OPENROUTE_API_KEY)
    throw new Error("OPENROUTE_API_KEY is not set");

  const completion = await openRouter.chat.send({
    model: process.env.OPENROUTE_MODEL || "",
    messages: [
      {
        role: "user",
        content: getPrompt(),
      },
    ],
    stream: false,
  });

  const { content, title } = parseResponse(
    completion.choices[0].message.content as string
  );

  return { content, title };
}
