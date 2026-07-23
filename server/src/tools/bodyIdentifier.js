import path from "path";

export async function sourceIdentifier(data) {
  try {
    if (data.source) {
       return [identifySource(data.source)];
    }


    if (data.files && data.files.length) {
      const identifiedFiles = data.files.map((file) => ({
        sourceType: "file",
        fileName: file.originalname,
        extension: path.extname(file.originalname).toLowerCase(),
        mimeType: file.mimetype,
        path: file.path,
        size: file.size,
      }));

      console.log(identifiedFiles);

      return identifiedFiles;

    }
  } catch (error) {
    throw error;
  }
}

function identifySource(source) {
  try {
    const url = new URL(source);

    if (
      url.hostname.includes("youtube.com") ||
      url.hostname.includes("youtu.be")
    ) {
      return {
        sourceType: "youtube",
        url: source,
      };
    }

    if (url.pathname.endsWith(".pdf")) {
      return {
        sourceType: "pdf-url",
        url: source,
      };
    }

    if (url.hostname.includes("github.com")) {
      return {
        sourceType: "github",
        url: source,
      };
    }

    return {
      sourceType: "website",
      url: source,
    };
  } catch {
    throw new Error("Invalid source.");
  }
}
