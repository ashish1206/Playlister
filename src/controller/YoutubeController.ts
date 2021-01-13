import { YoutubeService } from './../apisService/YoutubeService';
import { Router, Request, Response, NextFunction } from 'express';

export class YoutubeController {
    public router: Router = Router();
    public baseUrl: string = '/youtube';
    private youtubeService: YoutubeService;
    constructor() {
        this.initRoutes();
        this.youtubeService = new YoutubeService();;
    }

    private initRoutes(): void {
        this.router.get('/get-playlist-item', this.getPlaylistItems);
    }

    private getPlaylistItems = (req: Request, res: Response, next: NextFunction): void => {
        let playlistId:any = req.query.playlistId;
        this.youtubeService.getPlaylistItems(playlistId)
        .then((data: any) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    }
}