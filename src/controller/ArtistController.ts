import { Router, Request, Response, NextFunction } from 'express';
import { ArtistService } from '../apisService/ArtistService';
import ServiceInst from '../shared/ServicesInst';

export class ArtistController {
    public router: Router = Router();
    private artistService: ArtistService;
    public baseUrl: string = '/artist';
    constructor() {
        this.artistService = ServiceInst.artistService;
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get('/get-artist/:id', this.getArtist);
        this.router.get('/get-top-tracks/:id', this.getTopTracks);
        this.router.get('/get-related/:id', this.getRelatedArtist);
        this.router.get('/get-albums/:id', this.getAlbums);
    }

    public getArtist = (req: Request, res: Response, next: NextFunction) => {
        const id: any = req.params.id;
        this.artistService.getAtristById(id)
        .then((artist: any) => {
            res.status(200).json(artist);
        })
        .catch((err) => {
            res.status(500).json(err.data);
        });
    }

    public getTopTracks = (req: Request, res: Response, next: NextFunction) => {
        const id: any = req.params.id;
        this.artistService.getTopTracks(id)
        .then((artist: any) => {
            res.status(200).json(artist);
        })
        .catch((err) => {
            res.status(500).json(err.data);
        });
    }

    public getRelatedArtist = (req: Request, res: Response, next: NextFunction) => {
        const id: any = req.params.id;
        this.artistService.getRelatedArtist(id)
        .then((artist: any) => {
            res.status(200).json(artist);
        })
        .catch((err) => {
            res.status(500).json(err.data);
        });
    }

    public getAlbums = (req: Request, res: Response, next: NextFunction) => {
        const id: any = req.params.id;
        this.artistService.getAlbms(id)
        .then((artist: any) => {
            res.status(200).json(artist);
        })
        .catch((err) => {
            res.status(500).json(err.data);
        });
    }
}