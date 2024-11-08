"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import ImgInput from "../../components/imgInput"

const CreateItem = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");  // セッションのメールアドレスを保持する状態
    const router = useRouter();

    // useSessionフックを使用してセッション情報を取得
    const { data: session, status } = useSession();

    // セッション情報が更新されたときにメールアドレスを設定
    useEffect(() => {
        if (session?.user?.email) {
            setEmail(session.user.email);  // セッションからメールアドレスを設定
        } else if (session?.user?.name) {
            // GitHub や他のプロバイダーでメールアドレスがない場合、デフォルトの値を設定
            setEmail(`${session.user.name}@example.com`);  // ここで仮のメールを設定
        } else {
            setEmail("ダミー");  // セッションが無い場合にダミーを設定
        }
    }, [session]);  // セッションが変更されるたびに実行される

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/item/create", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: email,  // セッションから取得したemail（またはダミー）を送信
                })
            });
            const jsonData = await response.json();
            alert(jsonData.message);

            router.push("/");
            router.refresh();
        } catch {
            alert("アイテム作成失敗");
        }
    };

    // ログインしていない場合はサインインページにリダイレクト
    if (status === "loading") {
        return <p>読み込み中...</p>;
    }

    if (status === "unauthenticated") {
        router.push("/api/auth/signin");
        return null;  // リダイレクト中は何も表示しない
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-8">
            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">アイテム作成</h1>
            <ImgInput setImage={setImage}/>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">アイテム名</label>
                    <input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name="title"
                        placeholder="アイテム名"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">価格</label>
                    <input
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="text"
                        name="price"
                        placeholder="価格"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">画像URL</label>
                    <input
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        type="text"
                        name="image"
                        placeholder="画像URL"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">商品説明</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        rows={6}
                        placeholder="商品説明"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        作成
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateItem;
