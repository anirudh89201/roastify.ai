import { openai } from "../index.js";
import {getRoast} from "../utils/promptBuilder.js"
export const roastService = async (imagefile,Language) => {
  const mimeType = imagefile.mimetype;
  const roast = await getRoast();
  const base64 = imagefile.buffer.toString("base64");
  const imageurl = `data:${mimeType};base64,${base64}`;
  const response = await openai.chat.completions.create({
    model: 'gpt-4o', // 👈 must support vision
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: roast },
          {
            type: 'image_url',
            image_url: {
              url: imageurl,
            },
          },
        ],
      },
    ],
    max_tokens: 100,
  });

  const message = response.choices[0]?.message?.content;
  return message;
};
