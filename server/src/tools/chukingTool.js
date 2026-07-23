import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function chunkDocuments(parsedDocuments){
    try {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const chunkedDocuments = [];

        for (const document of parsedDocuments) {

            const chunks = await splitter.splitText(document.content);

            chunkedDocuments.push({
                type: document.type,
                chunks,
            });

        }

        return chunkedDocuments;
    } catch (error) {
        throw error;
    }
}