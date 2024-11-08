"use client"
import React, { useState, useEffect } from "react";

const Footer = () => {
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const seconds = String(date.getSeconds()).padStart(2, "0");
            const timeString = `${hours}:${minutes}:${seconds}`;
            setCurrentTime(timeString);
        };

        updateTime(); // 初回表示のために実行
        const intervalId = setInterval(updateTime, 1000); // 1秒ごとに時刻を更新

        return () => {
            clearInterval(intervalId); // コンポーネントのアンマウント時にインターバルをクリア
        };
    }, []);

    return (
        <footer className="bg-gray-800 text-white p-4 text-center">
            <p>現在時刻: {currentTime}</p>
        </footer>
    );
};

export default Footer;
