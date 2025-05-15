import {useForm, type FieldValues, type RegisterOptions, type UseFormRegisterReturn} from 'react-hook-form'
import { useSubmit } from "react-router";
import Form from '~/components/Forms/Form';
import FormLogo from '~/components/Forms/FormLogo';
import HelpLink from '~/components/Forms/HelpLink';
import Input from '~/components/Forms/Input';
import Label from '~/components/Forms/Label';
import SubmitButton from '~/components/Forms/SubmitButton';
import FormField from '~/components/Input/FormField';

export async function clientAction({request} : any) {
  const data = await request.json();
  if(data.password == data.confirmPassword){
    console.log(data);
  }
  console.log("wrong data");
}


export default function ResetPassPage(){
  const {register, handleSubmit, formState: {errors}} = useForm();
  const submit = useSubmit();
  const email ='';

  // usefetcher mb!!!
  const onSubmit = (data: FieldValues) => {
    submit(data, {
      encType: 'application/json',
      method: 'POST',
      action: '/reset-pass'
    })
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="w-full bg-white rounded shadow-blue-500 dark:shadow-sky-700 shadow-md border border-blue-300 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-sky-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <FormLogo/>
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-200">
                Reset your password.
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  {/* Change this to 6 fields with number */}
                  <Label htmlFor="confirmation">Confirmation code</Label>
                  <div className='mt-2'>
                    <Input register={register} validateOptions={{
                        required: {value: true, message: "Confirmation code is required"}, 
                        pattern: { value: /^[0-9]{6}$/, message: "Confirmation code should only contain 6 numbers"}
                      }} name="confirmation" id="confirmation" type="confirmation" errorField={errors.confirmation}></Input>
                  </div>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
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
                  <Label htmlFor="confirmPassword">Repeat password</Label>
                  <div className='mt-2'>
                    <Input register={register} validateOptions={{
                        required: {value: true, message: "Confirm your password"}, 
                      }} name="confirmPassword" id="confirmPassword" type="confirmPassword" errorField={errors.confirmPassword}></Input>
                  </div>
                </div>
                <div>
                  <SubmitButton>
                    Reset password
                  </SubmitButton>
                </div>
              </Form>
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?{' '}
                <HelpLink to="/">
                      Create a new account
                </HelpLink>
              </p>
            </div>
            </div>
          </div>
        </div>
    </>
  )

}