import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import {
    createFreelancerHandler,
    listFreelancersHandler,
    getFreelancerByIdHandler,
    updateFreelancerHandler,
    deleteFreelancerHandler,
} from "./freelancers.controller";

const router = Router();

router.use(requireAuth);

router.post("/", createFreelancerHandler);
router.get("/", listFreelancersHandler);
router.get("/:id", getFreelancerByIdHandler);
router.put("/:id", updateFreelancerHandler);
router.delete("/:id", deleteFreelancerHandler);

export default router;
