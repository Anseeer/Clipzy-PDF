
export interface IPdfService {
    uploads(file: Express.Multer.File): Promise<{ filename: string }>;
    extractPages(filename: string, pages: number[]): Promise<{ filename: string }>;
}
