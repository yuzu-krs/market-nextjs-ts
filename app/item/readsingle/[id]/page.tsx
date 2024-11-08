import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const getSingleItem = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`, { cache: "no-store" });
    const jsonData = await response.json();
    const singleItem = jsonData.post;
    return singleItem;
};

const ReadSingleItem = async (context: { params: { id: string } }) => {
    const singleItem = await getSingleItem(context.params.id);

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-8">
            <div className="flex flex-col items-center mb-8">
                <Image
                    src={singleItem.image} // 画像のURL
                    width={750} // 画像の幅
                    height={500} // 画像の高さ
                    alt="item-image" // 代替テキスト
                    priority // ページの最適化のための優先度を高める
                    className="rounded-lg shadow-lg"
                />
            </div>

            <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold text-gray-800">{singleItem.title}</h3>
                <h2 className="text-xl font-bold text-indigo-600">{singleItem.price}円</h2>
            </div>

            <div className="mb-6">
                <p className="text-gray-700 text-lg">{singleItem.description}</p>
            </div>

            <div className="flex justify-between">
                <Link
                    href={`/item/update/${singleItem.id}`}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    アイテム編集
                </Link>
                <Link
                    href={`/item/delete/${singleItem.id}`}
                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    アイテム削除
                </Link>
            </div>
        </div>
    );
};

export default ReadSingleItem;
