import { Router } from "express";

import {
  subscribe,
  getSubscribers,
  deleteSubscriber,
} from "./subscriber.controller.js";

const router = Router();

router.post("/", subscribe);

router.get("/", getSubscribers);

router.delete("/:id", deleteSubscriber);

export default router;