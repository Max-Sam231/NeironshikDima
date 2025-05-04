import React, { useState } from "react";
const MainInput: React.FC = () => {
	const [value, setValue] = useState("");
	return (
		<>
			<input
				type="text"
				value={value}
				placeholder="ddd"
				onChange={(event) => setValue(event.target.value)}
			/>
		</>
	);
};

export default MainInput;