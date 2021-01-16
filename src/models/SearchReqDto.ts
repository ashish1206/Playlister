export interface SearchReqDto {
    q: string;
    type: string;
    market?: any[];
    limit?: number;
    offset?: number;
    include_external?: string;
}