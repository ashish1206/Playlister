import { ApiCallService } from './../apisService/ApiCallService'

export class TrackService {
    private apiCallService: ApiCallService;
    
    constructor() {
        this.apiCallService = new ApiCallService();
    }

    public getTrackDetails = async (trackId: string): Promise<any> => {
        let res: any = await this.apiCallService.getTrackDetails(trackId);
        return res.data;
    }

    public getAudioFeatures = async (ids: string[]): Promise<any> => {
        let trackIds = "";
        ids.forEach(_=>trackIds+=_);
        let res: any = await this.apiCallService.getAudioFeatures(trackIds);
        return res.data;
    }

    public getAudioAnalysis = async (trackId: string): Promise<any> => {
        let res: any = await this.apiCallService.getAudioAnalysis(trackId);
        return res.data;
    }
}