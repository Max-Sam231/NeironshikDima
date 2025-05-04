export const getText = async (prompt: string, token: string | null) => {
	try {
		const response = await fetch(`http://85.209.9.228:3000/chat/text`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({text: prompt}),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.text();
		console.log(data);
		return data;
	} catch (error) {
		console.error("Ошибка:", error);
		throw error;
	}
};

export const getTextImage = async (text: string, image: File | null, token: string | null) => {
	try {
		const formData = new FormData();
		formData.append("text", text);
		if (image) {
			formData.append("image", image);
		}
		console.log(formData);

		const response = await fetch(`http://85.209.9.228:3000/chat/image`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.text();
		console.log(data);
		return data;
	} catch (error) {
		console.error("Ошибка:", error);
		throw error;
	}
};

type User = {
	name: string;
	email: string;
	password: string;
	height: string;
	weight: string;
	allergy: string;
};

export const regist = async (user: User) => {
	try {
		const response = await fetch(`http://85.209.9.228:3000/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error("Ошибка:", error);
		throw error;
	}
};

type Login = {
	email: string;
	password: string;
};

export const login = async (user: Login) => {
	try {
		const response = await fetch(`http://85.209.9.228:3000/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error("Ошибка:", error);
		throw error;
	}
};
