import { SpotifyTrack } from '../models/SpotifyTrack';
import { SearchReqDto } from '../models/SearchReqDto';
import { SearchService } from './SearchService';
import { env } from '../config';
import { Apis } from '../constants/ApisConstants';
import BuildUrl from 'build-url';
import { ApiCallService } from './ApiCallService';
import { YoutubeTrack } from '../models/YoutubeTrack';

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
        let youtubeTracks: YoutubeTrack[] = await this.getYoutubeTrack(youtubePlaylistid);
        let spotifyTracks: SpotifyTrack[] = await this.getSpotifyTracks(youtubeTracks);
        return spotifyTracks;
    }

    public getYoutubeTrack = async (playlistId: string): Promise<YoutubeTrack[]> => {
        let youtubeTracks: YoutubeTrack[] = [];
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
                const detail: YoutubeTrack = {
                    title: element.snippet.title,
                    description: element.snippet.description,
                    videoId: element.snippet.resourceId.videoId
                };
                youtubeTracks.push(detail);
            });
        }while(nextPageToken);
        return youtubeTracks;
    }

    public getSpotifyTracks = async (youtubeTracks: YoutubeTrack[]): Promise<SpotifyTrack[]> => {
        return Promise.all(youtubeTracks.map( async (item: YoutubeTrack): Promise<any> => {
            const data: any = {};
            const searchReqDto: SearchReqDto = {
                q: item.title,
                type: 'track'
            };
            if(searchReqDto.q.includes("(")){
                searchReqDto.q = searchReqDto.q.substr(0, item.title.indexOf('('));
            }
            let response: any = await this.searchService.searchItem(data, searchReqDto);
            let spotifyTrack: any = this.createSpotifyTracks(response.tracks);
            return spotifyTrack;
        }));
    }

    private createSpotifyTracks = (tracks: any): Promise<SpotifyTrack> => {
        let spotifyTrack: any;
        if(tracks.items.length > 0){
            let artists: any[] = tracks.items[0].artists.map((element: any) => {
                let artist: any = {
                    id : element.id,
                    name: element.name
                }
                return artist;
            }); 
            spotifyTrack = {
                id: tracks.items[0].id,
                name: tracks.items[0].name,
                artists: artists
            }
        }
        return spotifyTrack;
    }
}