import prisma from "../../config/db.js";

export const getSettings = async () => {
  let settings = await prisma.setting.findFirst();

  if (!settings) {
    settings = await prisma.setting.create({
      data: {
        id: "default",
        siteName: "AARAMBH",
        siteDescription: "A modern CMS for blogging and live sessions.",
        contactEmail: "contact@aarambh.com",
        footerText: "© 2026 Aarambh CMS. All rights reserved.",
        maintenanceMode: false,
      },
    });
  }

  return settings;
};

export const updateSettings = async (data) => {
  const current = await getSettings();

  const updated = await prisma.setting.update({
    where: { id: current.id },
    data: {
      siteName: data.siteName !== undefined ? data.siteName : current.siteName,
      siteDescription: data.siteDescription !== undefined ? data.siteDescription : current.siteDescription,
      contactEmail: data.contactEmail !== undefined ? data.contactEmail : current.contactEmail,
      footerText: data.footerText !== undefined ? data.footerText : current.footerText,
      maintenanceMode: data.maintenanceMode !== undefined ? Boolean(data.maintenanceMode) : current.maintenanceMode,
      socialTwitter: data.socialTwitter !== undefined ? data.socialTwitter : current.socialTwitter,
      socialGithub: data.socialGithub !== undefined ? data.socialGithub : current.socialGithub,
      socialLinkedin: data.socialLinkedin !== undefined ? data.socialLinkedin : current.socialLinkedin,
    },
  });

  return updated;
};
