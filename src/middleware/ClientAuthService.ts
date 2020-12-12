import { env } from '../config';
import { Request, Response, NextFunction} from 'express';
import { AxiosResponse, AxiosError } from 'axios';
import { ApiCallService } from '../apisService/ApiCallService';
export class ClientAuthService {
    private CLIENT_ID: string;
    private CLIENT_SECRET: string;
    private access_token?: string;
    private expires_in: Date|undefined;
    private apiCallService: ApiCallService;

    constructor(apiCallService: ApiCallService){ 
        this.CLIENT_ID = env.CLIENT_ID;
        this.CLIENT_SECRET = env.CLIENT_SECRET;
        this.apiCallService = apiCallService;
    }

    public clientAccessToken = (req: Request, res: Response, next: NextFunction): void => {
        if(this.checkTokenValid()){
            next();
        }
        else{
            const credentials = this.getBase64Cred();
            this.apiCallService.clientAuthentication(credentials)
            .then((response: AxiosResponse) => {
                this.setAccessToken(response.data.access_token);
                this.setTokenExpiry(response.data.expires_in);
                next();
            })
            .catch((error: AxiosError) => {
                next(error)
            })
        }
    }

    private checkTokenValid = (): boolean => {
        const now: Date = new Date();
        if(this.expires_in && now < this.expires_in){
            return true;
        }
        return false;
    }

    private getBase64Cred = (): string => {
        const credentials = this.CLIENT_ID + ':' + this.CLIENT_SECRET;
        const buffer = new Buffer(credentials);
        return buffer.toString('base64');
    }

    public getAccessToken = (): string | undefined => {
        return this.access_token;
    }

    private setAccessToken = (access_token: string): void => {
        this.access_token = access_token;
    }

    private setTokenExpiry = (expires_in: number): void => {
        let now = new Date();
        this.expires_in = new Date(now.setSeconds(now.getSeconds() + expires_in));
    }
}