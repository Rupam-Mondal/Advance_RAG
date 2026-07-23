import fs from "fs/promises";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import pptx2json from "pptx2json";


export async function VTTParser(filePath){
    try {
        const content = await fs.readFile(filePath, "utf8");
        return content;
    } catch (error) {
        throw error
    }
}

export async function SRTParseR(filePath){
    try {
        const content = await fs.readFile(filePath, "utf8");
        return content;
    } catch (error) {
        throw error
    }
}

export async function PDFParser(filePath) {
    try {
        const buffer = await fs.readFile(filePath);

        const parser = new PDFParse({
            data: buffer,
        });

        const result = await parser.getText();

        await parser.destroy();

        return result.text.trim();

    } catch (error) {
        throw error;
    }
}

export async function DOCXParser(filePath) {
    try {
        const buffer = await fs.readFile(filePath);

        const result = await mammoth.extractRawText({
            buffer,
        });

        return result.value.trim();
    } catch (error) {
        throw error;
    }
}

export async function PPTXParser(filePath) {
    try {
        const presentation = await pptx2json(filePath);

        let text = "";

        for (const slide of presentation.slides) {
            for (const shape of slide.shapes) {
                if (shape.text) {
                    text += shape.text + "\n";
                }
            }
        }

        return text.trim();
    } catch (error) {
        throw error;
    }
}