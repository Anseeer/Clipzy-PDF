import jwt, { Secret } from "jsonwebtoken";

export const generateAccessToken = (id: string): string => {
    const secret: Secret = process.env.JWT_ACCESS_SECRET as string;
    const expiresIn = (process.env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions['expiresIn']) || '1d';

    return jwt.sign({ id }, secret, { expiresIn });
};

export const generateRefreshToken = (id: string): string => {
    const secret: Secret = process.env.JWT_REFRESH_SECRET as string;
    const expiresIn = (process.env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn']) || '1d';

    return jwt.sign({ id }, secret, { expiresIn });
};
