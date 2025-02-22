import "colors";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// local imports
import applicationRoutes from "./routes";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.0.116:3000",
      "https://noyonrahman.xyz",
      "https://portfolio-noyonalways.vercel.app",
      "http://localhost:5173",
      "http://192.168.0.116:5173",
      "https://admin.noyonrahman.xyz",
      "https://admin-portfolio-noyonalways.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  }),
);
app.use(express.json());

// application routes
app.use(applicationRoutes);

export default app;
