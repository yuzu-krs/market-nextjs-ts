import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import type { NextConfig } from "next";
import { auth } from "@/auth";
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {



    // セッションを取得
    const session = await auth(); // auth関数を使ってセッション情報を取得
    
    if(!session){
        return new NextResponse(JSON.stringify({message:"未認証"}),{
            status:401,
            headers:{"Content-Type":"application/json"},
        });
    }


    
    // 認証されている場合は次の処理に進む
    return NextResponse.next(); // 次の処理を続行
}


export const config:NextConfig={
    matcher:[
        "/api/item/create",
        "/api/item/update/:path*",
        "/api/item/delete/:path*",


    ],
};

