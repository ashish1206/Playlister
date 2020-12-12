import { Apis } from './../constants/SpotifyApis';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiCallService {

    constructor(){ }

    public clientAuthentication = (credentials: string): Promise<AxiosResponse> => {
        const config:AxiosRequestConfig  = {
            headers: { 
                'Authorization' : `Basic ${credentials}`, 
                'Content-Type': 'application/x-www-form-urlencoded' 
            }
        }
        const data = 'grant_type=client_credentials';
        return Axios.post(Apis.clientAuthApi, data, config);
    }
    
}