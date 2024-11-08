"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// アイテムのデータを取得する非同期関数
const getAllItems = async () => {
    const response = await fetch("http://localhost:3000/api/item/readall", { cache: "no-store" });
    const jsonData = await response.json();
    return jsonData.posts;
};

const ReadAllItems = () => {
    const [allItems, setAllItems] = useState<any[]>([]); // アイテムの状態を管理
    const [loading, setLoading] = useState(true); // ローディング状態

    useEffect(() => {
        // コンポーネントがマウントされた後にデータを取得
        const fetchItems = async () => {
            const items = await getAllItems();
            setAllItems(items); // データをステートにセット
            setLoading(false); // ローディング状態を解除
        };

        fetchItems();
    }, []); // 初回レンダリング後に一度だけ実行

    if (loading) {
        return <p>読み込み中...</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {allItems.map((item: any) => (
                <Link
                    href={`/item/readsingle/${item.id}`}
                    key={item.id}
                    className="border rounded-lg overflow-hidden shadow-lg bg-white hover:bg-gray-100 transition-all duration-300"
                >
                    <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>  {/* アスペクト比を指定 */}
                        <Image
                            src={item.image}
                            alt="item-image"
                            layout="fill"  
                            objectFit="cover" 
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>
                    <div className="p-4">
                        <h2 className="text-lg font-bold text-gray-800 truncate">{item.title}</h2>
                        <h3 className="text-xl text-red-500 mt-2">￥{item.price}</h3>
                        <p className="text-gray-600 mt-2 text-sm line-clamp-3">{item.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ReadAllItems;
