
import nodemailer from 'nodemailer';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export function VerificationEmail({ username, otp }: VerificationEmailProps): string {
  return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code</title>
        <style>
          body {
            font-family: 'Roboto', Verdana, sans-serif;
            line-height: 1.6;
          }
          h2 {
            color: #333;
          }
          .code {
            font-size: 24px;
            font-weight: bold;
            color: #000;
          }
          .content {
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <p class="preview-text">Here's your verification code: ${otp}</p>
        <div class="content">
          <h2>Hello ${username},</h2>
          <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
          <p class="code">${otp}</p>
          <p>If you did not request this code, please ignore this email.</p>
        </div>
      </body>
    </html>
  `;
}

// async function sendVerificationEmail(username: string, otp: string, recipientEmail: string) {

//   const transporter = nodemailer.createTransport({
//     service: 'Gmail', 
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-email-password',
//     },
//   });



//   const emailContent = VerificationEmail({ username, otp });

//   const info = await transporter.sendMail({
//     from: '"Your App" <your-email@gmail.com>',
//     to: recipientEmail,
//     subject: 'Your Verification Code',
//     html: emailContent,
//   });

//   console.log('Message sent: %s', info.messageId);
// }
// sendVerificationEmail('JohnDoe', '123456', 'recipient@example.com').catch(console.error);



// import { resend } from "@/lib/resend";
// import VerificationEmail from "../../emails/VerificationEmail";
// import { ApiResponse } from '@/types/ApiResponse';

// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifyCode: string
// ): Promise<ApiResponse> {
  // try {
  //   await resend.emails.send({
  //     from: 'dev@hiteshchoudhary.com',
  //     to: email,
  //     subject: 'Mystery Message Verification Code',
  //     react: VerificationEmail({ username, otp: verifyCode }),
  //   });
//     return { success: true, message: 'Verification email sent successfully.' };
//   } catch (emailError) {
//     console.error('Error sending verification email:', emailError);
//     return { success: false, message: 'Failed to send verification email.' };
//   }
// }



// import {
//   Html,
//   Head,
//   Font,
//   Preview,
//   Heading,
//   Row,
//   Section,
//   Text,
//   Button,
// } from '@react-email/components';

// interface VerificationEmailProps {
//   username: string;
//   otp: string;
// }

// export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
//   return (
//     <Html lang="en" dir="ltr">
//       <Head>
//         <title>Verification Code</title>
//         <Font
//           fontFamily="Roboto"
//           fallbackFontFamily="Verdana"
//           webFont={{
//             url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
//             format: 'woff2',
//           }}
//           fontWeight={400}
//           fontStyle="normal"
//         />
//       </Head>
//       <Preview>Here&apos;s your verification code: {otp}</Preview>
//       <Section>
//         <Row>
//           <Heading as="h2">Hello {username},</Heading>
//         </Row>
//         <Row>
//           <Text>
//             Thank you for registering. Please use the following verification
//             code to complete your registration:
//           </Text>
//         </Row>
//         <Row>
//           <Text>{otp}</Text> 
//         </Row>
//         <Row>
//           <Text>
//             If you did not request this code, please ignore this email.
//           </Text>
//         </Row>
//         {/* <Row>
//           <Button
//             href={`http://localhost:3000/verify/${username}`}
//             style={{ color: '#61dafb' }}
//           >
//             Verify here
//           </Button>
//         </Row> */}
//       </Section>
//     </Html>
//   );
// }