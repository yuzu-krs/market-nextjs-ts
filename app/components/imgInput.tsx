import { useState } from "react";

interface ImgInputProps {
    setImage: (url: string) => void; // setImage の型を明示的に定義
}

const ImgInput: React.FC<ImgInputProps> = ({ setImage }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        if (!imageFile) return;

        setLoading(true);
        try {
            const data = new FormData();
            data.append("file", imageFile);
            data.append("upload_preset", "ph9stdnb");
            data.append("cloud_name", "dqcguunqu");

            const response = await fetch("https://api.cloudinary.com/v1_1/dqcguunqu/image/upload", {
                method: "POST",
                body: data,
            });

            if (!response.ok) throw new Error("アップロードに失敗しました");

            const jsonData = await response.json();
            setImage(jsonData.url); // setImage の引数は string 型
            alert("画像アップロード成功");
        } catch (error) {
            console.error("アップロードエラー:", error);
            alert("画像アップロード失敗: " );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <input
                type="file"
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                accept="image/png, image/jpg, image/jpeg"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-500 file:text-white
                           hover:file:bg-blue-600 cursor-pointer mb-4 w-full text-gray-700"
            />
            <button
                onClick={handleClick}
                disabled={!imageFile || loading}
                className={`px-6 py-2 text-white rounded-lg transition-all duration-300 ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
                {loading ? (
                    <span className="flex items-center">
                        <svg
                            className="animate-spin h-5 w-5 mr-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                        アップロード中...
                    </span>
                ) : (
                    "画像Upload"
                )}
            </button>
        </div>
    );
};

export default ImgInput;
