import { SpotifyItem } from '../models/SpotifyItem';
import { SearchReqDto } from '../models/SearchReqDto';
import { SearchService } from './SearchService';
import { env } from '../config';
import { Apis } from '../constants/ApisConstants';
import BuildUrl from 'build-url';
import { ApiCallService } from './ApiCallService';
import { YoutubeItem } from '../models/YoutubeItem';

export class ConverterService {
    private apiCallService: ApiCallService;
    private searchService: SearchService;
    private Api_Key: string;

    constructor() {
        this.apiCallService = new ApiCallService();
        this.searchService = new SearchService();
        this.Api_Key = env.GOOGLE_API_KEY;
    }

    public convertPlaylist = async (youtubePlaylistid: string): Promise<any> => {
        let youtubeItems: YoutubeItem[] = await this.getYoutubeItem(youtubePlaylistid);
        let spotifyItems: SpotifyItem[] = await this.getSpotifyItems(youtubeItems);
        return spotifyItems;
    }

    public getYoutubeItem = async (playlistId: string): Promise<YoutubeItem[]> => {
        let youtubeItems: YoutubeItem[] = [];
        let nextPageToken: string|undefined = undefined;
        do{
            let params: any = {
                part: 'snippet',
                playlistId: playlistId,
                key: this.Api_Key,
                maxResults: 50,
                fields: 'nextPageToken,prevPageToken,pageInfo,items/snippet(title,description,resourceId/videoId)'
            };
            if(nextPageToken !== undefined){
                params['pageToken'] = nextPageToken;
            }
            let url = BuildUrl(Apis.youtubePlaylist, {
                queryParams: params
            });
            let response = await this.apiCallService.getWithoutHeader(url);
            let pageDetail = response.data;
            nextPageToken = pageDetail.nextPageToken;
            pageDetail.items.forEach((element: any) => {
                const detail: YoutubeItem = {
                    title: element.snippet.title,
                    description: element.snippet.description,
                    videoId: element.snippet.resourceId.videoId
                };
                youtubeItems.push(detail);
            });
        }while(nextPageToken);
        return youtubeItems;
    }

    public getSpotifyItems = async (youtubeItems: YoutubeItem[]): Promise<SpotifyItem[]> => {
        return Promise.all(youtubeItems.map( async (item: YoutubeItem): Promise<any> => {
            const data: any = {};
            const searchReqDto: SearchReqDto = {
                searchStr: item.title,
                type: 'track'
            };
            if(searchReqDto.searchStr.includes("(")){
                searchReqDto.searchStr = searchReqDto.searchStr.substr(0, item.title.indexOf('('));
            }
            let response: any = await this.searchService.searchItem(data, searchReqDto);
            let spotifyItem: any = this.createSpotifyItems(response.tracks);
            return spotifyItem;
        }));
    }

    private createSpotifyItems = (tracks: any): Promise<SpotifyItem> => {
        let spotifyItem: any;
        if(tracks.items.length > 0){
            let artists: any[] = tracks.items[0].artists.map((element: any) => {
                let artist: any = {
                    id : element.id,
                    name: element.name
                }
                return artist;
            }); 
            spotifyItem = {
                id: tracks.items[0].id,
                name: tracks.items[0].name,
                artists: artists
            }
        }
        return spotifyItem;
    }
}