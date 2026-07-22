import express from 'express';
import cors from 'cors';
import questionRouter from './routes/questionRouter.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/askquestion' , questionRouter);


app.listen(3000 , () => {
    console.log("server is running")
})