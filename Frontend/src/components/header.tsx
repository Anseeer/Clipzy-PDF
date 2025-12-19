import { FileText } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/user.services";
import { logoutSuccess } from "../store/user.slice";
import toast from "react-hot-toast";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const authenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await logout();
            await dispatch(logoutSuccess());
            toast.success("Logout successfull")
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
            toast.error("Logout faild")
        }
    }

    return (
        <>
            < nav className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50" >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div
                            onClick={() => navigate('/')}
                            className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-600 to-pink-800 flex items-center cursor-pointer justify-center shadow-lg">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">Clipzy</span>
                        </div>

                        {!authenticated ? (
                            <div className="hidden md:flex items-center space-x-8">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="cursor-pointer px-5 py-2 rounded-lg border border-pink-800 text-pink-800 font-semibold hover:bg-pink-50 transition">
                                    Sign In
                                </button>
                                <button
                                    onClick={() => navigate('/register')}
                                    className="cursor-pointer px-5 py-2 rounded-lg bg-pink-900 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                    Get Started
                                </button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-8">
                                <button
                                    onClick={handleLogout}
                                    className="px-5 py-2 rounded-lg border border-pink-800 text-pink-800 font-semibold hover:bg-pink-50 transition">
                                    Logout
                                </button>
                            </div>
                        )}

                        <button
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Mobile Menu */}
                {isMenuOpen && (
                    !authenticated ? (
                        <div className="md:hidden bg-white border-t border-pink-100">
                            <div className="px-4 py-4 space-y-3">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="cursor-pointer w-full px-5 py-2 rounded-lg border border-pink-800 text-pink-800 font-semibold"
                                >
                                    Sign In
                                </button>

                                <button
                                    onClick={() => navigate('/register')}
                                    className="cursor-pointer w-full px-5 py-2 rounded-lg bg-pink-900 text-white font-semibold"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="md:hidden bg-white border-t border-pink-100">
                            <div className="px-4 py-4 space-y-3">
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer w-full px-5 py-2 rounded-lg border border-pink-800 text-pink-800 font-semibold"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )
                )}
            </nav >
        </>
    );
};

export default Header;
