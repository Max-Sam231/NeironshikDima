import {z} from "zod";

export const FormSchema = z.object({
	name: z
		.string()
		.min(2, "Имя должно содержать минимум 2 символа")
		.regex(/^[A-Za-zА-Яа-яЁё]+\s[A-Za-zА-Яа-яЁё]+$/, "Введите имя и фамилию через пробел"),

	email: z.string().min(5, "Введите корректный email").email("Введите корректный email"),

	password: z
		.string()
		.min(6, "Пароль должен быть не менее 6 символов")
		.max(20, "Пароль должен быть не более 20 символов")
		.regex(/[A-Z]/, "Пароль должен содержать заглавную букву")
		.regex(/[0-9]/, "Пароль должен содержать цифру")
		.regex(/[^A-Za-z0-9]/, "Пароль должен содержать специальный символ"),

	weight: z
		.string()
		.refine((value) => !isNaN(Number(value)), "Вес должен быть числом")
		.refine((value) => Number(value) >= 30, "Минимальный вес: 30 кг")
		.refine((value) => Number(value) <= 200, "Максимальный вес: 200 кг"),

	height: z
		.string()
		.refine((value) => !isNaN(Number(value)), "Рост должен быть числом")
		.refine((value) => Number(value) >= 100, "Минимальный рост: 100 см")
		.refine((value) => Number(value) <= 250, "Максимальный рост: 250 см"),
});

export type FormValues = z.infer<typeof FormSchema>;

export const FormSchemaLogin = z.object({
	email: z.string().email("Введите корректный email"),

	password: z.string(),
});

export type FormValuesLogin = z.infer<typeof FormSchemaLogin>;
