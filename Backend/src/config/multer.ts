import multer from "multer";
import { COMMON_MESSAGE } from "../constants/messages";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error(COMMON_MESSAGE.ONLY_PDF_ALLOWED));
    } else {
      cb(null, true);
    }
  },
});
