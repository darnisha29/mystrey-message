import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { z } from "zod";
import { UsernameValiodation } from "@/Schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username:UsernameValiodation
})

export async function GET(request:Request) {
    // if(request.method !== 'GET') {
    //     return  Response.json(
    //         {   success:false,
    //             message:"method not allowed"
    //         },
    //         {
    //             status:405
    //         }
    //     )
    // }
    
    await dbConnect();

    try {
       
        const {searchParams} = new URL(request.url);
        
        const queryParam = {
            username:searchParams.get('username')
        }
        // validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log("here is the usrname result",result);
        if(!result.success) {
            const UsernameErrors = result.error.format().username?._errors || [];
            return Response.json(
                {   success: false,
                    message: UsernameErrors?.length > 0 ? 
                    UsernameErrors.join(',') :
                    "Invalid query parameters",
                },{status:400}
            )
        }
        const {username} = result.data
       const existingVerifiedUser = await UserModel.findOne({username,isVerified:true})
       if(existingVerifiedUser) {
        return Response.json({success:false,message:"Username already taken"},{status:400})
        } else {
            return Response.json({success:false,message:"Username is unique"},{status:200}) 
        }

    } catch (error) {
        console.log("Error checking username",error);

        
      return  Response.json(
            {   success:false,
                message:`Error checking Username ${error} `
            },
            {
                status:500
            }
        )
    }
}

