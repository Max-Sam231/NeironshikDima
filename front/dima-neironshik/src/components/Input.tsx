import React from "react";

type Props = {
	name: string;
	labelName: string;
};

const Input: React.FC<Props> = ({name, labelName}) => {
	return (
		<>
			<label htmlFor="name" className="font-semibold text-sm mb-2">
				{labelName}
			</label>
			<input
				type="text"
				name={name}
				className="h-12 w-full bg-[#F5F5F5] pl-2.5 rounded-lg "
			/>
		</>
	);
};

export default Input;
