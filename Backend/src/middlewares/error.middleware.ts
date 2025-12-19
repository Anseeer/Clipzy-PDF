import { NextFunction, Request, Response } from "express";
import logger from "../utilities/logger";
import { StatusCode } from "../constants/statusCode";
import { ErrorResponse } from "../utilities/response";
import { COMMON_MESSAGE } from "../constants/messages";

export const errorHandler = (
    err: ErrorResponse<unknown>,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    const status = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
    const message = err.message || COMMON_MESSAGE.INTERNAL_SERVER_ERROR;

    logger.error(`[${req.method}] ${req.originalUrl} → ${message}`);

    res.status(status).json({
        success: false,
        message,
        statusCode: status,
        data: err.data || null,
    });
};