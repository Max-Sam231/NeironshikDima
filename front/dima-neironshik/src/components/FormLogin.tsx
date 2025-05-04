// import React, {useState} from "react";
import Input from "./Input";
import {
	FormSchemaLogin,
	FormValuesLogin,
} from "@/schemas/validationSchema";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "./Button";
// import TagInput from "./TagInput";
import Link from "next/link";
import {login} from "@/api/backRequest";
import {useRouter} from "next/navigation";
import { useAppStore } from "@/store/store";

const FormLogin: React.FC = () => {
	const {setUser} = useAppStore();
	const router = useRouter();
	const methods = useForm<FormValuesLogin>({
		resolver: zodResolver(FormSchemaLogin),
		mode: "onChange",
	});
	const {handleSubmit} = methods;
	const onSubmit: SubmitHandler<FormValuesLogin> = async (data) => {
		console.log("Данные формы:", data);
		const result = await login(data);
		console.log(result);
		setUser(result);
		router.replace("/");
	};

	return (
		<>
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="border-1 border-[#B7B7B7] rounded-4xl py-6 w-[50vw] px-8">
					<Input
						name="email"
						labelName="Введите ваше имя и фамилию"
						error={methods.formState.errors.email?.message}
						placeholder={"Max"}
					/>
					<Input
						name="password"
						labelName="Введите e-mail"
						error={methods.formState.errors.password?.message}
						placeholder={"email@mail.com"}
					/>
					<Button type={"submit"} text={"Войти"} onClick={() => console.log()} />
					<Link href={"#"}>
						<p className="text-[#25F6DC] w-full text-center mt-1">
							Зарегистрироваться
						</p>
					</Link>
				</form>
			</FormProvider>
		</>
	);
};

export default FormLogin;
