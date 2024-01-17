'use client';

import { SignUpDto, signUpSchema } from '@/lib/zod/signup';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Spacer } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import OtherLinks from './OtherLinks';

export type SubmitResult = {
   message: string;
   type: 'error' | 'success';
};

export default function SignUpForm() {
   const [isVisible, setIsVisible] = useState(false);
   const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

   const toggleVisibility = () => setIsVisible(!isVisible);

   const {
      register,
      handleSubmit,
      formState: { errors, isLoading, isSubmitting },
      reset
   } = useForm<SignUpDto>({
      resolver: zodResolver(signUpSchema)
   });

   const onSubmit = async (data: SignUpDto) => {
      try {
         const uri = `${process.env.NEXT_PUBLIC_URL}/api/auth/register`;
         const response = await fetch(uri, {
            body: JSON.stringify(data),
            method: 'POST'
         });
         const result = await response.json();
         setSubmitResult({
            message: result.message,
            type: response.ok ? 'success' : 'error'
         });
         if (response.ok) {
            reset();
         }
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         {submitResult && (
            <div className="w-full my-2">
               <p
                  className={`${
                     submitResult.type === 'error'
                        ? 'text-red-500'
                        : 'text-green-500'
                  } text-center`}
               >
                  {submitResult.message}
               </p>
            </div>
         )}
         <form onSubmit={handleSubmit(onSubmit)}>
            <Input
               errorMessage={errors.email?.message}
               isInvalid={!!errors.email?.message}
               {...register('email')}
               variant="flat"
               size="sm"
               type="text"
               label="Email"
            />
            <Spacer y={2} />
            <Input
               errorMessage={errors.fullName?.message}
               isInvalid={!!errors.fullName?.message}
               {...register('fullName')}
               variant="flat"
               size="sm"
               type="text"
               label="Name"
            />
            <Spacer y={2} />
            <Input
               errorMessage={errors.username?.message}
               isInvalid={!!errors.username?.message}
               {...register('username')}
               variant="flat"
               size="sm"
               type="text"
               label="Username"
            />
            <Spacer y={2} />
            <Input
               errorMessage={errors.password?.message}
               isInvalid={!!errors.password?.message}
               {...register('password')}
               size="sm"
               variant="flat"
               label="Password"
               endContent={
                  <button
                     className="focus:outline-none"
                     type="button"
                     onClick={toggleVisibility}
                  >
                     {isVisible ? (
                        <EyeSlashIcon className="h-6 w-6 pointer-events-none" />
                     ) : (
                        <EyeIcon className="h-6 w-6 pointer-events-none" />
                     )}
                  </button>
               }
               type={isVisible ? 'text' : 'password'}
               className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
            />{' '}
            <OtherLinks />
            <Button
               type="submit"
               isLoading={isLoading || isSubmitting}
               className="font-semibold"
               isDisabled={isLoading || isSubmitting}
               variant="solid"
               color="primary"
               fullWidth
            >
               Sign Up
            </Button>
         </form>
      </>
   );
}
