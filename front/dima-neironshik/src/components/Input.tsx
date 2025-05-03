import {FormValues} from "@/schemas/validationSchema";
import React, {useState} from "react";
import {useFormContext} from "react-hook-form";

type Props = {
	name: keyof FormValues;
	labelName: string;
	error?: string;
	placeholder: string;
};

const Input: React.FC<Props> = ({name, labelName, error, placeholder}) => {
	const [isVisible, setIsVisible] = useState(false);
	const {register} = useFormContext<FormValues>();
	return (
		<>
			<label htmlFor={name} className="font-semibold text-sm mb-2.5">
				{labelName}
			</label>
			<div className="relative">
				<input
					id={name}
					type={name === "email"&& isVisible ? "password" : "text"}
					{...register(name)}
					placeholder={placeholder}
					className="h-12 w-full bg-[#F5F5F5] pl-2.5 rounded-lg my-2.5"
				/>
				{name === "email" && (
					<span
						className="size-5 absolute top-6 right-4 bg-amber-400"
						onClick={() => setIsVisible(!isVisible)}></span>
				)}
				{error && <p>{error}</p>}
			</div>
		</>
	);
};

export default Input;
