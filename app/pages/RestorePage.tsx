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
  console.log(data);
}


export default function RestorePage(){
  const {register, handleSubmit, formState: {errors}} = useForm();
  const submit = useSubmit();

  // usefetcher mb!!!
  const onSubmit = (data: FieldValues) => {
    submit(data, {
      encType: 'application/json',
      method: 'POST',
      action: '/restore-pass'
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
                Forgot password? Enter your email for next instructions. 
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className='mt-2'>
                    <Input register={register} validateOptions={{
                        required: {value: true, message: "Email is required"}, 
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                          }
                      }} name="email" id="email" type="email" errorField={errors.email}></Input>
                  </div>
                </div>
                <div>
                  <SubmitButton>
                    Continue
                  </SubmitButton>
                </div>
              </Form>
              <p className="mt-10 text-center text-sm/6 text-gray-500">
                Not a member?{' '}
                <HelpLink to="/register">
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