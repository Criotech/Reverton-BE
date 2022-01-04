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

export {
  sendVerifyAccountEmail
};
