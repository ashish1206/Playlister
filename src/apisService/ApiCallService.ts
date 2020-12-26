import { SearchReqDto } from './../models/SearchReqDto';
import { Apis } from './../constants/SpotifyApis';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import clientAccessToken from './../shared/ClientAccessToken'

export class ApiCallService {

    private axiosConfig?: AxiosRequestConfig;

    constructor(){ }
    
    private getHeader = (): AxiosRequestConfig => {
        return this.axiosConfig = {
            headers: {
                'Authorization' : `Bearer ${clientAccessToken.access_token}`, 
                'Content-Type': 'application/json' 
            }
        }
    }

    public searchItems = (searchReqDto: SearchReqDto): Promise<AxiosResponse> => {
        const searchUri = Apis.searchApi + searchReqDto.searchStr;
        return Axios.get(searchUri, this.getHeader());
    }

    public getTrackDetails = (trackId: string): Promise<AxiosResponse> => {
        const trackDetailUri = Apis.trackApi + trackId;
        return Axios.get(trackDetailUri, this.getHeader());
    }

    public getAudioFeatures = (trackIds: string): Promise<AxiosResponse> => {
        const audioFeatureUri = Apis.audioFeatures + trackIds;
        return Axios.get(audioFeatureUri, this.getHeader());
    }
}