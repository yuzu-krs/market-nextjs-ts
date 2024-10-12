import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth"; // セッション情報を取得するためにauthをインポート

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
    const postId = Number(params.id);
    const data = await request.json();

    // ユーザーのセッションを取得
    const session = await auth(); // セッション情報を取得

    // セッションが存在しない場合、Unauthorizedを返す
    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ログインしているユーザーのメールアドレス
    const userEmail = session.user.email;

    // リクエストのメールアドレスがログインしているユーザーのメールアドレスと一致するか確認
    if (data.email !== userEmail) {
        return NextResponse.json({ message: "Unauthorized: Email does not match" }, { status: 403 });
    }

    try {
        const updatePost = await prisma.post.update({
            where: { id: postId },
            data: {
                title: data.title,
                image: data.image,
                price: data.price,
                description: data.description,
                email: data.email, // リクエストのメールアドレスを設定
            },
        });

        return NextResponse.json({ message: "アイテム編集成功", post: updatePost });
    } catch (error) {
        console.error("Update error:", error); // エラーをログに記録
        return NextResponse.json({ message: "アイテム編集失敗", status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
