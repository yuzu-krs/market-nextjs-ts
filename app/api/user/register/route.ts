import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request:Request): Promise<NextResponse>{
    const data=await request.json();
    try{
        await prisma.$connect();  // データベースに接続

        const hashedPassword=await bcrypt.hash(data.password,10);

        // 新しいPostをデータベースに作成
        const newUser = await prisma.user.create({
            data: {
                name:data.name,
                email:data.email,
                password:hashedPassword,
            },
        });

        return NextResponse.json({message:"ユーザ作成",user:newUser});
    }catch{
        return NextResponse.json({message:"ユーザー作成失敗"},{status:500});
        
    }finally{
        await prisma.$disconnect();
    }
    
}