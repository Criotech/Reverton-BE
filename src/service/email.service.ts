import * as dotenv from 'dotenv';

import sendgrid from '@sendgrid/mail';

dotenv.config();

sendgrid.setApiKey(process.env.SG_KEY);

const sendEmail = async (to: string, subject: string, content: string) => {
  const options = {
    to,
    from: 'flourishisnow@gmail.com',
    subject,
    html: content
  };
  await sendgrid.send(options);
};

const sendVerifyAccountEmail = async (to: string, token: string) => {
  const subject = 'Verify your account';

  const text = `
    Dear user,
    
    To verify your account (${to}). Enter the four digit token <b>${token}</b>/
    If you believe you received this email in error, Kindly ignore the email.
    
    Thank you, 
    Riverton
    `;
  await sendEmail(to, subject, text);
};

const sendResetPasswordEmail = async (to: string, token: string) => {
  const subject = 'Reset Password';

  const text = `
      Dear user,
      
      Your reset password token is ${token}.
      If you did not request any password resets, then ignore this email.
      
      Thank you, 
      Riverton
      `;
  await sendEmail(to, subject, text);
};

// const depositSuccess = async () => {

// }

export {
  sendVerifyAccountEmail,
  sendResetPasswordEmail
};
