import "dotenv/config";
import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
  url: process.env.QDRUNT_LINK,
  apiKey: process.env.QDRUNT_KEY,
});

await client.createPayloadIndex("NoteBookLM", {
  field_name: "metadata.sourceId",
  field_schema: "keyword",
});

console.log("✅ Payload index created.");