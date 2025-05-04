"use client";

import FormLogin from "@/components/FormLogin";
import Image from "next/image";

export default function Log() {
	return (
		<>
			<div className="flex flex-col w-full justify-center items-center py-2 px-4">
				<div className="flex flex-col w-lg items-center">
					<div className="size-[100px] rounded-full mb-4">
						<Image
							src={"/assets/Logo-circle.png"}
							width={150}
							height={100}
							alt={""}
						/>
					</div>
					<h2 className="text-[40px] font-bold mt-2 mb-4"> С возвращением!</h2>
					<FormLogin />
				</div>
			</div>
		</>
	);
}
