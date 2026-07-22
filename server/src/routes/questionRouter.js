import express from 'express'
import { userQuestionController } from '../controllers/questionController.js';

const questionRouter = express.Router();

questionRouter.post('/question' , userQuestionController);

export default questionRouter;