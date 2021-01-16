import { env } from '../config';
import Axios, { AxiosRequestConfig } from 'axios';
import { Apis } from '../constants/ApisConstants';
import  clientAccessToken  from '../shared/ClientAccessToken';

export class ClientAuthService {
    private CLIENT_ID: string;
    private CLIENT_SECRET: string;

    constructor(){ 
        this.CLIENT_ID = env.SPOTIFY_CLIENT_ID;
        this.CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
    }

    public getAccessToken = async (): Promise<string> => {
        if(this.checkTokenValid()){
            return clientAccessToken.access_token;
        }
        else{
            const credentials = this.getBase64Cred();
            const config:AxiosRequestConfig  = {
                headers: { 
                    'Authorization' : `Basic ${credentials}`, 
                    'Content-Type': 'application/x-www-form-urlencoded' 
                }
            }
            const data = 'grant_type=client_credentials';
            let response: any = await Axios.post(Apis.clientAuthApi, data, config);
            this.setAccessToken(response.data.access_token);
            this.setTokenExpiry(response.data.expires_in);
            return clientAccessToken.access_token;
        }
    }

    private checkTokenValid = (): boolean => {
        const now: Date = new Date();
        if(clientAccessToken.expires_in && now < clientAccessToken.expires_in){
            return true;
        }
        return false;
    }

    private getBase64Cred = (): string => {
        const credentials = this.CLIENT_ID + ':' + this.CLIENT_SECRET;
        const buffer = new Buffer(credentials);
        return buffer.toString('base64');
    }

    private setAccessToken = (access_token: string): void => {
        clientAccessToken.access_token = access_token;
    }

    private setTokenExpiry = (expires_in: number): void => {
        let now = new Date();
        clientAccessToken.expires_in = new Date(now.setSeconds(now.getSeconds() + expires_in));
    }
}