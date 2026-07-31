import prisma from "../config/db.js";
import { sendEmail } from "./mail.service.js";
import QRCode from "qrcode";

export const sendReminderEmails = async () => {
  const now = new Date();

  const next24Hours = new Date(
    now.getTime() + 24 * 60 * 60 * 1000
  );

  const registrations =
    await prisma.sessionRegistration.findMany({
      where: {
        reminderSent: false,
        session: {
          date: {
            gte: now,
            lte: next24Hours,
          },
        },
      },
      include: {
        session: true,
      },
    });

  console.log(`Found ${registrations.length} registrations`);

  for (const registration of registrations) {
    try {
      // Generate QR Code as PNG Buffer
      const qrBuffer = await QRCode.toBuffer(
        registration.session.meetingLink,
        {
          type: "png",
          width: 250,
          margin: 2,
        }
      );

      await sendEmail({
        to: registration.email,

        subject: `🔔 Reminder: ${registration.session.title} starts in less than 24 hours`,

        html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #eee; border-radius:10px;">

          <h2 style="color:#1e3a8a;">⏰ Live Session Reminder</h2>

          <p>Hi <strong>${registration.name}</strong>,</p>

          <p>
            This is a reminder that your registered live session starts soon.
          </p>

          <hr/>

          <p><strong>📚 Session:</strong> ${registration.session.title}</p>

          <p><strong>🎤 Speaker:</strong> ${registration.session.speaker}</p>

          <p>
            <strong>📅 Date:</strong>
            ${new Date(
              registration.session.date
            ).toLocaleString()}
          </p>

          <p>
            <strong>🔗 Meeting Link:</strong><br/>
            <a href="${registration.session.meetingLink}">
              Join Meeting
            </a>
          </p>

          <hr/>

          <h3>📱 Scan QR Code to Join</h3>

          <p>
            Scan this QR code with your mobile phone to join instantly.
          </p>

          <div style="text-align:center;margin:20px 0;">
            <img
              src="cid:meeting-qr"
              width="220"
              alt="Meeting QR Code"
            />
          </div>

          <div style="text-align:center;margin-top:25px;">
            <a
              href="${registration.session.meetingLink}"
              style="
                background:#2563eb;
                color:#fff;
                padding:12px 22px;
                border-radius:8px;
                text-decoration:none;
                font-weight:bold;
              "
            >
              Join Meeting
            </a>
          </div>

          <br/>

          <p>We look forward to seeing you!</p>

          <p><strong>AARAMBH CMS Team</strong></p>

        </div>
        `,

        attachments: [
          {
            filename: "meeting-qr.png",
            content: qrBuffer,
            cid: "meeting-qr",
          },
        ],
      });

      await prisma.sessionRegistration.update({
        where: {
          id: registration.id,
        },
        data: {
          reminderSent: true,
        },
      });

      console.log(
        `✅ Reminder sent to ${registration.email}`
      );
    } catch (err) {
      console.error(
        `❌ Failed for ${registration.email}`,
        err
      );
    }
  }
};