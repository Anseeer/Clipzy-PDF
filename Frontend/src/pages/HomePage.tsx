import { useState } from "react";
import PdfPreview from "../components/PdfPreview.tsx";
import PdfUploader from "../components/PdfUploader.tsx"
import Header from "../components/Header.tsx";

export const HomePage = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    return (
        <>
            <Header />
            {pdfFile ? (
                <PdfPreview onReset={() => setPdfFile(null)} file={pdfFile} />
            ) : (
                <PdfUploader onPdfSelect={setPdfFile} />
            )}
        </>
    )
}