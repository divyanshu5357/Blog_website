export const generateGoogleCalendarLink = (session) => {
  const start = new Date(session.date);

  // Default duration: 60 minutes if not provided
  const duration = session.duration || 60;

  const end = new Date(start.getTime() + duration * 60 * 1000);

  const formatDate = (date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: session.title,
    dates: `${formatDate(start)}/${formatDate(end)}`,
    details: `${session.description}

Speaker: ${session.speaker}

Meeting Link:
${session.meetingLink}`,
    location: session.meetingLink,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};