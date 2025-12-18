const Header = () => {
    return (
        <header className="w-full bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

                {/* Logo + Name */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-700 to-pink-900 flex items-center justify-center shadow-md">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </div>

                    <span className="text-2xl font-bold text-gray-900 tracking-tight">
                        Clipzy
                    </span>
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-4">
                    <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                        Login
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-pink-900 text-white text-sm font-semibold shadow hover:shadow-lg transition">
                        Sign Up
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Header;
