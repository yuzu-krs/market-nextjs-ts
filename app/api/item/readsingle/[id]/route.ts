import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma=new PrismaClient();

export async function GET(request:Request,{params}:{params:{id:string}}): Promise<NextResponse>{
    const postId=Number(params.id);

    try{
        const post=await prisma.post.findUnique({
            where:{id:postId},
        });

        return NextResponse.json({message:"アイテム読み取り成功",post});
    }catch(error){
        console.error("アイテム読み取り失敗:", error);
        return NextResponse.json({message:"アイテム読み取り失敗",status:500});
    }finally{
        await prisma.$disconnect();
    }
}