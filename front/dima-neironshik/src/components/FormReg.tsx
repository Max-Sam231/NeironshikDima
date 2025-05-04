import React, {useState} from "react";
import Input from "./Input";
import Button from "./Button";
import TagInput from "./TagInput";
import Link from "next/link";
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormSchema, FormValues} from "@/schemas/validationSchema";
import {useAppStore} from "@/store/store";
import {regist} from "@/api/backRequest";
import {useRouter} from "next/navigation";

const FormReg: React.FC = () => {
	const {setUser} = useAppStore();
	const [allergens, setAllergens] = useState<string[]>([]);

	const router = useRouter();

	const methods = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		mode: "onChange",
	});

	const {handleSubmit} = methods;

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		const allergy = JSON.stringify(allergens).replace(/"/g, "'");
		const updateData = {...data, allergy};
		console.log(JSON.stringify(updateData));
		const result = await regist(updateData);
		setUser(result);
		router.replace("/");
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="border-1 border-[#B7B7B7] rounded-4xl pt-6 w-[50vw] pb-2 px-8 overflow-y-auto h-[520px]">
				<Input
					name="name"
					labelName="Введите ваше имя и фамилию"
					error={methods.formState.errors.name?.message}
					placeholder="Иван Иванов"
				/>
				<Input
					name="email"
					labelName="Введите e-mail"
					error={methods.formState.errors.email?.message}
					placeholder="email@mail.com"
				/>
				<Input
					name="password"
					labelName="Придумайте пароль"
					error={methods.formState.errors.password?.message}
					placeholder="12345678"
				/>
				<div className="flex justify-between mb-4">
					<div className="w-2/5 pr-2">
						<Input
							name="weight"
							labelName="Вес"
							type="number"
							min={30}
							max={200}
							step={0.1}
							error={methods.formState.errors.weight?.message}
							placeholder="80 кг"
							inputClassName="text-center"
						/>
					</div>
					<div className="w-2/5 pl-2">
						<Input
							name="height"
							labelName="Рост"
							type="number"
							min={100}
							max={250}
							step={1}
							error={methods.formState.errors.height?.message}
							placeholder="180 см"
							inputClassName="text-center"
						/>
					</div>
				</div>

				<TagInput placeholder="Аллерген..." submitButton={false} onTagsChange={setAllergens} />
				<div className="h-1"></div>
				<Button type="submit" text="Зарегистрироваться" />

				<Link href="#">
					<p className="text-[#25F6DC] text-center mt-4 cursor-pointer">
						Уже есть аккаунт? Войти
					</p>
				</Link>
			</form>
		</FormProvider>
	);
};

export default FormReg;
