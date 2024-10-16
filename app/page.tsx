import Image from "next/image";
import Link from "next/link";
import React from "react";

const getAllItems=async() =>{
    const response=await fetch("http://localhost:3000/api/item/readall",{cache:"no-store"});
    const jsonData=await response.json();
    const allItems=jsonData.posts;
    return allItems;
}

const ReadAllItems =async()=>{
    const allItems=await getAllItems()
    return (

        <div>
            {allItems.map((item:any)=>(

                <Link href={`/item/readsingle/${item.id}`} key={item.id} >
                    <Image 
                        src={item.image} // 画像のURL
                        width={750} // 画像の幅
                        height={500} // 画像の高さ
                        alt="item-image" // 代替テキスト
                        priority // ページの最適化のための優先度を高める
                    />
                    
                    <h2>{item.price}</h2>
                    <h3>{item.title}</h3>
                    <p>{item.description.substring(0,80)}</p>
                </Link>
            ))}
        </div>

    );
};

export default ReadAllItems;

