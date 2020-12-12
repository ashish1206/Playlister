import { InitializerService } from './apisService/InitializerService';
import express from 'express';
import { env } from './config'

let initializerService = new InitializerService();

const app = express();

app.use(initializerService.clientAuthService.clientAccessToken);

app.listen(env.PORT, () => {
    console.log('Server started at', env.PORT);
})