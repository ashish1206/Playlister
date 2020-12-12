import { env } from '../config';
import { Request, Response, NextFunction} from 'express';
import Axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { Apis } from '../constants/SpotifyApis';
import  clientAccessToken  from '../shared/ClientAccessToken';

export class ClientAuthService {
    private CLIENT_ID: string;
    private CLIENT_SECRET: string;

    constructor(){ 
        this.CLIENT_ID = env.CLIENT_ID;
        this.CLIENT_SECRET = env.CLIENT_SECRET;
    }

    public clientAccessToken = (req: Request, res: Response, next: NextFunction): void => {
        if(this.checkTokenValid()){
            console.log("access_token", clientAccessToken.access_token);
            next();
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
            Axios.post(Apis.clientAuthApi, data, config)
            .then((response: AxiosResponse) => {
                this.setAccessToken(response.data.access_token);
                this.setTokenExpiry(response.data.expires_in);
                console.log("access_token", clientAccessToken.access_token);
                next();
            })
            .catch((error: AxiosError) => {
                next(error)
            })
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