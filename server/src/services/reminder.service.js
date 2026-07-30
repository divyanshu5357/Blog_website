import prisma from "../config/db.js";
import { sendEmail } from "./mail.service.js";
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

  for (const registration of registrations) {

  try {

    await sendEmail({
      to: registration.email,
      subject: `Reminder: ${registration.session.title} starts in less than 24 hours`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
          <h2>⏰ Live Session Reminder</h2>

          <p>Hi <strong>${registration.name}</strong>,</p>

          <p>This is a reminder that your registered live session starts soon.</p>

          <hr>

          <p><strong>Session:</strong> ${registration.session.title}</p>

          <p><strong>Speaker:</strong> ${registration.session.speaker}</p>

          <p><strong>Date:</strong> ${new Date(
            registration.session.date
          ).toLocaleString()}</p>

          <p>
            <strong>Meeting Link:</strong><br/>
            <a href="${registration.session.meetingLink}">
              ${registration.session.meetingLink}
            </a>
          </p>

          <br/>

          <p>We look forward to seeing you!</p>

          <p><strong>AARAMBH CMS Team</strong></p>
        </div>
      `,
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
      err.message
    );

  }

}

};