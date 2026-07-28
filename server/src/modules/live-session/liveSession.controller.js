import {
  createLiveSessionService,
  getLiveSessionsService,
  registerSessionService,
  getSessionRegistrationsService,
} from "./liveSession.service.js";
import { sendEmail } from "../../services/mail.service.js";
import prisma from "../../config/db.js";;

export const createLiveSession = async (
  req,
  res,
  next
) => {
  try {

    const response =
      await createLiveSessionService(
        req.body
      );

    res
      .status(response.statusCode)
      .json(response);

  } catch (err) {
    next(err);
  }
};

export const getLiveSessions = async (
  req,
  res,
  next
) => {
  try {

    const response =
      await getLiveSessionsService();

    res
      .status(response.statusCode)
      .json(response);

  } catch (err) {
    next(err);
  }
};
export const getPublicSessions = async (req, res, next) => {
  try {
    const sessions = await prisma.liveSession.findMany({
      where: {
        status: "UPCOMING",
      },
      orderBy: {
        date: "asc",
      },
    });

    res.json({
      success: true,
      data: sessions,
    });
  } catch (err) {
    next(err);
  }
};
export const registerSession = async (
  req,
  res,
  next
) => {
  try {

    const response =
      await registerSessionService(
        req.params.id,
        req.body
      );

    res
      .status(response.statusCode)
      .json(response);

  } catch (err) {
    next(err);
  }
};

export const testEmail = async (
  req,
  res,
  next
) => {
  try {

    await sendEmail({
      to: "divyanshusingh17102002@gmail.com",
      subject: "AARAMBH CMS Test Email",
      html: `
        <h2>Congratulations 🎉</h2>

        <p>Your Gmail SMTP is working correctly.</p>

        <p>
          You are now ready to send
          registration emails.
        </p>
      `,
    });

    res.json({
      success: true,
      message: "Email sent successfully.",
    });

  } catch (err) {
    next(err);
  }
};
export const getSessionRegistrations = async (
  req,
  res,
  next
) => {
  try {

    const response =
      await getSessionRegistrationsService(
        req.params.id
      );

    res
      .status(response.statusCode)
      .json(response);

  } catch (err) {
    next(err);
  }
};