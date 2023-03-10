import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { z } from 'zod';

import {
  generateEmailContent,
  mailOptions,
  transporter,
} from '../../server/services/nodemailer';

const contactDataEmailSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().min(1).max(100),
  message: z.string().min(1).max(5000),
});

export type ContactDataEmail = z.infer<typeof contactDataEmailSchema>;

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});

apiRoute.post(async (req, res) => {
  const contactDataEmail = contactDataEmailSchema.parse(req.body);
  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: 'Alcremie',
      text: 'Contact',
      html: generateEmailContent(contactDataEmail),
    });
  } catch (error) {
    throw new Error();
  }

  res.status(200).json({ message: 'Email sent' });
});

export default apiRoute;
