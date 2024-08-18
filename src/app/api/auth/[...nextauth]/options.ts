import { NextAuthOptions } from "next-auth"
// i/mport Credentials, { CredentialsProvider } from "next-auth/providers/credentials"
import bcrypt, { compare } from 'bcryptjs';
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

export const authOptions:NextAuthOptions = {
    providers : [
        CredentialsProvider({
            id: "Credentials",
            name : "Credentials",
            credentials : {
                email : { label : "Email", type : "text"},
                password : { label : "Password", type : "password"}
                },
        async authorize(credentials:any):Promise<any>{
                    await dbConnect();
                    try {
                     const user =   await UserModel.findOne({
                            $or:[
                                {email:credentials?.identifier},
                                {username:credentials?.identifier},
                            ]
                            
                        })
                        if(!user) {
                            throw new Error("no user found with this email");
                        }

                        if(!user.isVerified){
                            throw new Error("please verfy your account before login");
                        }

                       const isPasswordCorrect =  await bcrypt.compare(credentials.password,user.password);
                       if(!isPasswordCorrect){
                        throw new Error("wrong password");
                        }
                        return user;

                    } catch (err:any) {
                        throw new Error(err)
                    }
                    
                    const user = await UserModel.findOne({ email : credentials?.email });
                  
                }
})
    ],
    callbacks : {
        async jwt ({user,token}){
            if(user){
                token._id = user._id?.toString();
                token.isVerfied= user.isVerified;
                token.isAcceptingMessages = user.isAcceptionMessages;
                token.username = user.username;
            }
            return token;
        },
        async session ({session,token}){
            if(token) {
                session.user._id = token._id 
                session.user.isVerified = token.isVerified
                session.user.isAcceptionMessages = token.isAcceptionMessages
                session.user.username = token.username
            }
            return session
        }
    },

    pages : {
        signIn : "/sign-in"

    },
    session : {
        strategy: "jwt"
    },
    secret :process.env.NEXTAUTH_SECRET     
}


function CredentialsProvider(arg0: { id: string; name: string; credentials: { email: { label: string; type: string; }; password: { label: string; type: string; }; }; authorize(credentials: any): Promise<any>; }): import("next-auth/providers/index").Provider {
    throw new Error("Function not implemented.");
}

