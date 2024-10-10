import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma=new PrismaClient();

export async function GET(): Promise<NextResponse>{
    try{
        await prisma.$connect();
        const posts=await prisma.post.findMany();
        return NextResponse.json({message:"アイテム読み取り成功",posts:posts});

    }catch(error){
        return NextResponse.json({message:"アイテム読み取り失敗",status:500});
    }finally{
        await prisma.$disconnect();
    }
}