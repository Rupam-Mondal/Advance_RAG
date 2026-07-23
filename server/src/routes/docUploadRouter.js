import express from 'express';
import { documentUploadController } from '../controllers/documentController.js';
import { upload } from '../config/multer.js';

const documentRouter = express.Router();

documentRouter.post('/upload' , upload.any() , documentUploadController);

export default documentRouter;