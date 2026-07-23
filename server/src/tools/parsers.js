import fs from "fs/promises";

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