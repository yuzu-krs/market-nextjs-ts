"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const DeleteItem = (context: { params: { id: string } }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState(""); // アイテムの所有者のメールアドレス
  const [userEmail, setUserEmail] = useState(""); // ログインユーザーのメールアドレス
  const [isAuthorized, setIsAuthorized] = useState(false); // 削除権限の判定
  const [loading, setLoading] = useState(true); // ローディング状態

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session data:", session); 
    if (session?.user?.email) {
      setUserEmail(session.user.email); 
    } else if (session?.user?.name) {
      setUserEmail(`${session.user.name}@example.com`);
    }
  }, [session]);

  useEffect(() => {
    const getSingleItem = async (id: string) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/item/readsingle/${id}`,
          { cache: "no-store" }
        );
        const jsonData = await response.json();
        const singleItem = jsonData.post;

        setTitle(singleItem.title);
        setPrice(singleItem.price);
        setImage(singleItem.image);
        setDescription(singleItem.description);
        setEmail(singleItem.email);

        console.log("Fetched item email:", singleItem.email);
        console.log("User email:", userEmail);

        setIsAuthorized(singleItem.email === userEmail);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      } finally {
        setLoading(false); // データ取得が完了
      }
    };

    getSingleItem(context.params.id);
  }, [context, userEmail]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthorized) {
      alert("あなたにはこのアイテムを削除する権限がありません");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/item/delete/${context.params.id}`,
        {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);

      router.push("/");
      router.refresh();
    } catch {
      alert("アイテム削除失敗");
    }
  };

  if (status === "loading" || loading) {
    return <p>読み込み中...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
    return null;
  }

  if (!isAuthorized) {
    return <p>このアイテムを削除する権限がありません。</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-8">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">アイテム削除</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={image}
            width={750}
            height={500}
            alt="item-image"
            priority
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="text-xl text-gray-600">￥{price}</p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 text-lg">{description}</p>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            削除
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 focus:outline-none"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteItem;
