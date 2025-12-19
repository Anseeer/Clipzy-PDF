import { FileText } from "lucide-react"

const Footer = () => {
    return (
        <>
            <footer className="bg-pink-900 text-gray-300 py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-600 to-pink-800 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-bold text-white">Clipzy</span>
                            </div>
                            <p className="text-sm">
                                Making PDF extraction simple and effortless.
                            </p>
                        </div>

                    </div>

                    <div className="border-t border-pink-800 pt-6 text-center text-sm">
                        <p>&copy; 2024 Clipzy. All rights reserved.</p>
                    </div>

                </div>
            </footer>
        </>
    )
}

export default Footer;