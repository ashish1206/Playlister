import { BrowseController } from './controller/BrowseController';
import express from 'express';
import { env } from './config';
import * as bodyParser from 'body-parser'
import { ClientAuthService } from './middleware/ClientAuthService';
import { SearchController } from './controller/SearchController';
import { TrackController } from './controller/TrackController';
import { ArtistController } from './controller/ArtistController';
import { YoutubeController } from './controller/YoutubeController';

const app = express();

app.use(bodyParser.json());

const clientAuthService = new ClientAuthService();
const searchController = new SearchController();
const trackController = new TrackController();
const artistController = new ArtistController();
const browseContorller = new BrowseController();
const youtubeController = new YoutubeController();

app.use(clientAuthService.clientAccessToken);

app.use(searchController.baseUrl, searchController.router);
app.use(trackController.baseUrl, trackController.router);
app.use(artistController.baseUrl, artistController.router);
app.use(browseContorller.baseUrl, browseContorller.router);
app.use(youtubeController.baseUrl, youtubeController.router);

app.listen(env.PORT, () => {
    console.log('Server started at', env.PORT);
})