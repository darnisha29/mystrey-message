'use client';

import { useDebounceValue ,useDebounceCallback } from 'usehooks-ts';
import { useToast } from "@/components/ui/use-toast";

import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { SignUpSchema } from '@/Schemas/signUpSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import * as z from 'zod';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { signInSchema } from '@/Schemas/signInSchema';

export default function SignIn() {
  
 
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials',{
      redirect:false,
      identifier:data.identifier,
      password:data.password
    })

    if(result?.error){
      toast({
        title:'login failed',
        description:"incorrect usrname or password",
        variant:"destructive"
      })
    }

    if(result?.url){
      router.replace('/dashboard')
    }
    
  };


  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>Join Mystrey Message</h1>
          <p className='mb-4'>Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            
            
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" >
              SignIn
            </Button>
          </form>
        </Form>
        <div className='text-center mt-4'>
          <p>
            already a member?{' '}
            <Link href='/sign-in' className='text-blue-600 hover:text-blue-800'> Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
