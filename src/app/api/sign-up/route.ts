import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import  bcrypt from 'bcryptjs';
import { InsendVerificationEmail } from "@/helpers/InsendVerificationEmail";


export async function POST(request:Request) {
    console.log("in post of sign up");
    await dbConnect()

    try {
        const {username,email,password} = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified:true
        })
        if(existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message:"Username is  already taken"
            },{status:400})
        }
        const existingUserByEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random() * 900000)
       
        
        if(existingUserByEmail){
           if(existingUserByEmail.isVerified){
            return Response.json({
                success: false,
                message:"Email is already taken"
           },{status:500})
        } else{
            const hasedPassword = await bcrypt.hash(password,10);
            existingUserByEmail.verifyCode = verifyCode;
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
            await existingUserByEmail.save();
        }
            
        } else{
            const hasedPassword = await bcrypt.hash(password,10);
            const expiryDate = new Date(); //new return object and object is reference point in memory and values inside can be change 
            expiryDate.setHours(expiryDate.getHours() + 1)
          const newUser =   new UserModel({
                username,
                email,
                password:hasedPassword,
                verifyCode,
                verifyCodeExpiry:expiryDate,
                isVerified:false,
                isAcceptingMessage:true,
                message:[],
            })
            await newUser.save()
        }

        // send verification email
        const emailResponse = await InsendVerificationEmail(email,username,verifyCode);

        if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message
            },{status:500});
        }

        return Response.json({
            success:true,
            message:"User Registered successfully.Please verify your email"
        },{status:201});



    } catch (error) {
        console.error("Error in registering user",error);
        return Response.json({
            success:false,
            message:"Error registering user"
        },
        {
            status:500
        }

    )
    }
}