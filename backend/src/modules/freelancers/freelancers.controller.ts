import { Request, Response } from "express";
import * as freelancerService from "./freelancers.service";

export async function createFreelancerHandler(req: Request, res: Response) {
    try {
        const userId = (req.session as any).userId;
        const client = await freelancerService.createFreelancer(userId, req.body);
        res.status(201).json(client);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export async function listFreelancersHandler(req: Request, res: Response) {
    try {
        const userId = (req.session as any).userId;
        const freelancers = await freelancerService.listFreelancers(userId);
        res.status(200).json(freelancers);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export async function getFreelancerByIdHandler(req: Request, res: Response) {
    try {
        const userId = (req.session as any).userId;
        const { id } = req.params;
        const freelancer = await freelancerService.getFreelancerById(userId, id);
        if (!freelancer) {
            return res.status(404).json({ error: "Freelancer not found" });
        }
        res.status(200).json(freelancer);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export async function updateFreelancerHandler(req: Request, res: Response) {
    try {
        const userId = (req.session as any).userId;
        const { id } = req.params;
        const freelancer = await freelancerService.updateFreelancer(userId, id, req.body);
        if (!freelancer) {
            return res.status(404).json({ error: "Freelancer not found" });
        }
        res.status(204).json({ success: true });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export async function deleteFreelancerHandler(req: Request, res: Response) {
    try {
        const userId = (req.session as any).userId;
        const { id } = req.params;
        const freelancer = await freelancerService.deleteFreelancer(userId, id);
        if (!freelancer) {
            return res.status(404).json({ error: "Freelancer not found" });
        }
        res.status(204).json({ success: true });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}