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
        let res: any = await this.apiCallService.getArtistDetails(id, '');
        return res.data;
    }

    public getTopTracks = async (id: string): Promise<any> => {
        let res: any = await this.apiCallService.getArtistDetails(id, this.artistTop);
        return res.data;
    }

    public getRelatedArtist = async (id: string): Promise<any> => {
        let res: any = await this.apiCallService.getArtistDetails(id, this.relatedArtist);
        return res.data;
    }

    public getAlbms = async (id: string): Promise<any> => {
        let res: any = await this.apiCallService.getArtistDetails(id, this.artistAlbums);
        return res.data;
    }
}