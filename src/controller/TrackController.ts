import { TrackService } from './../apisService/TrackService';
import { Router, Request, Response, NextFunction } from 'express';

export class TrackController {
    public router: Router = Router();
    public baseUrl: string = '/track';
    private trackService: TrackService;
    constructor() {
        this.initRoutes();
        this.trackService = new TrackService();
    }

    private initRoutes(): void {
        this.router.get('/get-track', this.getTrack);
        this.router.get('/audio-features', this.getAudioFeatures);
        this.router.get('/audio-analysis', this.getAudioAnalysis);
    }

    private getTrack = (req: Request, res: Response, next: NextFunction): void => {
        this.trackService.getTrackDetails(req.body.trackId)
        .then((data: any)=>{
            res.status(200).json(data);
        })
        .catch((err)=>{
            res.status(500).json(err.data);
        });
    }

    private getAudioFeatures = (req: Request, res: Response, next: NextFunction): void => {
        this.trackService.getAudioFeatures(req.body.ids)
        .then((data: any)=>{
            res.status(200).json(data);
        })
        .catch((err)=>{
            res.status(500).json(err.data);
        });
    }

    private getAudioAnalysis = (req: Request, res: Response, next: NextFunction): void => {
        this.trackService.getAudioAnalysis(req.body.trackId)
        .then((data: any)=>{
            res.status(200).json(data);
        })
        .catch((err)=>{
            res.status(500).json(err.data);
        });
    }
}