import { prisma } from "../../lib/prisma"; 
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {

    const{name,email} = req.body

    try{
        await prisma.user.create({
            data:{
                name,
                email
            }
        })
        res.status(200).json({message:'User created'})
    }catch(error){
        console.log('Failure');

    }
        
    }
    

