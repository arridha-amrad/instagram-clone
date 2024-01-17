import { z } from 'zod';

export const loginSchema = z.object({
   identity: z.string().min(1, { message: 'username or email is required' }),
   password: z.string().min(1, { message: 'password is required' }),
});

export type LoginDto = z.infer<typeof loginSchema>;
