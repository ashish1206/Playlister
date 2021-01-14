import { SearchReqDto } from './../models/SearchReqDto';
import { ApiCallService } from './ApiCallService';

export class SearchService {
    private apiCallService: ApiCallService;

    constructor() {
        this.apiCallService = new ApiCallService();
    }

    public searchItem = async (data: any, searchReqDto: SearchReqDto): Promise<any> => {
        searchReqDto.searchStr += this.getSearchQuery(data);
        searchReqDto.searchStr += this.getQueryParams(searchReqDto);
        searchReqDto.searchStr = encodeURI(searchReqDto.searchStr);
        let res = await this.apiCallService.searchItems(searchReqDto);
        return res.data;
    }

    private getSearchQuery = (data: any): string => {
        let searchQuery: string = '';
        for(let prop in data){
            searchQuery += prop + ":" + data[prop] + " ";
        }
        searchQuery.trim();
        return searchQuery;
    }

    private getQueryParams = (searchReqDto: any): string => {
        let queryParams = '';
        for(const prop in searchReqDto){
            if(prop != 'searchStr' && searchReqDto[prop] !== undefined){
                queryParams += '&' + prop + '=' + searchReqDto[prop];
            }
        }
        return queryParams;
    }
}