import { NextFunction, Request, Response } from "express";

export interface IPdfController {
    uploads(req: Request, res: Response, next: NextFunction): Promise<void>;
}