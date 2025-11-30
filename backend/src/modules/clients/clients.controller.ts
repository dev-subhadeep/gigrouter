import { Request, Response } from "express";
import * as clientService from "./clients.service";

/** ✅ CREATE */
export async function createClientHandler(req: Request, res: Response) {
    try {
        const userId = (req.session as any).userId;

        const client = await clientService.createClient(userId, req.body);
        res.status(201).json(client);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

/** ✅ LIST */
export async function listClientsHandler(req: Request, res: Response) {
    const userId = (req.session as any).userId;
    const clients = await clientService.listClients(userId);
    res.json(clients);
}

/** ✅ GET ONE */
export async function getClientHandler(req: Request, res: Response) {
    const userId = (req.session as any).userId;
    const { id } = req.params;

    const client = await clientService.getClientById(userId, id);

    if (!client) {
        return res.status(404).json({ error: "Client not found" });
    }

    res.json(client);
}

/** ✅ UPDATE */
export async function updateClientHandler(req: Request, res: Response) {
    const userId = (req.session as any).userId;
    const { id } = req.params;

    const client = await clientService.updateClient(userId, id, req.body);

    if (!client) {
        return res.status(404).json({ error: "Client not found" });
    }

    res.json(client);
}

/** ✅ DELETE */
export async function deleteClientHandler(req: Request, res: Response) {
    const userId = (req.session as any).userId;
    const { id } = req.params;

    const client = await clientService.deleteClient(userId, id);

    if (!client) {
        return res.status(404).json({ error: "Client not found" });
    }

    res.json({ success: true });
}
