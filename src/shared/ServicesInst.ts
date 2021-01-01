import { ApiCallService } from './../apisService/ApiCallService';
import { TrackService } from './../apisService/TrackService';
import { SearchService } from './../apisService/SearchService';
import { ArtistService } from '../apisService/ArtistService';

let ServiceInst = {
    apiCallService : new ApiCallService(),
    searchService : new SearchService(),
    trackService : new TrackService(),
    artistService : new ArtistService()
}

export default ServiceInst;