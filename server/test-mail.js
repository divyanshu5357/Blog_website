import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "divyanshusingh17102002@gmail.com",
    pass: "zuvacxsxmdnouzne",
  },
});

try {
  await transporter.verify();
  console.log("SMTP OK");
} catch (err) {
  console.error(err);
}