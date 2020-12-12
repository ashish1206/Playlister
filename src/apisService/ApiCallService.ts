import { SearchReqDto } from './../models/SearchReqDto';
import { Apis } from './../constants/SpotifyApis';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import clientAccessToken from './../shared/ClientAccessToken'

export class ApiCallService {

    private axiosConfig?: AxiosRequestConfig;

    constructor(){ }
    
    public searchItems = (searchReqDto:SearchReqDto): Promise<any> => {
        const searchUri = Apis.searchApi + searchReqDto.searchStr;
        return Axios.get(searchUri, this.getHeader());
    }

    private getHeader = (): AxiosRequestConfig => {
        return this.axiosConfig = {
            headers: {
                'Authorization' : `Bearer ${clientAccessToken.access_token}`, 
                'Content-Type': 'application/json' 
            }
        }
    }
}