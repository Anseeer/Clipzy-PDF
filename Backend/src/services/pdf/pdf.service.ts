import path from "path";
import fs from "fs";
import logger from "../../utilities/logger";
import { IPdfService } from "./pdf.service.interface";
import { PDFDocument } from "pdf-lib";
import { COMMON_MESSAGE } from "../../constants/messages";

export class PdfService implements IPdfService {

    constructor() { }

    uploads = async (file: Express.Multer.File): Promise<{ filename: string }> => {
        try {
            return {
                filename: file.filename,
            };
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error);
            logger.error(errMsg);
            throw new Error(errMsg);
        }
    };

    extractPages = async (filename: string, pages: number[]) => {
        const filePath = path.join(process.cwd(), "uploads", filename as string);

        if (!fs.existsSync(filePath)) throw new Error(COMMON_MESSAGE.FILE_NOT_FOUND);

        const existingPdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const newPdfDoc = await PDFDocument.create();

        const copiedPages = await newPdfDoc.copyPages(pdfDoc, pages);
        copiedPages.forEach((page) => newPdfDoc.addPage(page));

        const newFilename = `extracted-${Date.now()}-${filename}`;
        const newFilePath = path.join(process.cwd(), "uploads", newFilename);

        const pdfBytes = await newPdfDoc.save();
        fs.writeFileSync(newFilePath, pdfBytes);

        return { filename: newFilename };
    };
}
