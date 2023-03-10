import nodemailer from 'nodemailer';

import { ContactDataEmail } from '../../pages/api/email';

const user = {
  email: String(process.env.EMAIL),
  password: String(process.env.EMAIL_PASSWORD),
  emailTo: String(process.env.EMAIL_TO),
};

export function generateEmailContent(data: ContactDataEmail) {
  const { name, email, message } = data;

  return `
        <h1>Name: ${name}</h1>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
    `;
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: user.email,
    pass: user.password,
  },
});

export const mailOptions = {
  from: user.email,
  to: user.emailTo,
};
