import { env } from './../config';
import { Apis } from './../constants/SpotifyApis';
import BuildUrl from 'build-url';
import { ApiCallService } from './ApiCallService';

export class YoutubeService {
    private apiCallService: ApiCallService;
    private Api_Key: string;

    constructor() {
        this.apiCallService = new ApiCallService();
        this.Api_Key = env.GOOGLE_API_KEY;
        console.log(this.Api_Key);
    }

    public getPlaylistItems = async (playlistId: string): Promise<any> => {
        let params = {
            part: 'snippet',
            playlistId: playlistId,
            key: this.Api_Key

        };
        let url = BuildUrl(Apis.youtubePlaylist, {
            queryParams: params
        });
        let res = await this.apiCallService.getWithoutHeader(url);
        return res.data;
    }
}