import { SpotifyTrack } from './../models/SpotifyTrack';
import { SpotifyPlaylist } from './../models/SpotifyPlaylist';
import { SpotifyUserService } from './SpotifyUserService';
import { SpotifyUser } from './../models/SpotifyUserProfile';
import { Apis } from './../constants/ApisConstants';
import { ApiCallService } from './ApiCallService';

export class SpotifyPlalistService {
    private apiCallService: ApiCallService;
    private spotifyUserService: SpotifyUserService;

    constructor() {
        this.apiCallService = new ApiCallService();
        this.spotifyUserService = new SpotifyUserService();
    }

    public getUserPlaylists = async (access_token: string): Promise<any> => {
        const url: string = Apis.spotifyPlaylists.replace("user_id", "me");
        let response: any = this.apiCallService.getWithUserHeader(url, access_token);
        return response.data;
    }

    public createPlaylist = async (name: string, descrption: string, type: boolean, access_token: string): Promise<SpotifyPlaylist> => {
        const spotifyUser: SpotifyUser = await this.spotifyUserService.getUserProfile("me", access_token);
        const url: string = Apis.spotifyPlaylists.replace("user_id", spotifyUser.id);
        const reqBody: any = {
            "name": name,
            "description": descrption,
            "public": type
          };
        const response: any = await this.apiCallService.postWithUserHeader(url, access_token, reqBody);
        const data: any = response.data;
        let spotifyPlaylist: SpotifyPlaylist = {
            id: data.id,
            name: data.name,
            description: data. description,
            publicType: data.public
        };
        return spotifyPlaylist;
    }

    public addTrackToPlaylist = async (playlistId: string, tracks: SpotifyTrack[], access_token: string): Promise<any> => {
        const url: string = Apis.addTracksToPlaylist.replace("playlist_id", playlistId);
        const tracksUris: string[] = await this.getTracksUris(tracks);
        let reqBody = {
            "uris": tracksUris
        }
        let response:any = await this.apiCallService.postWithUserHeader(url, access_token, reqBody);
        return response.data;
    }

    private getTracksUris = async (tracks: SpotifyTrack[]): Promise<any> => {
        return Promise.all(tracks.map((track: SpotifyTrack) => {
            return "spotify:track:" + track.id;
        }));
    }
}