import { Apis } from '../constants/ApisConstants';
import { ApiCallService } from './ApiCallService';
import BuildUrl from 'build-url';

export class BrowseService {
    private apiCallService: ApiCallService;
    private artistTop = '/top-tracks';
    private relatedArtist = '/related-artists'
    private artistAlbums = '/albums'

    constructor(){
        this.apiCallService = new ApiCallService();
    }

    public getAllCategories = async (params: any): Promise<any> => {
        let url = BuildUrl(Apis.categoriesApi, { 
            queryParams: params
        });
        let res: any = await this.apiCallService.get(url);
        return res.data;
    }

    public getCategoryPlaylist = async (categoryId: string, params: any): Promise<any> => {
        let url = BuildUrl(Apis.categoriesApi, {
            path: categoryId + '/playlists',
            queryParams: params
        });
        let res: any = await this.apiCallService.get(url);
        return res.data;
    }

    public getNewReleases = async (params: any): Promise<any> => {
        let url = BuildUrl(Apis.newRelease, {
            queryParams: params
        });
        let res: any = await this.apiCallService.get(url);
        return res.data;
    }

    public getFeaturedPlaylists = async (params: any): Promise<any> =>{
        let url = BuildUrl(Apis.featuredPlaylist, {
            queryParams: params
        });
        let res: any = await this.apiCallService.get(url);
        return res.data;
    }
}