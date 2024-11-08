import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          My App
        </Link>

        <nav>
          <ul className="flex space-x-4">
            {/* 登録ボタン */}
            <li>
              <Link href="/api/auth/signin" className="hover:text-gray-200">
                ログイン
              </Link>
            </li>
            <li>
              <Link href="/api/auth/signout" className="hover:text-gray-200">
                ログアウト
              </Link>
            </li>
            {/* アイテム作成ボタン */}
            <li>
              <Link href="/item/create" className="hover:text-gray-200">
                アイテム作成
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
