import React, {useState} from "react";
import Input from "./Input";
import {FormSchema, FormValues} from "@/schemas/validationSchema";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "./Button";
import TagInput from "./TagInput";
import Link from "next/link";

const FormReg: React.FC = () => {
	const [allergens, setAllergens] = useState<string[]>([]);
	const methods = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		mode: "onChange",
	});

	const {handleSubmit} = methods;

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(allergens);

		console.log("Данные формы:", data);
	};

	return (
		<>
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="bg-[#ECECEC] rounded-lg pt-6 w-[50vw] pb-2 px-8 overflow-y-auto h-[520px]">
					<Input
						name="email"
						labelName="Введите ваше имя и фамилию"
						error={methods.formState.errors.email?.message}
						placeholder={"Max"}
					/>
					<Input
						name="email"
						labelName="Введите e-mail"
						error={methods.formState.errors.email?.message}
						placeholder={"email@mail.com"}
					/>
					<Input
						name="email"
						labelName="Придумайте пароль"
						error={methods.formState.errors.email?.message}
						placeholder={"12345678"}
					/>
					{/* <div className="">
						<span>Вес</span>
						<span>Рост</span>
					</div> */}
					<TagInput placeholder="Аллерген..." onTagsChange={setAllergens} />
					<Button type={"submit"} text={"ddd"} onClick={() => console.log()} />
					<Link href={"#"}>
						<p className="text-[#25F6DC] w-full text-center mt-1">
							Уже есть аккаунт? Войти
						</p>
					</Link>
				</form>
			</FormProvider>
		</>
	);
};

export default FormReg;
