import cron from "node-cron";
import prisma from "../config/db.js";

let isRunning = false;

export const startSessionStatusCron = () => {
  cron.schedule("*/5 * * * *", async () => {
    if (isRunning) {
      console.log("⏭️ Session status cron skipped");
      return;
    }

    isRunning = true;

    try {
      console.log("🔄 Checking for completed sessions...");

      const now = new Date();

      const sessions = await prisma.liveSession.findMany({
        where: {
          status: "UPCOMING",
        },
      });

      for (const session of sessions) {
        const endTime = new Date(
          session.date.getTime() + session.duration * 60000
        );

        if (endTime <= now) {
          await prisma.liveSession.update({
            where: {
              id: session.id,
            },
            data: {
              status: "COMPLETED",
            },
          });

          console.log(`✅ ${session.title} completed`);
        }
      }
    } catch (err) {
      console.error("Session Status Cron Error:", err);
    } finally {
      isRunning = false;
    }
  });

  console.log("✅ Session Status Cron Started");
};