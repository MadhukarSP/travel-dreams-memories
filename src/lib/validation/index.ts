import { z } from "zod"

export const SignupValidationSchema = z.object({
    name: z.string().min(2, { message: 'Name should be atleast 2' }),
    username: z.string().min(3, { message: 'Username should be atleast 3 characters' }),
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be atleast 8 characters' })
})


export const SignInValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be atleast 8 characters' })
});

export const PostValidationSchema = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(200),
    tags: z.string(),
});