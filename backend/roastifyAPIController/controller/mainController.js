import jwt from "jsonwebtoken"
import { roastService } from "../services/roastService.js";
import { client } from "../utils/OAuth2Client.js";
import { supabase } from "../utils/supabaseClient.js";

export const FileHandler =  async(req,res) => {
    const file = req.file;
    const roast = await roastService(file);
    if(!roast){
        return res.status(500).json({"message":"Internal Server Error"})
    }
    return res.status(200).json({"message":`${roast}`})
}
export const SignUpService = async(req,res) => {
   const {token} = req.body;
   try{
    const ticket = await client.verifyIdToken({
        idToken:token,
        audience: '690607705647-cfffmapsnsgarpte5iem1208abcbpa8i.apps.googleusercontent.com'
    })
    const payload =  ticket.getPayload();
    const {data,error} = await supabase.from("Users").insert([{email:payload.email,picture_url:payload.picture,name:payload.name}]);
    console.log(data);
    if(error){
        console.log(error);
        return res.status(200).json({message:"Internal Database Error"})
    }
    const Jwttoken = jwt.sign({name:payload.name,email:payload.email},process.env.JWT_SECRET_KEY,{
        expiresIn:'7d',
    })
    res.cookie('authToken', Jwttoken, {
        httpOnly: true,
        secure: true, // required for HTTPS
        sameSite: 'None', // required for cross-site cookies
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      

    return res.status(200).json({user:payload.name});
   }catch(error){
    console.error(error);
    return res.status(400).json({message:"Verification failed.."});
   }
}
export const StatusService = async(req,res) => {
    const token = req.cookies.authToken;
    console.log("Token:=" + token);
    if(!token) return res.status(401).json({loggedIn:false});
    try{
        const user  = jwt.verify(token,process.env.JWT_SECRET_KEY);
        res.json({loggedIn:true,user})
    }catch(error){
        console.error(error);
        return res.status(401).json({loggedIn:false});
    }
}
export const removeUser = async(req,res) => {
    console.log("Cookies before clearing:",req.cookies);
    res.clearCookie("authToken",{
        httpOnly:true,
        secure:true,
        sameSite:'Lax'
    });
    return res.status(200).json({"message":"Logout Succesfully."});
}