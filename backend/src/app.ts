// src/app.ts
import express from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session store using Postgres
const PgStore = connectPgSimple(session);

if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET must be set");
}

app.set("trust proxy", 1); // if behind proxy (load balancer)

app.use(
    session({
        store: new PgStore({
            tableName: "session"
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 8 // 8 hours; tune as needed
        }
    })
);

// routes
app.use("/api/auth", authRoutes);

// health
app.get("/health", (req, res) => res.json({ ok: true }));

export default app;
