import { SearchReqDto } from './../models/SearchReqDto';
import { ApiCallService } from './ApiCallService';

export class SearchService {
    private apiCallService: ApiCallService;

    constructor() {
        this.apiCallService = new ApiCallService();
    }

    public searchItem = async (data: any, searchReqDto: SearchReqDto): Promise<any> => {
        for(let prop in data){
            searchReqDto.searchStr += prop + "=" + data[prop] + " ";
        }
        searchReqDto.searchStr.trim();
        searchReqDto.searchStr += '&type=' + searchReqDto.type
        searchReqDto.searchStr = encodeURI(searchReqDto.searchStr);
        let res = await this.apiCallService.searchItems(searchReqDto);
        return res.data;
    }
}