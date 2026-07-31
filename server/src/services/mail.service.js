import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: false,
  family: 4,
  auth: {
    user: env.SMTP_EMAIL,
    pass: env.SMTP_PASSWORD,
  },
});

export const verifyMail = async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP Connected Successfully");
  } catch (err) {
    console.error("SMTP Error:", err.message);
  }
};
export const sendEmail = async ({
  to,
  subject,
  html,
  attachments = [],
}) => {
  await transporter.sendMail({
    from: env.MAIL_FROM,
    to,
    subject,
    html,
    attachments,
  });
};