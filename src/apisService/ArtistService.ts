import BuildUrl from 'build-url';
import { Apis } from './../constants/ApisConstants';
import { ApiCallService } from './ApiCallService';

export class ArtistService {
    private apiCallService: ApiCallService;
    private artistTop = '/top-tracks';
    private relatedArtist = '/related-artists'
    private artistAlbums = '/albums'

    constructor(){
        this.apiCallService = new ApiCallService();
    }

    public getAtristById = async (id: string): Promise<any> => {
        const url = BuildUrl(Apis.artistApi, {
            path: id
        });
        let res: any = await this.apiCallService.get(url);
        return res.data;
    }

    public getTopTracks = async (id: string): Promise<any> => {
        const url = BuildUrl(Apis.artistApi, {
            path: id + this.artistTop
        });
        let res: any = await this.apiCallService.get(url);
        return res.data;
    }

    public getRelatedArtist = async (id: string): Promise<any> => {
        const url = BuildUrl(Apis.artistApi, {
            path: id + this.relatedArtist
        });
        let res: any = await this.apiCallService.get(url);
        return res.data;
    }

    public getAlbms = async (id: string): Promise<any> => {
        const url = BuildUrl(Apis.artistApi, {
            path: id + this.artistAlbums
        });
        let res: any = await this.apiCallService.get(url);
        return res.data;
    }
}