import { getDashboardService } from "./dashboard.service.js";

export const getDashboard = async (req, res, next) => {
  try {
    const response = await getDashboardService();

    return res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};