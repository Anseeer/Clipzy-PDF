
import React, { useState } from 'react';
import { logout } from '../services/user.services';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../store/user.slice';
import toast from 'react-hot-toast';

interface PageData {
    pageNumber: number;
    imageUrl: string;
}

const Home: React.FC = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pages, setPages] = useState<PageData[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const dispatch = useDispatch()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
            processPDF(file);
        } else {
            alert('Please upload a valid PDF file');
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
            processPDF(file);
        } else {
            alert('Please upload a valid PDF file');
        }
    };

    const processPDF = async (_file: File) => {
        setIsProcessing(true);

        // Simulate PDF processing - In real app, you'd use PDF.js or similar library
        setTimeout(() => {
            // Mock data - generating sample pages
            const mockPages: PageData[] = Array.from({ length: 5 }, (_, i) => ({
                pageNumber: i + 1,
                imageUrl: `https://via.placeholder.com/600x800/f3f4f6/7E0222?text=Page+${i + 1}`
            }));

            setPages(mockPages);
            setIsProcessing(false);
        }, 2000);
    };

    const handleRemovePage = (pageNumber: number) => {
        setPages(pages.filter(page => page.pageNumber !== pageNumber));
    };

    const handleReset = () => {
        setPdfFile(null);
        setPages([]);
    };

    const handleLogout = async () => {
        await logout()
        dispatch(logoutSuccess());
        toast.success('Logout success.')
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <button
                style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: '#cc264fff',
                    color: '#ffffff',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 6px -1px rgba(126, 2, 34, 0.2)'
                }}
                onClick={() => handleLogout()}
            >LogOut</button>

            {/* Main Content */}
            <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem' }}>
                {pages.length === 0 ? (
                    // Upload Section
                    <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                                Upload Your PDF
                            </h2>
                            <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                                Upload a PDF file and we'll extract each page separately
                            </p>
                        </div>

                        {/* Drop Zone */}
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            style={{
                                border: dragActive ? '2px dashed #7E0222' : '2px dashed #d1d5db',
                                borderRadius: '1rem',
                                padding: '3rem 2rem',
                                textAlign: 'center',
                                backgroundColor: dragActive ? '#fef2f2' : '#f9fafb',
                                transition: 'all 0.3s',
                                cursor: 'pointer'
                            }}
                            onClick={() => document.getElementById('fileInput')?.click()}
                        >
                            {isProcessing ? (
                                <div>
                                    <div style={{
                                        width: '3rem',
                                        height: '3rem',
                                        border: '4px solid #e5e7eb',
                                        borderTopColor: '#7E0222',
                                        borderRadius: '50%',
                                        margin: '0 auto 1rem',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                    <p style={{ color: '#6b7280', fontSize: '1rem' }}>Processing your PDF...</p>
                                </div>
                            ) : (
                                <>
                                    <svg
                                        style={{ width: '4rem', height: '4rem', color: '#7E0222', margin: '0 auto 1rem' }}
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
                                    <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                                        Drag and drop your PDF here
                                    </p>
                                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                                        or click to browse
                                    </p>
                                    <button
                                        style={{
                                            padding: '0.75rem 2rem',
                                            backgroundColor: '#7E0222',
                                            color: '#ffffff',
                                            borderRadius: '0.5rem',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            boxShadow: '0 4px 6px -1px rgba(126, 2, 34, 0.2)'
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
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>

                        {pdfFile && (
                            <div style={{
                                marginTop: '1.5rem',
                                padding: '1rem',
                                backgroundColor: '#f3f4f6',
                                borderRadius: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <svg style={{ width: '2rem', height: '2rem', color: '#7E0222' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <div>
                                        <p style={{ fontWeight: '600', color: '#111827' }}>{pdfFile.name}</p>
                                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                            {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // Pages Display Section
                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '2rem',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div>
                                <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>
                                    Extracted Pages
                                </h2>
                                <p style={{ color: '#6b7280' }}>
                                    {pages.length} {pages.length === 1 ? 'page' : 'pages'} from {pdfFile?.name}
                                </p>
                            </div>
                            <button
                                onClick={handleReset}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#ffffff',
                                    color: '#7E0222',
                                    border: '2px solid #7E0222',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '600'
                                }}
                            >
                                Upload New PDF
                            </button>
                        </div>

                        {/* Pages Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {pages.map((page) => (
                                <div
                                    key={page.pageNumber}
                                    style={{
                                        backgroundColor: '#ffffff',
                                        borderRadius: '0.75rem',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                        overflow: 'hidden',
                                        border: '1px solid #e5e7eb',
                                        transition: 'transform 0.2s, box-shadow 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                                    }}
                                >
                                    <div style={{ position: 'relative' }}>
                                        <img
                                            src={page.imageUrl}
                                            alt={`Page ${page.pageNumber}`}
                                            style={{ width: '100%', height: 'auto', display: 'block' }}
                                        />
                                        <button
                                            onClick={() => handleRemovePage(page.pageNumber)}
                                            style={{
                                                position: 'absolute',
                                                top: '0.5rem',
                                                right: '0.5rem',
                                                width: '2rem',
                                                height: '2rem',
                                                backgroundColor: '#ffffff',
                                                border: 'none',
                                                borderRadius: '50%',
                                                cursor: 'pointer',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <svg style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p style={{ fontWeight: '600', color: '#111827' }}>Page {page.pageNumber}</p>
                                            <button
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    backgroundColor: '#7E0222',
                                                    color: '#ffffff',
                                                    border: 'none',
                                                    borderRadius: '0.375rem',
                                                    cursor: 'pointer',
                                                    fontSize: '0.875rem',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;