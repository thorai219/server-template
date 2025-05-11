import { AppDataSource } from "./config/database";
import { logger } from "services/logger";
import app from "./app";

AppDataSource.initialize()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    logger.error("Failed to start DB", error);
    process.exit(1);
  });
