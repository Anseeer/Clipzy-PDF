import { FileText, Scissors, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ClipzyLanding() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">

            {/* Hero Section */}
            <section className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
                <div className="text-center">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 rounded-full bg-pink-100 text-pink-800 text-sm font-semibold">
                            ✨ Extract, Split & Download PDFs Effortlessly
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                        Your PDF Magic
                        <br />
                        <span className="bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                            Starts Here
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        Extract specific pages from any PDF, create custom documents, and download instantly.
                        No complicated software, just pure simplicity.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => navigate('/register')}
                            className="px-8 py-4 rounded-lg bg-pink-900 text-white font-semibold text-lg shadow-2xl hover:shadow-pink-300 hover:-translate-y-1 transition-all">
                            Start Extracting
                        </button>
                    </div>


                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600">Three simple steps to PDF perfection</p>
                    </div>

                    <div className="mt-16 relative">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto border border-pink-100">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 text-center transform hover:scale-105 transition">
                                    <FileText className="w-12 h-12 text-pink-800 mx-auto mb-3" />
                                    <h3 className="font-bold text-gray-900 mb-2">Upload PDF</h3>
                                    <p className="text-sm text-gray-600">Drag and drop or browse to select your PDF file from your device.</p>
                                </div>
                                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 text-center transform hover:scale-105 transition">
                                    <Scissors className="w-12 h-12 text-pink-800 mx-auto mb-3" />
                                    <h3 className="font-bold text-gray-900 mb-2">Select Pages</h3>
                                    <p className="text-sm text-gray-600">Choose the specific pages you want to extract using our intuitive interface.</p>
                                </div>
                                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 text-center transform hover:scale-105 transition">
                                    <Download className="w-12 h-12 text-pink-800 mx-auto mb-3" />
                                    <h3 className="font-bold text-gray-900 mb-2">Download</h3>
                                    <p className="text-sm text-gray-600">Click download and get your customized PDF file instantly.</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-pink-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-300 rounded-full blur-3xl opacity-40 animate-pulse delay-1000"></div>
                    </div>

                </div>
            </section>
        </div>
    );
}