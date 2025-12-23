import { useState } from "react";
import PdfPreview from "../components/PdfPreview";
import PdfUploader from "../components/PdfUploader"
import Header from "../components/Header";

export const HomePage = () => {
    const [pdfFile, setPdfFile] = useState<string | null>(null);

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