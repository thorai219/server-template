import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "routes";
import { errorHandler } from "middleware/errorHandler";
import { logger } from "services/logger";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan("dev", {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);

// Routes
app.use("/api", routes);

// Error handling
app.use(errorHandler);

export default app;
