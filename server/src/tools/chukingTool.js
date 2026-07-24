import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function chunkDocuments(parsedDocuments) {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunkedDocuments = [];

    for (const document of parsedDocuments) {
      let textToChunk = document.content;

      // Handle subtitle-based documents
      if (
        ["vtt", "srt", "youtube"].includes(document.type) &&
        document.subtitles
      ) {
        textToChunk = document.subtitles
          .map(
            (subtitle) =>
              `${subtitle.start} --> ${subtitle.end}\n${subtitle.text}`,
          )
          .join("\n\n");
      }

      const chunks = await splitter.splitText(textToChunk);

      chunkedDocuments.push({
        title: document.title,
        type: document.type,
        chunks,
      });
    }

    return chunkedDocuments;
  } catch (error) {
    throw error;
  }
}
