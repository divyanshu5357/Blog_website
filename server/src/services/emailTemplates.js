export const registrationEmail = (session, name) => {
  return `
    <div style="font-family:Arial,sans-serif;padding:30px">

      <h2 style="color:#6b21a8">
        Registration Confirmed 🎉
      </h2>

      <p>Hi <strong>${name}</strong>,</p>

      <p>
        Thank you for registering for an AARAMBH Live Session.
      </p>

      <hr>

      <h3>${session.title}</h3>

      <p>
        <strong>Speaker:</strong>
        ${session.speaker}
      </p>

      <p>
        <strong>Date:</strong>
        ${new Date(session.date).toLocaleString()}
      </p>

      <p>
        <strong>Duration:</strong>
        ${session.duration} Minutes
      </p>

      <hr>

      <p>
        We'll send another email before the session starts with the meeting link.
      </p>

      <br>

      <p>
        Regards,<br>
        <strong>AARAMBH Team</strong>
      </p>

    </div>
  `;
};