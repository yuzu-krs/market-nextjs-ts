import Image from 'next/image';
import React from 'react'

const getSingleItem=async(id:string)=>{
    const response=await fetch(`http://localhost:3000/api/item/readsingle/${id}`,{cache:"no-store"});
    const jsonData=await response.json();

    const singleItem=jsonData.post;
    return singleItem;

}


const ReadSingleItem = async(context:{params:{id:string}}) =>{
    const singleItem=await getSingleItem(context.params.id);

  return (
    <div>
        <Image
            src={singleItem.image} // 画像のURL
            width={750} // 画像の幅
            height={500} // 画像の高さ
            alt="item-image" // 代替テキスト
            priority // ページの最適化のための優先度を高める
        />
        <h3>{singleItem.title}</h3>
        <h2>{singleItem.price}円</h2>
        <hr/>
        <p>{singleItem.description}</p>
    </div>
  )
}

export default ReadSingleItem
