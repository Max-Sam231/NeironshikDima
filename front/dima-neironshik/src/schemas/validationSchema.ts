import {z} from "zod";

export const FormSchema = z.object({
	email: z.string().min(5,"Введите корректный email"),
	// password: z
	// 	.string()
	// 	.min(6, "Пароль должен быть не менее 6 символов")
	// 	.max(20, "Пароль должен быть не более 20 символов"),
});

export type FormValues = z.infer<typeof FormSchema>;
