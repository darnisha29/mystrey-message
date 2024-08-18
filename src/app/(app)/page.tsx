'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import AutoPlay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
const Home = () => {
  return (
    <div className='flex-grow flex flex-col  items-center  justify-center px-4 md:px-24 py-12'>
      <section className='text-center mb-8 md:mb-12'>
        <h1 className='text-3xl md:text-5xl  font-bold' >Dive into the world of anonymous Conversation</h1>
        <p className='mt-3 md:mt-4 text-base md:text-lg'>Explor Mystrey Message : Where your identity remains a secret </p>
      </section>


      <Carousel 
      plugins = {[AutoPlay({delay:2000})]}
      className="w-full max-w-xs">
      <CarouselContent>
        {
          messages.map((message,index) => (
            <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardHeader>{message.title}</CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-lg font-semibold">{message.content}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

        <footer className='text-center p-4 md:p-6'>
          2023 Mystrey Message.All rights reserved
        </footer>
    </div>
    
  )
}

export default Home
