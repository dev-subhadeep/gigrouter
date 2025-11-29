// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import * as authService from "./auth.service";

export async function registerHandler(req: Request, res: Response) {
    const { email, password, full_name, role } = req.body;
    try {
        const user = await authService.registerUser({ email, password, full_name, role });
        // don't send password hash
        res.status(201).json({ id: user.id, email: user.email, full_name: user.full_name, role: user.role });
    } catch (err: any) {
        console.error(err);
        res.status(400).json({ error: err.message || "Registration failed" });
    }
}

export async function loginHandler(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await authService.verifyUser(email, password);
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        // Save user id in session
        (req.session as any).userId = user.id;
        (req.session as any).role = user.role;
        res.json({ id: user.id, email: user.email, full_name: user.full_name, role: user.role });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: "Login failed" });
    }
}

export async function meHandler(req: Request, res: Response) {
    const sid = (req.session as any).userId;
    if (!sid) return res.status(401).json({ error: "Not authenticated" });
    const user = await authService.findById(sid);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ id: user.id, email: user.email, full_name: user.full_name, role: user.role });
}

export async function logoutHandler(req: Request, res: Response) {
    req.session!.destroy((err) => {
        if (err) {
            console.error("Session destroy error:", err);
        }
        res.clearCookie("connect.sid");
        res.json({ ok: true });
    });
}
