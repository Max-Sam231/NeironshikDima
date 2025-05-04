"use client";

import FormLogin from "@/components/FormLogin";
export default function Log() {
	return (
		<>
			<div className="flex flex-col w-full justify-center items-center py-2 px-4">
				<div className="flex flex-col w-lg items-center">
					<div className="size-[100px] rounded-full bg-amber-400"></div>
					<h2 className="text-[40px] font-bold mt-2 mb-4"> С возвращением!</h2>
					<FormLogin />
				</div>
			</div>
		</>
	);
}
