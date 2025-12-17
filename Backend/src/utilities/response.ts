
export class errorResponse<T> extends Error {
    public statusCode: number;
    public data: T;
    constructor(message?: string, statusCode?: number, data?: T) {
        super(message);
        this.statusCode = statusCode as number;
        this.data = data as T;
    }
}

export class successResponse<T> {
    constructor(public status: number, public message: string, public data: T) {

    }
}
