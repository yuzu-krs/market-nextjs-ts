import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma=new PrismaClient();

export async function DELETE(request:Request,{params}:{params:{id:string}}): Promise<NextResponse>{
    const postId=Number(params.id);
    
    try{
        const deletedPost=await prisma.post.delete({
            where:{id:postId},
        })

        return NextResponse.json({message:"アイテム削除成功",post:deletedPost});
    }catch(error){
        return NextResponse.json({message:"アイテム削除失敗",status:500});
    }finally{
        await prisma.$disconnect();
    }
}