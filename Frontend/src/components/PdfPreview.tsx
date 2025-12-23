/* eslint-disable no-console */
import { Document, Page } from "react-pdf";
import { useState } from "react";
import toast from "react-hot-toast";
import { downloadPdf, extractPdfPages } from "../services/pdf.services";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

type Props = {
    file: string | null;
    onReset: () => void;
};

const PdfPreview = ({ file, onReset }: Props) => {
    const [numPages, setNumPages] = useState<number>(0);
    const [selectedPages, setSelectedPages] = useState<number[]>([]);

    const pdfUrl = file ? `${import.meta.env.VITE_API_URL}/pdf/files/${file}` : null;

    const togglePageSelection = (pageIndex: number) => {
        setSelectedPages((prev) =>
            prev.includes(pageIndex)
                ? prev.filter((p) => p !== pageIndex)
                : [...prev, pageIndex]
        );
    };

    const handleExtract = async () => {
        if (selectedPages.length === 0 || !file) {
            toast.error("Please select at least one page");
            return;
        }

        try {
            const result = await extractPdfPages(file, selectedPages);

            const blob = await downloadPdf(result.data.filename);

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = result.data.filename;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success("PDF downloaded successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Extraction failed");
        }
    };


    if (!file || !pdfUrl) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white pb-6">
            <header className="sticky top-0 z-50 bg-white border-b border-red-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-sm gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <button
                        onClick={onReset}
                        className="text-sm font-medium text-gray-500 hover:text-[#7E0222] transition-colors"
                    >
                        ← Back to Upload
                    </button>
                    <h3 className="text-lg font-bold text-gray-900 break-words">{file}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 sm:mt-0">
                    <span className="text-sm text-gray-600 font-medium">
                        {selectedPages.length} pages selected
                    </span>
                    <button
                        onClick={handleExtract}
                        disabled={selectedPages.length === 0}
                        className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all ${selectedPages.length > 0
                            ? "bg-[#7E0222] text-white hover:bg-[#63021b] shadow-md"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Extract New PDF
                    </button>
                </div>
            </header>

            <div className="max-w-6xl mx-auto p-8">
                <Document
                    file={pdfUrl}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    onLoadError={() => toast.error("Error loading PDF")}
                >
                    <div className="grid gap-8 justify-center
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4"
                    >
                        {Array.from(new Array(numPages), (_, index) => {
                            const isSelected = selectedPages.includes(index);

                            return (
                                <div
                                    key={index}
                                    onClick={() => togglePageSelection(index)}
                                    className="flex flex-col items-center cursor-pointer group"
                                >
                                    <div
                                        className={`relative transition-all duration-200 transform hover:scale-[1.02] 
                          ${isSelected
                                                ? "ring-4 ring-[#7E0222] ring-offset-4 rounded-sm"
                                                : "hover:ring-2 hover:ring-gray-300"
                                            }`}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 z-10 bg-[#7E0222] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                                                {selectedPages.indexOf(index) + 1}
                                            </div>
                                        )}

                                        <Page
                                            pageNumber={index + 1}
                                            width={250}
                                            renderAnnotationLayer={false}
                                            renderTextLayer={false}
                                            className="shadow-lg border border-gray-200 bg-white"
                                        />
                                    </div>
                                    <span
                                        className={`mt-3 text-sm font-semibold ${isSelected ? "text-[#7E0222]" : "text-gray-500"
                                            }`}
                                    >
                                        Page {index + 1}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </Document>
            </div>

        </div>
    );
};

export default PdfPreview;
