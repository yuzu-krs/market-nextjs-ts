import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request:Request): Promise<NextResponse>{
    const data=await request.json();
    try{
        await prisma.$connect();  // データベースに接続

        // 新しいPostをデータベースに作成
        const newPost = await prisma.post.create({
            data: {
                title: data.title,
                image: data.image,
                price: data.price,
                description: data.description,
                email: data.email,
            },
        });

        return NextResponse.json({message:"アイテム作成",post:newPost});
    }catch{
        return NextResponse.json({message:"アイテム失敗"},{status:500});
        
    }finally{
        await prisma.$disconnect();
    }
    
}