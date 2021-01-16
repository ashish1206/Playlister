import BuildUrl from 'build-url';
import { Apis } from './../constants/ApisConstants';
import { ApiCallService } from './ApiCallService'

export class TrackService {
    private apiCallService: ApiCallService;
    
    constructor() {
        this.apiCallService = new ApiCallService();
    }

    public getTrackDetails = async (trackId: string): Promise<any> => {
        const url = BuildUrl(Apis.trackApi, {
            path: trackId
        });
        let res: any = await this.apiCallService.get(url);
        return res.data;
    }

    public getAudioFeatures = async (ids: string[]): Promise<any> => {
        let trackIds = "";
        ids.forEach(_=>trackIds+=_);
        const url = BuildUrl(Apis.audioFeatures, {
            queryParams: {
                ids: trackIds
            }
        });
        let res: any = await this.apiCallService.get(url);
        return res.data;
    }

    public getAudioAnalysis = async (trackId: string): Promise<any> => {
        const url = BuildUrl(Apis.audioAnalysis, {
            path: trackId
        });
        let res: any = await this.apiCallService.get(trackId);
        return res.data;
    }
}