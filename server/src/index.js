import express from 'express';
import cors from 'cors';
import questionRouter from './routes/questionRouter.js';
import { connectDB } from './config/dbConfig.js';
import documentRouter from './routes/docUploadRouter.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/askquestion' , questionRouter);
app.use('/docs' , documentRouter);


app.listen(3000 , async () => {
    console.log("server is running");
    await connectDB()
})