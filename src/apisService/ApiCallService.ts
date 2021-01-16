import { ClientAuthService } from './ClientAuthService';
import { SearchReqDto } from '../models/SearchReqDto';
import { Apis } from '../constants/ApisConstants';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiCallService {

    private clientAuthService: ClientAuthService;
    constructor(){ 
        this.clientAuthService = new ClientAuthService();
    }
    
    private getHeader = async (): Promise<AxiosRequestConfig> => {
        const clientAccessToken: string = await this.clientAuthService.getAccessToken();
        return {
            headers: {
                'Authorization' : `Bearer ${clientAccessToken}`, 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    }

    private getUserResHeader = (access_token: string): AxiosRequestConfig => {
        return {
            headers: {
                'Authorization' : `Bearer ${access_token}`, 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    }

    public get = async (url: string): Promise<AxiosResponse> => {
        let header: AxiosRequestConfig = await this.getHeader();
        return Axios.get(url, header);
    }

    public getWithoutHeader = (url: string): Promise<AxiosResponse> => {
        return Axios.get(url);
    }

    public getWithUserHeader = (url: string, access_token: string): Promise<AxiosResponse> => {
        return Axios.get(url, this.getUserResHeader(access_token));
    }

    public postWithUserHeader = (url: string, access_token: string, data: any): Promise<AxiosResponse> => {
        return Axios.post(url, data, this.getUserResHeader(access_token));
    }

}