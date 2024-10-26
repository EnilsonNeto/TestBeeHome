export interface GeneratePasswordRequest {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSpecialChars: boolean;
}

export interface GeneratedPasswordResponse {
    password: string;
}
