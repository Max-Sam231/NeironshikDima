import React, {useState} from "react";
import {useFormContext} from "react-hook-form";
import Image from "next/image";
import { FormValues } from "@/schemas/validationSchema";

type InputProps = {
	name: keyof FormValues;
	labelName: string;
	error?: string;
	placeholder: string;
	type?: "text" | "password" | "number";
	min?: number;
	max?: number;
	step?: number;
	inputClassName?: string;
};

const Input: React.FC<InputProps> = ({
	name,
	labelName,
	error,
	placeholder,
	type = "text",
	min,
	max,
	step,
	inputClassName = "",
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const {register} = useFormContext<FormValues>();

	return (
		<div className="mb-4">
			<label htmlFor={name} className="font-semibold text-sm block">
				{labelName}
			</label>
			<div className="relative">
				<input
					id={name}
					type={name === "password" && !isVisible ? "password" : type}
					{...register(name)}
					placeholder={placeholder}
					min={min}
					max={max}
					step={step}
					className={`h-12 w-full border border-[#B7B7B7] pl-6 rounded-4xl my-2.5 ${inputClassName}`}
				/>
				{name === "password" && (
					<span
						className="size-5 absolute top-6 right-4 flex items-center cursor-pointer"
						onClick={() => setIsVisible((prev) => !prev)}>
						<Image
							src={
								isVisible ? "/assets/eye_closed.png" : "/assets/eye_opened.png"
							}
							width={20}
							height={20}
							alt="toggle password visibility"
						/>
					</span>
				)}
				{error && <p className="text-red-500 text-xs mt-1">{error}</p>}
			</div>
		</div>
	);
};

export default Input;
