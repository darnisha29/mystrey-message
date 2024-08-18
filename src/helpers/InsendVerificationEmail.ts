import { resend } from "@/lib/resend";
import { VerificationEmail } from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function InsendVerificationEmail( email:string,
    username:string,verifyCode:any): Promise<ApiResponse> {
   try {
    
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Mystrey message | Verification Code',
        react: VerificationEmail({ username, otp: verifyCode }),
      });
    return {success:true,message:"verification email send successfully"}
    
   } catch (error) {
        console.error("Error sending verification email",error);
        return {success:false,message:'Failed to send verification email'}
   }
}