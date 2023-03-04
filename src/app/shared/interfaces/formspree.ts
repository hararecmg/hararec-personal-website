export interface FormspreeRequest {
    name: string,
    email: string,
    message: string
}

export interface FormspreeResponse {
    next: string;
    ok: boolean;
}