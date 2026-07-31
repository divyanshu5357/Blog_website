import * as subscriberService from "./subscriber.service.js";

export const subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const subscriber = await subscriberService.subscribe(email);

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully.",
      subscriber,
    });
  } catch (err) {
    if (err.message === "Email is already subscribed.") {
      return res.status(409).json({
        success: false,
        message: err.message,
      });
    }

    next(err);
  }
};

export const getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await subscriberService.getSubscribers();

    return res.json({
      success: true,
      subscribers,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteSubscriber = async (req, res, next) => {
  try {
    await subscriberService.deleteSubscriber(req.params.id);

    return res.json({
      success: true,
      message: "Subscriber deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};