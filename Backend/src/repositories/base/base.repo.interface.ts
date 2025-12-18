
export interface IWrite<T> {
    create(data: Partial<T>): Promise<T>;
    delete(id: string): Promise<boolean>;
}

export interface IRead<T> {
    findById(id: string): Promise<T | null>;
    findByEmail(email: string): Promise<T | null>;
}