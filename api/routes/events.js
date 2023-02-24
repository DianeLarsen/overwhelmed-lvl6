import express from "express";
import { getUserEvents, getEvent, deleteEvent, updateEvent, createEvent } from "../controllers/event.js";

const router = express.Router();


router.post("/", createEvent);
router.delete("/:eventId", deleteEvent);
router.patch("/:eventId", updateEvent);
router.get("/:id", getEvent);
router.get("/", getUserEvents)

export default router;