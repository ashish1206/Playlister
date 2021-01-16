import { SpotifyUser } from './../models/SpotifyUserProfile';
import BuildUrl from 'build-url';
import { Apis } from './../constants/ApisConstants';
import { ApiCallService } from './ApiCallService';

export class SpotifyUserService {
    
    private apiCallService: ApiCallService;

    constructor(){
        this.apiCallService = new ApiCallService();
    }

    public getUserProfile = async (userId: string, access_token: string): Promise<SpotifyUser> => {
        const url = BuildUrl(Apis.spotifyUserProfile, {
            path: userId
        });
        const response: any = await this.apiCallService.getWithUserHeader(url, access_token);
        const data: any = response.data;
        const spotifyUser: SpotifyUser = {
            display_name: data.display_name,
            followers: data.followers.total,
            id: data.id,
            product: data.product,
            images: data.images
        }
        return spotifyUser;
    }
}