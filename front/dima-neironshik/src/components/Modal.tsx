// components/ProfileModal.tsx
// import {useUserStore} from "@/stores/userStore";
import {useAppStore} from "@/store/store";
// import Image from "next/image";

type ProfileModalProps = {
	isOpen: boolean;
	onClose: (open: boolean) => void;
};

const ProfileModal: React.FC<ProfileModalProps> = ({isOpen, onClose}) => {
	const {user} = useAppStore();

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700/50 bg-opacity-50">
			<div className="bg-white rounded-lg p-6 shadow-md max-w-md w-full relative">
				<button
					onClick={() => onClose(!isOpen)}
					className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-4xl">
					&times;
				</button>

				<h2 className="text-lg font-semibold mb-4">Профиль</h2>
				<hr className="mb-4" />


				<div className="mb-6">
					<h3 className="text-xl font-bold mb-1">{user?.name}</h3>
					<p className="text-sm text-gray-600">{user?.email}</p>
				</div>

				<div className="mb-6">
					<p className="text-sm text-gray-600">Рост: {user?.height} см</p>
					<p className="text-sm text-gray-600">Вес: {user?.weight} кг</p>
				</div>

				<div className="mb-4">
					<h4 className="text-base font-semibold mb-2">Ваши аллергены</h4>
					<div className="flex gap-2 flex-wrap">
						{user.allergy.length > 0 ? (
							user?.allergy.map((allergy, index) => (
								<span
									key={index}
									className="bg-[#00D8BF]/10 text-[#00D8BF] px-3 py-1 rounded-full text-sm">
									{allergy}
								</span>
							))
						) : (
							<p className="text-sm text-gray-500">Нет аллергенов</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileModal;
