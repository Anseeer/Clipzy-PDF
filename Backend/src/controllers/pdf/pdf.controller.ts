import { NextFunction, Request, Response } from "express";
import logger from "../../utilities/logger";
import { ErrorResponse, SuccessResponse } from "../../utilities/response";
import { StatusCode } from "../../constants/statusCode";
import { IPdfController } from "./pdf.controller.interface";
import { IPdfService } from "../../services/pdf/pdf.service.interface";
import path from "path";
import fs from "fs";
import { COMMON_MESSAGE } from "../../constants/messages";

export class PdfController implements IPdfController {

    private _pdfService: IPdfService;

    constructor(pdfServ: IPdfService) {
        this._pdfService = pdfServ;
    }

    uploads = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!req.file) {
                throw new Error(COMMON_MESSAGE.PDF_NOT_FOUND);
            }

            const result = await this._pdfService.uploads(req.file);

            const response = new SuccessResponse(
                StatusCode.OK,
                COMMON_MESSAGE.PDF_UPLOADED_SUCCESSFULL,
                result
            );

            res.status(StatusCode.OK).json(response);

        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            next(new ErrorResponse(errMsg, StatusCode.BAD_REQUEST));
        }
    };

    getFiles = async (req: Request, res: Response): Promise<void> => {
        const { filename } = req.params;

        const filePath = path.join(process.cwd(), "uploads", filename as string);

        if (!fs.existsSync(filePath)) {
            res.status(404).json({ message: COMMON_MESSAGE.FILE_NOT_FOUND });
            return;
        }

        res.sendFile(filePath);
    };


    extractPages = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { filename, pages } = req.body;

            if (!filename || !pages || pages.length === 0) {
                return res.status(400).json({ status: 400, message: COMMON_MESSAGE.FILE_NAME_AND_PAGES_ARE_REQUIRED });
            }

            const result = await this._pdfService.extractPages(filename, pages);

            res.status(200).json({
                status: 200,
                message: COMMON_MESSAGE.PDF_EXTRACTED_SUCCESSFULL,
                data: result,
            });

        } catch (err) {
            next(err);
        }
    };
}
