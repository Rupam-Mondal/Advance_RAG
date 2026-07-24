import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";
import dotenv from 'dotenv';


dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function queryService(stepbackPrompt, docID) {
  try {
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
      text: {
        format: {
          type: "json_object",
        },
      },
      apiKey: process.env.OPENAI_API_KEY,
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: process.env.QDRUNT_LINK,
        apiKey: process.env.QDRUNT_KEY,
        collectionName: "NoteBookLM",
      },
    );

    const query = [stepbackPrompt.stepbackprompt, stepbackPrompt.keyword]
      .filter(Boolean)
      .join("\n");

    const documents = await vectorStore.similaritySearch(query, 10, {
      must: [
        {
          key: "metadata.sourceId",
          match: {
            value: docID,
          },
        },
      ],
    });

    const system_prompt = `
    you are an expert in answering user query based on the provided context about document
    do not answer anything beyond what is not provided. try to give answer medium size. do not give answer too long
    user documents :- ${documents.map((e) => JSON.stringify(e))}
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: system_prompt,
        },
        {
          role: "user",
          content: stepbackPrompt.stepbackprompt,
        },
      ],
    });


    return response.choices[0].message.content;


  } catch (error) {
    console.error("========== FULL ERROR ==========");
    console.dir(error, { depth: null });

    console.error("Message:", error.message);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response:");
      console.dir(error.response.data, { depth: null });
    }

    if (error.cause) {
      console.error("Cause:");
      console.dir(error.cause, { depth: null });
    }

    throw error;
  }
}
