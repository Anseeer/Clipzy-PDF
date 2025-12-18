export interface UserResponseDTO {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

export interface UserEntityDTO {
    name: string;
    email: string;
    password: string;
}
