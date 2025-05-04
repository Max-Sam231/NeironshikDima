import {create} from "zustand";

export type User = {
	name: string;
	email: string;
	password: string;
	height: string;
	weight: string;
	allergy: string;
	token: string | null;
};

export type ChatMessage = string;

type AppStore = {
	chatHistory: ChatMessage[];
	addMessage: (message: ChatMessage) => void;
	clearChatHistory: () => void;

	user: User;
	setUser: (user: User) => void;
};

export const useAppStore = create<AppStore>((set) => ({
	chatHistory: ["aaa","ddd"],
	addMessage: (message) => set((state) => ({chatHistory: [...state.chatHistory, message]})),
	clearChatHistory: () => set({chatHistory: []}),

	user: {
		name: "",
		email: "",
		password: "",
		height: "",
		weight: "",
		allergy: "",
		token: null,
	},
	setUser: (user) => set({user}),
}));
