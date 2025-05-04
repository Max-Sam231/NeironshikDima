"use client";
import {getText} from "@/api/backRequest";
import ChatInput from "@/components/InputFile";
import MessageMd from "@/components/MessadgeMd";
import ProfileModal from "@/components/Modal";
// import Button from "@/components/Button";
// import ChatInput from "@/components/InputFile";
// import InputFileForm from "@/components/InputFlieForm";
import TagInput from "@/components/TagInput";
import {useAppStore} from "@/store/store";
import Image from "next/image";
import {useState} from "react";

// import InputFileForm from "@/components/InputFlieForm";

export default function Home() {
	const [allergens, setAllergens] = useState<string[]>([]);
	const [ismodeAnal, setMode] = useState(true);
	const [isChat, setIsChat] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const {user, chatHistory, addMessage} = useAppStore();
	const sumbitData = () => {
		console.log(allergens);
	};
	const handleSendMessage = async (text: string, file: File | null) => {
		console.log("Отправка:", {text, file});
		setIsChat(true);
		console.log(chatHistory);
		// const result = await getText(text, user.token);
		// addMessage(result);
		setTimeout(() => {
			addMessage("Ответ");
		}, 3000);
	};
	return (
		<>
			<div className="flex items-center justify-between bg-[#000] w-full  px-4 py-2">
				<div className="w-32 h-[50px]">
					<Image
						src={"/assets/logo.png"}
						width={220}
						height={100}
						alt={""}
						style={{width: "auto", position: "relative", top: "-23px"}}
					/>
				</div>
				<div className="">
					<button
						onClick={() => setIsModalOpen(true)}
						className="px-4 py-2 bg-[#00D8BF] text-white rounded">
						Просмотр профиля
					</button>
				</div>
			</div>
			<ProfileModal isOpen={isModalOpen} onClose={setIsModalOpen} />
			<div className="flex flex-col w-full justify-center items-center h-[90vh] py-2 px-4">
				<div className="flex flex-col w-4/5 items-center">
					{!isChat && (
						<p className="text-[#363636] font-medium text-5xl mb-44">
							{ismodeAnal ? "Покажите фото блюда" : "Опишите свои симптомы"}
						</p>
					)}
					{isChat && (
						<div className="w-full max-h-[60vh] mb-2 overflow-y-auto py-2">
							{chatHistory.map((item: string, index: number) => {
								if (index % 2 === 0) {
									return (
										<div key={index} className="flex  justify-end">
											<span className="max-w-2/5 w-fit border-1 border-[#B7B7B7] rounded-4xl p-2">
												{item}
											</span>
										</div>
									);
								} else {
									return (
										<div key={index} className="">
											<div className="h-4"></div>
											<div className="max-w-4/5 w-fit border-1 border-[#B7B7B7] rounded-4xl p-4">
												<MessageMd content={item} />
											</div>
											<div className="h-4"></div>
										</div>
									);
								}
							})}
						</div>
					)}
					<form
						onSubmit={sumbitData}
						className={`flex flex-col ${isChat ? "items-center" : "w-full"}`}>
						<div className={`flex  ${isChat ? "justify-center" : ""}`}>
							{ismodeAnal && (
								<div className={`${isChat ? "w-[100%]" : "min-w-[100%]"}`}>
									<ChatInput onSend={handleSendMessage} />
								</div>
							)}
							{!ismodeAnal && (
								<div className="min-w-[100%] ">
									<TagInput labelName={false} onTagsChange={setAllergens} />
								</div>
							)}
						</div>
						<div
							className={`flex items-center w-fit border-2 border-[#F5F5F5] rounded-2xl overflow-hidden mt-2 `}>
							<p className="px-2 bg-[#F5F5F5] ">
								Режим: {ismodeAnal ? "Анализ аллергий" : "Анализ симптомов"}
							</p>
							<button
								className="px-2"
								type="button"
								onClick={() => setMode(!ismodeAnal)}>
								сменить режим
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
