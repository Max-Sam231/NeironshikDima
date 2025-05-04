"use client";

import {useState, useRef, useEffect} from "react";
import Image from "next/image";
import { useAppStore } from "@/store/store";

interface ChatInputProps {
	onSend: (text: string, file: File | null) => void;
}

export default function ChatInput({onSend}: ChatInputProps) {
	const [text, setText] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [error, setError] = useState("");
	const [isDragging, setIsDragging] = useState(false);
	const {addMessage} =useAppStore();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
	const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		const droppedFile = e.dataTransfer.files[0];
		handleFile(droppedFile);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) handleFile(selectedFile);
	};

	const handleFile = (file: File) => {
		if (!ALLOWED_TYPES.includes(file.type)) {
			setError(
				`Недопустимый формат: ${file.type
					.split("/")
					.pop()}. Допустимые: JPEG, PNG, WEBP`,
			);
			return;
		}

		if (file.size > MAX_FILE_SIZE) {
			setError(`Файл слишком большой. Максимум: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
			return;
		}

		setError("");
		setFile(file);
		setPreviewUrl(URL.createObjectURL(file));
	};

	const handleSendMessage = () => {
		if (!text.trim() && !file) return;

		onSend(text, file);

		setText("");
		setFile(null);
		setPreviewUrl(null);
		setError("");
		addMessage(text);
	};

	const triggerFileInput = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className="relative">
			{previewUrl && (
				<div className="relative h-24 mb-2 rounded-lg overflow-hidden">
					<Image src={previewUrl} alt="Preview" fill className="object-cover" />
					<button
						onClick={() => {
							setPreviewUrl(null);
							setFile(null);
							if (fileInputRef.current) fileInputRef.current.value = "";
						}}
						className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center">
						×
					</button>
				</div>
			)}

			<div
				className={`
          flex items-center gap-2 p-3 border rounded-xl transition-all
          ${isDragging ? "border-[#00D8BF] bg-[#00D8BF]/10" : "border-gray-200"}
          ${error ? "border-red-500" : ""}
        `}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}>
				<button
					type="button"
					onClick={triggerFileInput}
					className="text-gray-500 hover:text-[#00D8BF]">
					<svg
						className="w-6 h-6"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</button>

				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Напишите сообщение..."
					className="flex-1 p-2 outline-none bg-transparent placeholder-gray-400"
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							handleSendMessage();
						}
					}}
				/>

				<button
					onClick={handleSendMessage}
					disabled={!text.trim() && !file}
					className={`
            w-10 h-10 rounded-full flex items-center justify-center transition-colors
            ${
				!text.trim() && !file
					? "bg-gray-200 text-gray-400"
					: "bg-[#00D8BF] text-white hover:bg-[#00C2AA]"
			}
          `}>
					<svg
						className="w-5 h-5 rotate-90"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 19l9 2-9-18-9 18 9-2z"
						/>
					</svg>
				</button>

				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleFileChange}
				/>
			</div>

			{error && <p className="text-sm text-red-500 mt-1">{error}</p>}
		</div>
	);
}
