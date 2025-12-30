/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Formik, Form, Field } from 'formik';
import { emailRegex, passRegex } from '../constants/regex';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../services/user.services';
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../store/user.slice';
import toast from 'react-hot-toast';

interface FormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const initialValues: FormValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validate = (values: FormValues) => {
        const errors: Partial<FormValues> = {};

        if (!values.name) errors.name = 'Name is required';
        else if (values.name.length < 2) errors.name = 'Name must be at least 2 characters';

        if (!values.email) errors.email = 'Email is required';
        else if (!emailRegex.test(values.email)) errors.email = 'Invalid email address';

        if (!values.password) errors.password = 'Password is required';
        else if (!passRegex.test(values.password))
            errors.password =
                'Password must be at least 6 characters and include a letter, a number, and a special character.';

        if (!values.confirmPassword) errors.confirmPassword = 'Confirm password is required';
        else if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match';

        return errors;
    };

    const handleSubmit = async (values: FormValues) => {
        try {
            setLoading(true)
            const res = await register(values);
            dispatch(registerSuccess(res.data.data));
            toast.success("Registeration success.");
            navigate('/home')
            setLoading(true)
        } catch (err: any) {
            setLoading(false)
            toast.error(err.response?.data?.message || 'Registeration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-2xl">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl p-10">

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-4">
                            <div
                                onClick={() => navigate('/')}
                                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-600 to-pink-800 flex items-center justify-center shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900">Clipzy</h1>
                        <p className="text-gray-600">PDF Extractor</p>
                        <p className="text-sm text-gray-500 mt-1">Create your account</p>
                    </div>

                    {/* Form */}
                    <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
                        {({ errors, touched }) => (
                            <Form className="space-y-5">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                        <Field
                                            name="name"
                                            placeholder="John Doe"
                                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${touched.name && errors.name
                                                ? 'border-red-500 focus:ring-red-300'
                                                : 'border-gray-300 focus:ring-pink-400'
                                                }`}
                                        />
                                        {touched.name && errors.name && (
                                            <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${touched.email && errors.email
                                                ? 'border-red-500 focus:ring-red-300'
                                                : 'border-gray-300 focus:ring-pink-400'
                                                }`}
                                        />
                                        {touched.email && errors.email && (
                                            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    {/* Password */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Password
                                        </label>

                                        <div className="relative">
                                            <Field
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                placeholder="••••••••"
                                                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${touched.password && errors.password
                                                    ? 'border-red-500 focus:ring-red-300'
                                                    : 'border-gray-300 focus:ring-pink-400'
                                                    } pr-10`}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                            >
                                                {showPassword ? (
                                                    <EyeIcon className="w-5 h-5" />
                                                ) : (
                                                    <EyeSlashIcon className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>

                                        {touched.password && errors.password && (
                                            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Confirm Password
                                        </label>

                                        <div className="relative">
                                            <Field
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                placeholder="••••••••"
                                                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${touched.confirmPassword && errors.confirmPassword
                                                    ? 'border-red-500 focus:ring-red-300'
                                                    : 'border-gray-300 focus:ring-pink-400'
                                                    } pr-10`}
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeIcon className="w-5 h-5" />
                                                ) : (
                                                    <EyeSlashIcon className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>

                                        {touched.confirmPassword && errors.confirmPassword && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.confirmPassword}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-lg bg-pink-900 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                >
                                    {loading ? 'Creating...' : 'Create Account'}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{' '}
                        <a onClick={() => navigate('/login')} className="font-semibold text-pink-900 hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;