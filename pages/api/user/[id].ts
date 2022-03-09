import { prisma } from "../../../lib/prisma"; 
import { NextApiRequest,NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {

    const userId = req.query.id
    const userInfo= req.body
 

    if(req.method ==='DELETE'){
        const user = await prisma.user.delete({
            where:{id:Number(userId)}
        })
        res.json(user)
    }else{
        console.log("User could not be created");
        
    }

    if(req.method ==='PUT'){
        const user = await prisma.user.update({
            where:{
                id:Number(userId)
            },
            data:{
                name:String (userInfo.name), 
                email:String (userInfo.email)
            }
        })
        
        res.json(user)
    }else{
        console.log("User update failed");
        
    }



}