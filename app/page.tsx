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
            <h1 className="text-red-500">Hello</h1>    
            <h2>World</h2>
            {allItems.map(item=>
                <div>
                    <img src={item.image}/>
                    <h2>{item.price}</h2>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            )}
        </div>

    );
};

export default ReadAllItems;

