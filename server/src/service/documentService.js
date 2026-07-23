import { sourceIdentifier } from "../tools/bodyIdentifier.js";

export async function documentUploadService(data){
    try {
        const sources = await sourceIdentifier(data);
        console.log(sources);
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
                        break;

                    case ".srt":
                        console.log("SRT Parser");
                        break;

                    case ".zip":
                        console.log("ZIP Parser");
                        break;

                    default:
                        throw new Error(`Unsupported file: ${source.fileName}`);
                }
            }
        }

        return sources;

    } catch (error) {
        throw error;
    }
}