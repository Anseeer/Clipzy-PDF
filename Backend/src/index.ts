import express, { urlencoded } from "express";
import cors from "cors"
import dotenv from "dotenv"
import logger from "./utilities/logger";
import { configDB } from "./config/mongoDB";
import { StatusCode } from "./constants/statusCode";
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

const app = express();
configDB()
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get('/test', (req, res) => {
    res.status(StatusCode.OK).json({ message: "Clipzy PDF backend is running...", success: true })
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    logger.info(`Server running on port : http://localhost:${PORT}/test`);
});
