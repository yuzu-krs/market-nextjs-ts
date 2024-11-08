"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const UpdateItem = (context: { params: { id: string } }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState(""); // アイテムのメールアドレス
    const [userEmail, setUserEmail] = useState(""); // ログインユーザーのメールアドレス
    const [isAuthorized, setIsAuthorized] = useState(false); // 編集権限の判定
    const [loading, setLoading] = useState(true); // ローディング状態

    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session?.user?.name) {
            setUserEmail(`${session.user.name}@example.com`);
        }
    }, [session]);

    useEffect(() => {
        const getSingleItem = async (id: string) => {
            try {
                const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`, { cache: "no-store" });
                const jsonData = await response.json();
                const singleItem = jsonData.post;

                setTitle(singleItem.title);
                setPrice(singleItem.price);
                setImage(singleItem.image);
                setDescription(singleItem.description);
                setEmail(singleItem.email);

                setIsAuthorized(singleItem.email === userEmail); // 編集権限チェック
            } catch (error) {
                console.error("データの取得に失敗しました", error);
            } finally {
                setLoading(false); // ローディング終了
            }
        };

        getSingleItem(context.params.id);
    }, [context, userEmail]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isAuthorized) {
            alert("あなたにはこのアイテムを編集する権限がありません");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/item/update/${context.params.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    price,
                    image,
                    description,
                    email: userEmail,
                })
            });

            const jsonData = await response.json();
            alert(jsonData.message);

            router.push("/");
            router.refresh();
        } catch {
            alert("アイテム編集失敗");
        }
    };

    if (status === "loading" || loading) {
        return <p className="text-center text-lg">ローディング中...</p>;
    }

    if (status === "unauthenticated") {
        router.push("/api/auth/signin");
        return null;  // リダイレクト中は何も表示しない
    }

    if (!isAuthorized) {
        return <p>このアイテムを編集する権限がありません。</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-semibold text-center mb-6">アイテム編集</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-lg font-medium">アイテム名</label>
                    <input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name="title"
                        placeholder="アイテム名"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="price" className="text-lg font-medium">価格</label>
                    <input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="text"
                        name="price"
                        placeholder="価格"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="image" className="text-lg font-medium">画像 URL</label>
                    <input
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        type="text"
                        name="image"
                        placeholder="画像 URL"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="text-lg font-medium">商品説明</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        rows={6}
                        placeholder="商品説明"
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    編集
                </button>
            </form>
        </div>
    );
};

export default UpdateItem;
