import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth"; // セッション情報を取得するためにauthをインポート

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
    const postId = Number(params.id);

    // ユーザーのセッションを取得
    const session = await auth(); // セッション情報を取得

    // セッションが存在しない場合、Unauthorizedを返す
    if (!session || !session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ログインしているユーザーのメールアドレス
    const userEmail = session.user.email;

    try {
        // 削除対象のポストを取得
        const postToDelete = await prisma.post.findUnique({
            where: { id: postId },
        });

        // ポストが存在しない場合、エラーレスポンスを返す
        if (!postToDelete) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // 所有者のメールアドレスとログインしているユーザーのメールアドレスを比較
        if (postToDelete.email !== userEmail) {
            return NextResponse.json({ message: "Unauthorized: Email does not match" }, { status: 403 });
        }

        // ポストを削除
        const deletedPost = await prisma.post.delete({
            where: { id: postId },
        });

        return NextResponse.json({ message: "アイテム削除成功", post: deletedPost });
    } catch (error) {
        console.error("Delete error:", error); // エラーをログに記録
        return NextResponse.json({ message: "アイテム削除失敗", status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
