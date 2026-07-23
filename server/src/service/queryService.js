import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

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
          key: "sourceId",
          match: {
            value: docID,
          },
        },
      ],
    });

    console.log(documents);

    const system_prompt = `
    you are an expert in answering user query based on the provided context about document
    do not answer anything beyond what is not provided. try to give answer medium size. do not give answer too long
    `;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
