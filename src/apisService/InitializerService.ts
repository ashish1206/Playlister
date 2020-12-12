import { ClientAuthService } from './../middleware/ClientAuthService';
import { ApiCallService } from './ApiCallService';
export class InitializerService {
    public apiCallService: ApiCallService;
    public clientAuthService: ClientAuthService;

    constructor() {
        this.apiCallService = new ApiCallService();
        this.clientAuthService = new ClientAuthService(this.apiCallService);
    }
}