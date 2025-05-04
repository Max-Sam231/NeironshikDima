export const getText = async (prompt: string, token:string | null) => {
	try {
		const response = await fetch(`http://85.209.9.228:3000/chat/text`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({text: prompt}),
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

type User = {
	name: string;
	email: string;
	password: string;
	height: string;
	weight: string;
	allergy: string; 
};

export const regist = async (user:User) => {
	try {
		const response = await fetch(`http://85.209.9.228:3000/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({user}),
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
