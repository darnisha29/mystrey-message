import {z} from 'zod';

export const UsernameValiodation =  z
.string()
.min(2,{message:"Username must be atleast 2 characters"})
.max(20,{message:'Username must be no more than 20 characters'})
.regex(/^[a-zA-z0-9_]+$/,{message:'Username must not contain special character'});

export const SignUpSchema = z.object({
    username: UsernameValiodation,
    email: z.string().email({message:'Invalid email address'}),
    password:z.string().min(6,{message: "Password must be atleast 6 characters"})
})
