import express from "express";
import { requireAuth } from "@eg-ticketing/common";

const router = express.Router();

router.get("/api/users/currentuser", requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
