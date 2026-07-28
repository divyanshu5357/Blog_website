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
  await sendEmail({
    to: email,
    subject: `Registration Confirmed - ${session.title}`,
    html: registrationEmail(session, name),
  });

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