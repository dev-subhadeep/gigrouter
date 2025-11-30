import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { presignHandler, getDownloadUrlHandler } from "./uploads.controller";

const router = Router();

router.use(requireAuth);

router.post("/presign", presignHandler);
router.get("/download", getDownloadUrlHandler);

export default router;
