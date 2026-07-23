import { sourceIdentifier } from "../tools/bodyIdentifier.js";
import { SRTParseR, VTTParser } from "../tools/parsers.js";

export async function documentUploadService(data){
    try {
        const sources = await sourceIdentifier(data);
        console.log(sources);
        const parsedDocuments = [];
        for(const source of sources){
            if(source.sourceType === "youtube"){
                console.log("YouTube Processor");
            }
            else if (source.sourceType === "website"){
                console.log("Website Processor");
            }
            else if (source.sourceType === "github") {
                console.log("GitHub Processor");
            }
            else if (source.sourceType === "pdf-url") {
                console.log("Remote PDF Processor");
            }
            else if(source.sourceType === "file"){
                switch (source.extension) {
                    case ".pdf":
                        console.log("PDF Parser");
                        break;

                    case ".docx":
                        console.log("DOCX Parser");
                        break;

                    case ".pptx":
                        console.log("PPTX Parser");
                        break;

                    case ".vtt":
                        console.log("VTT Parser");
                        const result = await VTTParser(source.path);
                        parsedDocuments.push(result);
                        break;

                    case ".srt":
                        console.log("SRT Parser");
                        const result = await SRTParseR(source.path);
                        parsedDocuments.push(result);
                        break;

                    case ".zip":
                        console.log("ZIP Parser");
                        break;

                    default:
                        throw new Error(`Unsupported file: ${source.fileName}`);
                }
            }
        }

        return parsedDocuments;

    } catch (error) {
        throw error;
    }
}