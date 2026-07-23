import { documentUploadService } from "../service/documentService.js";

export async function documentUploadController(req, res) {
  try {
    const files = req.files || [];
    const source = req.body.source;

    if (!files.length && !source) {
      return res.status(400).json({
        success: false,
        message: "No file or source provided",
      });
    }

    let result;

    if (files.length > 0) {
      result = await documentUploadService({
        files,
      });
    } else {
      result = await documentUploadService({
        source,
      });
    }

    return res.json({
        success: true,
        message:"document uploaded successfully",
        data: result
    })

  } catch (error) {

    return res.json({
        success: false,
        message: `${error.message}`,
        data: error
    })
  }
}
