export interface PasswordHistoryEntry {
    password: string;
    generatedAt: string;
}

export interface PasswordHistoryResponse {
    history: PasswordHistoryEntry[];
}
