import fs from "fs/promises";
import { PDFParse } from "pdf-parse";
import path from "path";
import mammoth from "mammoth";
import pptx2json from "pptx2json";
import webvtt from "node-webvtt";
import parseSRT from "parse-srt";

export async function TXTParser(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return {
      title: filePath.split(/[\\/]/).pop(),
      type: "txt",
      content,
    };
  } catch (error) {
    throw error;
  }
}

export async function VTTParser(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    console.log("content");
    console.log(typeof content);
    console.log(content.slice(0, 200));
    const result = webvtt.parse(content);
    const subtitles = result.cues.map((cue) => ({
      start: cue.start,
      end: cue.end,
      text: cue.text,
    }));

    console.log(subtitles);
    return {
      title: path.basename(filePath),
      type: ".vtt",
      content,
      subtitles,
    };
  } catch (error) {
    console.error(err);
    console.error(err.stack);
    throw error;
  }
}

export async function SRTParser(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf8");

    const subtitles = parseSRT(content).map((cue) => ({
      start: cue.start,
      end: cue.end,
      text: cue.text.replace(/\r?\n/g, " "),
    }));

    const textContent = subtitles
      .map((s) => `[${s.start}-${s.end}] ${s.text}`)
      .join("\n");

    return {
      title: path.basename(filePath),
      type: ".srt",
      content: textContent,
      subtitles,
    };
  } catch (error) {
    throw error;
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

    return {
      title: path.basename(filePath),
      type: ".pdf",
      content: result.text.trim(),
    };
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

    return {
      title: path.basename(filePath),
      type: ".docx",
      content: result.value.trim(),
    };
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

    return {
      title: path.basename(filePath),
      type: ".pptx",
      content: text.trim(),
    };
  } catch (error) {
    throw error;
  }
}
