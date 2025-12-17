import dotenv from "dotenv"
import mongoose from "mongoose";
import logger from "../utilities/logger";

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

export const configDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        await mongoose.connect(mongoURI as string)
        logger.info("DB connected successfully..");
    } catch (error) {
        logger.info("DB faild to connect", error);
    }
}