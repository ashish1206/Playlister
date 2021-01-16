import BuildUrl from 'build-url';
import { Apis } from './../constants/ApisConstants';
import { SearchReqDto } from '../models/SearchReqDto';
import { ApiCallService } from './ApiCallService';

export class SearchService {
    private apiCallService: ApiCallService;

    constructor() {
        this.apiCallService = new ApiCallService();
    }

    public searchItem = async (data: any, searchReqDto: SearchReqDto): Promise<any> => {
        searchReqDto.q += this.getSearchQuery(data);
        const url = BuildUrl(Apis.searchApi, {
            queryParams: {
                q: searchReqDto.q,
                type: searchReqDto.type,
            }
        });
        let res = await this.apiCallService.get(url);
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