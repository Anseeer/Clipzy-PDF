import express from "express";
import { PdfService } from "../services/pdf/pdf.service";
import { PdfController } from "../controllers/pdf/pdf.controller";
import { upload } from "../config/multer";
import { auth } from "../middlewares/auth.middleware";

const Router = express.Router();

const pdfService = new PdfService();
const pdfController = new PdfController(pdfService);

Router.post("/uploads", auth, upload.single("pdf"), pdfController.uploads);
Router.get("/files/:filename", pdfController.getFiles);
Router.post("/extract", auth, pdfController.extractPages);

export default Router;
