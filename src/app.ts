import { TrackController } from './controller/TrackController';
import express from 'express';
import { env } from './config';
import { ClientAuthService } from './middleware/ClientAuthService';
import { SearchController } from './controller/SearchController';
import * as bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json());

const clientAuthService = new ClientAuthService();
const searchController = new SearchController();
const trackController = new TrackController();

app.use(clientAuthService.clientAccessToken);

app.use(searchController.baseUrl, searchController.router);
app.use(trackController.baseUrl, trackController.router);

app.listen(env.PORT, () => {
    console.log('Server started at', env.PORT);
})