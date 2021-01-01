import express from 'express';
import { env } from './config';
import * as bodyParser from 'body-parser'
import { ClientAuthService } from './middleware/ClientAuthService';
import { SearchController } from './controller/SearchController';
import { TrackController } from './controller/TrackController';
import { ArtistController } from './controller/ArtistController';

const app = express();

app.use(bodyParser.json());

const clientAuthService = new ClientAuthService();
const searchController = new SearchController();
const trackController = new TrackController();
const artistController = new ArtistController();

app.use(clientAuthService.clientAccessToken);

app.use(searchController.baseUrl, searchController.router);
app.use(trackController.baseUrl, trackController.router);
app.use(artistController.baseUrl, artistController.router);

app.listen(env.PORT, () => {
    console.log('Server started at', env.PORT);
})