import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import cookie from "cookie-parser"
import router from "./routes/mainRoute.js";
import { OpenAI } from "openai/client.js";
const app = express()
app.use(cookie());
app.use(cors({
    origin:'https://roastify-ai-1enq.vercel.app',
    credentials:true
}));
dotenv.config();
 const apikey = process.env.OPENAI_KEY;
export const openai = new OpenAI({
    apiKey:apikey
})
app.use(express.json());
 app.use("/api",router);
app.use((err,req,res,next) => {
    if(err.message){
        return res.status(400).json({error:err.message})
    }
    res.status(500).json({error:'Internal Server Error'})
})
app.listen(3000,()=>{
    console.log("Server listening on port 3000");
})
