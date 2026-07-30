import cron from "node-cron";
import { sendReminderEmails } from "../services/reminder.service.js";

export const startReminderCron = () => {
  cron.schedule("0 * * * *", async () => {
console.log("⏰ Checking for reminder emails...");

await sendReminderEmails();
});

  console.log("✅ Reminder Cron Started");
};