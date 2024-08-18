import OpenAI from 'openai';
import { OpenAIStream,StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

// creat an openai client(that's edge friendly)
const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
})

// set the runtime to edge for the best performance
export const runtime = 'edge';

export async function POST(req:Request) {
    try {
        const prompt = "Creat a list of three open ended and engaging questions formated as single string.Each question should be separated by '||'. These question are for anonymous social messaging plateform, like Qooh.me, and  should be suitable for diverse audience,avoid personal or sensitive topics, focusing insead on universal theme that encourage friendly interaction.For example, your output should be structured like this: 'What's a hobby you've recently started? || If  you  could have dinner with any historical figure,who would it be?|| what's a simple thing that make you happy?'.Ensure the  questions are intriguing,foster curiosity, and contribute  to a positive and welcoming conversational environment."
        const {messages} = await req.json();



// Ask openAi for streaming chat completion given the prompt 

const response = await openai.completions.create({
    model:'gpt-3.5-turbo-intsruct',
    max_tokens: 400,
    stream:true,
    prompt,
})

// convert the response into a friendly test-stream
const stream = OpenAIStream(response);
// respond with the stream 
return new StreamingTextResponse(stream);
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            const {name,status,headers,message} = error
            return NextResponse.json({
                name,status,headers,message
            },{status})
        } else {
           console.log("An unexpected error occured")
           throw error 
        }
    }
}