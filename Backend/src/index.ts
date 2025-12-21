import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import logger from "./utilities/logger";
import { configDB } from "./config/mongoDB";
import { StatusCode } from "./constants/statusCode";
import userRoute from "./routes/user.routes";
import { errorHandler } from "./middlewares/error.middleware";
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

const app = express();
configDB()
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

const allowedOrigins = [
    process.env.CLIENT_URL as string,
    process.env.DEPLOYED_URL as string,
];
console.log("Allowed origin :", allowedOrigins)

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

app.get('/test', (req, res) => {
    res.status(StatusCode.OK).json({ message: "Clipzy PDF backend is running...", success: true })
})

app.use("/", userRoute);

app.use(errorHandler)

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    logger.info(`Server running on port : http://localhost:${PORT}/test`);
});
