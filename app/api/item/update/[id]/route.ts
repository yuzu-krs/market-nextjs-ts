import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma=new PrismaClient();

export async function PUT(request:Request,{params}:{params:{id:string}}): Promise<NextResponse>{
    const postId=Number(params.id);
    const data=await request.json();

    try{
        const updatePost=await prisma.post.update({
            where:{id:postId},
            
            data: {
                title: data.title,
                image: data.image,
                price: data.price,
                description: data.description,
                email: data.email,
            },
        });

        return NextResponse.json({message:"アイテム編集成功",post:updatePost});
    }catch(error){
        return NextResponse.json({message:"アイテム編集失敗",status:500});
    }finally{
        await prisma.$disconnect();
    }
}