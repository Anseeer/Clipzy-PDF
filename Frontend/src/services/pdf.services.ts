import api from "../configs/axios";
import { API } from "../constants/api.routes";

export const uploads = async (file: File) => {
    if (!file) {
        throw new Error("file not get")
    }
    const formData = new FormData();
    formData.append("pdf", file);
    const response = await api.post(API.PDF.UPLOADS, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

export const extractPdfPages = async (filename: string, pages: number[]) => {
    const response = await api.post(API.PDF.EXTRACTS, { filename, pages });
    return response.data;
};

export const getFile = async (filename: string) => {
    return await api.get(`${API.PDF.FILES}/${filename}`);
}

export const downloadPdf = async (filename: string): Promise<Blob> => {
    const response = await api.get(`${API.PDF.FILES}/${filename}`, { responseType: "blob", });
    return response.data;
};
