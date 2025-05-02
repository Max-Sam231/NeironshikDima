"use client";
// import Image from "next/image";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Home() {
	return (
		<>
			<div className="">
				<Input name={"a"} labelName={"dsdasdas"} />
				<Button type={"button"} text={"ddd"} onClick={() => console.log("ddd")} />
			</div>
		</>
	);
}
