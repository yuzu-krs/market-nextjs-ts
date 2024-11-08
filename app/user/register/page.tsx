"use client"
import React, { useState } from 'react'
import { signIn } from "next-auth/react" // 仮のサインアップ関数を使用します（NextAuthにデフォルトでサインアップ機能はありません）
import { useRouter } from "next/navigation"

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // サーバーサイドでユーザー登録する処理を呼び出す
        // サインアップの処理はNextAuthではなく、独自で実装する必要があります
        try {
            // 実際のサインアップ処理
            const res = await signIn("credentials", { email, password });

            if (res?.error) {
                setError(res.error);
            } else {
                router.push("/login"); // 登録成功後、ログインページにリダイレクト
            }
        } catch (error) {
            setError("登録に失敗しました。");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">新規登録</h2>

                <form onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">登録</button>
                </form>

                <p className="mt-4 text-center">
                    すでにアカウントがありますか? <a href="/login" className="text-blue-500">ログイン</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
