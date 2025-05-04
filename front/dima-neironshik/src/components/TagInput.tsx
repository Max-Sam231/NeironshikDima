import {useState} from "react";

type TagInputProps = {
	placeholder?: string;
	labelName?: boolean;
	onTagsChange: (tags: string[]) => void;
	submitButton?: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
	placeholder = "Начните вводить...",
	labelName = true,
	onTagsChange,
	submitButton = true,
}) => {
	const [inputValue, setInputValue] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const handleAddTag = () => {
		const trimmedValue = inputValue.trim();
		if (trimmedValue && !selectedTags.includes(trimmedValue)) {
			const newTags = [...selectedTags, trimmedValue];
			setSelectedTags(newTags);
			onTagsChange(newTags);
			setInputValue("");
		}
	};

	const handleRemoveTag = (tagToRemove: string) => {
		const newTags = selectedTags.filter((tag) => tag !== tagToRemove);
		setSelectedTags(newTags);
		onTagsChange(newTags);
	};

	return (
		<div className="relative">
			{labelName && (
				<p className="font-semibold text-sm mb-2.5">
					Введите аллерген и нажмите на плюс
				</p>
			)}

			<div className="flex items-center gap-2 p-3 border rounded-xl transition-all border-gray-200 hover:border-[#00D8BF] focus-within:border-[#00D8BF]">
				{/* Зелёная кнопка с плюсом */}

				<button
					type="button"
					onClick={handleAddTag}
					className="text-[#00D8BF] hover:text-[#00C2AA] transition-colors"
					aria-label="Добавить тег">
					<svg
						className="w-6 h-6"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 4v16m8-8H4"
						/>
					</svg>
				</button>

				{/* Поле ввода */}
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleAddTag();
						}
					}}
					placeholder={placeholder}
					className="flex-1 p-2 outline-none bg-transparent placeholder-gray-400"
				/>
				{submitButton && (
					<button
						type="submit"
						onClick={succFunc}
						disabled={!inputValue.trim()}
						className={`
            w-8 h-8 rounded-full flex items-center justify-center transition-colors
            ${
				!inputValue.trim()
					? "bg-gray-200 text-gray-400"
					: "bg-[#00D8BF] text-white hover:bg-[#00C2AA]"
			}
          `}
						aria-label="Добавить">
						<svg
							className="w-4 h-4 rotate-90"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 19l9 2-9-18-9 18 9-2z"
							/>
						</svg>
					</button>
				)}
			</div>
			<div className="mt-3 flex flex-wrap gap-2">
				{selectedTags.map((tag) => (
					<span
						key={tag}
						className="bg-[#00D8BF]/10 text-[#00D8BF] px-3 py-1 rounded-full text-sm flex items-center transition-all hover:bg-[#00D8BF]/20">
						{tag}
						<button
							type="button"
							className="ml-2 text-[#00D8BF] hover:text-red-500 transition-colors"
							onClick={() => handleRemoveTag(tag)}
							aria-label="Удалить тег">
							×
						</button>
					</span>
				))}
			</div>
		</div>
	);
};

export default TagInput;
