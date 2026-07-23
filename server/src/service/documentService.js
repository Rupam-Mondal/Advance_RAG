import { sourceIdentifier } from "../tools/bodyIdentifier.js";
import { chunkDocuments } from "../tools/chukingTool.js";
import { generateVectorEmbeddings } from "../tools/filesQdruntUploader.js";
import { DOCXParser, PDFParser, PPTXParser,SRTParser,VTTParser } from "../tools/parsers.js";

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
                        const PDFresult = await PDFParser(source.path);
                        parsedDocuments.push(PDFresult);
                        const chunkPDf = await chunkDocuments(parsedDocuments);
                        console.log(chunkPDf)
                        break;

                    case ".docx":
                        console.log("DOCX Parser");
                        const DOCXresult = await DOCXParser(source.path);
                        parsedDocuments.push(DOCXresult)
                        break;

                    case ".pptx":
                        console.log("PPTX Parser");
                        const PPTXresult = await PPTXParser(source.path);
                        parsedDocuments.push(PPTXresult);
                        break;

                    case ".vtt":
                        console.log("VTT Parser");
                        const VTTresult = await VTTParser(source.path);
                        const chunkVTT = await chunkDocuments([VTTresult]);
                        console.log("chunking")
                        console.log(chunkVTT)
                        const embeddingVTT = await generateVectorEmbeddings(chunkVTT);
                        parsedDocuments.push(embeddingVTT);
                        break;

                    case ".srt":
                        console.log("SRT Parser");
                        const SRTresult = await SRTParser(source.path);
                        console.log([SRTresult])
                        const chunkSRT = await chunkDocuments([SRTresult]);
                        const embeddingsSRT = await generateVectorEmbeddings(chunkSRT)
                        parsedDocuments.push(embeddingsSRT);
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