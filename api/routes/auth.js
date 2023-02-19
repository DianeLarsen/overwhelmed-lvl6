import express from "express";
import { login, register, logout } from "../controllers/auth.js"

const router = express.Router()

router.get("login", login)
router.get("login", register)
router.get("login", logout)

export default router