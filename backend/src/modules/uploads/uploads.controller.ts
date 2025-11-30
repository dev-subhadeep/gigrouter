import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { getPresignedPutUrl, getPresignedGetUrl } from "../../libs/s3";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = Number(process.env.MAX_UPLOAD_BYTES || 5 * 1024 * 1024);
const PRESIGN_EXPIRES = Number(process.env.PRESIGN_EXPIRES_SECONDS || 300);

export async function presignHandler(req: Request, res: Response) {
    try {
        const userId = (req.session as any).userId;

        const { filename, contentType } = req.body;

        if (!filename || !contentType) {
            return res.status(400).json({ error: "filename and contentType required" });
        }

        if (!ALLOWED_TYPES.includes(contentType)) {
            return res.status(400).json({ error: "Invalid file type" });
        }

        const ext = filename.split(".").pop();
        const key = `freelancers/${userId}/${uuidv4()}.${ext}`;

        const uploadUrl = await getPresignedPutUrl(
            key,
            contentType,
            PRESIGN_EXPIRES
        );

        console.log("AWS CHECK:", {
            access: process.env.AWS_ACCESS_KEY_ID,
            secret: process.env.AWS_SECRET_ACCESS_KEY?.slice(0, 6),
            region: process.env.AWS_REGION,
            bucket: process.env.AWS_S3_BUCKET
        });


        return res.json({
            uploadUrl,
            key,
            expiresIn: PRESIGN_EXPIRES
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to generate presigned URL" });
    }
}

export async function getDownloadUrlHandler(req: Request, res: Response) {
    try {
        const userId = (req.session as any).userId;
        const key = req.query.key as string;

        if (!key) return res.status(400).json({ error: "Missing key" });

        if (!key.startsWith(`freelancers/${userId}/`)) {
            return res.status(403).json({ error: "Forbidden" });
        }

        const signedUrl = await getPresignedGetUrl(key, 600);

        return res.json({
            url: signedUrl,
            expiresIn: 600
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to generate download URL" });
    }
}
