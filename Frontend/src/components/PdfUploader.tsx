import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
    onPdfSelect: (file: File) => void;
};

const PdfUploader: React.FC<Props> = ({ onPdfSelect }) => {
    const [dragActive, setDragActive] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFile = (file: File) => {
        if (file.type !== "application/pdf") {
            toast.error("Only PDF files are allowed");
            return;
        }

        setIsProcessing(true);

        setTimeout(() => {
            onPdfSelect(file);
            setIsProcessing(false);
        }, 300);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        handleFile(e.target.files[0]);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
            <div style={{ maxWidth: "48rem", margin: "auto auto" }}>
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <h2
                        style={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            color: "#111827",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Upload Your PDF
                    </h2>
                    <p style={{ color: "#6b7280", fontSize: "1rem" }}>
                        Upload a PDF file and preview its pages
                    </p>
                </div>

                {/* Drop Zone */}
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("fileInput")?.click()}
                    style={{
                        border: dragActive
                            ? "2px dashed #7E0222"
                            : "2px dashed #d1d5db",
                        borderRadius: "1rem",
                        padding: "3rem 2rem",
                        textAlign: "center",
                        backgroundColor: dragActive ? "#fef2f2" : "#f9fafb",
                        transition: "all 0.3s",
                        cursor: "pointer",
                    }}
                >
                    {isProcessing ? (
                        <>
                            <div
                                style={{
                                    width: "3rem",
                                    height: "3rem",
                                    border: "4px solid #e5e7eb",
                                    borderTopColor: "#7E0222",
                                    borderRadius: "50%",
                                    margin: "0 auto 1rem",
                                    animation: "spin 1s linear infinite",
                                }}
                            />
                            <p style={{ color: "#6b7280" }}>Processing your PDF...</p>
                        </>
                    ) : (
                        <>
                            <svg
                                style={{
                                    width: "4rem",
                                    height: "4rem",
                                    color: "#7E0222",
                                    margin: "0 auto 1rem",
                                }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>

                            <p
                                style={{
                                    fontSize: "1.125rem",
                                    fontWeight: 600,
                                    color: "#111827",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                Drag and drop your PDF here
                            </p>
                            <p
                                style={{
                                    fontSize: "0.875rem",
                                    color: "#6b7280",
                                    marginBottom: "1rem",
                                }}
                            >
                                or click to browse
                            </p>

                            <button
                                type="button"
                                style={{
                                    padding: "0.75rem 2rem",
                                    backgroundColor: "#7E0222",
                                    color: "#ffffff",
                                    borderRadius: "0.5rem",
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                    fontWeight: 600,
                                }}
                            >
                                Choose File
                            </button>
                        </>
                    )}

                    <input
                        id="fileInput"
                        type="file"
                        accept="application/pdf"
                        onChange={handleChange}
                        style={{ display: "none" }}
                    />
                </div>
            </div>
        </main>
    );
};

export default PdfUploader;
