import asyncHandler from "../../utils/asyncHandler.js";

import { searchService } from "./search.service.js";

export const search = asyncHandler(async (req, res) => {
  const response = await searchService(req.query.q);

  res.status(response.statusCode).json(response);
});