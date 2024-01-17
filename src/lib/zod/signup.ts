import { z } from 'zod';

export const signUpSchema = z.object({
   email: z
      .string()
      .min(1, { message: 'email is required' })
      .email({ message: 'invalid email' }),
   fullName: z.string().min(1, { message: 'full name is required' }),
   username: z
      .string()
      .trim()
      .min(1, { message: 'username is required' })
      .min(5, { message: 'username is too short' })
      .max(20, { message: 'username is too long' })
      .refine((s) => !s.startsWith('_'), {
         message: 'username cannot start with underscore'
      }),
   password: z.string().trim().min(1, { message: 'password is required' })
});

export type SignUpDto = z.infer<typeof signUpSchema>;
