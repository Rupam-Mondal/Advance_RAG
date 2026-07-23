import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

export async function generateVectorEmbeddings(data) {
  try {
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
      apiKey: openai,
    });


    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
            url:process.env.QDRUNT_LINK,
            apiKey:process.env.QDRUNT_KEY,
            collectionName:'NoteBookLM'
        }
    )

  } catch (error) {

  }
}
