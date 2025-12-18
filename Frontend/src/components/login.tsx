/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { emailRegex, passRegex } from '../constants/regex';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/user.services';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/user.slice';
import toast from 'react-hot-toast';

interface FormErrors {
    email?: string;
    password?: string;
}

interface FormValues {
    email: string;
    password: string;
}

interface FormTouched {
    email: boolean;
    password: boolean;
}

export const LoginForm = () => {
    const [values, setValues] = useState<FormValues>({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<FormTouched>({
        email: false,
        password: false,
    });

    const validateEmail = (email: string) => {
        if (!email) return 'Email is required';
        if (!emailRegex.test(email)) return 'Invalid email address';
    };

    const validatePassword = (password: string) => {
        if (!password) return 'Password is required';
        if (!passRegex.test(password)) return 'Password must be at least 6 characters and include a letter, a number, and a special character.';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));

        const newErrors: FormErrors = { ...errors };
        if (name === 'email') newErrors.email = validateEmail(values.email);
        if (name === 'password') newErrors.password = validatePassword(values.password);
        setErrors(newErrors);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ email: true, password: true });

        const newErrors = {
            email: validateEmail(values.email),
            password: validatePassword(values.password),
        };
        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {
            try {
                const res = await login(values);
                dispatch(loginSuccess(res.data.data));
                toast.success("Login success.");
                navigate('/home')
            } catch (err: any) {
                toast.error(err.response?.data?.message || 'Login failed');
            }
        }
    };

    return (
        <div className="min-h-screen m-5 flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md">
                {/* Form Card */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl p-10">
                    {/* Header */}
                    <div className="text-center mb-5">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-600 to-pink-800 flex items-center justify-center shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900">Clipzy</h1>
                        <p className="text-gray-600">PDF Extractor</p>
                        <p className="text-sm text-gray-500 mt-2">Sign in to your account</p>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="you@example.com"
                                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 
                ${errors.email && touched.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-pink-400'}`}
                            />
                            {touched.email && errors.email && (
                                <p className="text-sm text-red-600 mt-2">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 
                ${errors.password && touched.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-pink-400'}`}
                            />
                            {touched.password && errors.password && (
                                <p className="text-sm text-red-600 mt-2">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex justify-between items-center text-sm">
                            <a href="#" className="font-medium text-pink-800 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-pink-900 text-white font-semibold shadow-lg
              hover:shadow-xl hover:-translate-y-0.5 transition-all"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Signup */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don’t have an account?{' '}
                        <a
                            onClick={() => navigate("/register")}
                            className="font-semibold text-pink-900 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

