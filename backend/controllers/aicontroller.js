import OpenAI from "openai";
import {sql} from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";


 

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});



export const generateArticle = async (req,res)=>{
    try{
        const {prompt,length}=req.body;
        const userId=req.user.id;
        const plan=req.plan;
        const free_usage=req.free_usage;
        
        if(plan==='free' && free_usage>10){
        return  res.json({
          success:true,
          message:"Limit reached. Upgrade to continue."  
          })
        }

        const response = await openai.chat.completions.create({
           model: "gemini-2.0-flash",
           messages: [
           {
            role: "user",
            content: prompt,
           },
           ],
           temperature: 0.7,
           max_tokens: length ,
        });

        const content = response.choices?.[0]?.message?.content ?? 'No content generated';

        await sql `INSERT INTO creations (user_id, prompt ,content, type)
          VALUES (${userId}, ${prompt}, ${content}, 'article')`;

        if(plan==='free'){
            await clerkClient.users.updateUser(userId, {
                privateMetadata: { free_usage: free_usage + 1 }
            });
        }  
        res.json({
          success:true,
          content
        })
   }
    catch(error){
      return res.json({
            success:false,
            message:"Error in writing article",
            error:error.message
        })
    }
}

export const generateTitle = async (req,res)=>{ 
    try{
       const {prompt}=req.body;
        const userId=req.user.id;
        const plan=req.plan;
        const free_usage=req.free_usage;
        
        if(plan==='free' && free_usage>10){
         return res.json({
          success:true,
          message:"Limit reached. Upgrade to continue."  
          })
        }

        const response = await openai.chat.completions.create({
           model: "gemini-2.0-flash",
           messages: [
           {
            role: "user",
            content: prompt,
           },
           ],
           temperature: 0.7,
           max_tokens: 100 ,
        });

        const content = response.choices?.[0]?.message?.content ?? 'No content generated';

        await sql `INSERT INTO creations (user_id, prompt ,content, type)
          VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;

        if(plan==='free'){
            await clerkClient.users.updateUser(userId, {
                privateMetadata: { free_usage: free_usage + 1 }
            });
        }  
     return  res.json({
          success:true,
          content
        }) 
    }
    catch(error){
      return res.json({
            success:false,
            message:"Error in generating title",
            error:error.message
      })
    }
}


export const generateImage = async (req,res)=>{ 
    try{
        const {prompt,category,publish}=req.body;
        const userId=req.user.id;
        const plan=req.plan;
        
        
        if(plan==='free'){
          return res.json({
          success:true,
          message:"It is premium feature. Upgrade to continue."  
          })
        }

        
        const form = new FormData()
        form.append('prompt', prompt);
        const {data}=await axios.post ('https://clipdrop-api.co/text-to-image/v1', form, {
            headers: {'x-api-key': process.env.CLIP_DROP,},
            responseType:'arraybuffer',
         })
       const base64Image=`data:image/png;base64,${Buffer.from(data,'binary').toString('base64')}`   

       const uploadRes = await cloudinary.uploader.upload(base64Image)
       const secureUrl = uploadRes.secure_url || uploadRes.secureUrl || uploadRes.url

       if (!secureUrl) {
         throw new Error('Cloudinary upload did not return a secure URL')
       }

        // Correctly include the `publish` value inside the VALUES (...) list.
        await sql `INSERT INTO creations (user_id, prompt, content, type, publish)
          VALUES (${userId}, ${prompt}, ${secureUrl}, 'Image', ${publish ? true : false})`;
        
      return  res.json({
          success:true,
          content:secureUrl
        }) 
    }
    catch(error){
     return res.json({
            success:false,
            message:"Error in generating Image",
            error:error.message
      })
    }
}


export const removeBackground = async (req,res)=>{ 
    try{
        
        const image=req.file;
        const userId=req.user.id;
        const plan=req.plan;
        
        
        if(plan==='free'){
         return res.json({
          success:true,
          message:"It is premium feature. Upgrade to continue."  
          })
        }

       const uploadRes = await cloudinary.uploader.upload(image.path,{
        transformation:[
          {
          effect:'background_removal',
          background_removal: 'remove_the_background'
          }
        ]
       })
       const secureUrl = uploadRes.secure_url || uploadRes.secureUrl || uploadRes.url

       if (!secureUrl) {
         throw new Error('Cloudinary upload did not return a secure URL')
       }

        // Correctly include the `publish` value inside the VALUES (...) list.
        await sql `INSERT INTO creations (user_id, prompt, content, type)
          VALUES (${userId}, 'remove the background from image', ${secureUrl}, 'Image')`;
        
      return  res.json({
          success:true,
          content:secureUrl
        }) 
    }
    catch(error){
     return res.json({
            success:false,
            message:"Error in removing backgroundImage",
            error:error.messages
      })
    }
  }

  export const removeObject = async (req,res)=>{ 
    try{
        
        const image=req.file;
        const {object}=req.body;
        const userId=req.user.id;
        const plan=req.plan;
        
        
        if(plan === 'free'){
         return res.json({
          success:true,
          message:"It is premium feature. Upgrade to continue."  
          })
        }

      const {public_id} = await cloudinary.uploader.upload(image.path);

      const imageUrl=cloudinary.url(public_id,{
        transformation:[
          {effect:`gen_remove:${object}`}
        ],
        resource_type:'image'
       })

      
        // Correctly include the `publish` value inside the VALUES (...) list.
        await sql `INSERT INTO creations (user_id, prompt, content, type)
          VALUES (${userId}, ${`remove the ${object} from image`}, ${imageUrl}, 'Image')`;
        
      return  res.json({
          success:true,
          content:imageUrl
        }) 
    }
     catch(error){
     return res.json({
            success:false,
            message:"Error in removing object from Image",
            error:error.messages
      })
    }
  }

  export const reviewResume = async (req,res)=>{ 
    try{
        
       
        const resume=req.file;
        const userId=req.user.id;
        const plan=req.plan;
        
        if(plan==='free'){
          return res.json({
          success:true,
          message:"It is premium feature. Upgrade to continue."  
          })
        }

      if(resume.size > 5 * 1024 * 1024){
        return res.json({
            success:false,
            message:"File size exceeds 5MB limit"
        })
      }
    

    const dataBuffer = fs.readFileSync(resume.path);
    const parsed = await pdf(dataBuffer);
    const resumeText = parsed.text;
    
  if (!fs.existsSync(req.file.path)) {
  return res.status(400).json({
    success: false,
    message: "Uploaded file not found on server",
  });
}
  const prompt = `Review the following resume and provide contructive 
  feedback on its strengths,weakness and areas for improvement. Resume Content:\n\n${resumeText}`

       const response = await openai.chat.completions.create({
           model: "gemini-2.0-flash",
           messages: [
           {
            role: "user",
            content: prompt,
           },
           ],
           temperature: 0.7,
           max_tokens: 1200 ,
        });

        const content = response.choices?.[0]?.message?.content ?? 'No content generated';
      
        // Correctly include the `publish` value inside the VALUES (...) list.
        await sql `INSERT INTO creations (user_id, prompt, content, type)
          VALUES (${userId}, 'review resume', ${content}, 'review-resume')`;
        
        return res.json({
          success:true,
          content:content
        }) 
    }
    catch (error) {
     return res.json({
        success: false,
        message: "Error in reviewing resume",
        error: String(error),
      })
    }
  }  


