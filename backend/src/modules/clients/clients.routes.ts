import { Router } from "express";
import {
    createClientHandler,
    listClientsHandler,
    getClientHandler,
    updateClientHandler,
    deleteClientHandler,
} from "./clients.controller";
import { requireAuth } from "../../middleware/requireAuth";

const router = Router();

router.use(requireAuth);

router.post("/", createClientHandler);
router.get("/", listClientsHandler);
router.get("/:id", getClientHandler);
router.put("/:id", updateClientHandler);
router.delete("/:id", deleteClientHandler);

export default router;
