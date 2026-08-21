import * as settingsService from "./settings.service.js";

export const getSettings = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettings();

    return res.json({
      success: true,
      settings,
    });
  } catch (err) {
    next(err);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const settings = await settingsService.updateSettings(req.body);

    return res.json({
      success: true,
      message: "Settings updated successfully.",
      settings,
    });
  } catch (err) {
    next(err);
  }
};
