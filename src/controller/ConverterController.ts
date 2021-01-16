import { ConverterService } from '../apisService/ConverterService';
import { Router, Request, Response, NextFunction } from 'express';

export class ConverterController {
    public router: Router = Router();
    public baseUrl: string = '/youtube';
    private converterService: ConverterService;
    constructor() {
        this.initRoutes();
        this.converterService = new ConverterService();;
    }

    private initRoutes(): void {
        this.router.get('/get-playlist-item', this.getPlaylistItems);
    }

    private getPlaylistItems = (req: Request, res: Response, next: NextFunction): void => {
        let playlistId:any = req.query.playlistId;
        this.converterService.convertPlaylist(playlistId)
        .then((data: any) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    }
}