import { useSubmit } from "react-router";
import CheckBoxInput from "./CheckBox";
import Form from "./Form";
import HelpLink from "./HelpLink";
import Input from "./Input";
import Label from "./Label";
import SubmitButton from "./SubmitButton";
import { useForm, type FieldValues } from "react-hook-form";

export default function CredentialsForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const submit = useSubmit();

    // usefetcher mb!!!
    const onSubmit = (data: FieldValues) => {
        submit(data, {
        encType: 'application/json',
        method: 'POST',
        action: '/login'
        })
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <Label htmlFor="username">New username</Label>
                <div className='mt-2'>
                <Input register={register} validateOptions={{
                    minLength: { value: 8, message: "Username should contain a minimum of 8 symbols"},
                    maxLength: { value: 32, message: "Username should contain a maximum of 32 symbols"},
                    pattern: { value: /^[0-9A-Za-z]{8,32}$/, message: "Username should contain only numbers and letters"}
                    }} name="username" id="username" type="username" errorField={errors.username}></Input>
                </div>
            </div>
            <div>
                <Label htmlFor="oldPassword">Old password</Label>
                <div className='mt-2'>
                <Input register={register} validateOptions={{
                    required: {value: true, message: "Old password is required"}, 
                    minLength: { value: 8, message: "Password should contain a minimum of 8 symbols"},
                    maxLength: { value: 32, message: "Password should contain a maximum of 32 symbols"},
                    pattern: { value: /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/, message: "Password should contain at least 1 symbol, number and letter"}
                    }} name="oldPassword" id="oldPassword" type="oldPassword" errorField={errors.oldPassword}></Input>
                </div>
            </div>
            <div>
                <Label htmlFor="password">New password</Label>
                <div className='mt-2'>
                <Input register={register} validateOptions={{
                    required: {value: true, message: "Password is required"}, 
                    minLength: { value: 8, message: "Password should contain a minimum of 8 symbols"},
                    maxLength: { value: 32, message: "Password should contain a maximum of 32 symbols"},
                    pattern: { value: /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/, message: "Password should contain at least 1 symbol, number and letter"}
                    }} name="password" id="password" type="password" errorField={errors.password}></Input>
                </div>
            </div>
            <div>
                <SubmitButton>
                Change credentials
                </SubmitButton>
            </div>
        </Form>
    )
}