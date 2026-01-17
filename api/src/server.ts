import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
dotenv.config();

const app = express();

app.use(cors());

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
