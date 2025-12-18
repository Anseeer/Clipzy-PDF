
export class ErrorResponse<T = null> extends Error {
    public statusCode: number;
    public data?: T;

    constructor(
        message: string,
        statusCode: number = 500,
        data?: T
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = data as T;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class SuccessResponse<T> {
    constructor(public status: number, public message: string, public data: T) {

    }
}
