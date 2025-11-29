// src/modules/auth/auth.routes.ts
import express from "express";
import { registerHandler, loginHandler, meHandler, logoutHandler } from "./auth.controller";
const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/logout", logoutHandler);
router.get("/me", meHandler);

export default router;
