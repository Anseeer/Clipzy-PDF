import dotenv from "dotenv"
import mongoose from "mongoose";
import logger from "../utilities/logger";
import { COMMON_MESSAGE } from "../constants/messages";

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

export const configDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        await mongoose.connect(mongoURI as string)
        logger.info(COMMON_MESSAGE.DB_CONNECTION_SUCCESS);
    } catch (error) {
        logger.error(COMMON_MESSAGE.DB_CONNECTION_FAILD, error);
    }
}