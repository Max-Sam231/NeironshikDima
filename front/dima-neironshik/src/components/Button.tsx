"use client";
import React from "react";

type Props = {
	type: "submit" | "reset" | "button";
	text: string;
	onClick: () => void;
};

const Button: React.FC<Props> = ({type, text, onClick}) => {
	return (
		<>
			<button
				className="bg-[#25F6DC] font-semibold text-white text-base py-3 px-4 rounded-lg w-full cursor-pointer"
				type={type}
				onClick={onClick}>
				{text}
			</button>
		</>
	);
};

export default Button;
