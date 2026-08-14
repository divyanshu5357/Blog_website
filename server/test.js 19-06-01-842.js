import "dotenv/config";
import { translatePost } from "./src/services/gemini.service.js";

const post = {
  title: "Artificial Intelligence",
  excerpt: "AI is changing the world.",
  content: "<p>Artificial Intelligence helps humans.</p>",
};

const result = await translatePost(post, "Hindi");

console.log(result);