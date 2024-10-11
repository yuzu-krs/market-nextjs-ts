import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";

import bcrypt from 'bcrypt';


const prisma = new PrismaClient();

export async function POST(request:Request): Promise<NextResponse>{
    const data=await request.json();
    const {email,password}=data;

    try{
        await prisma.$connect();

        const user =await prisma.user.findUnique({
            where:{
                email:email,
            },
        });

        if(user){
            //パスワードがあっているか？
            const passwordMatch=await bcrypt.compare(password,user.password);
                        // デバッグ用の出力
                        console.log("Stored password hash: ", user.password); // データベースに保存されているハッシュ
                        console.log("Input password: ", password); // 入力されたパスワード
                        console.log("Password match result: ", passwordMatch); // パスワード比較の結果
            if(passwordMatch){
                return NextResponse.json({ message: "ログイン成功", user: user });
            }else{
                return NextResponse.json({ message: "ログイン失敗:パスワードが間違っています"});
            }
            
        }else{
            return NextResponse.json({message:"ログイン失敗:メールアドレスが見つかりません"});
        }
    
    }catch{
        return NextResponse.json({message:"ログイン失敗"},{status:500});
        
    }finally{
        await prisma.$disconnect();
    }
    
}