export interface SearchReqDto {
    searchStr: string;
    type: string;
    market?: any[];
    limit?: number;
    offset?: number;
    include_external?: string;
}