import {useState} from "react";

interface TagInputProps {
	placeholder?: string;
	onTagsChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({
	placeholder = "Начните вводить...",
	onTagsChange,
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
			<p className="font-semibold text-sm mb-2.5">Введите аллерген и нажмите на плюс</p>
			<div className="flex items-center bg-gray-100 rounded-lg p-2">
				<button
					type="button"
					className="text-[#B7B7B7] mr-2 text-xl font-bold border-2 border-[#B7B7B7] size-8 rounded-full"
					onClick={handleAddTag}>
					+
				</button>
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
					className="flex-grow outline-none bg-transparent"
				/>
			</div>

			<div className="mt-2 flex flex-wrap gap-2">
				{selectedTags.map((tag) => (
					<span
						key={tag}
						className="bg-[#F3F3F3] px-3 py-1 rounded-full text-sm flex items-center">
						{tag}
						<button
							type="button"
							className="ml-2 text=[#F3F3F3]"
							onClick={() => handleRemoveTag(tag)}>
							×
						</button>
					</span>
				))}
			</div>
		</div>
	);
};

export default TagInput;
