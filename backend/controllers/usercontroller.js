import { sql } from '../config/db.js';

export const getPublishedCreations=async(req,res)=>{
    try{
        const userId=req.user.id;
        const creations=await sql `SELECT * FROM creations WHERE publish=true ORDER BY created_at DESC`;
        res.json({
            success:true,
            creations
        })

    }
    catch(error){
       res.json({
            success:true,
            message:"Error in fetching creations",
        })

    }
}

export const getUserCreations=async(req,res)=>{
    try{
        const userId=req.user.id;
        const creations=await sql `SELECT * FROM creations WHERE user_id=${userId} ORDER BY created_at DESC`;
        res.json({
            success:true,
            creations
        })

    }
    catch(error){
       res.json({
            success:true,
            message:"Error in fetching creations",
        })

    }
}


export const toggleLike=async(req,res)=>{
    try{
        const userId=req.user.id;
        const creationId=req.params.id;
        const creation=await sql `SELECT * FROM creations WHERE id=${creationId} `;
         if(!creation){
            return res.json({
                success:false,
                message:"Creation not found"
            })
         }
        let likes=await creation[0].likes;
        if(likes!=null && likes.includes(userId)){
            likes.filter((id)=>id!==userId);    
        }
        else{
            likes.push(userId);
        }

        const updatedCreation=await sql `UPDATE creations SET likes=${likes} WHERE id=${creationId} RETURNING *`;

        res.json({
            success:true,
            updatedCreation
        })

    }
    catch(error){
       res.json({
            success:true,
            message:"Error in fetching creations",
            error:error.message
        })

    }
}

