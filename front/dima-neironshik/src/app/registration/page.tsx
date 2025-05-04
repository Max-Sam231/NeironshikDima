"use client";

import FormReg from "@/components/FormReg";
import Image from "next/image";

export default function Reg() {
	return (
		<div className="flex flex-col w-full justify-center items-center py-2 px-4">
			<div className="flex flex-col w-full max-w-md items-center">
				<div className="size-[100px] rounded-full mb-4">
					<Image src={"/assets/Logo-circle.png"} width={150} height={100} alt={""} />
				</div>
				<FormReg />
			</div>
		</div>
	);
}
