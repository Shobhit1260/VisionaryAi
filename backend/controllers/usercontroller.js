import { sql } from '../config/db.js';

export const getPublishedCreations=async(req,res)=>{
    try{
        const creations=await sql `SELECT * FROM creations WHERE publish=true ORDER BY created_at DESC`;
        res.json({
            success:true,
            creations
        })

    }
    catch(error){
       return res.status(500).json({
            success:false,
            message:"Error in fetching creations",
            error:error.message
        })

    }
}

export const getUserCreations=async(req,res)=>{
    try{
        console.log("aa gya")
        const userId=req.user.id;
        const creations=await sql `SELECT * FROM creations WHERE user_id=${userId} ORDER BY created_at DESC`;
        res.json({
            success:true,
            creations
        })

    }
    catch(error){
       return res.status(500).json({
            success:false,
            message:"Error in fetching creations",
            error:error.message
        })

    }
}


export const toggleLike=async(req,res)=>{
    try{
        const userId=req.user.id;
        const creationId=req.params.id;
        const creation=await sql `SELECT * FROM creations WHERE id=${creationId} `;
         if(!creation || creation.length === 0){
            return res.json({
                success:false,
                message:"Creation not found"
            })
         }

        // Normalize likes into an array we can modify
        let likes = creation[0].likes;
        if (!likes) likes = [];
        if (typeof likes === 'string') {
            try { likes = JSON.parse(likes); } catch (e) { likes = []; }
        }
        if (!Array.isArray(likes)) likes = [];

        if (likes.includes(userId)){
            likes = likes.filter((id)=>id!==userId);
        }
        else{
            likes.push(userId);
        }

        const updatedRows=await sql `UPDATE creations SET likes=${likes} WHERE id=${creationId} RETURNING *`;
        const updatedCreation = Array.isArray(updatedRows) ? updatedRows[0] : updatedRows;

        return res.json({
            success:true,
            updatedCreation
        })

    }
    catch(error){
       return res.json({
            success:false,
            message:"Error toggling like",
            error:error.message
        })

    }
}

