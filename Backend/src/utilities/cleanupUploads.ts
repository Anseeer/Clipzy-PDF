import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
const MAX_AGE = 1 * 60 * 60 * 1000;

export const cleanupUploads = () => {
    fs.readdir(UPLOAD_DIR, (err, files) => {
        if (err) return;

        files.forEach((file) => {
            const filePath = path.join(UPLOAD_DIR, file);

            fs.stat(filePath, (err, stats) => {
                if (err) return;

                const now = Date.now();
                const fileAge = now - stats.mtime.getTime();

                if (fileAge > MAX_AGE) {
                    fs.unlink(filePath, () => { });
                }
            });
        });
    });
};
