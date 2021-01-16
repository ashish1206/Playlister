import { SearchReqDto } from '../models/SearchReqDto';
import { Apis } from '../constants/ApisConstants';
import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import clientAccessToken from '../shared/ClientAccessToken'

export class ApiCallService {

    constructor(){ }
    
    private getHeader = (): AxiosRequestConfig => {
        return {
            headers: {
                'Authorization' : `Bearer ${clientAccessToken.access_token}`, 
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

    public get = (url: string): Promise<AxiosResponse> => {
        return Axios.get(url, this.getHeader());
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

    public getAudioAnalysis = (trackId: string): Promise<AxiosResponse> => {
        const audioAnalysisUri = Apis.audioAnalysis + trackId;
        return Axios.get(audioAnalysisUri, this.getHeader());
    }

    public getArtistDetails = (id: string, urlType: string): Promise<AxiosResponse> => {
        const artistUri = Apis.artistApi + id + urlType;
        return Axios.get(artistUri, this.getHeader());
    }
}