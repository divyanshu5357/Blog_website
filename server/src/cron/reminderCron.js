import cron from "node-cron";
import { sendReminderEmails } from "../services/reminder.service.js";

let isRunning = false;

export const startReminderCron = () => {
  cron.schedule("* * * * *", async () => {
    if (isRunning) {
      console.log("⏭️ Reminder cron skipped (previous job still running)");
      return;
    }

    isRunning = true;

    try {
      console.log("⏰ Checking for reminder emails...");
      await sendReminderEmails();
    } catch (err) {
      console.error("Reminder Cron Error:", err);
    } finally {
      isRunning = false;
    }
  });

  console.log("✅ Reminder Cron Started");
};