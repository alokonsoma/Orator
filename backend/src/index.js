// This is the entry point into my App
// Here I load environment variables, connect to DB and start the server. Nothing else!

import app from "./app.js";
import connectDB from "./db/connect.js";
import { env } from "./config/env.js";

const PORT = env.PORT;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
