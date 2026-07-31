import prisma from "../../config/db.js";
import { sendEmail } from "../../services/mail.service.js";
import { registrationEmail } from "../../services/emailTemplates.js";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

export const createLiveSessionService = async (data) => {
  const session = await prisma.liveSession.create({
    data,
  });

  return new ApiResponse(
    201,
    "Session created successfully.",
    session
  );
};

export const getLiveSessionsService = async () => {
  const sessions = await prisma.liveSession.findMany({
  where: {
    status: "UPCOMING",
  },
  include: {
    _count: {
      select: {
        registrations: true,
      },
    },
  },
  orderBy: {
    date: "asc",
  },
});

  return new ApiResponse(
    200,
    "Sessions fetched successfully.",
    sessions
  );
};

export const registerSessionService = async (
  sessionId,
  data
) => {

  const { name, email } = data;

  const session = await prisma.liveSession.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (!session) {
    throw new ApiError(404, "Session not found.");
  }
  const sessionEndTime = new Date(
  session.date.getTime() +
    session.duration * 60 * 1000
);

if (
  session.status !== "UPCOMING" ||
  sessionEndTime <= new Date()
) {
  throw new ApiError(
    400,
    "Registration has closed for this session."
  );
}

  const alreadyRegistered =
    await prisma.sessionRegistration.findUnique({
      where: {
        sessionId_email: {
          sessionId,
          email,
        },
      },
    });

  if (alreadyRegistered) {
    throw new ApiError(
      400,
      "You have already registered for this session."
    );
  }

  const registration =
    await prisma.sessionRegistration.create({
      data: {
        sessionId,
        name,
        email,
      },
    });

  // Send confirmation email
 try {

  await sendEmail({
    to: email,
    subject: "Registration Successful",
    html: `
      <h2>Registration Confirmed 🎉</h2>

      <p>Hello <b>${name}</b>,</p>

      <p>You have successfully registered for
      <b>${session.title}</b>.</p>

      <p><b>Date:</b> ${new Date(session.date).toLocaleString()}</p>

      <p><b>Speaker:</b> ${session.speaker}</p>

      <p>Thank you for registering!</p>
    `,
  });
  } catch (err) {

  console.error("Email sending failed:", err.message);
  }
  return new ApiResponse(
    201,
    "Registration successful.",
    registration
  );
};
export const getSessionRegistrationsService = async (
  sessionId
) => {

  const registrations =
    await prisma.sessionRegistration.findMany({
      where: {
        sessionId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return new ApiResponse(
    200,
    "Registrations fetched successfully.",
    registrations
  );
};
export const updateLiveSessionService = async (
  id,
  data
) => {

  const session = await prisma.liveSession.update({
    where: {
      id,
    },
    data,
  });

  return new ApiResponse(
    200,
    "Session updated successfully.",
    session
  );
};
export const deleteLiveSessionService = async (id) => {

  await prisma.liveSession.delete({
    where: {
      id,
    },
  });

  return new ApiResponse(
    200,
    "Session deleted successfully."
  );
};
export const exportRegistrationsService = async (sessionId) => {

  const registrations = await prisma.sessionRegistration.findMany({
    where: {
      sessionId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let csv =
    "Name,Email,Registered At\n";

  registrations.forEach((user) => {

    csv += `"${user.name}","${user.email}","${new Date(
      user.createdAt
    ).toLocaleString()}"\n`;

  });

  return csv;

};